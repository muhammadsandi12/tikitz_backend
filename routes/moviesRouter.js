const express = require("express")
const { verify } = require("jsonwebtoken")
const {getAllMovies, addNewMovies, updateMovies, deleteMovies, getMoviesById} = require('../controller/moviesController')
const router = express.Router()
const upload = require('../helper/multer')
const verifyAuth = require('../helper/verityAuth')

router.get('/', getAllMovies)
router.post('/',verifyAuth, upload.single('cover'), addNewMovies)
router.patch('/:id' ,verifyAuth,upload.single('cover'),updateMovies)
router.delete('/:id',verifyAuth, deleteMovies)
router.get('/:id', getMoviesById)



module.exports = router