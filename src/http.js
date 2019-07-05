import axios from 'axios'
export const path = 'http://localhost:3000/'
export const sPath = 'http://localhost:3001'
// 获取轮播图方法
// type为firstChannel 和secondChannel
export const getBannerList = function getBannerList(type, channelId) {
  return axios.get('/api/web/getBannerList', {
    params: {
      [type]: channelId
    }
  })
}
// 获取热点咨询文章
export const getHotArticleList = function getHotArticleList() {
  return axios.get('/api/web/hotArticleList')
}

// 获取热点咨询标签
export const getHotTagList = function getHotTagList() {
  return axios.get('/api/web/getHotTagList')
}
// 获取首页今日车闻模块随机列表
export const getIndexNewsArticleList = function getIndexNewsArticleList() {
  return axios.get('/api/web/getIndexNewsArticleList')
}
//获取首页各个板块的热点文章
// 2今日车闻
// 3 新能源
// 4视频
export const getIndexChannelArticleList = function getIndexChannelArticleList(
  channelId,
  limit = 3
) {
  return axios.get('/api/web/channelHotArticleList', {
    params: { channelId, limit }
  })
}
// 获取各个模块的文章
export const getChannelArticleList = function getChannelArticleList(
  channelId,
  page
) {
  return axios.get('/api/web/getChannelArticleList', {
    params: { channelId, page }
  })
}
// 获取各个板块的tag
export const getChannelTag = function getChannelTag(channelId) {
  return axios.get('/api/web/getChannelTag', { params: { channelId } })
}
//获取文章的详细信息
export const getArticleDetail = function getArticleDetail(id) {
  return axios.get('/api/web/getArticleDetail', { params: { id } })
}

//注册前端用户
export const userRegister = function userRegister(obj) {
  return axios.post('/api/web/userRegister', obj)
}
// 前端用户登陆
export const userLogin = function userRegister(obj) {
  return axios.post('/api/web/userLogin', obj)
}
// 公共头部方法，获取用户头像和昵称
export const getUserMsg = function getUserMsg(authorId) {
  return axios.post('/api/web/getUserMsg', { authorId })
}
// 获取用户详细信息
export const getUserDetailMsg = function getUserDetailMsg(authorId) {
  return axios.get('/api/web/getUserDetailMsg', { params: { authorId } })
}
// 前台新增文章
export const addNewArticle = function addNewArticle(articleObj) {
  return axios.post('/api/web/addArticle', articleObj)
}
// 获取前台用户文章
export const getAuthorArticle = function getAuthorArticle(authorId, page) {
  return axios.get('/api/web/articleList', { params: { authorId, page } })
}
// 获取兴趣部落频道分类
export const getHobbiesChannel = function getHobbiesChannel() {
  return axios.get('/api/web/getHobbiesChannel')
}
// 关注或者取消关注
export const focusBloger = function focusBloger(obj) {
  return axios.post('/api/web/focusBloger', { params: obj })
}
// 兴趣部落页面最新或最热的文章
export const getHotOrLatesHobbiesArticleList = function(isHot, page) {
  return axios.get('/api/web/hobbiesHotOrLatesArticleList', {
    params: { isHot, page }
  })
}
// 获取兴趣部落页面热门博主
export const getHotBlogerList = function() {
  return axios.get('/api/web/hotBloger')
}
// 获取热门博主页面的热门博主

export const getHotBloger = function(page) {
  return axios.get('/api/web/hotBlogerAndArticle', { params: { page } })
}
// 获取当前博主点击量最高的文章

export const getBlogerHotArticle = function(authorId) {
  return axios.get('/api/web/hotBlogerArticle', { params: { authorId } })
}
// 获取查看博主的文章

export const getBlogerArticleList = function(authorId, page) {
  return axios.get('/api/web/getBlogerArticleList', {
    params: { authorId, page }
  })
}
//评论
export const publishArticleComment = function(_id, authorId, comment) {
  return axios.post('/api/web/publishArticleComment', {
    _id,
    authorId,
    comment
  })
}
// 获取评论区作者信息
export const getCommentAuthorMsg = function(authorId) {
  return axios.post('/api/web/commentAuthorMsg', {
    authorId
  })
}
//查询获取博主粉丝
export const getBlogerFans = function(authorId, searchContent) {
  return axios.post('/api/web/getBlogerFans', { authorId, searchContent })
}

// 获取博主关注者
//查询获取博主粉丝
export const getBlogerFocus = function(authorId, searchContent) {
  return axios.post('/api/web/getBlogerFocus', { authorId, searchContent })
}
//更新用户信息
export const updateUserMsg = function(authorId, author, detailMessage) {
  return axios.post('/api/web/updatePersonMsg', {
    authorId,
    author,
    detailMessage
  })
}
//更新用户密码
export const changeUserPassword = function(authorId, password, newPassword) {
  return axios.post('/api/web/changeUserPassword', {
    authorId,
    password,
    newPassword
  })
}
//更新用户密保
export const changeSecretProtection = function(
  authorId,
  oldAnswer,
  newQuestion,
  newAnswer
) {
  return axios.post('/api/web/changeSecretProtection', {
    authorId,
    oldAnswer,
    newQuestion,
    newAnswer
  })
}

//匹配账号，获取账号密保
export const findUserMsg = function(account) {
  return axios.post('/api/web/findUserMsg', {
    account
  })
}

//通过密保问题重置用户密码
export const restUserPassword = function(authorId, answer, password) {
  return axios.post('/api/web/restUserPassword', { authorId, answer, password })
}
//查找文章
export const searchArticle = function(searchContent, page = 1, limit = 10) {
  return axios.get('/api/web/search', {
    params: { searchContent, page, limit }
  })
}
//取博主最热的八篇文章
export const getBlogerHotestArticleList = function(authorId) {
  return axios.post('/api/web/getBlogerHotestArticle', { authorId })
}
//取博主八篇文章
export const getBlogerSimilarArticle = function(authorId) {
  return axios.post('/api/web/getBlogerSimilarArticle', { authorId })
}
//随机八篇文章
export const getRandomArticle = function() {
  return axios.get('/api/web/getRandomArticle')
}

//获取专栏列表
export const getColumnList = function(channelId) {
  return axios.post('/api/web/getColumnList', { channelId })
}
