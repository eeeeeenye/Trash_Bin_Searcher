const db = require("../db")
const database = db.db('inhye');
//재활용 쓰레기통 컬렉션
const collection = database.collection('super_bin');
//일반 쓰레기통 컬렉션 코드작성 필요

module.exports = {
    //쓰레기통 검색 코드

    // 지역별 선택 시 해당 지역 데이터 가져옴 (현재 super bin 만)
    ReagionControl: async (req, res) => {
        try {
            const { state, city, city2 } = req.body;
            if (!state || !city) {
                return res.status(400).json({ error: 'Invalid input data' });
            }
    
            // 서울시 데이터 조회
            const query: { region: any; city: any; city2?: any } = {
                region: state,
                city: city,
            };
    
            if (city2) {
                query.city2 = city2;
            }
    
            const result = await collection.find(query).toArray();
    
            // 결과를 클라이언트에 전송
            res.json(result);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).send('Internal Server Error');
        }
    }
    ,

    // 클라이언트를 통해서 내 위치 데이터(위도, 경도)를 가져옴
    MylocControl: async(req,res) => {
        try{
            const location = req.body.myLoc

            //mongoDB에서 사용자 위치 주변의 데이터를 쿼리
            const nearbyData = await collection
            .find({
                location: {
                    $near: {
                        $geometry:{
                            type: "Point",
                            coordinates: [location.longitude, location.latitude],
                        },
                        $maxDistance: 1000, // 1km 반경 내의 데이터 검색
                    },
                },
            })
            .toArray();

            res.json(nearbyData);
        }catch(error){
            console.error("Error: ",error)
            res.status(500).send("Internal Server Error")
        } 

    }
}