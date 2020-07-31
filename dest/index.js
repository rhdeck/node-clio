"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseHost = exports.validateSignature = exports.makeWebHook = exports.deauthorize = exports.makeFields = exports.remove = exports.authorize = exports.update = exports.create = exports.gets = exports.get = exports.getAccessToken = exports.ClioEntity = exports.Clio = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const url_1 = require("url");
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const util_1 = require("util");
//#region Function API
const baseHost = "https://app.clio.com";
exports.baseHost = baseHost;
const baseUrl = baseHost + "/api/v4";
const getResult = (ret) => __awaiter(void 0, void 0, void 0, function* () {
    if (ret.status === 204)
        return null;
    const text = yield ret.text();
    try {
        const obj = JSON.parse(text);
        if (obj.error) {
            throw JSON.stringify(obj.error);
        }
        return obj;
    }
    catch (e) {
        console.log("Hit error parsing result in getResult, probable error message");
        console.log(text);
        throw text;
    }
});
const authorize = ({ clientId: client_id, clientSecret: client_secret, code, redirectUri: redirect_uri, }) => __awaiter(void 0, void 0, void 0, function* () {
    const body = new url_1.URLSearchParams({
        client_id,
        client_secret,
        code,
        redirect_uri,
        grant_type: "authorization_code",
    });
    const res = yield node_fetch_1.default(baseHost + "/oauth/token", {
        method: "post",
        body,
    });
    const text = yield res.text();
    try {
        const obj = JSON.parse(text);
        const { access_token, refresh_token, expires_in, } = obj;
        return {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
        };
    }
    catch (e) {
        console.log("Hit error parsing result in authorize, probable error message");
        console.log(text);
        throw text;
    }
});
exports.authorize = authorize;
const deauthorize = ({ accessToken }) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    const url = new url_1.URL(baseHost + "/oauth/deauthorize");
    yield node_fetch_1.default(url, { headers });
    return;
});
exports.deauthorize = deauthorize;
const getAccessToken = ({ clientId: client_id, clientSecret: client_secret, refreshToken: refresh_token, }) => __awaiter(void 0, void 0, void 0, function* () {
    const body = new url_1.URLSearchParams({
        client_id,
        client_secret,
        refresh_token,
        grant_type: "refresh_token",
    });
    const res = yield node_fetch_1.default(baseHost + "/oauth/token", {
        method: "post",
        body,
    });
    const text = yield res.text();
    try {
        const { access_token, refresh_token, expires_in, } = JSON.parse(text);
        return {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
        };
    }
    catch (e) {
        console.log("Hit error parsing result, probable error message");
        console.log(text);
        throw text;
    }
});
exports.getAccessToken = getAccessToken;
const makeFields = (fields) => {
    return (fields &&
        fields
            .map((field) => {
            if (typeof field === "string")
                return field;
            if (typeof field === "object") {
                const { field: fieldName, fields } = field;
                return `${fieldName}{${fields}}`;
            }
        })
            .join(","));
};
exports.makeFields = makeFields;
const gets = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { path, fields, accessToken, headers } = _a, args = __rest(_a, ["path", "fields", "accessToken", "headers"]);
    headers = Object.assign(Object.assign({}, (headers || {})), { Authorization: `Bearer ${accessToken}` });
    const url = new url_1.URL(baseUrl);
    url.pathname = `${url.pathname}/${path}.json`;
    if (fields)
        url.searchParams.append("fields", makeFields(fields));
    Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
    const ret = yield node_fetch_1.default(url, { method: "get", headers });
    return getResult(ret);
});
exports.gets = gets;
const bulkGetRaw = (_b) => __awaiter(void 0, void 0, void 0, function* () {
    var { path, fields, accessToken, onProgress } = _b, args = __rest(_b, ["path", "fields", "accessToken", "onProgress"]);
    const headers = {
        "X-BULK": "true",
        Authorization: `Bearer ${accessToken}`,
    };
    //Kick off the bulk fetch
    const url = new url_1.URL(baseUrl);
    url.pathname = `${url.pathname}/${path}.json`;
    if (fields)
        url.searchParams.append("fields", makeFields(fields));
    Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
    const ret = yield node_fetch_1.default(url, { method: "get", headers });
    const pollCheckURL = ret.headers.get("Location");
    const doCheck = true;
    while (doCheck) {
        const ret = yield node_fetch_1.default(pollCheckURL, { method: "get", headers });
        switch (ret.status) {
            case 200:
                //Nothing to do
                if (onProgress) {
                    const text = yield ret.text();
                    const obj = JSON.parse(text);
                    yield onProgress(obj);
                }
                break;
            case 303:
                //Woot!
                return node_fetch_1.default(ret.headers.get("Location"));
        }
    }
    throw "Failed to download bulk";
});
const bulkGetText = ({ path, fields, accessToken, onProgress, outPath, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (outPath) {
        yield bulkGetFile({ path, fields, accessToken, onProgress, outPath });
        return (yield util_1.promisify(fs_1.readFile)(outPath)).toString("utf-8");
    }
    else {
        const ret = yield bulkGetRaw({ path, fields, accessToken, onProgress });
        return yield ret.text();
    }
});
const bulkGetFile = ({ path, fields, accessToken, onProgress, outPath, }) => __awaiter(void 0, void 0, void 0, function* () {
    const ret = yield bulkGetRaw({ path, fields, accessToken, onProgress });
    yield new Promise((r) => {
        ret.body.pipe(fs_1.createWriteStream(outPath));
        ret.body.on("end", () => r());
    });
});
const bulkGetObj = ({ path, fields, accessToken, onProgress, outPath, }) => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield bulkGetText({
        path,
        fields,
        accessToken,
        onProgress,
        outPath,
    });
    return JSON.parse(text);
});
const makeWebHook = ({ url, fields, events, model, expires, accessToken, }) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        ["Content-Type"]: "application/json",
    };
    const whUrl = new url_1.URL(baseUrl + "/webhooks.json");
    if (!model)
        throw "Model is required";
    const data = { model };
    if (!url)
        throw "url is required";
    data.url = url;
    if (events)
        data.events = events;
    if (!fields)
        throw "fields are required";
    data.fields = makeFields(fields);
    if (expires)
        data.expires_at = expires.toISOString();
    const bodyObj = { data };
    const body = JSON.stringify(bodyObj);
    const ret = yield node_fetch_1.default(whUrl, {
        method: "post",
        headers,
        body,
    });
    const text = yield ret.text();
    try {
        const obj = JSON.parse(text);
        if (obj.error) {
            //Oh noes
            throw obj;
        }
        return obj;
    }
    catch (e) {
        console.log("Hit error parsing result in makewebhook, probable error message");
        console.log(text);
        throw text;
    }
});
exports.makeWebHook = makeWebHook;
const validateSignature = ({ signature, secret, body, }) => {
    const cipher = crypto_1.createHmac("sha256", secret);
    cipher.update(body);
    const calculatedSignature = cipher.digest("hex");
    return signature !== calculatedSignature;
};
exports.validateSignature = validateSignature;
const create = (_c) => __awaiter(void 0, void 0, void 0, function* () {
    var { path, fields, data, body: tempBody, accessToken } = _c, args = __rest(_c, ["path", "fields", "data", "body", "accessToken"]);
    const url = new url_1.URL(baseUrl);
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };
    url.pathname = `${url.pathname}/${path}.json`;
    if (fields)
        url.searchParams.append("fields", makeFields(fields));
    if (args)
        Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
    const body = JSON.stringify(Object.assign({ data }, (tempBody || {})));
    const ret = yield node_fetch_1.default(url, { method: "post", headers, body });
    return getResult(ret);
});
exports.create = create;
const get = (_d) => __awaiter(void 0, void 0, void 0, function* () {
    var { path, id, fields, accessToken } = _d, args = __rest(_d, ["path", "id", "fields", "accessToken"]);
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    const url = new url_1.URL(baseUrl);
    url.pathname = `${url.pathname}/${path}/${id}.json`;
    url.searchParams.append("fields", makeFields(fields));
    Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
    const ret = yield node_fetch_1.default(url, { method: "get", headers });
    return getResult(ret);
});
exports.get = get;
const update = (_e) => __awaiter(void 0, void 0, void 0, function* () {
    var { etag, path, id, fields, data, accessToken } = _e, args = __rest(_e, ["etag", "path", "id", "fields", "data", "accessToken"]);
    if (!etag)
        etag = data.etag;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "IF-MATCH": etag,
        "Content-Type": "application/json",
    };
    const url = new url_1.URL(baseUrl);
    url.pathname = `${url.pathname}/${path}/${id}.json`;
    url.searchParams.append("fields", makeFields(fields));
    Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
    const body = JSON.stringify({ data });
    const ret = yield node_fetch_1.default(url, { method: "patch", body, headers });
    return getResult(ret);
});
exports.update = update;
const remove = (_f) => __awaiter(void 0, void 0, void 0, function* () {
    var { path, id, accessToken } = _f, args = __rest(_f, ["path", "id", "accessToken"]);
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    const url = new url_1.URL(baseUrl);
    url.pathname = `${url.pathname}/${path}/${id}.json`;
    Object.entries(args).forEach(([k, v]) => url.searchParams.append(k, v));
    const ret = yield node_fetch_1.default(url, { method: "delete", headers });
    return getResult(ret);
});
exports.remove = remove;
//#endregion
//#region Clio class
class Clio {
    constructor({ clientId, clientSecret, refreshToken, accessToken, onNewRefreshToken, }) {
        // if (!clientId || !clientSecret)
        //   throw "Clio must be initialized with a clientId and a clientSecret";
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        if (onNewRefreshToken)
            this.onNewRefreshToken = onNewRefreshToken;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return this;
        });
    }
    authorize({ code, redirectUri, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken, accessToken } = yield authorize({
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                code,
                redirectUri,
            });
            if (accessToken) {
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                if (refreshToken && this.onNewRefreshToken)
                    yield this.onNewRefreshToken(refreshToken);
                return { accessToken, refreshToken };
            }
            else {
                throw "could not authorize with these credentials";
            }
        });
    }
    deauthorize() {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            yield deauthorize({ accessToken });
            return this.onNewRefreshToken(null);
        });
    }
    getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.refreshToken;
        });
    }
    _getRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.refreshToken)
                return this.refreshToken;
            this.refreshToken = yield this.getRefreshToken();
            return this.refreshToken;
        });
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken)
                return this.accessToken;
            const refreshToken = yield this._getRefreshToken();
            if (!refreshToken)
                throw "Cannot get an access token without a refresh token";
            const { accessToken, refreshToken: newToken } = yield getAccessToken({
                clientId: this.clientId,
                clientSecret: this.clientSecret,
                refreshToken,
            });
            this.accessToken = accessToken;
            if (newToken) {
                this.refreshToken = newToken;
                if (this.onNewRefreshToken)
                    this.onNewRefreshToken(newToken);
            }
            return this.accessToken;
        });
    }
    get({ path, id, fields, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return get({ path, id, fields, accessToken });
        });
    }
    gets({ path, fields }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return gets({ path, fields, accessToken });
        });
    }
    create({ path, fields, data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return create({ path, fields, data, accessToken });
        });
    }
    update({ path, id, fields, etag, data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return update({
                path,
                id,
                fields,
                data,
                etag,
                accessToken,
            });
        });
    }
    remove({ path, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return remove({ path, id, accessToken });
        });
    }
    getEntity(type, id, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = yield this.get({ path: type, id, fields });
            return new ClioEntity(this, {
                etag: properties.etag,
                properties,
                fields,
                id,
                type,
            });
        });
    }
    withAccessToken(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            request.headers = request.headers
                ? Object.assign(Object.assign({}, request.headers), headers) : headers;
            return request;
        });
    }
    getPage(_a) {
        var { url, path, fields } = _a, args = __rest(_a, ["url", "path", "fields"]);
        return __awaiter(this, void 0, void 0, function* () {
            const promise = url
                ? this.getUrl({ url })
                : this.gets(Object.assign({ path, fields }, args));
            let next;
            let previous;
            const o = yield promise;
            const meta = o.meta;
            const paging = meta.paging;
            if (paging) {
                previous = paging.previous;
                next = paging.next;
            }
            const page = o.data;
            return {
                page,
                getNext: next && (() => this.getPage({ url: next, path, fields })),
                getPrevious: previous && (() => this.getPage({ url: previous, path, fields })),
            };
        });
    }
    map(_a, f) {
        var { path, fields, isSequential = false } = _a, args = __rest(_a, ["path", "fields", "isSequential"]);
        return __awaiter(this, void 0, void 0, function* () {
            if (!path)
                throw "Path is required for map";
            let obj = yield this.getPage(Object.assign({ path, fields }, args));
            let out = [];
            while (obj) {
                const { page, getNext } = obj;
                let temp = [];
                if (isSequential) {
                    for (const o of page) {
                        const t = yield f(o);
                        temp.push(t);
                    }
                }
                else {
                    temp = yield Promise.all(page.map(f));
                }
                out = [...out, ...temp];
                if (getNext)
                    obj = yield getNext();
                else
                    obj = null;
            }
            return out;
        });
    }
    getAll(_a) {
        var { path, fields } = _a, args = __rest(_a, ["path", "fields"]);
        return __awaiter(this, void 0, void 0, function* () {
            if (!path)
                throw "Path is required for getAll";
            return this.map(Object.assign({ path, fields }, (args || {})), (o) => o);
        });
    }
    bulkGetFile({ path, fields, outPath, onProgress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path)
                throw "Path is required for bulkGetFile";
            const accessToken = yield this.getAccessToken();
            return bulkGetFile({ path, fields, accessToken, outPath, onProgress });
        });
    }
    bulkGetObj({ path, fields, onProgress, outPath, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path)
                throw "Path is required for bulkGetFile";
            const accessToken = yield this.getAccessToken();
            return bulkGetObj({ path, fields, accessToken, outPath, onProgress });
        });
    }
    mapEntities({ path, fields }, f) {
        return __awaiter(this, void 0, void 0, function* () {
            let { page, getNext } = yield this.getPageEntities({ path, fields });
            while (true) {
                yield Promise.all(page.map(f));
                const o = yield getNext();
                page = o.page;
                getNext = o.getNext;
            }
        });
    }
    mapEntities2(_a, f) {
        var { path, fields } = _a, args = __rest(_a, ["path", "fields"]);
        return __awaiter(this, void 0, void 0, function* () {
            return this.map(Object.assign({ fields,
                path }, args), (properties) => {
                const entity = new ClioEntity(this, {
                    id: properties.id,
                    etag: properties.etag,
                    fields,
                    type: path,
                    properties,
                });
                return f(entity);
            });
        });
    }
    getPageEntities({ url, path, fields, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, getNext, getPrevious } = yield this.getPage({
                url,
                path,
                fields,
            });
            return this.withEntities({ page, getNext, getPrevious, path, fields });
        });
    }
    withEntities({ page, getNext, getPrevious, path, fields, }) {
        return __awaiter(this, void 0, void 0, function* () {
            //convert page elements to entities
            const entities = page.map((properties) => this.makeEntity({
                fields,
                properties,
                type: path,
                id: properties.id,
            }));
            return {
                page: entities,
                raw: page,
                getNext: getNext &&
                    (() => __awaiter(this, void 0, void 0, function* () {
                        const { page, getNext: newGetNext, getPrevious } = yield getNext();
                        return this.withEntities({
                            page,
                            getNext: newGetNext,
                            getPrevious,
                            path,
                            fields,
                        });
                    })),
                getPrevious: getPrevious &&
                    (() => __awaiter(this, void 0, void 0, function* () {
                        const { page, getNext, getPrevious: newGetPrevious, } = yield getPrevious();
                        return this.withEntities({
                            page,
                            getNext,
                            getPrevious: newGetPrevious,
                            path,
                            fields,
                        });
                    })),
            };
        });
    }
    getUrl({ url, request, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request)
                request = {};
            request = yield this.withAccessToken(request);
            const res = yield node_fetch_1.default(url, request);
            return getResult(res);
        });
    }
    makeCustomAction({ label, targetUrl, uiReference, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type)
                uiReference = `${type}/show`;
            if (!uiReference)
                throw "uiReference is required";
            const { data: { id, etag, created_at, updated_at, label: newLabel, target_url, ui_reference, }, } = yield this.create({
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
        });
    }
    makeWebHook({ url, fields, events, model, expires, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield this.getAccessToken();
            return yield makeWebHook({
                url,
                fields,
                events,
                model,
                expires,
                accessToken,
            });
        });
    }
    makeEntity({ type, id, fields, properties, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new ClioEntity(this, {
                etag: properties.etag,
                type,
                id,
                fields,
                properties,
            });
        });
    }
    clear(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const os = yield this.getAll({ path });
            for (const { id } of os) {
                try {
                    yield this.remove({ path, id });
                }
                catch (e) {
                    console.log(e);
                }
            }
            console.log("Done with clear");
        });
    }
}
exports.Clio = Clio;
//#endregion
//#region ClioEntity Class
class ClioEntity {
    constructor(clio, { etag, id, properties, fields, type, }) {
        this.clio = clio;
        this.properties = properties;
        if (fields)
            this.fields = fields;
        this.type = type;
        this.id = id;
        this.etag = etag;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield this.clio.get({
                path: this.type,
                id: this.id,
                fields: this.fields,
            }), { etag } = _a, properties = __rest(_a, ["etag"]);
            this.etag = etag;
            this.properties = properties;
            return this;
        });
    }
    update(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = yield this.clio.update({
                path: this.type,
                id: this.id,
                data: changes,
                etag: this.etag,
            });
            this.properties = Object.assign(Object.assign({}, this.properties), { ret });
            this.etag = ret.etag;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clio.remove({ path: this.type, id: this.id });
        });
    }
}
exports.ClioEntity = ClioEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBc0Q7QUFDdEQsNkJBQTJDO0FBQzNDLG1DQUFvQztBQUNwQywyQkFBaUQ7QUFDakQsK0JBQWlDO0FBYWpDLHNCQUFzQjtBQUN0QixNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQztBQTg5QnRDLDRCQUFRO0FBNzlCVixNQUFNLE9BQU8sR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ3JDLE1BQU0sU0FBUyxHQUFHLENBQU8sR0FBYSxFQUFtQyxFQUFFO0lBQ3pFLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsSUFBSTtRQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ2IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUNELE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQ1QsK0RBQStELENBQ2hFLENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxDQUFDO0tBQ1o7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUNGLE1BQU0sU0FBUyxHQUFHLENBQU8sRUFDdkIsUUFBUSxFQUFFLFNBQVMsRUFDbkIsWUFBWSxFQUFFLGFBQWEsRUFDM0IsSUFBSSxFQUNKLFdBQVcsRUFBRSxZQUFZLEdBTTFCLEVBQUUsRUFBRTtJQUNILE1BQU0sSUFB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