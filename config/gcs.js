// config/gcs.js

'use strict'

const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
    projectId: 'meyditpreinterview',
    keyFilename: '../google-credentials.json',
    bucket: 'meyditbucket', // specify your bucket name here
    // other optional configuration settings:
    // storageClass: '<your-storage-class>',
    // location: '<your-bucket-location>',
})

async function storeImage(imageBase64) {
    try {
        const stream = require('stream');
        const bufferStream = new stream.PassThrough({ maxBytes: 400 });
        bufferStream.end(Buffer.from(imageBase64.split(';base64,').pop(), 'base64'));

        const fileName = `${Date.now()}.jpg`
        const bucket = storage.bucket('meyditbucket')
        const file = bucket.file(fileName)

        bufferStream.pipe(file.createWriteStream({
            metadata: {
              contentType: 'image/*',
              metadata: {
                custom: 'metadata'
              }
            },
            public: true,
            validation: "md5"
          }))
          .on('error', function(err) {})
          .on('finish', function() {
            // The file upload is complete.
          });

        // Return the public URL of the stored image
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`

        return imageUrl
    } catch (error) {
        console.error(error)
        throw new Error('Failed to store image')
    }
}

  
module.exports = {
    storage,
    storeImage
}
