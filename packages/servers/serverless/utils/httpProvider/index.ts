import fetch, { RequestInfo, RequestInit } from "node-fetch";

export class HttpProvider {
  async callApi<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(url, init);
    let res: TResponse;
    console.log({ status: response.status });
    const bodyAsText = await response.text();
    if (bodyAsText) {
      try {
        res = JSON.parse(bodyAsText) as TResponse;
      } catch (error: any) {
        throw error;
      }
    }
    return res;
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
  async patch<TResponse>(
    url: RequestInfo,
    init?: RequestInit
  ): Promise<TResponse> {
    return await this.callApi<TResponse>(url, {
      method: "PATCH",
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
