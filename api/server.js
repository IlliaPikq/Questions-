import cors from 'cors'
import express from 'express'
import Database from '../db/db.js'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    const db = new Database('localhost', 'root', '')
    db.connect()
    db.selectDB('test')
    db.sendQuery('select id from pytania', (rows) => res.json(rows))
})

app.get('/all', (req, res) => {
    const db = new Database('localhost', 'root', '')
    db.connect()
    db.selectDB('test')
    db.sendQuery('select * from pytania', (rows) => res.json(rows))
})

app.get('/:id', (req, res) => {
    let pytanie_id = req.params.id
    const db = new Database('localhost', 'root', '')
    db.connect()
    db.selectDB('test')
    db.sendQuery('select * from pytania where pytania.id = ' + pytanie_id, (rows) => res.json(rows[0]))
})

app.listen(3000, () => console.log('Server is running on locahost:3000'))