const express = require("express")
const {getAllBooking, addNewBooking, updateBooking, deleteBooking, getBookingById} = require('../controller/bookingController')
const router = express.Router()

router.get('/', getAllBooking)
router.post('/', addNewBooking)
router.patch('/:id', updateBooking)
router.delete('/:id', deleteBooking)
router.get('/:id', getBookingById)


module.exports = router