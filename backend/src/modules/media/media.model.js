import { defineModel } from '../../database/repository.js'

export const MEDIA_FOLDERS = {
  HOMEPAGE: 'Homepage',
  BRANDS: 'Brands',
  GALLERY: 'Gallery',
  AWARDS: 'Awards',
  CAREERS: 'Careers',
  GENERAL: 'General',
}

const Media = defineModel({
  "name": "Media",
  "table": "media",
  "fields": {
    "publicId": {
      "type": "String",
      "required": true,
      "trim": true,
      "unique": true,
      "index": true
    },
    "url": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "secureUrl": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "originalName": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "fileName": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "mimeType": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "extension": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "size": {
      "type": "Number",
      "required": true,
      "min": 0
    },
    "width": {
      "type": "Number",
      "min": 0,
      "default": 0
    },
    "height": {
      "type": "Number",
      "min": 0,
      "default": 0
    },
    "folder": {
      "type": "String",
      "index": true,
      "enum": [
        "Homepage",
        "Brands",
        "Gallery",
        "Awards",
        "Careers",
        "General"
      ],
      "default": "General"
    },
    "alt": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "tags": {
      "type": "Array",
      "index": true,
      "item": {
        "type": "String"
      },
      "default": []
    },
    "uploadedBy": {
      "type": "Id",
      "required": true,
      "ref": "AuthUser"
    }
  },
  "indexes": [
    [
      "folder"
    ]
  ]
})

export default Media
