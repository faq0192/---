module.exports = function (req, res, next) {
    if (!req.session.username) {
        // res.send('登录失效，请先登录！！')
        res.render('msg', { msg: '登录失效，请重新登录', url: '/login', title: '提示' })
        return
    }
    next()
}