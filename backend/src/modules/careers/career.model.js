import { defineModel } from '../../database/repository.js'

export const EMPLOYMENT_TYPES = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  INTERNSHIP: 'Internship',
  CONTRACT: 'Contract',
  FREELANCE: 'Freelance',
}

export const WORK_MODES = {
  ON_SITE: 'On Site',
  HYBRID: 'Hybrid',
  REMOTE: 'Remote',
}

export const CAREER_STATUS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  CLOSED: 'Closed',
  ARCHIVED: 'Archived',
}

const Career = defineModel({
  "name": "Career",
  "table": "careers",
  "fields": {
    "title": {
      "type": "String",
      "required": true,
      "trim": true,
      "index": true
    },
    "slug": {
      "type": "String",
      "required": true,
      "trim": true,
      "lowercase": true,
      "unique": true,
      "index": true
    },
    "department": {
      "type": "String",
      "required": true,
      "trim": true,
      "index": true
    },
    "location": {
      "type": "String",
      "required": true,
      "trim": true,
      "index": true
    },
    "employmentType": {
      "type": "String",
      "required": true,
      "index": true,
      "enum": [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Freelance"
      ]
    },
    "workMode": {
      "type": "String",
      "required": true,
      "index": true,
      "enum": [
        "On Site",
        "Hybrid",
        "Remote"
      ]
    },
    "experience": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "salary": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "vacancies": {
      "type": "Number",
      "required": true,
      "min": 1
    },
    "description": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "responsibilities": {
      "type": "Array",
      "required": true,
      "item": {
        "type": "String"
      },
      "default": []
    },
    "requirements": {
      "type": "Array",
      "required": true,
      "item": {
        "type": "String"
      },
      "default": []
    },
    "skills": {
      "type": "Array",
      "required": true,
      "item": {
        "type": "String"
      },
      "default": []
    },
    "benefits": {
      "type": "Array",
      "item": {
        "type": "String"
      },
      "default": []
    },
    "applicationDeadline": {
      "type": "Date",
      "required": true,
      "index": true
    },
    "status": {
      "type": "String",
      "index": true,
      "enum": [
        "Draft",
        "Published",
        "Closed",
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
      "title"
    ],
    [
      "department"
    ],
    [
      "location"
    ],
    [
      "employmentType"
    ],
    [
      "workMode"
    ],
    [
      "applicationDeadline"
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

export default Career
