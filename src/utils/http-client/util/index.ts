import { HTTP_METHOD } from '../HTTP_METHOD';

export const combineUrlParams = (
  baseUrl: string,
  endpoint: string,
  urlParams?: { [key: string]: string }
) => {
  const url = new URL(endpoint, baseUrl);
  if (urlParams === undefined) {
    return url;
  } else {
    const param = new URLSearchParams(urlParams);
    return new URL(`${url}?${param}`);
  }
};

export const combineHeaders = (
  header1: { [key: string]: string },
  header2: { [key: string]: string }
) => {
  return { ...header1, ...header2 };
};

export const createHttpRequest = (
  method: HTTP_METHOD,
  url: URL,
  payload?: { [key: string]: string }
) => {
  if (payload === undefined) {
    return new Request(url, {
      method: method
    });
  } else {
    return new Request(url, {
      method: method,
      body: JSON.stringify(payload)
    });
  }
};
