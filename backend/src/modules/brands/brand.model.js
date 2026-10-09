import { defineModel } from '../../database/repository.js'

export const BRAND_CATEGORIES = {
  FOOD: 'Food',
  TECHNOLOGY: 'Technology',
  RETAIL: 'Retail',
  SERVICES: 'Services',
  FOUNDATION: 'Foundation',
  OTHER: 'Other',
}

export const BRAND_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DRAFT: 'Draft',
}

const Brand = defineModel({
  "name": "Brand",
  "table": "brands",
  "fields": {
    "name": {
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
    "tagline": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "shortDescription": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "fullDescription": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "category": {
      "type": "String",
      "required": true,
      "index": true,
      "enum": [
        "Food",
        "Technology",
        "Retail",
        "Services",
        "Foundation",
        "Other"
      ]
    },
    "website": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "logo": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "heroImage": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "gallery": {
      "type": "Array",
      "fields": {
        "image": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "caption": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": true,
      "default": []
    },
    "themeColor": {
      "type": "String",
      "trim": true,
      "default": "#BB9B50"
    },
    "status": {
      "type": "String",
      "index": true,
      "enum": [
        "Active",
        "Inactive",
        "Draft"
      ],
      "default": "Draft"
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
      "category"
    ],
    [
      "status"
    ],
    [
      "displayOrder"
    ]
  ]
})

export default Brand
