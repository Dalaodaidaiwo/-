// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// const db = cloud.database();
// const _ = db.command;

exports.main = async (event, context) => {
return {
  sum:event.a + event.b
}
  // console.log("CLOUD F IS HERE ");
  // console.log(event);
  // console.log(context);
  // const wxContext = cloud.getWXContext()
  // try{
  //   return await db.collection('card-items').where({
  //     _openid :"otx5I40yTROQ4qyigk0Dg9l6pryQ"
  //   }).remove()
  //   }
  //   catch(e){
  //       console.error(e);
  // }
  // console.log("Delete DB OK");
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

