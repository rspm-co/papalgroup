import { defineModel } from '../../database/repository.js'



const Homepage = defineModel({
  "name": "Homepage",
  "table": "homepages",
  "fields": {
    "hero": {
      "type": "Embedded",
      "required": true,
      "fields": {
        "title": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "subtitle": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "description": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "primaryButtonText": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "primaryButtonLink": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "secondaryButtonText": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "secondaryButtonLink": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "backgroundImage": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "isActive": {
          "type": "Boolean",
          "default": true
        }
      },
      "subIds": false
    },
    "journey": {
      "type": "Array",
      "required": true,
      "fields": {
        "year": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "title": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "description": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "image": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "displayOrder": {
          "type": "Number",
          "required": true,
          "min": 0
        }
      },
      "subIds": true,
      "default": []
    },
    "achievements": {
      "type": "Array",
      "required": true,
      "fields": {
        "title": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "value": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "suffix": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "icon": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "displayOrder": {
          "type": "Number",
          "required": true,
          "min": 0
        }
      },
      "subIds": true,
      "default": []
    },
    "cta": {
      "type": "Embedded",
      "required": true,
      "fields": {
        "title": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "description": {
          "type": "String",
          "required": true,
          "trim": true
        },
        "primaryButton": {
          "type": "Embedded",
          "required": true,
          "fields": {
            "text": {
              "type": "String",
              "required": true,
              "trim": true
            },
            "link": {
              "type": "String",
              "required": true,
              "trim": true
            }
          },
          "subIds": false
        },
        "secondaryButton": {
          "type": "Embedded",
          "required": true,
          "fields": {
            "text": {
              "type": "String",
              "required": true,
              "trim": true
            },
            "link": {
              "type": "String",
              "required": true,
              "trim": true
            }
          },
          "subIds": false
        },
        "backgroundImage": {
          "type": "String",
          "required": true,
          "trim": true
        }
      },
      "subIds": false
    },
    "status": {
      "type": "String",
      "enum": [
        "Draft",
        "Published"
      ],
      "default": "Draft"
    },
    "brandsSection": {
      "type": "Embedded",
      "fields": {
        "title": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "subtitle": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "isVisible": {
          "type": "Boolean",
          "default": true
        }
      },
      "subIds": false,
      "default": {}
    },
    "momentsSection": {
      "type": "Embedded",
      "fields": {
        "title": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "subtitle": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "isVisible": {
          "type": "Boolean",
          "default": true
        }
      },
      "subIds": false,
      "default": {}
    },
    "awardsSection": {
      "type": "Embedded",
      "fields": {
        "title": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "subtitle": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "isVisible": {
          "type": "Boolean",
          "default": true
        }
      },
      "subIds": false,
      "default": {}
    },
    "franchiseProcess": {
      "type": "Embedded",
      "fields": {
        "title": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "subtitle": {
          "type": "String",
          "trim": true,
          "default": ""
        },
        "isVisible": {
          "type": "Boolean",
          "default": true
        }
      },
      "subIds": false,
      "default": {}
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
    "updatedBy": {
      "type": "Id",
      "required": true,
      "ref": "AuthUser"
    }
  },
  "indexes": []
})

export default Homepage
