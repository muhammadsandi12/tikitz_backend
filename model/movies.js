const moment = require('moment')
const db = require('../helper/db_connections')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
        // const sql = `SELECT movies.title, movies.cover, movies.release_date, movies.director, movies.description, movies.casts, categories.genre FROM movies JOIN categories ON categories.id = movies.id_categories `
        
        const sql = `SELECT  movies.title, movies.cover, movies.release_date, movies.director, movies.description, movies.casts, categories.genre FROM movies ${title ? `WHERE title LIKE '%${title}%'`: title && director ? `WHERE title LIKE '%${title}%' AND director LIKE '${director}%'`:''} ORDER BY release_date DESC`
        
        db.query(sql,(err, results)=> {
       
          if(err) {
            reject(console.log(err))
          }
          resolve({
            message: 'get movies success',
            status: 200,
            data: results
          },
          )
        })
      })
    },
    add: (req,res) => {
      return new Promise ((resolve,reject) =>{

        const {title, cover, release_date, director, description, casts, id_categories} = req.body
        const sql = `INSERT INTO movies (title, cover, release_date, director, description, casts, id_categories) VALUES ('${title}', '${cover}', '${release_date}', '${director}', '${description}', '${casts}', '${id_categories}')`
        db.query(sql,(err,result) =>{
          if(err){
            reject(
              {
                message: "ada Error"
              }
          )
          }
          resolve({
            message: 'add new movies success',
            status: 200,
            data: result

          })
        })
      })
    },
    update: (req, res) =>{
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT * FROM movies WHERE id = ${id}`,(err, results)=> {
          if(err) {res.send({message: "ada error"})}
       
          const previousData = {
            ...results[0],
            ...req.body
          }
          
          const {title, cover, release_date, director, description, casts, id_categories} = previousData
          let date = moment(release_date).format('YYYY-MM-DD')
          console.log(date) 
          const sql = `UPDATE movies SET title='${title}', cover='${cover}', director='${director}', release_date='${date}',description='${description}', casts='${casts}', categories='${id_categories}' WHERE id_movies = ${id} `
          db.query( sql,(err, results)=> {
            if(err) {
              console.log(err)
              reject({message: "ada error"})
            }
            resolve({
              message: "update movies success",
              status: 200,
              data: results
            })
          })
      
        })
      })
    },
    remove: (req,res) => {
      return new Promise((resolve,reject) =>{
        const {id} = req.params
        const sql = `DELETE FROM movies WHERE id_movies = ${id}`
        db.query(sql,(err, result) =>{
          if(err){
            reject({
              message: 'ada error'
            })
          }
          resolve({
            message: "delete movies success",
            status: 200,
            data: result
          })
        })

      })
    },
    getById: (req,res) => {
      return new Promise((resolve,reject) =>{
        const {id} = req.params
        const sql = `SELECT movies.title, movies.cover, movies.release_date, movies.director, movies.description, movies.casts, categories.genre FROM movies JOIN categories ON categories.id = movies.id_categories WHERE id_movies = ${id}`
        db.query(sql, (err, result) =>{
          if(err){
            reject(console.log(err))
          }
          resolve({
            message : 'get By id success ',
            status : 200,
            data: result
          })
        })
      })
    },
    searchByName: (req,res) => {
      return new Promise((resolve, reject) =>{
        const {title = ''} = req.query
        const sql = ` SELECT * FROM movies WHERE title LIKE '%${title}%' `
        db.query(sql, (err,result) =>{
          if(err){
            reject({
              message: 'ada error'
            })
          }
          resolve({
            message : 'search by title success',
            status: 200,
            data: result
          })
        })
      })
    }

}

