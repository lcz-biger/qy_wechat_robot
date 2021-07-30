import axios from 'axios'
import dayjs from 'dayjs'
import Database from '../database/database'

const today = dayjs().format('YYYY-MM-DD')

const messagePush:() => void = async() => {
  const database = new Database()
  const query = `select * from cat where FROM_UNIXTIME(UNIX_TIMESTAMP(date), '%Y-%m-%d') = '${today}'`
  try {
    const result:any = await database.query(query) || [[{}]]
    const userId = result[0][0].user_id
    const breederQuery = `select * from users where id=${userId}`
    const breederResult:any = await database.query(breederQuery) || [[{}]]
    const breederUserId = breederResult[0][0].username
    const params = {
      msgtype: 'text',
      text: {
        content: `今日铲屎官【<@${breederUserId}>】 \n表格地址：https://doc.weixin.qq.com/txdoc/word?scode=AN8AYAcVAAYFhfENK0AFIALwYWAFY&docid=w2_ABgALgYWAFY0Pz0LadSQECXlthS4V&type=0`,
      }
    }
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=76fc80cd-9273-4232-8e11-44f6c0147342',params)
  } catch (e) {
    const params = {
      msgtype: 'text',
      text: {
        content: '今日推送有错误，建议查查数据库。【<@LiCiZhong>】',
      }
    }
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=76fc80cd-9273-4232-8e11-44f6c0147342',params)
  }
}

export const cat_breeder_main_handler = ()=>{
  return messagePush()
}