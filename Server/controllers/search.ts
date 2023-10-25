const db = require("../db.ts");

module.exports = {
    // 쓰레기통 검색 코드

    // 지역별 선택 시 해당 지역 데이터 가져옴 (현재 super bin 만)
    regionControl: async (req, res) => {
        try {
            const { state, city, city2 } = req.body;
            if (!state || !city) {
                return res.status(400).json({ error: 'Invalid input data' });
            }

            const database = await db.run();
            const superbin = database.collection('super_bin');
            const other = database.collection('Seoul_trashbin')

            const query = {
                region: state,
                city: city,
            };

            const query2 = {
                
            }

            if (city2) {
                query.city2 = city2;
            }

            const result = await collection.find(query).toArray();
            res.json(result);
        } catch (error) {
            console.error('Error: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    // 클라이언트를 통해서 내 위치 데이터(위도, 경도)를 가져옴
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
