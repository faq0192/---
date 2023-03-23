module.exports = (success, error) => {
    if(!error) {
        error = () => {
            console.log('数据库连接失败')
        }
    }
    const mongoose = require('mongoose')
    const { dbhost, dbport, database } = require('../config/config')

    mongoose.connect(`mongodb://${dbhost}:${dbport}/${database}`)
    const conn = mongoose.connection

    conn.once('open', () => {
        console.log('数据库连接成功')
        success()
    })

    conn.on('error', () => {
        error()
    })
}