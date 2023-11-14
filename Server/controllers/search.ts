const db = require("../db.ts");

module.exports = {
    // 쓰레기통 검색 코드

    // 지역별 선택 시 해당 지역 데이터 가져옴
    regionControl: async (req, res) => {
        try {
            const { state, city, city2 } = req.body;
            if (!state || !city) {
                return res.status(400).json({ error: 'Invalid input data' });
            }
    
            const database = await db.run();
            const superbin = database.collection('super_bin');
            const seoulTrashbin = database.collection('Seoul_trashbin'); // 변경된 변수명
    
            const query = {
                region_1: state,
                address: city,
            };
    
            // city2가 존재하면 query2에 추가
            const query2 = {};

            if (city2) {
                query2.city2 = city2;
            }
    
            const result1 = await superbin.find(query).toArray(); // super_bin 컬렉션에서 데이터 조회
            const result2 = await seoulTrashbin.find(query2).toArray(); // Seoul_trashbin 컬렉션에서 데이터 조회
    
            res.json({ super_bin: result1, Seoul_trashbin: result2 }); // 두 컬렉션의 결과를 하나의 JSON으로 응답
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // 클라이언트를 통해서 내 위치 데이터(위도, 경도)를 가져옴
    // seoul trash 도 추가해야 함
    myLocControl: async (req, res) => {
        try {
            const myLoc = req.body;
            const { longitude, latitude } = myLoc;

            const database = await db.run();
            const collection = database.collection('super_bin');

            const nearbyData = await collection
                .find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            $maxDistance: 1000, // 1km 반경 내의 데이터 검색
                        },
                    },
                })
                .toArray();

            res.json(nearbyData);
        } catch (error) {
            console.error("Error: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
