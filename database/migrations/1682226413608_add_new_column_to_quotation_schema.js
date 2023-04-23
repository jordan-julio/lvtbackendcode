'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddNewColumnToQuotationSchema extends Schema {
  up () {
    this.table('quotations', (table) => {
      // alter table
      table.integer('user_id').unsigned().notNullable()
    })
  }

  down () {
    this.table('quotations', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddNewColumnToQuotationSchema
