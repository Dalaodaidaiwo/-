// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIc_CURRENT_ENV
})
const db = cloud.database()

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let tmp = "fromUser.openid"
  let s="openid"
   const wxContext = cloud.getWXContext()
    await db.collection('doctors').where({
     duration:"300"
    })
      .update({
        data: {
          [tmp]:wxContext.OPENID
        },
      })
 
  await db.collection('actions').where({
    duration:"300"
  })
    .update({
      data: {
        [tmp]: wxContext.OPENID
      },
    })

  // await db.collection('world').where({
  //   flag:"1"
  // })
  // .update({
  //     data: {
  //       [s]: wxContext.OPENID
  //     },
  //   })
  //   console.log("Update");
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}