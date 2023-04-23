'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobsSchema extends Schema {
  up () {
    this.create('jobs', (table) => {
      table.increments()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('phone_number').notNullable()
      table.string('email').notNullable()
      table.string('address').notNullable()
      table.string('postcode').notNullable()
      table.string('state').notNullable()
      table.string('clothing_type').notNullable()
      table.text('description').notNullable()
      table.decimal('budget', 8, 2)
      table.timestamps()
    })
  }

  down () {
    this.table('jobs', (table) => {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('phone_number')
      table.dropColumn('email')
      table.dropColumn('address')
      table.dropColumn('postcode')
      table.dropColumn('state')
      table.dropColumn('clothing_type')
      table.dropColumn('description')
      table.dropColumn('budget')
    })
  }
}

module.exports = JobsSchema
