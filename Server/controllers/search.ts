const db = require("../db")

module.exports = {
    //쓰레기통 검색 코드

    // 지역별 선택 시 해당 지역 데이터 가져옴
    ReagionControl: async(req,res) =>{
        const region = [req.state,req.city,req.city2]
    },

    MylocControl: async(req,res) => {

    }
}