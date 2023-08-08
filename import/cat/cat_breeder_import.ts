import xlsx from 'node-xlsx'
import dayjs from 'dayjs'
import Database from '../../database/database'
const excelFile = xlsx.parse(`${__dirname}/8月铲屎表.numbers`);
const excelData = excelFile[0].data;

const pattern = /[\u4e00-\u9fa5]$/; // 匹配中文字符的正则表达式
const dayPattern = /^(?:[1-9]|1\d|2[0-9]|3[0-1])$/; // 匹配（1-31）
const datePattern = /^\d{4}-\d{2}-\d{2}$/; // 匹配 YYYY-MM-DD

const excelDataFilter = excelData
  .filter((i) => i.some((element) => pattern.test(element)))
  .filter((i) => i.some((element) => dayPattern.test(element)))
  .map((i) => {
    const arr = i.filter(item => pattern.test(item) || dayPattern.test(item))
    const year = dayjs().year()
    const month = dayjs().month() + 1
    return arr.map(arrItem => dayPattern.test(arrItem) ? dayjs(`${year}-${month}-${arrItem}`).format('YYYY-MM-DD') : arrItem)
  })

const importExcel: () => void = async () => {
  console.log(' --- 开始导入 --- ')
  const database = new Database()
  for (const item of  excelDataFilter) {
    const name = item.find(i => pattern.test(i))
    const date = item.find(i => datePattern.test(i))
    const nameIdQuery = `select id from users where name = '${name}'`
    const result: any = await database.query(nameIdQuery)
    const userId = result[0]?.[0]?.id
    if (userId) {
      const insertQuery = `INSERT INTO cat_test (date, user_id) VALUES ( '${date}', ${userId})`
      await database.query(insertQuery)
      console.log(`${date}, ${name}`)
    } else {
      break
    }

  }
  console.log(' --- 导入完成 --- ')
}

importExcel()

