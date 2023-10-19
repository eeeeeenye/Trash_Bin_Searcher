const router = require('express').Router
const controller = require('../controllers/post')

router.post('/bin_post')
router.post('/bin_del_post')
router.get('/post_read')

module.exports = router