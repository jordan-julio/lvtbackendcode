'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNewColumnToJobsSchema extends Schema {
  up () {
    this.table('jobs', (table) => {
      // alter table
      table.integer('user_id')
    })
  }

  down () {
    this.table('jobs', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddNewColumnToJobsSchema
