import axios from 'axios'
import dayjs from 'dayjs'
import { breeders, breederList } from '../data/breeder'


const today = dayjs().format('YYYY-MM-DD')
// 今日铲屎官
let breeder = (breederList.filter(i => i.time === today)[0] || {}).breeder
// 铲屎官userid
const breederUserId = (breeders.filter(i => i.name === breeder)[0] || {}).userid

const messagePush:() => void = () => {
  if (breederUserId) {
    const morningContent = `今日铲屎官【${breeder}】，别忘记记录猫咪排便情况哦~ \n表格地址：https://doc.weixin.qq.com/txdoc/word?scode=AN8AYAcVAAYFhfENK0AFIALwYWAFY&docid=w2_ABgALgYWAFY0Pz0LadSQECXlthS4V&type=0`
    const params = {
      msgtype: 'text',
      text: {
        content: morningContent,
        mentioned_list: [breederUserId]
      }
    }
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=76fc80cd-9273-4232-8e11-44f6c0147342',params)
  }
}

export const cat_breeder_main_handler = ()=>{
  return messagePush()
}