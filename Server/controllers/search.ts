const db = require("../db.ts");

module.exports = {
  // 쓰레기통 검색 코드

  // 지역별 선택 시 해당 지역 데이터 가져옴
  regionControl: async (req, res) => {
    try {
      const { state, city, city2 } = req.body;

<<<<<<< HEAD
            const query2 = {
                state: city,
                city: state,
            };
    
    
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
            const { longitude, latitude, isSeoul } = myLoc;
    
            // 데이터베이스 연결 설정
            const database = await db.run();
            const superBinCollection = database.collection('super_bin');
            const seoulCollection = database.collection("Seoul_trashbin");
    
            // 수퍼빈 컬렉션에서 주변 데이터 조회
            const superBinResult = await superBinCollection.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 5000,
                    },
                },
            }).toArray();
    
            let seoulResult = [];
    
            if (isSeoul) {
                // 서울 휴지통 컬렉션에서 주변 데이터 조회
                seoulResult = await seoulCollection.find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude],
                            },
                            $maxDistance: 75000,
                        }
                    }
                }).toArray();
            }
    
            // 두 데이터 세트를 결합
            const combinedData = {
                superBinData: superBinResult,
                seoulData: seoulResult,
            };
    
            res.json(combinedData);
        } catch (error) {
            console.error("에러: ", error);
            res.status(500).json({ error: '내부 서버 오류' });
        }
=======
      if (!state || !city) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const database = await db.run();
      const superbin = database.collection("super_bin");
      const seoulTrashbin = database.collection("Seoul_trashbin");

      const query = {
        region_1: state,
        region_2: city,
      };

      const query2 = {
        state: city,
        city: state,
      };

      const result1 = await superbin.find(query).toArray(); // super_bin 컬렉션에서 데이터 조회
      const result2 = await seoulTrashbin.find(query2).toArray(); // Seoul_trashbin 컬렉션에서 데이터 조회

      res.json({ super_bin: result1, Seoul_trashbin: result2 }); // 두 컬렉션의 결과를 하나의 JSON으로 응답
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
>>>>>>> dff0a0d (not complete)
    }
  },

  // 클라이언트를 통해서 내 위치 데이터(위도, 경도)를 가져옴
  // seoul trash 도 추가해야 함
  myLocControl: async (req, res) => {
    try {
      const myLoc = req.body;
      const { longitude, latitude, isSeoul } = myLoc;

      // 데이터베이스 연결 설정
      const database = await db.run();
      const superBinCollection = database.collection("super_bin");
      const seoulCollection = database.collection("Seoul_trashbin");

      // 수퍼빈 컬렉션에서 주변 데이터 조회
      const superBinResult = await superBinCollection
        .find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
              $maxDistance: 5000,
            },
          },
        })
        .toArray();

      let seoulResult = [];

      if (isSeoul) {
        // 서울 휴지통 컬렉션에서 주변 데이터 조회
        seoulResult = await seoulCollection
          .find({
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
                $maxDistance: 5000,
              },
            },
          })
          .toArray();
      }

      // 두 데이터 세트를 결합
      const combinedData = {
        superBinData: superBinResult,
        seoulData: seoulResult,
      };

      res.json(combinedData);
    } catch (error) {
      console.error("에러: ", error);
      res.status(500).json({ error: "내부 서버 오류" });
    }
  },
};
