'use strict'

/**
 * Post model
 *
 * @module models/post-model
 */

let db = require('../core/db')

module.exports = createModel()

function createModel () {
  let model = db.model('Post', {
    tableName: 'post',
    hasTimestamps: true,

    entry: function () {
      return this.belongsTo('Entry', 'entry_id', 'uuid')
    },
    event: function () {
      return this.belongsTo('Event', 'event_id', 'uuid')
    },
    author: function () {
      return this.belongsTo('User', 'author_user_id', 'uuid')
    },
    userRoles: function () {
      return this.morphMany('UserRole', 'node', ['node_type', 'node_uuid'])
    }
  })

  model.up = async function up (applyVersion) {
    if (applyVersion === 1) {
      await db.knex.schema.createTableIfNotExists('post', function (table) {
        table.increments('id').primary()
        table.string('author_user_id')
        table.string('name')
        table.string('title')
        table.string('guild_id')
        table.string('entry_id')
        table.string('event_id')
        table.string('body', 10000)
        table.date('published_at')
        table.string('special_post_type')
        table.timestamps()
      })
    }
  }

  model.down = async function down () {
    await db.knex.schema.dropTableIfExists('post')
  }

  return model
}