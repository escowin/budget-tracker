const { validate, format } = require("../utils/helpers")

test("test validation", () => {
    const arr = ["a", "b", "c"]
    const value = { a: "a", b: "z"}
    expect(validate.type(value.a, arr)).toBe(value.a)
    expect(validate.type(value.b, arr)).toBe(false)
})

test("returns YYYY-MM-DD hh:mm a timestamp", () => {
    const date = new Date()
    expect(format.date(date)).toEqual(expect.any(String))
})