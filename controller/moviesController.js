const Movies = require('../model/movies')

module.exports = {
    getAllMovies: async (req, res)=> {
        try {
            const results = await Movies.get(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    addNewMovies: async (req, res)=> {
        try {
            const reqModifer = {
                ...req, 
                body:{...req.body, cover: req.file.filename}
            }
            const results = await Movies.add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    updateMovies: async (req, res) => {
        try {
            if(req.file){
                 reqModifer = {
                ...req, 
                body:{...req.body, cover: req.file.filename}
            }
            }else{
                 reqModifer = {
                    ...req,
                    body:{ ...req.body}
                }
            }
            console.log(req.body)
            const results = await Movies.update(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    deleteMovies: async(req, res) => {
        try {
            const results = await Movies.remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    getMoviesById: async (req, res) => {
        try{
            const result = await Movies.getById(req,res)
            return res.status(201).send(result)

        }catch(error){
            return res.status(400).send(error)

        }
    }
}