var express = require('express');
var router = express.Router();

const AccountModel = require('../db/models/AccountModel');
const UserModel = require('../db/models/UserModel');
const checkAuth = require('../middleware/checkAuth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 登录页面
 */
router.get('/login', async function(req, res) {
  res.render('login', {title: '登录'})
})

/**
 * 登录接口
 */
router.post('/login', async function(req, res) {
  const { username, password } = req.body
  console.log(req.body);
  const ret = await UserModel.findOne({username, password})
  console.log(ret)
  if(ret) {
    req.session.username = ret.username
    req.session._id = ret._id
    res.render('msg', {title: '提示', msg: '登录成功', url: '/list'})
  } else {
    res.send('登录失败')
  }
})

/**
 * 注册页面
 */
router.get('/regist', function(req, res) {
  res.render('regist', {title: '注册'})
})

/**
 * 注册接口
 */
router.post('/regist', async function(req, res) {
  const body = req.body
  const ret = await UserModel.create(body)
  res.redirect('/login')
})

/**
 * 账单页面
 */

router.get('/list', checkAuth, async function(req, res) {
  const list = await AccountModel.find()
  console.log(list)
  res.render('list', {title: '账单列表', list})
})

/**
 * 添加账单页面
 */

router.get('/account',checkAuth, function(req, res) {
  res.render('account', {title: '添加账单'})
})

/**
 * 保存账单
 */

router.post('/account',checkAuth, async function(req, res) {
  const body = req.body
  const ret = await AccountModel.create(body)
  res.redirect('/list')
})

module.exports = router;
