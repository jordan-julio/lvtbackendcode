'use strict'

const Job = use('App/Models/Job')
const { storage, storeImage } = require('../../../config/gcs')

class JobController {
  async index ({ request, auth, response }) {
    try {
      await auth.check()
      const user = await auth.getUser()
      if (user.type === 'Maker') {
        // Your existing code to fetch jobs and send response
        const jobs = await Job.query().fetch()
        return response.json(jobs)
      } else {
        // User does not have the role "maker", send error response
        return response.status(403).json({ error: 'Forbidden' })
      }
    } catch (error) {
      // Token is invalid, send error response
      return response.status(401).json({ error: 'Invalid token' })
    }
  }
  
  async getUserType ({ auth, response }) {
    try {
      // Verify if user is authenticated and get the user
      await auth.check()
      const user = await auth.getUser()

      // Return user type
      return response.json({ type: user.type })
    } catch (error) {
      // Token is invalid, send error response
      return response.status(401).json({ error: 'Invalid token' })
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'first_name',
      'last_name',
      'phone_number',
      'email',
      'address',
      'postcode',
      'state',
      'clothing_type',
      'thumbnail',
      'images',
      'description',
      'budget',
      'user_id'
    ])
  
    // Upload thumbnail image  
    // Convert the base64 thumbnail to buffer and store in Google Cloud Storage
    if (data.thumbnail !== undefined) {
      const thumbnailUrl = await storeImage(data.thumbnail[0])
      data.thumbnail = thumbnailUrl // Store the thumbnail URL
    }
    
    if (data.images !== undefined) {
      const imageUrls = await storeImage(data.images[0])
      data.images = imageUrls // Store the image URLs as JSON string
    }
    const job = await Job.create(data)
  
    return response.status(201).json(job)
  }
  

  async show({ params, response }) {
    try {
      const job = await Job.find(params.id)
  
      if (!job) {
        return response.status(404).json({ message: 'Job not found' })
      }
  
      return response.json(job)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }

  async update ({ params, request, response }) {
    const job = await Job.find(params.id)

    if (!job) {
      return response.status(404).json({ message: 'Job not found' })
    }

    const data = request.only([
      'first_name',
      'last_name',
      'phone_number',
      'email',
      'address',
      'postcode',
      'state',
      'clothing_type',
      'description',
      'budget'
    ])

    job.merge(data)
    await job.save()

    return response.json(job)
  }

  async destroy ({ params, response }) {
    const job = await Job.find(params.id)

    if (!job) {
      return response.status(404).json({ message: 'Job not found' })
    }

    await job.delete()

    return response.json({ message: 'Job deleted' })
  }

  async jobsByUser({ params, response }) {
    try {
      // Fetch jobs made by the specific user
      const jobs = await Job.query().where('user_id', params.id).fetch()
  
      return response.json(jobs)
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
  
}

module.exports = JobController
