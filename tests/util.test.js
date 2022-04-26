import { usvEncode, trimEnd, trimStart, urlJoin } from "../src/util"

describe("util.usvEncode", () => {
  it("should encode object to USVSearchParams", () => {
    const params = {
      filter: "name:foo",
      limit: -1,
      sort: "name:asc"
    }
    const usv = usvEncode(params)
    expect(usv.get("filter")).toBe("name:foo")
    expect(usv.get("limit")).toBe("-1")
    expect(usv.get("sort")).toBe("name:asc")
    expect(usv.toString()).toBe("?filter=name%3Afoo&limit=-1&sort=name%3Aasc")
  })

  it("should encode undefined to USVSearchParams", () => {
    const h = {}
    const usv = usvEncode(h.undef)
    expect(usv).toBeInstanceOf(URLSearchParams)
    expect(usv.toString()).toBe("")
  })

  it("should encode null to USVSearchParams", () => {
    const usv = usvEncode(null)
    expect(usv).toBeInstanceOf(URLSearchParams)
    expect(usv.toString()).toBe("")
  })
})

describe("util.trimEnd", () => {
  it("should trim trailing whitespace", () => {
    expect(trimEnd("foo\n\t\r ")).toBe("foo")
  })

  it("should trim trailing characters", () => {
    expect(trimEnd("foo/", "/")).toBe("foo")
    expect(trimEnd("foo//", "/")).toBe("foo")
  })
})

describe("util.trimStart", () => {
  it("should trim leading whitespace", () => {
    expect(trimStart("\n\t\r foo")).toBe("foo")
  })

  it("should trim leading characters", () => {
    expect(trimStart("/foo", "/")).toBe("foo")
    expect(trimStart("//foo", "/")).toBe("foo")
  })
})

describe("util.urlJoin", () => {
  it("should join strings", () => {
    expect(urlJoin("foo", "bar")).toBe("foo/bar")
    expect(urlJoin("foo", "bar", "wusch")).toBe("foo/bar/wusch")
    expect(urlJoin("foo", "bar", 0, "wusch", -1)).toBe("foo/bar/0/wusch/-1")
  })

  it("should join strings with slashes", () => {
    expect(urlJoin("foo", "/bar")).toBe("foo/bar")
    expect(urlJoin("foo/", "/bar")).toBe("foo/bar")
    expect(urlJoin("foo/", "/bar/")).toBe("foo/bar/")
  })

  it("should collapse slashes", () => {
    expect(urlJoin("foo/", "/bar/", "/wusch/")).toBe("foo/bar/wusch/")
  })

  it("should trim leading slashes", () => {
    expect(urlJoin("http://base/", "/foo")).toBe("http://base/foo")
  })

  it("should use toString on items", () => {
    expect(urlJoin("foo", { toString: () => "bar" })).toBe("foo/bar")
  })

  it("should join baseURl with protocol", () => {
    expect(urlJoin("https://base/foo", "bar", "baz")).toBe("https://base/foo/bar/baz")
  })
})
