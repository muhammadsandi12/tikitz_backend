const express = require("express")
const {getAllSchedule, addNewSchedule, updateSchedule, deleteSchedule, getScheduleById} = require('../controller/scheduleController')
const router = express.Router()

router.get('/', getAllSchedule)
router.post('/', addNewSchedule)
router.patch('/:id', updateSchedule)
router.delete('/:id', deleteSchedule)
router.get('/:id', getScheduleById)


module.exports = router