const router = require('express').Router
const controller = require('../controllers/post.ts')

router.post('/bin_post',controller.postingController)
router.post('/bin_del_post',controller.postdelController)
router.get('/post_read',controller.postReadController)

module.exports = router