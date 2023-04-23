'use strict'

const Hash = use('Hash')
const User = use('App/Models/User')

class UserController {
  async create({ request, response, session }) {
    // Logic for creating a new user
    const { username, email, password, type } = request.all()
    try {
      // Create user in database with hashed password
      const user = new User()
      user.username = username
      user.email = email
      user.password = password
      user.type = type
      await user.save()

      // Redirect to index page with success response
      return response.status(200).json({ success: 'User created successfully!' });
    } catch (error) {
      // Handle error and send error response
      console.error(error)
      return response.status(500).json({ error: 'Failed to create user' });
    }
  }

  async login({ request, auth, response, session }) {
    // Logic for logging in a user
    const { email, password } = request.all()

    // Find user by email
    const user = await User.findBy('email', email)

    if (user) {
      // Verify password using Adonis.js Hash module
      const isPasswordValid = await Hash.verify(password, user.password)

      if (isPasswordValid) {
        // Login user using Adonis.js Auth module
        const token = await auth.attempt(email, password)

        // Return token in response
        return response.status(200).json({ success: 'User logged in successfully!', token: token.token, user: user.username });
      } else {
        // Password is not valid, send error response
        return response.status(401).json({ error: 'Invalid email or password' });
      }
    } else {
      // User not found, send error response
      return response.status(401).json({ error: 'Invalid email or password' });
    }
  }
  async getCurrentUser({ auth, response }) {
    try {
      // Fetch the currently authenticated user
      const user = await auth.getUser()
  
      return response.json({ user_id: user.id, username: user.username })
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
  async getUserById({ params, response }) {
    try {
      // Fetch user by ID from params
      const user = await User.find(params.id)

      if (!user) {
        // User not found, send error response
        return response.status(404).json({ error: 'User not found' })
      }

      // Return user data in response
      return response.status(200).json(user)
    } catch (error) {
      // Handle error and send error response
      console.error(error)
      return response.status(500).json({ error: 'Failed to fetch user' })
    }
  }
}
module.exports = UserController
