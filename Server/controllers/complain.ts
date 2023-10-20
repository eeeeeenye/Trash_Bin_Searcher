const db = require('../db')
const path = require('path')

const database = db.db('inhye')

module.exports = {
    // 민원 게시글 관리 컨트롤러
    
    // 민원 게시글 읽기 -> 시별 민원 게시글 확인
    complainRead: async(req,res) => {
        try{
            const city = req.body.city;

        }catch(error){

        }
    },

    // 민원 게시글 해결 시 게시글 삭제
    complainRead: async(req,res) => {
        try{
        }catch(error){

        }
    }
}
