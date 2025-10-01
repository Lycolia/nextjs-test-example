import { combineHeaders, combineUrlParams } from './util';

type AppResponse<T> = Promise<
  Response & {
    json: () => Promise<T>;
  }
>;

export class HttpClient {
  private _baseUrl: string;
  private _baseHeaders: { [key: string]: string };

  constructor(baseUrl: string, baseHeaders: { [key: string]: string }) {
    this._baseUrl = baseUrl;
    this._baseHeaders = baseHeaders;
  }

  private combineHeaders(additionalHeaders?: { [key: string]: string }) {
    if (additionalHeaders === undefined) {
      return this._baseHeaders;
    } else {
      return combineHeaders(additionalHeaders, this._baseHeaders);
    }
  }

  private combineUrlParams(
    endpoint: string,
    params?: { [key: string]: string }
  ) {
    return combineUrlParams(this._baseUrl, endpoint, params);
  }

  public async get<RespT>(
    endpoint: string,
    params?: { [key: string]: string },
    additionalHeaders?: { [key: string]: string }
  ): AppResponse<RespT> {
    const url = this.combineUrlParams(endpoint, params);
    const headers = this.combineHeaders(additionalHeaders);
    const resp = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    return {
      ...resp,
      json() {
        return resp.json();
      }
    };
  }
}
