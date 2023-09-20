const validate = {
    type: (value, options) => {
        const match = options.find(option => option === value)
        return match ? match : false
    }
}

module.exports = { validate }