const moment = require('moment')
const db = require('../helper/db_connections')
const fs = require('fs')

module.exports = {
    get: (req, res)=> {
      return new Promise((resolve, reject)=> {
       
        const {title, director} = req.param
        
        const sql = `SELECT  movies.title,  categories.genre, movies.cover, movies.release_date, movies.director, movies.description, movies.casts FROM movies  JOIN categories ON movies.id_categories = categories.id   ${title ? `WHERE title LIKE '%${title}%'`: title && director ? `WHERE title LIKE '%${title}%' AND director LIKE '${director}%'`:''} ORDER BY release_date DESC`
        
       

        
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
        console.log(req.file)
        const {title, id_categories, cover, release_date, director, description, casts } = req.body
        console.log(req.body)
        
        const sql = `INSERT INTO movies (title, id_categories,  cover,release_date, director, description, casts) VALUES ('${title}', '${id_categories}', '${cover}', '${release_date}', '${director}', '${description}', '${casts}')`
        db.query(sql,(err,result) =>{
          if(err){
            reject(
              console.log(err, 'ini error')
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
          if(req.file){
            fs.unlink(`./uploads/${results[0].cover}`,function(err){
              if(err){
                console.log(err)
              }
            })
          }
          const previousData = {
            ...results[0],
            ...req.body,
          }
          console.log(previousData.cover)       
          const {title, id_categories, cover, release_date, director, description, casts} = previousData       
          let date = moment(release_date).format('YYYY-MM-DD')
          const sql = `UPDATE movies SET title='${title}',id_categories='${id_categories}', cover='${cover}',  release_date='${date}', director='${director}',description='${description}', casts='${casts}' WHERE id = ${id} `
          db.query( sql,(err, results)=> {
            if(err) { 
              reject(console.log(err))
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
        db.query(`SELECT cover FROM movies WHERE id = ${id}`,(err, resultData) =>{
          if(err){
            console.log(err)
          }
          if(!resultData.length){
            reject({message : 'id tidak ditemukan'})
          }else{
            let cover = resultData[0].cover
            db.query(`DELETE FROM movies WHERE id = ${id}`, (err, results) =>{
              if(err){
                reject({message: 'ada error'})
              }
              fs.unlink(`./uploads/${cover}`, function(err){
                if(err) {
                  resolve({
                    message: 'delete movies success',
                    status: 200,
                    data: results
                  })
                }
                resolve({
                  message: 'delete movies success',
                  status: 200,
                  data: results
                })
              })
            })
          }
        })
      })
    },
    getById: (req,res) => {
      return new Promise((resolve,reject) =>{
        const {id} = req.params
        const sql = `SELECT movies.title,  categories.genre, movies.cover, movies.release_date, movies.director, movies.description, movies.casts FROM movies JOIN categories ON categories.id = movies.id_categories WHERE id = ${id}`
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