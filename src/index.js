import fetch from "node-fetch";
import FormData from "form-data";
import { URLSearchParams } from "url";
//#region Function API
const authorize = async ({ clientId, clientSecret, code, redirectUri }) => {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code"
  });
  console.log(body.toString());
  const res = await fetch("https://app.clio.com/oauth/token", {
    method: "post",
    body
  });
  const { access_token, refresh_token, expires_in } = await res.json();
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresIn: expires_in
  };
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
  const { access_token, refresh_token, expires_in } = await res.json();
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresIn: expires_in
  };
};
const makeFields = fields => {
  return fields
    .map(field => {
      if (typeof field === "string") return field;
      if (typeof field === "object") {
        const { field: fieldName, fields } = field;
        const fieldString = makeFields(fields);
        return `${fieldName}{${fields}}`;
      }
    })
    .join(",");
};
const gets = async ({ path, fields, accessToken, ...args }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const url = new URL("https://app.clio.com/api/v4");
  url.pathname = `${url.pathname}/${path}.json`;
  url.searchParams.append("fields", makeFields(fields));
  Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
  const ret = await fetch(url, { method: "get", headers });
  try {
    const text = await ret.text();
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
};
const create = async ({ path, fields, data, accessToken }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const url = new URL("https://app.clio.com/api/v4");
  const body = new FormData();
  body.append("data", data);
  url.pathname = `${url.pathname}/${path}.json`;
  url.searchParams.append("fields", makeFields(fields));
  const ret = await fetch(url, { method: "post", headers, body });
  try {
    const text = await ret.text();
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
};
const get = async ({ path, id, fields, accessToken }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const url = new URL("https://app.clio.com/api/v4");
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  url.searchParams.append("fields", makeFields(fields));
  const ret = await fetch(url, { method: "get", headers });
  try {
    const text = await ret.text();
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
};
const update = async ({ etag, path, id, fields, data, accessToken }) => {
  if (!etag) etag = data.etag;
  const body = new FormData();
  Object.entries(data).map(([k, v]) => body.append(k, v));
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "IF-MATCH": etag,
    ...body.getHeaders()
  };
  const url = new URL("https://app.clio.com/api/v4");
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  url.searchParams.append("fields", makeFields(fields));
  const ret = await fetch(url, { method: "patch", body, headers });

  try {
    const text = await ret.text();
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
};
const remove = async ({ path, id, accessToken }) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };
  const url = new URL("https://app.clio.com/api/v4");
  url.pathname = `${url.pathname}/${path}/${id}.json`;
  const ret = await fetch(url, { method: "delete", headers });
  try {
    const text = await ret.text();
    const obj = JSON.parse(text);
    return obj;
  } catch (e) {
    console.log("Hit error parsing result, probable error message");
    console.log(text);
    throw text;
  }
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
    if (!clientId || !clientSecret)
      throw "Clio must be initialized with a clientId and a clientSecret";
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.onNewRefreshToken = onNewRefreshToken;
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
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    if (this.onNewRefreshToken) this.onNewRefreshToken(refreshToken);
  }
  async getAccessToken() {
    if (!this.refreshToken)
      throw "Cannot get an access token without a refresh token";
    const { accessToken, refreshToken: newToken } = await getAccessToken({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      refreshToken: this.refreshToken
    });
    this.accessToken = accessToken;
    if (newToken) {
      this.refreshToken = newToken;
      if (this.onNewRefreshToken) this.onNewRefreshToken(newToken);
    }
  }
  async get({ path, id, fields }) {
    if (!this.accessToken) await this.getAccessToken();
    return get({ path, id, fields, accessToken: this.accessToken });
  }
  async gets({ path, fields }) {
    if (!this.accessToken) await this.getAccessToken();
    return gets({ path, fields, accessToken: this.accessToken });
  }
  async create({ path, fields, data }) {
    if (!this.accessToken) await this.getAccessToken();
    return create({ path, fields, data, accessToken: this.accessToken });
  }
  async update({ path, id, fields, etag, data }) {
    if (!this.accessToken) await this.getAccessToken();
    return update({
      path,
      id,
      fields,
      data,
      etag,
      accessToken: this.accessToken
    });
  }
  async remove({ path, id }) {
    if (!this.accessToken) await this.getAccessToken();
    return remove({ path, id, accessToken: this.accessToken });
  }
  async getEntity(type, id, fields = null) {
    const properties = await get({ path: type, id, fields });
    return new ClioEntity(this, { properties, fields, id, type });
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
  makeFields
};
