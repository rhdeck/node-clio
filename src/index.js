import fetch from "node-fetch";
import FormData from "form-data";
import { URLSearchParams } from "url";
import { createHmac } from "crypto";
const formDataArray = (formdata, key, arr) => {
  for (const i in arr) formdata.append(key + "[]", arr[i]);
};
//#region Function API
const baseUrl = "https://app.clio.com/api/v4";
const getResult = async ret => {
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
const authorize = async ({ clientId, clientSecret, code, redirectUri }) => {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code"
  });
  const res = await fetch("https://app.clio.com/oauth/token", {
    method: "post",
    body
  });
  const text = await res.text();
  try {
    const obj = JSON.parse(text);
    const { access_token, refresh_token, expires_in } = obj;
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in
    };
  } catch (e) {
    console.log(
      "Hit error parsing result in authorize, probable error message"
    );
    console.log(text);
    throw text;
  }
};
const deauthorize = async ({ accessToken }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const url = new URL("https://app.clio.com/oauth/deauthorize");
  await fetch(url, { headers });
  return true;
};
const getAccessToken = async ({ clientId, clientSecret, refreshToken }) => {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token"
  });
  const res = await fetch("https://app.clio.com/oauth/token", {
    method: "post",
    body
  });
  const text = await res.text();
  try {
    const { access_token, refresh_token, expires_in } = JSON.parse(text);
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in
    };
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
};
const makeFields = fields => {
  return (
    fields &&
    fields
      .map(field => {
        if (typeof field === "string") return field;
        if (typeof field === "object") {
          const { field: fieldName, fields } = field;
          const fieldString = makeFields(fields);
          return `${fieldName}{${fields}}`;
        }
      })
      .join(",")
  );
};
const gets = async ({ path, fields, accessToken, ...args }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}.json`;
  url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const ret = await fetch(url, { method: "get", headers });
  return getResult(ret);
};
const makeWebHook = async ({
  url,
  fields,
  events,
  model,
  expires,
  accessToken
}) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const whUrl = new URL("https://app.clio.com/api/v4/webhooks.json");
  const body = { model };
  if (!url) throw "url is required";
  body.url = url;
  if (events) body.events = events;
  if (fields) body.fields = makeFields(fields);
  if (expires && !(expires instanceof Date)) expires = new Date(expires);
  if (expires) body.expires_at = expires.toISOString();

  const ret = await fetch(whUrl, {
    method: "post",
    headers,
    body: JSON.stringify(body)
  });
  const text = await ret.text();
  try {
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log(
      "Hit error parsing result in makewebhook, probable error message"
    );
    console.log(text);
    throw text;
  }
};
const validateSignature = ({ signature, secret, body }) => {
  const cipher = createHmac("sha256", secret);
  cipher.update(body);
  const calculatedSignature = cipher.digest("hex");
  console.log("Received signature", signature);
  console.log("Body");
  console.log(body);
  console.log("Calculated signature", calculatedSignature);
  return signature !== calculatedSignature;
};
const create = async ({
  path,
  fields,
  data,
  body: tempBody,
  accessToken,
  ...args
}) => {
  const url = new URL(baseUrl);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };
  url.pathname = `${url.pathname}/${path}.json`;
  if (fields) url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const body = JSON.stringify({ data, ...(tempBody || {}) });
  const ret = await fetch(url, { method: "post", headers, body });
  return getResult(ret);
};
const get = async ({ path, id, fields, accessToken, ...args }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
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
}) => {
  if (!etag) etag = data.etag;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "IF-MATCH": etag,
    "Content-Type": "application/json"
  };
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const body = JSON.stringify({ data });
  const ret = await fetch(url, { method: "patch", body, headers });
  return getResult(ret);
};
const remove = async ({ path, id, accessToken, ...args }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
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
  constructor({
    clientId,
    clientSecret,
    refreshToken,
    accessToken,
    onNewRefreshToken
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
  async authorize({ code, redirectUri }) {
    if (!code || !redirectUri)
      throw "Authorize requires a code and the redirectUri passed in the initial authorization request";
    const { refreshToken, accessToken } = await authorize({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      code,
      redirectUri
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
      refreshToken
    });
    this.accessToken = accessToken;
    if (newToken) {
      this.refreshToken = newToken;
      if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
    }
    return this.accessToken;
  }
  async get({ path, id, fields }) {
    const accessToken = await this.getAccessToken();
    return get({ path, id, fields, accessToken });
  }
  async gets({ path, fields }) {
    const accessToken = await this.getAccessToken();
    return gets({ path, fields, accessToken });
  }
  async create({ path, fields, data }) {
    const accessToken = await this.getAccessToken();
    return create({ path, fields, data, accessToken });
  }
  async update({ path, id, fields, etag, data }) {
    const accessToken = await this.getAccessToken();
    return update({
      path,
      id,
      fields,
      data,
      etag,
      accessToken
    });
  }
  async remove({ path, id }) {
    const accessToken = await this.getAccessToken();
    return remove({ path, id, accessToken });
  }
  async getEntity(type, id, fields = null) {
    const properties = await this.get({ path: type, id, fields });
    return new ClioEntity(this, { properties, fields, id, type });
  }
  async withAccessToken(request) {
    const accessToken = await this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    request.headers = request.headers
      ? { ...request.headers, ...headers }
      : headers;
    return request;
  }
  async getPage({ url, path, fields, ...args }) {
    const promise = url
      ? this.getUrl({ url })
      : this.gets({ path, fields, ...args });
    const {
      meta: { paging: { next, previous } = {} } = {},
      data
    } = await promise;
    return {
      page: data,
      getNext: next && (() => this.getPage({ url: next, path, fields })),
      getPrevious:
        previous && (() => this.getPage({ url: previous, path, fields }))
    };
  }
  async map({ path, fields, ...args }, f) {
    let obj = await this.getPage({ path, fields, ...args });
    while (obj) {
      const { page, getNext } = obj;
      await Promise.all(page.map(f));
      if (getNext) obj = await getNext();
      else obj = null;
    }
  }
  async mapEntities({ path, fields }, f) {
    getNextPage = await getPageEntities({ path, fields });
    while (getNextPage) {
      const { page, getNext } = getNextPage();
      await Promise.all(page.map(f));
      getNextPage = getNext;
    }
  }
  async mapEntities2({ path, fields, ...args }, f) {
    return this.map(
      {
        fields,
        path,
        ...args
      },
      properties => {
        const entity = new ClioEntity(this, {
          fields,
          type: path,
          properties
        });
        return f(entity);
      }
    );
  }
  async getPageEntities({ url, path, fields }) {
    const { page, getNext, getPrevious } = await this.getPage({
      url,
      path,
      fields
    });
    return this.withEntities({ page, getNext, getPrevious, path, fields });
  }
  async withEntities({ page, getNext, getPrevious, path, fields }) {
    //convert page elements to entities
    const entities = page.map(properties => {
      const entity = new ClioEntity(this, {
        fields,
        properties,
        type: path
      });
      return entity;
    });
    return {
      page: entities,
      raw: page,
      getNext:
        getNext &&
        (async () => {
          const { page, getNext, getPrevious } = await getNext();
          return this.withEntities({
            page,
            getNext,
            getPrevious,
            path,
            fields
          });
        }),
      getPrevious:
        getPrevious &&
        (async () => {
          const { page, getNext, getPrevious } = await getPrevious();
          return this.withEntities({
            page,
            getNext,
            getPrevious,
            path,
            fields
          });
        })
    };
  }

  async getUrl({ url, request }) {
    if (!request) request = {};
    request = await this.withAccessToken(request);
    const res = await fetch(url, request);
    return getResult(res);
  }
  async makeCustomAction({ label, targetUrl, uiReference, type }) {
    if (type) uiReference = `${type}/show`;
    const {
      data: {
        id,
        etag,
        created_at,
        updated_at,
        label: newLabel,
        target_url,
        ui_reference
      }
    } = await this.create({
      path: "custom_actions",
      fields: [
        "label",
        "target_url",
        "ui_reference",
        "id",
        "etag",
        "created_at",
        "updated_at"
      ],
      data: {
        label,
        target_url: targetUrl,
        ui_reference: uiReference
      }
    });
    return {
      id,
      etag,
      createdAt: created_at,
      updatedAt: updated_at,
      label: newLabel,
      targetUrl: target_url,
      uiReference: ui_reference
    };
  }
  async makeWebHook({ url, fields, events, model, expires }) {
    const accessToken = await this.getAccessToken();
    return await makeWebHook({
      url,
      fields,
      events,
      model,
      expires,
      accessToken
    });
  }
}
//#endregion
//#region ClioEntity Class
class ClioEntity {
  constructor(clio, { etag, id, properties, fields, type }) {
    this.clio = clio;
    this.properties = properties;
    if (fields) this.fields = fields;
    this.type = path;
    this.id = id ? id : properties.id;
    this.etag = etag ? etag : properties.etag;
  }
  async update(changes) {
    const ret = await this.clio.update({
      path: this.type,
      id: this.id,
      data: changes
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
  validateSignature
};
