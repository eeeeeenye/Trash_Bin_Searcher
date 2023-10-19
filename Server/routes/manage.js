const router = require('express').Router
const controller = require('../controllers/manage')

router.delete('/bin_del')
router.update('/bin_state')

module.exports = router