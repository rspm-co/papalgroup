import { defineModel } from '../../database/repository.js'

export const AWARD_CATEGORIES = {
  BUSINESS: 'Business',
  FRANCHISE: 'Franchise',
  INNOVATION: 'Innovation',
  LEADERSHIP: 'Leadership',
  CORPORATE: 'Corporate',
  CSR: 'CSR',
  OTHER: 'Other',
}

export const AWARD_STATUS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
}

const Award = defineModel({
  "name": "Award",
  "table": "awards",
  "fields": {
    "title": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "slug": {
      "type": "String",
      "required": true,
      "trim": true,
      "lowercase": true,
      "unique": true,
      "index": true
    },
    "organization": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "awardDate": {
      "type": "Date",
      "required": true,
      "index": true
    },
    "year": {
      "type": "String",
      "required": true,
      "trim": true,
      "index": true
    },
    "description": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "certificateMedia": {
      "type": "Id",
      "ref": "Media",
      "default": null
    },
    "coverMedia": {
      "type": "Id",
      "ref": "Media",
      "default": null
    },
    "galleryMedia": {
      "type": "Array",
      "item": {
        "type": "Id",
        "ref": "Media"
      },
      "default": []
    },
    "brand": {
      "type": "Id",
      "index": true,
      "ref": "Brand",
      "default": null
    },
    "category": {
      "type": "String",
      "required": true,
      "index": true,
      "enum": [
        "Business",
        "Franchise",
        "Innovation",
        "Leadership",
        "Corporate",
        "CSR",
        "Other"
      ]
    },
    "status": {
      "type": "String",
      "index": true,
      "enum": [
        "Draft",
        "Published",
        "Archived"
      ],
      "default": "Draft"
    },
    "featured": {
      "type": "Boolean",
      "index": true,
      "default": false
    },
    "displayOrder": {
      "type": "Number",
      "required": true,
      "index": true,
      "min": 0
    },
    "seo": {
      "type": "Embedded",
      "fields": {
        "metaTitle": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "metaDescription": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "keywords": {
          "type": "Array",
          "item": {
            "type": "String"
          },
          "default": []
        },
        "ogImage": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": false,
      "default": {}
    },
    "createdBy": {
      "type": "Id",
      "required": true,
      "ref": "AuthUser"
    },
    "updatedBy": {
      "type": "Id",
      "required": true,
      "ref": "AuthUser"
    }
  },
  "indexes": [
    [
      "awardDate"
    ],
    [
      "year"
    ],
    [
      "brand"
    ],
    [
      "category"
    ],
    [
      "status"
    ],
    [
      "featured"
    ],
    [
      "displayOrder"
    ]
  ]
})

export default Award
