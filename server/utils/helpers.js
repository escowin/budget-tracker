const validate = {
    type: (value, options) => {
        const match = options.find(option => option === value)
        return match ? match : false
    }
}

const format = {
    date: (string) => {
        const date = string.toISOString().split("T")[0]
        const time = string.toLocaleTimeString()
        return `${date} ${time}`
    }
}

module.exports = { validate, format }