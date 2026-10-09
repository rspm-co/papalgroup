import { defineModel } from '../../database/repository.js'



const Settings = defineModel({
  "name": "Settings",
  "table": "settings",
  "fields": {
    "companyName": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "tagline": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "logo": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "favicon": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "primaryBrandColor": {
      "type": "String",
      "trim": true,
      "default": "#BB9B50"
    },
    "secondaryBrandColor": {
      "type": "String",
      "trim": true,
      "default": "#111111"
    },
    "primaryEmail": {
      "type": "String",
      "required": true,
      "trim": true,
      "lowercase": true
    },
    "supportEmail": {
      "type": "String",
      "trim": true,
      "lowercase": true,
      "default": ""
    },
    "phone": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "whatsapp": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "website": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "address": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "city": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "state": {
      "type": "String",
      "required": true,
      "trim": true
    },
    "country": {
      "type": "String",
      "required": true,
      "trim": true,
      "default": "India"
    },
    "postalCode": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "googleMapsEmbed": {
      "type": "String",
      "trim": true,
      "default": ""
    },
    "businessHours": {
      "type": "Embedded",
      "fields": {
        "monday": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "tuesday": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "wednesday": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "thursday": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "friday": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "saturday": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "sunday": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": false,
      "default": {}
    },
    "socialLinks": {
      "type": "Embedded",
      "fields": {
        "facebook": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "instagram": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "linkedin": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "youtube": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "twitter": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": false,
      "default": {}
    },
    "seo": {
      "type": "Embedded",
      "fields": {
        "defaultTitle": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "defaultDescription": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "defaultKeywords": {
          "type": "Array",
          "item": {
            "type": "String"
          },
          "default": []
        },
        "defaultOgImage": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": false,
      "default": {}
    },
    "analytics": {
      "type": "Embedded",
      "fields": {
        "googleAnalyticsId": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "googleTagManagerId": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "metaPixelId": {
          "type": "String",
          "trim": true,
          "default": ""
        }
      },
      "subIds": false,
      "default": {}
    },
    "maintenanceMode": {
      "type": "Boolean",
      "default": false
    },
    "maintenanceMessage": {
      "type": "String",
      "trim": true,
      "default": ""
    }
  },
  "indexes": []
})

export default Settings
