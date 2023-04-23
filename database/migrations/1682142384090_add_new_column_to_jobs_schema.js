'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNewColumnToJobsSchema extends Schema {
  up () {
    this.table('jobs', (table) => {
      // alter table
      table.string('thumbnail', 500)
      table.json('images')
      table.string('takenby', 100)
    })
  }

  down () {
    this.table('jobs', (table) => {
      // reverse alternations
      table.dropColumn('thumbnail')
      table.dropColumn('images')
      table.dropColumn('takenby')
    })
  }
}

module.exports = AddNewColumnToJobsSchema
