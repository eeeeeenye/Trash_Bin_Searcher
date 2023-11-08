const db = require("../db.ts")

module.exports = {
    // 게시글 관리

    // 작성된 게시글 저장
    postingController: async (req, res) => {
        try {
          const data = req.body;
          const database = await db.run();
          let collection = database.collection("post");
      
          if (data.type === 'create') {
            const result = await collection.insertOne({
              img: data.img,
              address: data.address,
              add_address: data.add_address,
              location: {
                type: "Point",
                coordinates: [data.longitude, data.latitude],
              },
              date: data.date,
              options: data.options,
            });
      
            res.json({ message: 'create posting success' });
            // 데이터베이스에 데이터 저장
          } else if (data.type === 'delete') {
            const result = await collection.insertOne({
                title: data.title,
                address: data.address,
                date: data.date,
                content: data.options,
              });
        
              res.json({ message: 'delete posting success' });
          } else {
            // 다른 유형의 작업을 처리하는 코드 추가
            console.error("Error: There is no type in database.");
          }
        } catch (error) {
          console.error("Error: ", error);
          res.status(500).json({ error: 'Internal Server Error' });
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

    postReadController: async (req, res) => {
        try {
            const database = await db.run();
            const post_collec = database.collection('post');
    
            // 클라이언트로부터 받은 지역 정보 (예: "서울", "부산", 등)
            const region = req.body.region;
    
            const postData = await post_collec
                .find({
                    add_address: region, // 여기에 지역 정보를 검색 조건으로 사용
                })
                .toArray();
    
            res.json(postData); // 조회된 데이터를 클라이언트에 JSON 형식으로 응답
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
};