const db = require("../db.ts")

module.exports = {
    // 게시글 관리

    // 작성된 게시글 저장
    postingController: async(req, res)=>{
        try{
            const {address, add_address, latitude, longitude, date, options,type} = req.body
            const database = await db.run();
            let collection = database.collection("post")

            //type에 따라서 게시글을 따로 저장
            if(type === 'delete'){
                collection = database.collection("post_delete")
            }

            const result = await collection.insertOne({
                address,
                add_address,
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                date,
                options,
            })

            res.json({message: 'posting success'})
            // db에 데이터 저장
        }catch(error){
            console.error("Error: ",error)
            res.status(500).json({error: 'Internal Server Error'})
        }
    },

    // 작성된 게시글 삭제
    postdelController: async (req, res) => {
        try {
            const postId = req.params.postId; // 게시글 ID를 요청에서 가져옴

            if (!postId) {
                return res.status(400).json({ error: '게시글 ID가 필요합니다' });
            }

            const database = await db.run();
            const collection = database.collection("post");

        // 게시글 ID를 사용하여 해당 게시글을 삭제
            const result = await collection.deleteOne({ _id: ObjectId(postId) });

            if (result.deletedCount === 1) {
                res.json({ message: '게시글 삭제 성공' });
            } else {
                res.status(404).json({ error: '게시글을 찾을 수 없습니다' });
            }
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ error: '내부 서버 오류' });
        }
    },

    // 작성된 게시글 읽기
    postReadController: async(req, res) =>{
        try{
            const database = await run();
            const city = req.body;
            const post_collec = database.collection('post')

            const postData = await post_collec
            .find({
                
            })

        }catch(error){

        }
    }
}