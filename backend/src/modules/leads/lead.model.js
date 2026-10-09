import { defineModel } from '../../database/repository.js'

export const LEAD_TYPES = {
  CONTACT: 'Contact',
  FRANCHISE: 'Franchise',
  BUSINESS_PARTNERSHIP: 'Business Partnership',
  CAREER: 'Career',
  GENERAL: 'General',
}

export const LEAD_STATUS = {
  NEW: 'New',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  PROPOSAL_SENT: 'Proposal Sent',
  WON: 'Won',
  LOST: 'Lost',
  CLOSED: 'Closed',
}

export const LEAD_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
}

const Lead = defineModel({
  "name": "Lead",
  "table": "leads",
  "fields": {
    "leadType": {
      "type": "String",
      "required": true,
      "index": true,
      "enum": [
        "Contact",
        "Franchise",
        "Business Partnership",
        "Career",
        "General"
      ]
    },
    "fullName": {
      "type": "String",
      "required": true,
      "trim": true,
      "index": true
    },
    "email": {
      "type": "String",
      "required": true,
      "trim": true,
      "lowercase": true,
      "index": true
    },
    "phone": {
      "type": "String",
      "required": true,
      "trim": true,
      "index": true
    },
    "addressLine1": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "addressLine2": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "company": {
      "type": "String",
      "trim": true,
      "index": true,
      "default": ""
    },
    "city": {
      "type": "String",
      "trim": true,
      "index": true,
      "default": ""
    },
    "state": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "country": {
      "type": "String",
      "trim": true,
      "default": "India"
    },
    "preferredBrand": {
      "type": "String",
      "trim": true,
      "index": true,
      "default": ""
    },
    "investmentRange": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "businessExperience": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "subject": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "message": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "source": {
      "type": "String",
      "trim": true,
      "default": "Website"
    },
    "status": {
      "type": "String",
      "index": true,
      "enum": [
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Won",
        "Lost",
        "Closed"
      ],
      "default": "New"
    },
    "priority": {
      "type": "String",
      "index": true,
      "enum": [
        "Low",
        "Medium",
        "High",
        "Urgent"
      ],
      "default": "Medium"
    },
    "assignedTo": {
      "type": "Id",
      "index": true,
      "ref": "AuthUser",
      "default": null
    },
    "internalNotes": {
      "type": "Array",
      "fields": {
        "note": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "addedBy": {
          "type": "Id",
          "ref": "AuthUser",
          "default": null
        },
        "addedAt": {
          "type": "Date",
          "defaultNow": true
        }
      },
      "subIds": true,
      "default": []
    },
    "followUpDate": {
      "type": "Date",
      "index": true,
      "default": null
    },
    "attachments": {
      "type": "Array",
      "fields": {
        "media": {
          "type": "Id",
          "ref": "Media",
          "default": null
        },
        "url": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "label": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": true,
      "default": []
    },
    "isDeleted": {
      "type": "Boolean",
      "index": true,
      "default": false
    },
    "deletedAt": {
      "type": "Date",
      "default": null
    }
  },
  "indexes": [
    [
      "leadType"
    ],
    [
      "fullName"
    ],
    [
      "email"
    ],
    [
      "phone"
    ],
    [
      "company"
    ],
    [
      "city"
    ],
    [
      "preferredBrand"
    ],
    [
      "status"
    ],
    [
      "priority"
    ],
    [
      "assignedTo"
    ],
    [
      "followUpDate"
    ],
    [
      "isDeleted"
    ],
    [
      "isDeleted",
      "createdAt"
    ],
    [
      "isDeleted",
      "leadType"
    ]
  ]
})

export default Lead
