import fetch, { RequestInfo, RequestInit } from "node-fetch";

export class HttpProvider {
  async callApi<TRequest, TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(url, init);
    return (await response.json()) as TResponse;
  }
  async get<TRequest, TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi(url, { method: "GET", ...(init || {}) });
  }
  async put<TRequest, TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi(url, { method: "PUT", ...(init || {}) });
  }
  async post<TRequest, TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi(url, { method: "POST", ...(init || {}) });
  }
  async delete<TRequest, TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi(url, { method: "DELETE", ...(init || {}) });
  }
}
