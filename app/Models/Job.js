'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {
    static get fillable () {
        return [
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'address',
          'postcode',
          'state',
          'clothing_type',
          'images',
          'description',
          'budget',
          'user_id',
          'taken_by',
          'thumbnail'
        ]
    }
}

module.exports = Job
