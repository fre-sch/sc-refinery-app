import { urlJoin, usvEncode } from "./util"
import constants from "./constants"

const logFailedRequest = value => {
  console.log("unhandled failed request", value)
}

export class ApiRequest {
  constructor(method, baseUrl, headers = {}, options = {}, onRequestFailed=null) {
    this.body = null
    this.params = {
      mode: "cors",
      credentials: "include",
      method,
      baseUrl,
      url: null,
      query: null,
    }
    this.headers = new Headers(headers)
    this.options = options
    this.onRequestFailed = onRequestFailed
  }

  param (prop, value) {
    if (value === undefined) return this.params[prop]
    this.params[prop] = value
    return this
  }

  method = (method) => this.param("method", method)

  url = (url) => this.param("url", url)

  query = (query) => this.param("query", query)

  baseUrl = (url) => this.param("baseUrl", url)

  header = (key, value) => {
    this.headers.set(key, value)
    return this
  }

  option = (key, value) => { this.options[key] = value; return this }

  json = (value) => {
    this.headers.set("Content-Type", "application/json")
    this.body = JSON.stringify(value)
    return this
  }

  makeRequest () {
    const { baseUrl, url, query, ...params } = this.params
    const requestUrl = urlJoin(baseUrl, ...url);
    return new Request(
      requestUrl + usvEncode(query),
      {
        headers: this.headers,
        body: this.body,
        ...params,
        ...this.options
      }
    )
  }

  get = (...url) => this.url(url).method("GET")
  post = (...url) => this.url(url).method("POST")
  put = (...url) => this.url(url).method("PUT")
  patch = (...url) => this.url(url).method("PATCH")
  delete = (...url) => this.url(url).method("DELETE")

  fetch = () => {
    const req = this.makeRequest()
    return fetch(req)
      .then(response =>
        (response.ok && response.status >= 200 && response.status < 400)
          ? Promise.resolve(new ApiRequestContext(response, this))
          : Promise.reject(new ApiRequestContext(response, this))
      )
      .catch(value => {
        this.onRequestFailed
          ? this.onRequestFailed(value)
          : logFailedRequest(value)
        return Promise.reject(value)
      })
  }
}

class ApiRequestContext {
  constructor(response, request) {
    this.request = request
    this.response = response
  }

  json = () =>
    this.response.json()
      .then(json => {
        this.json = json
        return Promise.resolve(this)
      })
}


export default class ApiConnector {
  constructor(
    defaultHeaders = {},
    defaultOptions = {},
    onRequestFailed = null
  ) {
    this.defaultHeaders = new Headers(defaultHeaders)
    this.defaultOptions = defaultOptions
    this.onRequestFailed = onRequestFailed
  }

  setDefaultHeader(headerName, value) {
    this.defaultHeaders.set(headerName, value)
    return this
  }

  request = (method, baseUrl, url, options) => {
    const r = new ApiRequest(
      method,
      baseUrl,
      this.defaultHeaders,
      { ...this.defaultOptions, ...options },
      this.onRequestFailed
    )
    return r.url(url)
  }

  api = (options = {}) =>
    new ApiRequest(
      null,
      constants.APIURL,
      this.defaultHeaders,
      { ...this.defaultOptions, ...options },
      this.onRequestFailed
    )
}
