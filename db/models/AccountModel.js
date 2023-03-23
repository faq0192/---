const mongoose = require('mongoose')

const model = mongoose.model('acount', {
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date()
    },
    type: {
        type: Number,
        enum: [1, -1]
    },
    price: {
        type: Number
    },
    remark: {
        type: String
    }
})

module.exports = model