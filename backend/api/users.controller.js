import UsersDAO from "../dao/usersDAO.js"
import bcrypt from  "bcrypt"

export default class UsersController {
  static async apiPostUser(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const name = req.body.name
      const email = req.body.email
      const date = new Date()

      const UserResponse = await UsersDAO.addUser(
        name,
        email,
        hashedPassword,
        date,
      )
      res.json({ status: "success" })
      
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apigetUser(req, res, next) {
    try {
      const user = await UsersDAO.getUser(req.body.email)
      
      
      if(await bcrypt.compare( req.body.password, user[0].password)){
    
       const result = {
            value: "success",
            name: user[0].name,
            id: user[0]._id
        }
        res.json(result)
         
      }else{
          
          
          const result = {
            value: "wrong password",
            name: "null",
            id: "0"
        }
        res.json(result)
      }
     } catch (e) {
      console.error(`Unable to create user1: ${e}`)
      return { error: e }
    }
  }

}