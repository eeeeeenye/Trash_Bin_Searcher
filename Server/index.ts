require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const app = express()
const cors = require('cors')
const path = require('path')
const env = require('dotenv')

const db = require('./db')

env.config({path: path.resolv(__dirname, './config/config.js')})

/* 포트설정 */
app.set('port',process.env.PORT||8080)

/* 공통 미들웨어 */
app.use(logger('dev'))
app.use(express.json())
app.use(
    cors({
        origin: ['http://localhost:19006']
    })
)



app.get('/', (req,res) => {
    res.status(200).send("접속완료되었습니다.")
})

/*라우터 코드 추가 */

/* 서버 포트 연결 */
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번에서 서버 실행 중...')
})