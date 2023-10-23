const db = require("../db.ts")

module.exports = {
    // 게시글 관리

    // 작성된 게시글 저장
    postingController: async(req, res)=>{
        try{
            const {address, add_address, latitude, longitude, date, options} = req.body
            const database = await db.run();
            const collection = database.collection("post")

            const result = await collection.insertOne({
                address,
                add_address,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                date,
                options
            })

            res.json({message: 'posting success'})
            // db에 데이터 저장
        }catch(error){
            console.error("Error: ",error)
            res.status(500).json({error: 'Internal Server Error'})
        }
    },

    // 작성된 게시글 삭제
    postdelController: async(req, res) =>{
        try{

        }catch(error){

        }
    },

    // 작성된 게시글 읽기
    postReadController: async(req, res) =>{
        try{
            const database = await run();

        }catch(error){

        }
    }
}