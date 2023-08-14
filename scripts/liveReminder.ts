import axios from 'axios'
import dayjs from 'dayjs'
import Database from '../database/database'

const today = dayjs().format('YYYY-MM-DD')

const messagePush: () => void = async () => {
  try {
    const database = new Database()
    const query = `select * from live where FROM_UNIXTIME(UNIX_TIMESTAMP(date), '%Y-%m-%d') >= '${today}' order by date limit 2`
    const result: any = await database.query(query) || [[{}]]
    const day = result[0][0].date
    if (day !== today) {
      return
    }
    const userId = result[0][0].user_id
    const liveQuery = `select * from all_users where id=${userId}`
    const liveResult: any = await database.query(liveQuery) || [[{}]]
    const liveUserId = liveResult[0][0].uuid

    const nextUserId = result[0][1].user_id
    const nextDate = result[0][1].date
    const nextLiveQuery = `select * from all_users where id=${nextUserId}`
    const nextLiveResult: any = await database.query(nextLiveQuery) || [[{}]]
    const nextLiveUserId = nextLiveResult[0][0].uuid
    const params = {
      msgtype: 'text',
      text: {
        content: `今天的主播是【<@${liveUserId}>】，请告知主题。\n下一场的主播【<@${nextLiveUserId}>】，直播时间为 ${nextDate} ，请做好准备。`,
      }
    }
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=4530800e-1d69-43b2-b2e5-edbbe2245fe5', params)
  } catch (e) {
    throw e
  }
}
export const live_reminder_main_handler = () => {
  return messagePush()
}
