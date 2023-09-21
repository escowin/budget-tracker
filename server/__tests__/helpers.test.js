const { validate, format } = require("../utils/helpers")

test("test validation", () => {
    const arr = ["a", "b", "c"]
    const value = { a: "a", b: "z"}
    expect(validate.type(value.a, arr)).toBe(value.a)
    expect(validate.type(value.b, arr)).toBe(false)
})

test("returns YYYY-MM-DD hh:mm:ss a timestamp", () => {
    const date = new Date()
    const formattedDate = format.date(date)
    const regex = /^\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}:\d{2} [APap][Mm]$/;

    expect(regex.test(formattedDate)).toBe(true)
})