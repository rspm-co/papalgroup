import test from 'node:test'
import assert from 'node:assert/strict'
import { describeStartupError } from '../src/utils/startupError.js'

test('startup diagnostics identify connection, credentials and schema failures without leaking raw messages', () => {
  for (const code of ['ER_BAD_DB_ERROR', 'ECONNREFUSED', 'ER_ACCESS_DENIED_ERROR', 'SCHEMA_MISSING', 'SCHEMA_MISMATCH', 'EADDRINUSE']) {
    const message = describeStartupError({ code, message: 'private-password-and-SQL' })
    assert.ok(message.includes(`[${code}]`))
    assert.ok(!message.includes('private-password-and-SQL'))
  }
  assert.match(describeStartupError({ errors: [{code:'ECONNREFUSED'}] }), /Start MySQL/)
  assert.ok(!describeStartupError({message:'private-password-and-SQL'}).includes('private-password-and-SQL'))
})
