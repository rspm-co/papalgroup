import { defineModel } from '../../database/repository.js'

export const GALLERY_CATEGORIES = {
  CORPORATE: 'Corporate',
  EVENTS: 'Events',
  FRANCHISE: 'Franchise',
  AWARDS: 'Awards',
  CSR: 'CSR',
  PRODUCTS: 'Products',
  TEAM: 'Team',
  FESTIVAL: 'Festival',
  MEDIA: 'Media',
  OTHER: 'Other',
}

export const GALLERY_STATUS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
}

const Gallery = defineModel({
  "name": "Gallery",
  "table": "gallery",
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
    "description": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "category": {
      "type": "String",
      "required": true,
      "index": true,
      "enum": [
        "Corporate",
        "Events",
        "Franchise",
        "Awards",
        "CSR",
        "Products",
        "Team",
        "Festival",
        "Media",
        "Other"
      ]
    },
    "media": {
      "type": "Array",
      "minItems": 1,
      "required": true,
      "item": {
        "type": "Id",
        "ref": "Media"
      },
      "default": []
    },
    "featured": {
      "type": "Boolean",
      "index": true,
      "default": false
    },
    "status": {
      "type": "String",
      "index": true,
      "enum": [
        "Draft",
        "Published",
        "Archived"
      ],
      "default": "Published"
    },
    "displayOrder": {
      "type": "Number",
      "required": true,
      "index": true,
      "min": 0
    },
    "eventDate": {
      "type": "Date",
      "required": true,
      "index": true
    },
    "location": {
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
      "category"
    ],
    [
      "featured"
    ],
    [
      "status"
    ],
    [
      "displayOrder"
    ],
    [
      "eventDate"
    ]
  ]
})

export default Gallery
