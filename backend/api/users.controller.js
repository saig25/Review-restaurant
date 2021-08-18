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
      console.log(req.body.password)
      console.log(user[0].password)
      if(await bcrypt.compare( req.body.password, user[0].password)){
        res.json("success") 
        console.log("success")
        return "success" 
      }else{
          res.json('wrong password')
          console.log("wrong password")
          return "wrong password"
      }
     } catch (e) {
      console.error(`Unable to create user1: ${e}`)
      return { error: e }
    }
  }

}