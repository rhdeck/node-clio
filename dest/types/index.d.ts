declare type ClioProgressFunction = (obj: {
    [key: string]: any;
}) => void;
declare type ClioFields = (string | {
    field: string;
    fields: string;
})[];
declare type ClioHeaders = {
    [key: string]: string;
};
declare type ClioEvent = "updated" | "created" | "deleted" | "matter_opened" | "matter_closed" | "matter_pended";
declare type ClioOnNewRefreshTokenFunction = (refreshToken: string) => Promise<void>;
declare const baseHost = "https://app.clio.com";
declare const authorize: ({ clientId: client_id, clientSecret: client_secret, code, redirectUri: redirect_uri, }: {
    clientId: string;
    clientSecret: string;
    code: string;
    redirectUri: string;
}) => Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}>;
declare const deauthorize: ({ accessToken }: {
    accessToken: string;
}) => Promise<void>;
declare const getAccessToken: ({ clientId: client_id, clientSecret: client_secret, refreshToken: refresh_token, }: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}) => Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}>;
declare const makeFields: (fields: ClioFields) => string;
declare const gets: ({ path, fields, accessToken, headers, ...args }: {
    path: string;
    fields: ClioFields;
    accessToken: string;
    headers?: ClioHeaders;
    args?: {
        [key: string]: any;
    };
}) => Promise<{
    [key: string]: any;
}>;
declare const makeWebHook: ({ url, fields, events, model, expires, accessToken, }: {
    url: string;
    fields: ClioFields;
    model: string;
    expires?: Date;
    accessToken: string;
    events: ClioEvent[];
}) => Promise<any>;
declare const validateSignature: ({ signature, secret, body, }: {
    signature: string;
    secret: string;
    body: string;
}) => boolean;
declare const create: ({ path, fields, data, body: tempBody, accessToken, ...args }: {
    path: string;
    accessToken: string;
    fields: ClioFields;
    data: {
        [key: string]: any;
    };
    body?: {
        [key: string]: any;
    };
    args?: {
        [key: string]: any;
    };
}) => Promise<{
    [key: string]: any;
}>;
declare const get: ({ path, id, fields, accessToken, ...args }: {
    path: string;
    id: string;
    fields: ClioFields;
    accessToken: string;
    args?: {
        [key: string]: any;
    };
}) => Promise<{
    [key: string]: any;
}>;
declare const update: ({ etag, path, id, fields, data, accessToken, ...args }: {
    etag: string;
    path: string;
    id: string;
    fields?: ClioFields;
    accessToken: string;
    data: {
        [key: string]: any;
    };
    args?: {
        [key: string]: any;
    };
}) => Promise<{
    [key: string]: any;
}>;
declare const remove: ({ path, id, accessToken, ...args }: {
    path: string;
    id: string;
    accessToken: string;
    args?: {
        [key: string]: any;
    };
}) => Promise<{
    [key: string]: any;
}>;
declare class Clio {
    protected clientId: string;
    protected clientSecret: string;
    protected refreshToken?: string;
    protected accessToken?: string;
    protected onNewRefreshToken?: ClioOnNewRefreshTokenFunction;
    constructor({ clientId, clientSecret, refreshToken, accessToken, onNewRefreshToken, }: {
        clientId: string;
        clientSecret: string;
        refreshToken?: string;
        accessToken?: string;
        onNewRefreshToken?: ClioOnNewRefreshTokenFunction;
    });
    load(): Promise<this>;
    authorize({ code, redirectUri, }: {
        code: string;
        redirectUri: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    deauthorize(): Promise<void>;
    getRefreshToken(): Promise<string>;
    _getRefreshToken(): Promise<string>;
    getAccessToken(): Promise<string>;
    get({ path, id, fields, }: {
        path: string;
        id: string;
        fields: ClioFields;
    }): Promise<{
        [key: string]: any;
    }>;
    gets({ path, fields }: {
        path: string;
        fields: ClioFields;
    }): Promise<{
        [key: string]: any;
    }>;
    create({ path, fields, data, }: {
        path: string;
        fields: ClioFields;
        data: {
            [key: string]: any;
        };
    }): Promise<{
        [key: string]: any;
    }>;
    update({ path, id, fields, etag, data, }: {
        path: string;
        id: string;
        fields?: ClioFields;
        etag: string;
        data: {
            [key: string]: any;
        };
    }): Promise<{
        [key: string]: any;
    }>;
    remove({ path, id }: {
        path: string;
        id: string;
    }): Promise<{
        [key: string]: any;
    }>;
    getEntity(type: string, id: string, fields?: ClioFields): Promise<ClioEntity>;
    withAccessToken(request: {
        [key: string]: any;
    }): Promise<{
        [key: string]: any;
    }>;
    getPage({ url, path, fields, ...args }: {
        url?: string;
        path?: string;
        fields?: ClioFields;
        args?: {
            [key: string]: any;
        };
    }): Promise<{
        page: any[];
        getNext: () => Promise<any>;
        getPrevious: () => Promise<any>;
    }>;
    map({ path, fields, isSequential, ...args }: {
        path: string;
        fields?: ClioFields;
        isSequential?: boolean;
        args?: {
            [key: string]: any;
        };
    }, f: (item: any) => any): Promise<any[]>;
    getAll({ path, fields, ...args }: {
        path: string;
        fields?: ClioFields;
        args?: {
            [key: string]: any;
        };
    }): Promise<any[]>;
    bulkGetFile({ path, fields, outPath, onProgress, }: {
        path: string;
        fields: ClioFields;
        outPath: string;
        onProgress?: ClioProgressFunction;
    }): Promise<void>;
    bulkGetObj({ path, fields, onProgress, outPath, }: {
        path: string;
        fields: ClioFields;
        onProgress?: ClioProgressFunction;
        outPath?: string;
    }): Promise<any>;
    mapEntities({ path, fields }: {
        path: string;
        fields: ClioFields;
    }, f: (item: any) => any): Promise<void>;
    mapEntities2({ path, fields, ...args }: {
        path: string;
        fields: ClioFields;
        args?: {
            [key: string]: any;
        };
    }, f: (item: any) => any): Promise<any[]>;
    getPageEntities({ url, path, fields, }: {
        url?: string;
        path?: string;
        fields?: ClioFields;
    }): Promise<{
        page: Promise<ClioEntity>[];
        raw: {
            [key: string]: any;
        }[];
        getNext: () => Promise<any>;
        getPrevious: () => Promise<any>;
    }>;
    withEntities({ page, getNext, getPrevious, path, fields, }: {
        page: {
            [key: string]: any;
        }[];
        getNext: () => Promise<any>;
        getPrevious: () => Promise<any>;
        path: string;
        fields: ClioFields;
    }): Promise<{
        page: Promise<ClioEntity>[];
        raw: {
            [key: string]: any;
        }[];
        getNext: () => Promise<any>;
        getPrevious: () => Promise<any>;
    }>;
    getUrl({ url, request, }: {
        url: string;
        request?: {
            [key: string]: any;
        };
    }): Promise<{
        [key: string]: any;
    }>;
    makeCustomAction({ label, targetUrl, uiReference, type, }: {
        label: string;
        targetUrl: string;
        uiReference?: string;
        type?: string;
    }): Promise<{
        id: any;
        etag: any;
        createdAt: any;
        updatedAt: any;
        label: any;
        targetUrl: any;
        uiReference: any;
    }>;
    makeWebHook({ url, fields, events, model, expires, }: {
        url: string;
        fields: ClioFields;
        events?: ClioEvent[];
        model: string;
        expires?: Date;
    }): Promise<any>;
    makeEntity({ type, id, fields, properties, }: {
        type: string;
        id: string;
        fields: ClioFields;
        properties: {
            [key: string]: any;
        };
    }): Promise<ClioEntity>;
    clear(path: string): Promise<void>;
}
declare class ClioEntity {
    protected clio: Clio;
    protected properties: {
        [key: string]: any;
    };
    protected type: string;
    protected id: string;
    protected etag: string;
    protected fields?: ClioFields;
    constructor(clio: Clio, { etag, id, properties, fields, type, }: {
        etag: string;
        id: string;
        properties: {
            [key: string]: any;
        };
        type: string;
        fields: ClioFields;
    });
    load(): Promise<this>;
    update(changes: {
        [key: string]: any;
    }): Promise<void>;
    delete(): Promise<{
        [key: string]: any;
    }>;
}
export { Clio, ClioEntity, getAccessToken, get, gets, create, update, authorize, remove, makeFields, deauthorize, makeWebHook, validateSignature, baseHost, };
