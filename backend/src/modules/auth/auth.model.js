import { defineModel } from '../../database/repository.js'

export const AUTH_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
}

const AuthUser = defineModel({
  "name": "AuthUser",
  "table": "users",
  "fields": {
    "email": {
      "type": "String",
      "required": true,
      "trim": true,
      "lowercase": true,
      "unique": true,
      "index": true
    },
    "password": {
      "type": "String",
      "required": true,
      "select": false
    },
    "name": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "role": {
      "type": "String",
      "immutable": true,
      "enum": [
        "SUPER_ADMIN"
      ],
      "default": "SUPER_ADMIN"
    },
    "isActive": {
      "type": "Boolean",
      "default": true
    },
    "tokenVersion": {
      "type": "Number",
      "select": false,
      "default": 0
    }
  },
  "indexes": []
})

export default AuthUser
