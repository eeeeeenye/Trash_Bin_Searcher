const router = require('express').Router();
const controller = require('../controllers/search.ts');

router.post('/bin_read_region', controller.regionControl); // 지역별 쓰레기통 데이터 처리
router.post('/bin_read_myloc', controller.myLocControl); // 내 위치 기반 쓰레기통 데이터 처리

module.exports = router;
