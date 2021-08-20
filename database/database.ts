import mysql, { Connection } from 'mysql2/promise'

class Database {
  connection: Promise<Connection>
  constructor() {
    this.connection = mysql.createConnection({
      host: 'rm-bp11yor291pf2of1duo.mysql.rds.aliyuncs.com',
      user: 'robot',
      database: 'robot',
      password: 'sCnCi7Ym9cM2RpLq',
      dateStrings : true,
    })
  }
  // query查询
  async query(query: string) {
    return (await this.connection).query(query)
  }
}

export default Database