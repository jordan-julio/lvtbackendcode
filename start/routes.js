'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('jobs', 'JobController').apiOnly()
Route.get('usertype', 'JobController.getUserType')
Route.get('jobs/:id', 'JobController.show')
Route.get('jobs/user/:id', 'JobController.jobsByUser')

Route.post('register', 'UserController.create')
Route.post('login', 'UserController.login')
Route.get('user/id', 'UserController.getCurrentUser')

Route.post('jobs/quotations', 'QuotationController.store');
Route.get('jobs/:id/quotations', 'QuotationController.index');
Route.get('users/:id', 'UserController.getUserById');
Route.post('jobs/sendquotations', async ({ request, response }) => {
  try {
    const { to, subject, text } = request.post(); // Get email address, subject, and text from request body
    // Send email using SendGrid
    const msg = {
      to,
      from: 'jordan.julio.jap@hotmail.com',
      subject,
      text,
    };
    await sgMail.send(msg);
    response.send({ message: 'Quotation submitted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: 'Failed to submit quotation' });
  }
});