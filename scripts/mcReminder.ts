import axios from 'axios'
import dayjs from 'dayjs'
import Database from '../database/database'

const today = dayjs().format('YYYY-MM-DD')

const messagePush:() => void = async() => {
  const database = new Database()
  const query = `select * from mc where FROM_UNIXTIME(UNIX_TIMESTAMP(date), '%Y-%m-%d') = '${today}'`
  const result:any = await database.query(query)
  const headId = result[0][0].head_id
  const frontId = result[0][0].front_id
  const endId = result[0][0].end_id

  const headQuery = `select * from users where id=${headId}`
  const headResult:any = await database.query(headQuery) || [[{}]]
  const headUserId = headResult[0][0].username

  const frontQuery = `select * from users where id=${frontId}`
  const frontResult:any = await database.query(frontQuery) || [[{}]]
  const frontUserId = frontResult[0][0].username

  const endQuery = `select * from users where id=${endId}`
  const endResult:any = await database.query(endQuery) || [[{}]]
  const endUserId = endResult[0][0].username

  const dataSuccess = headUserId && frontUserId && endUserId
  const successText = `今日(${today})接口人【<@${headUserId}>】，前端负责人【<@${frontUserId}>】，后端负责人【<@${endUserId}>】`
  const errorText = '推送数据有误，请检查数据库【<@MaoKaiDi>】'

  const params = {
    msgtype: 'text',
    text: {
      content: dataSuccess ? successText : errorText,
    }
  }
  axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=ea37a767-7ce2-414b-8560-518a20f69262',params)
}

export const mc_reminder_main_handler = ()=>{
  return messagePush()
}