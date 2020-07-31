import fetch, { Response, Request } from "node-fetch";
import { URL, URLSearchParams } from "url";
import { createHmac } from "crypto";
import { createWriteStream, readFile } from "fs";
import { promisify } from "util";

type ClioProgressFunction = (obj: { [key: string]: any }) => void;
type ClioFields = (string | { field: string; fields: string })[];
type ClioHeaders = { [key: string]: string };
type ClioEvent =
  | "updated"
  | "created"
  | "deleted"
  | "matter_opened"
  | "matter_closed"
  | "matter_pended";
type ClioOnNewRefreshTokenFunction = (refreshToken: string) => Promise<void>;
//#region Function API
const baseHost = "https://app.clio.com";
const baseUrl = baseHost + "/api/v4";
const getResult = async (ret: Response): Promise<{ [key: string]: any }> => {
  if (ret.status === 204) return null;
  const text = await ret.text();
  try {
    const obj = JSON.parse(text);
    if (obj.error) {
      throw JSON.stringify(obj.error);
    }
    return obj;
  } catch (e) {
    console.log(
      "Hit error parsing result in getResult, probable error message"
    );
    console.log(text);
    throw text;
  }
};
const authorize = async ({
  clientId: client_id,
  clientSecret: client_secret,
  code,
  redirectUri: redirect_uri,
}: {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}) => {
  const body = new URLSearchParams({
    client_id,
    client_secret,
    code,
    redirect_uri,
    grant_type: "authorization_code",
  });
  const res = await fetch(baseHost + "/oauth/token", {
    method: "post",
    body,
  });
  const text = await res.text();
  try {
    const obj = JSON.parse(text);
    const {
      access_token,
      refresh_token,
      expires_in,
    }: {
      access_token: string;
      refresh_token: string;
      expires_in: string;
    } = obj;
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
  } catch (e) {
    console.log(
      "Hit error parsing result in authorize, probable error message"
    );
    console.log(text);
    throw text;
  }
};
const deauthorize = async ({ accessToken }: { accessToken: string }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const url = new URL(baseHost + "/oauth/deauthorize");
  await fetch(url, { headers });
  return;
};
const getAccessToken = async ({
  clientId: client_id,
  clientSecret: client_secret,
  refreshToken: refresh_token,
}: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}) => {
  const body = new URLSearchParams({
    client_id,
    client_secret,
    refresh_token,
    grant_type: "refresh_token",
  });
  const res = await fetch(baseHost + "/oauth/token", {
    method: "post",
    body,
  });
  const text = await res.text();
  try {
    const {
      access_token,
      refresh_token,
      expires_in,
    }: {
      access_token: string;
      refresh_token: string;
      expires_in: string;
    } = JSON.parse(text);
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
    };
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
};
const makeFields = (fields: ClioFields) => {
  return (
    fields &&
    fields
      .map((field) => {
        if (typeof field === "string") return field;
        if (typeof field === "object") {
          const { field: fieldName, fields } = field;
          return `${fieldName}{${fields}}`;
        }
      })
      .join(",")
  );
};
const gets = async ({
  path,
  fields,
  accessToken,
  headers,
  ...args
}: {
  path: string;
  fields: ClioFields;
  accessToken: string;
  headers?: ClioHeaders;
  args?: { [key: string]: any };
}) => {
  headers = {
    ...(headers || {}),
    Authorization: `Bearer ${accessToken}`,
  };
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}.json`;
  if (fields) url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const ret = await fetch(url, { method: "get", headers });
  return getResult(ret);
};
const bulkGetRaw = async ({
  path,
  fields,
  accessToken,
  onProgress,
  ...args
}: {
  path: string;
  accessToken: string;
  fields: ClioFields;
  onProgress?: ClioProgressFunction;
  args?: { [key: string]: any };
}) => {
  const headers = {
    "X-BULK": "true",
    Authorization: `Bearer ${accessToken}`,
  };
  //Kick off the bulk fetch
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}.json`;
  if (fields) url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const ret = await fetch(url, { method: "get", headers });

  const pollCheckURL = ret.headers.get("Location");
  const doCheck = true;
  while (doCheck) {
    const ret = await fetch(pollCheckURL, { method: "get", headers });
    switch (ret.status) {
      case 200:
        //Nothing to do
        if (onProgress) {
          const text = await ret.text();
          const obj = JSON.parse(text);
          await onProgress(obj);
        }
        break;
      case 303:
        //Woot!
        return fetch(ret.headers.get("Location"));
    }
  }
  throw "Failed to download bulk";
};
const bulkGetText = async ({
  path,
  fields,
  accessToken,
  onProgress,
  outPath,
}: {
  path: string;
  fields: ClioFields;
  accessToken: string;
  onProgress?: ClioProgressFunction;
  outPath?: string;
}) => {
  if (outPath) {
    await bulkGetFile({ path, fields, accessToken, onProgress, outPath });
    return (await promisify(readFile)(outPath)).toString("utf-8");
  } else {
    const ret = await bulkGetRaw({ path, fields, accessToken, onProgress });
    return await ret.text();
  }
};
const bulkGetFile = async ({
  path,
  fields,
  accessToken,
  onProgress,
  outPath,
}: {
  path: string;
  fields: ClioFields;
  accessToken: string;
  onProgress?: ClioProgressFunction;
  outPath: string;
}) => {
  const ret = await bulkGetRaw({ path, fields, accessToken, onProgress });
  await new Promise((r) => {
    ret.body.pipe(createWriteStream(outPath));
    ret.body.on("end", () => r());
  });
};
const bulkGetObj = async ({
  path,
  fields,
  accessToken,
  onProgress,
  outPath,
}: {
  path: string;
  fields: ClioFields;
  accessToken: string;
  onProgress?: ClioProgressFunction;
  outPath?: string;
}) => {
  const text = await bulkGetText({
    path,
    fields,
    accessToken,
    onProgress,
    outPath,
  });
  return JSON.parse(text);
};
const makeWebHook = async ({
  url,
  fields,
  events,
  model,
  expires,
  accessToken,
}: {
  url: string;
  fields: ClioFields;
  model: string;
  expires?: Date;
  accessToken: string;
  events: ClioEvent[];
}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    ["Content-Type"]: "application/json",
  };
  const whUrl = new URL(baseUrl + "/webhooks.json");
  if (!model) throw "Model is required";
  const data: { [key: string]: any } = { model };
  if (!url) throw "url is required";
  data.url = url;
  if (events) data.events = events;
  if (!fields) throw "fields are required";
  data.fields = makeFields(fields);
  if (expires) data.expires_at = expires.toISOString();
  const bodyObj = { data };
  const body = JSON.stringify(bodyObj);
  const ret = await fetch(whUrl, {
    method: "post",
    headers,
    body,
  });
  const text = await ret.text();
  try {
    const obj = JSON.parse(text);
    if (obj.error) {
      //Oh noes
      throw obj;
    }
    return obj;
  } catch (e) {
    console.log(
      "Hit error parsing result in makewebhook, probable error message"
    );
    console.log(text);
    throw text;
  }
};
const validateSignature = ({
  signature,
  secret,
  body,
}: {
  signature: string;
  secret: string;
  body: string;
}) => {
  const cipher = createHmac("sha256", secret);
  cipher.update(body);
  const calculatedSignature = cipher.digest("hex");
  return signature !== calculatedSignature;
};
const create = async ({
  path,
  fields,
  data,
  body: tempBody,
  accessToken,
  ...args
}: {
  path: string;
  accessToken: string;
  fields: ClioFields;
  data: { [key: string]: any };
  body?: { [key: string]: any };
  args?: { [key: string]: any };
}) => {
  const url = new URL(baseUrl);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  url.pathname = `${url.pathname}/${path}.json`;
  if (fields) url.searchParams.append("fields", makeFields(fields));
  if (args)
    Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const body = JSON.stringify({ data, ...(tempBody || {}) });
  const ret = await fetch(url, { method: "post", headers, body });
  return getResult(ret);
};
const get = async ({
  path,
  id,
  fields,
  accessToken,
  ...args
}: {
  path: string;
  id: string;
  fields: ClioFields;
  accessToken: string;
  args?: { [key: string]: any };
}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const ret = await fetch(url, { method: "get", headers });
  return getResult(ret);
};
const update = async ({
  etag,
  path,
  id,
  fields,
  data,
  accessToken,
  ...args
}: {
  etag: string;
  path: string;
  id: string;
  fields?: ClioFields;
  accessToken: string;
  data: { [key: string]: any };
  args?: { [key: string]: any };
}) => {
  if (!etag) etag = data.etag;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "IF-MATCH": etag,
    "Content-Type": "application/json",
  };
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const body = JSON.stringify({ data });
  const ret = await fetch(url, { method: "patch", body, headers });
  return getResult(ret);
};
const remove = async ({
  path,
  id,
  accessToken,
  ...args
}: {
  path: string;
  id: string;
  accessToken: string;
  args?: { [key: string]: any };
}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const ret = await fetch(url, { method: "delete", headers });
  return getResult(ret);
};
//#endregion
//#region Clio class
class Clio {
  protected clientId: string;
  protected clientSecret: string;
  protected refreshToken?: string;
  protected accessToken?: string;
  protected onNewRefreshToken?: ClioOnNewRefreshTokenFunction;
  constructor({
    clientId,
    clientSecret,
    refreshToken,
    accessToken,
    onNewRefreshToken,
  }: {
    clientId: string;
    clientSecret: string;
    refreshToken?: string;
    accessToken?: string;
    onNewRefreshToken?: ClioOnNewRefreshTokenFunction;
  }) {
    // if (!clientId || !clientSecret)
    //   throw "Clio must be initialized with a clientId and a clientSecret";
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    if (onNewRefreshToken) this.onNewRefreshToken = onNewRefreshToken;
  }
  async load() {
    return this;
  }
  async authorize({
    code,
    redirectUri,
  }: {
    code: string;
    redirectUri: string;
  }) {
    const { refreshToken, accessToken } = await authorize({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      code,
      redirectUri,
    });
    if (accessToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      if (refreshToken && this.onNewRefreshToken)
        await this.onNewRefreshToken(refreshToken);
      return { accessToken, refreshToken };
    } else {
      throw "could not authorize with these credentials";
    }
  }
  async deauthorize() {
    const accessToken = await this.getAccessToken();
    await deauthorize({ accessToken });
    return this.onNewRefreshToken(null);
  }
  async getRefreshToken() {
    return this.refreshToken;
  }
  async _getRefreshToken() {
    if (this.refreshToken) return this.refreshToken;
    this.refreshToken = await this.getRefreshToken();
    return this.refreshToken;
  }
  async getAccessToken() {
    if (this.accessToken) return this.accessToken;
    const refreshToken = await this._getRefreshToken();
    if (!refreshToken)
      throw "Cannot get an access token without a refresh token";
    const { accessToken, refreshToken: newToken } = await getAccessToken({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      refreshToken,
    });
    this.accessToken = accessToken;
    if (newToken) {
      this.refreshToken = newToken;
      if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
    }
    return this.accessToken;
  }
  async get({
    path,
    id,
    fields,
  }: {
    path: string;
    id: string;
    fields: ClioFields;
  }) {
    const accessToken = await this.getAccessToken();
    return get({ path, id, fields, accessToken });
  }
  async gets({ path, fields }: { path: string; fields: ClioFields }) {
    const accessToken = await this.getAccessToken();
    return gets({ path, fields, accessToken });
  }
  async create({
    path,
    fields,
    data,
  }: {
    path: string;
    fields: ClioFields;
    data: { [key: string]: any };
  }) {
    const accessToken = await this.getAccessToken();
    return create({ path, fields, data, accessToken });
  }
  async update({
    path,
    id,
    fields,
    etag,
    data,
  }: {
    path: string;
    id: string;
    fields?: ClioFields;
    etag: string;
    data: { [key: string]: any };
  }) {
    const accessToken = await this.getAccessToken();
    return update({
      path,
      id,
      fields,
      data,
      etag,
      accessToken,
    });
  }
  async remove({ path, id }: { path: string; id: string }) {
    const accessToken = await this.getAccessToken();
    return remove({ path, id, accessToken });
  }
  async getEntity(type: string, id: string, fields?: ClioFields) {
    const properties = await this.get({ path: type, id, fields });
    return new ClioEntity(this, {
      etag: properties.etag,
      properties,
      fields,
      id,
      type,
    });
  }
  async withAccessToken(request: { [key: string]: any }) {
    const accessToken = await this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    request.headers = request.headers
      ? { ...request.headers, ...headers }
      : headers;
    return request;
  }
  async getPage({
    url,
    path,
    fields,
    ...args
  }: {
    url?: string;
    path?: string;
    fields?: ClioFields;
    args?: { [key: string]: any };
  }) {
    const promise = url
      ? this.getUrl({ url })
      : this.gets({ path, fields, ...args });
    let next: string | undefined;
    let previous: string | undefined;
    const o = await promise;
    const meta = o.meta;
    const paging: { [key: string]: any } | undefined = meta.paging;
    if (paging) {
      previous = paging.previous;
      next = paging.next;
    }
    const page: any[] = o.data;
    return {
      page,
      getNext: next && (() => this.getPage({ url: next, path, fields })),
      getPrevious:
        previous && (() => this.getPage({ url: previous, path, fields })),
    };
  }
  async map(
    {
      path,
      fields,
      isSequential = false,
      ...args
    }: {
      path: string;
      fields?: ClioFields;
      isSequential?: boolean;
      args?: { [key: string]: any };
    },
    f: (item: any) => any
  ) {
    if (!path) throw "Path is required for map";
    let obj = await this.getPage({ path, fields, ...args });
    let out: any[] = [];
    while (obj) {
      const { page, getNext } = obj;
      let temp = [];
      if (isSequential) {
        for (const o of page) {
          const t = await f(o);
          temp.push(t);
        }
      } else {
        temp = await Promise.all(page.map(f));
      }
      out = [...out, ...temp];
      if (getNext) obj = await getNext();
      else obj = null;
    }
    return out;
  }
  async getAll({
    path,
    fields,
    ...args
  }: {
    path: string;
    fields?: ClioFields;
    args?: { [key: string]: any };
  }) {
    if (!path) throw "Path is required for getAll";
    return this.map({ path, fields, ...(args || {}) }, (o) => o);
  }
  async bulkGetFile({
    path,
    fields,
    outPath,
    onProgress,
  }: {
    path: string;
    fields: ClioFields;
    outPath: string;
    onProgress?: ClioProgressFunction;
  }) {
    if (!path) throw "Path is required for bulkGetFile";
    const accessToken = await this.getAccessToken();
    return bulkGetFile({ path, fields, accessToken, outPath, onProgress });
  }
  async bulkGetObj({
    path,
    fields,
    onProgress,
    outPath,
  }: {
    path: string;
    fields: ClioFields;
    onProgress?: ClioProgressFunction;
    outPath?: string;
  }) {
    if (!path) throw "Path is required for bulkGetFile";
    const accessToken = await this.getAccessToken();
    return bulkGetObj({ path, fields, accessToken, outPath, onProgress });
  }
  async mapEntities(
    { path, fields }: { path: string; fields: ClioFields },
    f: (item: any) => any
  ) {
    let { page, getNext } = await this.getPageEntities({ path, fields });
    while (true) {
      await Promise.all(page.map(f));
      const o = await getNext();
      page = o.page;
      getNext = o.getNext;
    }
  }
  async mapEntities2(
    {
      path,
      fields,
      ...args
    }: { path: string; fields: ClioFields; args?: { [key: string]: any } },
    f: (item: any) => any
  ) {
    return this.map(
      {
        fields,
        path,
        ...args,
      },
      (properties) => {
        const entity = new ClioEntity(this, {
          id: properties.id,
          etag: properties.etag,
          fields,
          type: path,
          properties,
        });
        return f(entity);
      }
    );
  }
  async getPageEntities({
    url,
    path,
    fields,
  }: {
    url?: string;
    path?: string;
    fields?: ClioFields;
  }) {
    const { page, getNext, getPrevious } = await this.getPage({
      url,
      path,
      fields,
    });
    return this.withEntities({ page, getNext, getPrevious, path, fields });
  }
  async withEntities({
    page,
    getNext,
    getPrevious,
    path,
    fields,
  }: {
    page: { [key: string]: any }[];
    getNext: () => Promise<any>;
    getPrevious: () => Promise<any>;
    path: string;
    fields: ClioFields;
  }) {
    //convert page elements to entities
    const entities = page.map((properties) =>
      this.makeEntity({
        fields,
        properties,
        type: path,
        id: properties.id,
      })
    );
    return {
      page: entities,
      raw: page,
      getNext:
        getNext &&
        (async () => {
          const { page, getNext: newGetNext, getPrevious } = await getNext();
          return this.withEntities({
            page,
            getNext: newGetNext,
            getPrevious,
            path,
            fields,
          });
        }),
      getPrevious:
        getPrevious &&
        (async () => {
          const {
            page,
            getNext,
            getPrevious: newGetPrevious,
          } = await getPrevious();
          return this.withEntities({
            page,
            getNext,
            getPrevious: newGetPrevious,
            path,
            fields,
          });
        }),
    };
  }

  async getUrl({
    url,
    request,
  }: {
    url: string;
    request?: { [key: string]: any };
  }) {
    if (!request) request = {};
    request = await this.withAccessToken(request);
    const res = await fetch(url, request);
    return getResult(res);
  }
  async makeCustomAction({
    label,
    targetUrl,
    uiReference,
    type,
  }: {
    label: string;
    targetUrl: string;
    uiReference?: string;
    type?: string;
  }) {
    if (type) uiReference = `${type}/show`;
    if (!uiReference) throw "uiReference is required";
    const {
      data: {
        id,
        etag,
        created_at,
        updated_at,
        label: newLabel,
        target_url,
        ui_reference,
      },
    } = await this.create({
      path: "custom_actions",
      fields: [
        "label",
        "target_url",
        "ui_reference",
        "id",
        "etag",
        "created_at",
        "updated_at",
      ],
      data: {
        label,
        target_url: targetUrl,
        ui_reference: uiReference,
      },
    });
    return {
      id,
      etag,
      createdAt: created_at,
      updatedAt: updated_at,
      label: newLabel,
      targetUrl: target_url,
      uiReference: ui_reference,
    };
  }
  async makeWebHook({
    url,
    fields,
    events,
    model,
    expires,
  }: {
    url: string;
    fields: ClioFields;
    events?: ClioEvent[];
    model: string;
    expires?: Date;
  }) {
    const accessToken = await this.getAccessToken();
    return await makeWebHook({
      url,
      fields,
      events,
      model,
      expires,
      accessToken,
    });
  }
  async makeEntity({
    type,
    id,
    fields,
    properties,
  }: {
    type: string;
    id: string;
    fields: ClioFields;
    properties: { [key: string]: any };
  }) {
    return new ClioEntity(this, {
      etag: properties.etag,
      type,
      id,
      fields,
      properties,
    });
  }
  async clear(path: string) {
    const os = await this.getAll({ path });
    for (const { id } of os) {
      try {
        await this.remove({ path, id });
      } catch (e) {
        console.log(e);
      }
    }
    console.log("Done with clear");
  }
}
//#endregion
//#region ClioEntity Class
class ClioEntity {
  protected clio: Clio;
  protected properties: { [key: string]: any };
  protected type: string;
  protected id: string;
  protected etag: string;
  protected fields?: ClioFields;
  constructor(
    clio: Clio,
    {
      etag,
      id,
      properties,
      fields,
      type,
    }: {
      etag: string;
      id: string;
      properties: { [key: string]: any };
      type: string;
      fields: ClioFields;
    }
  ) {
    this.clio = clio;
    this.properties = properties;
    if (fields) this.fields = fields;
    this.type = type;
    this.id = id;
    this.etag = etag;
  }
  async load() {
    const { etag, ...properties } = await this.clio.get({
      path: this.type,
      id: this.id,
      fields: this.fields,
    });
    this.etag = etag;
    this.properties = properties;
    return this;
  }
  async update(changes: { [key: string]: any }) {
    const ret = await this.clio.update({
      path: this.type,
      id: this.id,
      data: changes,
      etag: this.etag,
    });
    this.properties = { ...this.properties, ret };
    this.etag = ret.etag;
  }
  async delete() {
    return this.clio.remove({ path: this.type, id: this.id });
  }
}
//#endregion
export {
  Clio,
  ClioEntity,
  getAccessToken,
  get,
  gets,
  create,
  update,
  authorize,
  remove,
  makeFields,
  deauthorize,
  makeWebHook,
  validateSignature,
  baseHost,
};
