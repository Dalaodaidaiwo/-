// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'first-test-yo193',
  traceUser: true
})
const db = cloud.database()

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const {
    OPENID
  } = cloud.getWXContext()
const{week,status,number}=event
//console.log(event)
if(week=='周一'){
  await db.collection('num').where({
    name: db.RegExp({
      regexp: status,
      options: 's',
    })
  }).update({
      data: {
        'data.0':parseInt(number),
        
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
  else if(week=='周二'){
    await db.collection('num').where({
      name: db.RegExp({
        regexp: status,
        options: 's',
      })
    }).update({
        data: {
          'data.1':parseInt(number),
          
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
  else if(week=='周三'){
    await db.collection('num').where({
      name: db.RegExp({
        regexp: status,
        options: 's',
      })
    }).update({
        data: {
          'data.2':parseInt(number),
          
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    }
    else if(week=='周四'){
      await db.collection('num').where({
        name: db.RegExp({
          regexp: status,
          options: 's',
        })
      }).update({
          data: {
            'data.3':parseInt(number),
            
          },
          success: function (res) {
            console.log(res.data)
          }
        })
      }
      else if(week=='周五'){
        await db.collection('num').where({
          name: db.RegExp({
            regexp: status,
            options: 's',
          })
        }).update({
            data: {
              'data.4':parseInt(number),
              
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        }
        else if(week=='周六'){
          await db.collection('num').where({
            name: db.RegExp({
              regexp: status,
              options: 's',
            })
          }).update({
              data: {
                'data.5':parseInt(number),
                
              },
              success: function (res) {
                console.log(res.data)
              }
            })
          }
          else if(week=='周日'){
            await db.collection('num').where({
              name: db.RegExp({
                regexp: status,
                options: 's',
              })
            }).update({
                data: {
                  'data.6':parseInt(number),
                  
                },
                success: function (res) {
                  console.log(res.data)
                }
              })
            }
  return event
}