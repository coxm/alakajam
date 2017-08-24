'use strict'

require('./support/test-server.js')

const assert = require('assert')

describe('userService', async function () {
  require('../core/db')

  describe('#register()', function () {
    it('should fail upon invalid username', async function () {
      const userService = require('../services/user-service')
      let result = await userService.register('1user', 'password')
      assert(typeof result === 'string')
    })

    it('should succeed upon valid username and password', async function () {
      const userService = require('../services/user-service')
      assert(await userService.register('user', 'password'))
    })
  })
})
