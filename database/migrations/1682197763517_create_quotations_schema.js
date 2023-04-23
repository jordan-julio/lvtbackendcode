'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateQuotationsSchema extends Schema {
  up () {
    this.create('quotations', (table) => {
      table.increments()
      table.integer('job_id').unsigned().notNullable()
      table.float('price').notNullable()
      table.text('comments').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('quotations')
  }
}

module.exports = CreateQuotationsSchema
