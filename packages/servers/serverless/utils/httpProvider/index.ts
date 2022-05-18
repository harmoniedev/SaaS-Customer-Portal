import fetch, { RequestInfo, RequestInit } from "node-fetch";

export class HttpProvider {
  async callApi<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(url, init);
    return (await response.json()) as TResponse;
  }

  async get<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi<TResponse>(url, {
      method: "GET",
      ...(init || {}),
    });
  }

  async put<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi<TResponse>(url, {
      method: "PUT",
      ...(init || {}),
    });
  }

  async post<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi<TResponse>(url, {
      method: "POST",
      ...(init || {}),
    });
  }

  async delete<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi<TResponse>(url, {
      method: "DELETE",
      ...(init || {}),
    });
  }
}
