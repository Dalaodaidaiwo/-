// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    OPENID
  } = cloud.getWXContext()
  const{nickName,cellphone,companyName,title,hometown,speciality,school,openid}=event
  await db.collection('card-items').where({
    _openid:openid 
  }).update({
    data: {
      nickName: nickName,
        cellphone: cellphone,
        companyName: companyName,
        title: title,
        realName: nickName,
    }
  })
  await db.collection('card-details').where({
    _openid:openid 
  }).update({
    data: {
      hometown: hometown,
        speciality: speciality,
        school: school,       
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}