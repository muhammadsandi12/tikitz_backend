const db = require('../helper/db_connections')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {error, success} =require('../helper/message')

module.exports = {
    login: (req, res)=> {
      return new Promise((resolve, reject)=> {
        const {email, password} = req.body;
        db.query( `SELECT id, password, role FROM users  WHERE email='${email.toLowerCase()}'`,(err, results)=> {        
          console.log(results)    
          if(err) {
            reject({
                message: 'ada error'
            })
          }else{
            if(!results.length){
                reject({
                    message: 'Email/Password Salah'
                })
            }else{
                bcrypt.compare(password,results[0].password, function(err,result){
                    if(err){
                        reject({message:'Ada Masalah Saat Login, Harap coba lagi.'})
                    }
                    console.log(result)
                    if(result){
                        const token = jwt.sign({user_id: results[0].id, role: results[0].role}, process.env.JWT_SECRET_KEY, {
                          expiresIn: '300s'
                        })
                        console.log(process.env.JWT_SECRET_KEY)
                        resolve({
                            message: 'login Success',
                            status: 200,
                            data: {
                                token,
                                user_id: results[0].id,
                            }
                        })
                    }else{
                        reject({
                            message: 'email/password salah. '
                        })
                    }
                    
                })
            }
          }   
        })
      })
    },

    register: (req,res) => {
      return new Promise ((resolve,reject) =>{
        const {firstname,lastname,phone_number, email, password} = req.body
        console.log(req.body)
        const imageDefault = 'default.png'
        bcrypt.hash(password, 10, function(err,hashedPassword){
          if(err){
            reject({
              message: "ada error"
            })

          }else{
            console.log(process.env.ROLE_USER)
            const sql = `INSERT INTO users(firstname, lastname, phone_number, email, password, profile_image, role) VALUES ('${firstname}', '${lastname}',${phone_number},'${email}','${hashedPassword}','${imageDefault}', '${process.env.ROLE_USER}')`
            db.query(sql,(err,result) =>{
              console.log(result)
                if(err){
                    reject(console.log(err))
                }
              resolve({
                message: 'add new user success',
                status: 200,
                data: result
              })
            })
          }

        })
      
      })
    }
} 