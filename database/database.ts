import mysql, { Connection } from 'mysql2/promise'

class Database {
  connection: Promise<Connection>
  constructor() {
    this.connection = mysql.createConnection({
      host: 'rm-bp1qi435nzp8scfidwo.mysql.rds.aliyuncs.com',
      user: 'duoke_oa',
      database: 'robot',
      password: '5mshx9jQBGwloAYz',
      dateStrings : true,
    })
  }
  // query查询
  async query(query: string) {
    return (await this.connection).query(query)
  }
}

export default Database