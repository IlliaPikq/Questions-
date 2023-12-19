import mysql from 'mysql';

export default class Database {

  constructor(host, user, password, db = '') {
    this.con = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: db
    })
  }

  connect() {
    this.con.connect(err => {
      if (err) {
        throw new Error('Connecting to database failed: ' + err.sqlMessage);
      }
    })
  }

  createDB(name) {
    this.con.query(`CREATE DATABASE IF NOT EXISTS ${name}`, (err) => {
      if (err) {
        throw new Error('Creating database failure:' + err.sqlMessage);
      }
    })
  }

  selectDB(name) {
    this.con.query(`use ${name}`, (err) => {
      if (err) {
        throw new Error('Could not select database:' + err.sqlMessage);
      }
    })
  }

  sendQuery(query, cb = undefined) {
    this.con.query(query, (err, rows) => {
      if (err) {
        throw new Error('Selected non existing database' + err.sqlMessage)
      }

      if (typeof cb === 'function') {
        cb(rows);
      } else throw new Error('Provided callback is not a function type')
    }) 
  }

  breakConnection() {
    this.con.end();
  }
}

// const db = new Database('localhost', 'root', '')
// db.connect()
// db.selectDB('test')
// db.sendQuery('select * from pytania', (rows) => console.log(rows))

