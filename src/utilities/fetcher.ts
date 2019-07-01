/**
 * @See https://github.com/sw-yx/fresh-concurrent-react/blob/master/apis/react-cache.md
 */
import { unstable_createResource as createResource } from 'react-cache';

import { getToken } from '../layouts/MenuContext';

// fetcher
export type IRecord = Readonly<{ ID: string }> & Partial<any>;

export const FETCHER_ERROR = '9999'; // @TODO

export type ICollectionResp = Readonly<{
    data: IRecord[];
    status: string;
    total: number;
}>;

export type IRecordResp = Readonly<{
    data: IRecord;
    status: string;
    total: number;
}>;

export type IMutationResp = Readonly<{
    status: string;
    total: number;
}>;

export type IResp = ICollectionResp | IRecordResp;

export type IResources = Readonly<{
    getOption: any;
    getCollection: any;
    getRecord: any;
}>;

export type IGetResources = (baseUrl: string) => IResources;

const headers = {
    'content-type': 'application/json',
    Authorization: `Bearer`
};

const defaultServer = `${
    window.location.protocol
    }//${window.location.host.slice(0, -1)}`;

export const getManagerServer = (url: string): string => {
    if (process.env.NODE_ENV === 'development') {
        return process.env.REACT_APP_MANAGE
            ? `http://${process.env.REACT_APP_MANAGE}/manage${url}`
            : `${defaultServer}1/manage${url}`;
    }
    return `/manage${url}`;
};

export const httpGet = async (url: string): Promise<IResp> => {
    // console.log( getToken());
    try {
        const resp = await fetch(getManagerServer(url), {
            headers: { ...headers, Authorization: getToken() }
        });
        return IsError(resp);
        // return await resp.json();
    } catch (ex) {
        return buildFetchErrorResp();
    }
};

export const httpPut = async (
    url: string,
    body: object
): Promise<IMutationResp> => {
    try {
        const resp = await fetch(getManagerServer(url), {
            method: 'PUT',
            mode: 'cors',
            headers: { ...headers, Authorization: getToken() },
            body: JSON.stringify(body)
        });
        return IsError(resp);
        // return await resp.json();
    } catch (ex) {
        return buildFetchErrorResp();
    }
};

export const httpPost = async (
    url: string,
    body: object
): Promise<IMutationResp> => {
    try {
        const posturl = url.indexOf('168.1.168') > 0 ? url : getManagerServer(url);
        const resp = await fetch(posturl, {
            method: 'POST',
            mode: 'cors',
            headers: { ...headers, Authorization: getToken() },
            body: JSON.stringify(body)
        });
        return IsError(resp);
        // return await resp.json();
    } catch (ex) {
        return buildFetchErrorResp();
    }
};

export const httpDelete = async (url: string, body?: object): Promise<IMutationResp> => {
    try {
        const resp = await fetch(getManagerServer(url), {
            method: 'DELETE',
            mode: 'cors',
            headers: { ...headers, Authorization: getToken() },
            body: JSON.stringify(body)
        });
        // return await resp.json();
        return IsError(resp);
    } catch (ex) {
        return buildFetchErrorResp();
    }
};

export const getResources: IGetResources = baseUrl => ({
    getOption: createResource<string, IResp>(async (key = '') =>
        httpGet(`${baseUrl}`)
    ),
    getCollection: createResource<string, IResp>(async (key = '') => {
        const queryStr = key.slice(key.indexOf('?re='));
        return httpGet(`${baseUrl}${queryStr}`);
    }
    ),
    getRecord: createResource<string, IResp>(async (id: string) =>
        httpGet(`${baseUrl}/${id}`)
    )
});

const buildFetchErrorResp = (): IRecordResp => ({
    data: { ID: '' },
    status: FETCHER_ERROR,
    total: 0
});

const IsError = async resp => {
    let thisData = await resp.json();
    if (thisData.RetCode === 401) {
        sessionStorage.overtime = true;
        window.location.href = '/login';
        return buildFetchErrorResp();
    } else {
        return thisData;
    }
};
