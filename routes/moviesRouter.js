const express = require("express")
const {getAllMovies, addNewMovies, updateMovies, deleteMovies, getMoviesById} = require('../controller/moviesController')
const router = express.Router()

router.get('/', getAllMovies)
router.post('/', addNewMovies)
router.patch('/:id', updateMovies)
router.delete('/:id', deleteMovies)
router.get('/:id', getMoviesById)



module.exports = router