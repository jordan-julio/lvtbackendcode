'use strict'

const Hash = use('Hash')

function tokenAuth(params) {
  return async function ({ request, auth, response }, next) {
    try {
      // Verify token using Adonis.js Auth module
      await auth.check()

      // Check if user has the role "maker"
      const user = await auth.getUser()
      if (user.type === 'maker') {
        // User has the role "maker", proceed to next middleware or route handler
        await next()
      } else {
        // User does not have the role "maker", send error response
        return response.status(403).json({ error: 'Forbidden' })
      }
    } catch (error) {
      // Token is invalid, send error response
      return response.status(401).json({ error: 'Invalid token' })
    }
  }
}

module.exports = tokenAuth
