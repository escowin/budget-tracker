const { validate } = require("../utils/helpers")

test("test validation", () => {
    const arr = ["a", "b", "c"]
    const value = { a: "a", b: "z"}
    expect(validate.type(value.a, arr)).toBe(value.a)
    expect(validate.type(value.b, arr)).toBe(false)
})