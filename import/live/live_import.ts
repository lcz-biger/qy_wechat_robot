import xlsx from 'node-xlsx';
import dayjs from 'dayjs';
import Database from '../../database/database';
const excelFile = xlsx.parse(`${__dirname}/直播排班表.xlsx`);
const excelData = excelFile[0].data.filter((i) => i.length);
excelData.splice(0, 3);

const pattern = /[\u4e00-\u9fa5]$/; // 匹配中文字符的正则表达式
const dayPattern = /^(?:[1-9]|1\d|2[0-9]|3[0-1])$/; // 匹配（1-31）
const datePattern = /^\d{4}-\d{2}-\d{2}$/; // 匹配 YYYY-MM-DD

let excelDataFilter = excelData.map((i) => [
  dayjs((i[0] - 25569) * 86400 * 1000).format('YYYY-MM-DD'),
  i[2],
]);

const importExcel: () => void = async () => {
  console.log(' --- 开始导入 --- ');
  const database = new Database();
  const dateQuery = `select date from live_copy order by id desc limit 1`;
  const result: any = await database.query(dateQuery);
  const lastDate = result[0]?.[0]?.date;
  if (lastDate) {
    excelDataFilter = excelDataFilter.filter(
      (i) => dayjs(i[0]) > dayjs(lastDate),
    );
  }
  for (const item of excelDataFilter) {
    const name = item[1];
    const date = item[0];
    const nameIdQuery = `select id from all_users where name = '${name}'`;
    const result: any = await database.query(nameIdQuery);
    const userId = result[0]?.[0]?.id;
    if (userId) {
      const insertQuery = `INSERT INTO live_copy (date, user_id) VALUES ( '${date}', ${userId})`;
      await database.query(insertQuery);
      console.log(`${date}, ${name}`);
    } else {
      console.log('导入数据有误～～');
      break;
    }
  }
  console.log(' --- 导入完成 --- ');
};

importExcel();
