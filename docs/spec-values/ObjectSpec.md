# ObjectSpec Documentation

## Description

`ObjectSpec` describes a complex object entity with nested properties. Each property can be any valid Spec type, allowing for deeply nested structures. Supports custom ordering, layouts, and one-of (discriminated union) patterns.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | `"object"` | ✓ | Entity type identifier |
| defaultValue | `object` | | Default object value |
| required | `boolean` | | Whether the value can be undefined or null |
| properties | `Record<string, Spec>` | | Nested property specifications |
| description | `object` | | Human-readable names for property keys |
| validator | `string` | | Custom validator key |
| viewSpec | `object` | ✓ | View configuration |

### ViewSpec Properties

- **type** (required): Input component type
- **disabled**: Whether field is editable
- **layout**: Layout component key
- **layoutTitle**: Layout title
- **layoutDescription**: Layout hint/description
- **layoutOpen**: Initially expand layout
- **order**: Array of property keys defining render order
- **link**: Link configuration
- **oneOfParams**: Configuration for discriminated unions
- **placeholder**: Input placeholder
- **hidden**: Hide field
- **delimiter**: Delimiters for inline object inputs

## Example JSON

```json
{
  "type": "object",
  "required": true,
  "properties": {
    "firstName": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "input",
        "layoutTitle": "First Name",
        "placeholder": "John"
      }
    },
    "lastName": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "input",
        "layoutTitle": "Last Name",
        "placeholder": "Doe"
      }
    },
    "age": {
      "type": "number",
      "required": false,
      "minimum": 0,
      "maximum": 150,
      "viewSpec": {
        "type": "input",
        "layoutTitle": "Age"
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layout": "accordeon",
    "layoutTitle": "User Profile",
    "layoutDescription": "Basic user information",
    "layoutOpen": true,
    "order": ["firstName", "lastName", "age"]
  }
}
```

## Example with Nested Objects

```json
{
  "type": "object",
  "properties": {
    "personalInfo": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "required": true,
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Full Name"
          }
        },
        "email": {
          "type": "string",
          "required": true,
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Email"
          }
        }
      },
      "viewSpec": {
        "type": "object",
        "layoutTitle": "Personal Information",
        "layout": "section"
      }
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Street"
          }
        },
        "city": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "City"
          }
        },
        "zipCode": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "ZIP Code"
          }
        }
      },
      "viewSpec": {
        "type": "object",
        "layoutTitle": "Address",
        "layout": "section"
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "User Registration",
    "order": ["personalInfo", "address"]
  }
}
```

## Example with OneOf (Discriminated Union)

```json
{
  "type": "object",
  "properties": {
    "notificationType": {
      "type": "string",
      "enum": ["email", "sms", "push"],
      "viewSpec": {
        "type": "select"
      }
    },
    "email": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Email Address"
          }
        },
        "subject": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Subject"
          }
        }
      },
      "viewSpec": {
        "type": "object"
      }
    },
    "sms": {
      "type": "object",
      "properties": {
        "phoneNumber": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Phone Number"
          }
        }
      },
      "viewSpec": {
        "type": "object"
      }
    },
    "push": {
      "type": "object",
      "properties": {
        "deviceId": {
          "type": "string",
          "viewSpec": {
            "type": "input",
            "layoutTitle": "Device ID"
          }
        }
      },
      "viewSpec": {
        "type": "object"
      }
    }
  },
  "viewSpec": {
    "type": "oneof",
    "layoutTitle": "Notification Settings",
    "oneOfParams": {
      "toggler": "select"
    }
  }
}
```

## Example with Custom Descriptions

```json
{
  "type": "object",
  "properties": {
    "cpu": {
      "type": "number",
      "viewSpec": {
        "type": "input"
      }
    },
    "memory": {
      "type": "number",
      "viewSpec": {
        "type": "input"
      }
    },
    "storage": {
      "type": "number",
      "viewSpec": {
        "type": "input"
      }
    }
  },
  "description": {
    "cpu": "CPU Cores",
    "memory": "Memory (GB)",
    "storage": "Storage (GB)"
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Server Resources",
    "order": ["cpu", "memory", "storage"]
  }
}
```