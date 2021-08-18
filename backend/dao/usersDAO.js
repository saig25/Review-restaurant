import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let users

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.RESTREVIEWS_NS).collection("users")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`,
      )
    }
  }

  static async addUser(name, email, password, date) {
    try {
      const user = { name: name,
          email: email,
          password: password,
          date: date }
        
      return await users.insertOne(user)
    } catch (e) {
      console.error(`Unable to create user: ${e}`)
      return { error: e }
    }
  }

  static async getUser(email) {
    
    try {
      const user = users.find({email: email}).toArray()
      console.log(user)
      return user
    } catch (e) {
      console.error(`Unable to create user2: ${e}`)
      return { error: e }
    }
  }

}

