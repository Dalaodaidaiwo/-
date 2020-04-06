// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIc_CURRENT_ENV
})
const db = cloud.database()

const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  await db.collection('card-items').where({
      _openid: wxContext.OPENID
  })
  .update({
    data: {
      cellphone: "",
      companyName: "",
      nickName: "",
      realName: "",
      title: "",
      avatar: ""
    },
    })

    await  db.collection('card-details').where({
       _openid: wxContext.OPENID
    })
      .update({
        data: {
          hometown: "",
          richDetails: "",
          school: "",
          speciality: "",
        },
      })

    await db.collection('chatroom').where({
       _openid: wxContext.OPENID
    })
    .remove()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}