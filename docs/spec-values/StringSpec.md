# StringSpec Documentation

## Description

`StringSpec` describes a string entity with extensive validation options including pattern matching, length constraints, and enum values. Supports various input types like text, textarea, select, Monaco editor, file input, and date picker.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | `"string"` | ✓ | Entity type identifier |
| defaultValue | `string` | | Default string value |
| required | `boolean` | | Whether the value can be undefined or null |
| maxLength | `integer` | | Maximum string length |
| minLength | `integer` | | Minimum string length |
| pattern | `string` | | RegExp pattern for validation |
| patternError | `string` | | Custom error message for pattern validation |
| enum | `string[]` | | Valid enum values |
| description | `object` | | Human-readable names for enum values |
| validator | `string` | | Custom validator key |
| viewSpec | `object` | ✓ | View configuration |

### ViewSpec Properties

- **type** (required): Input component type
- **disabled**: Whether field is editable
- **layout**: Layout component key
- **layoutTitle**: Layout title
- **layoutDescription**: Layout hint/description
- **layoutOpen**: Initially expand layout
- **link**: Link configuration
- **hideValues**: Values to treat as empty
- **sizeParams**: Configuration for size inputs
- **monacoParams**: Monaco editor configuration
- **placeholder**: Input placeholder
- **fileInput**: File input configuration
- **copy**: Show copy button
- **hidden**: Hide field
- **textContentParams**: Text content configuration
- **selectParams**: Select configuration
- **generateRandomValueButton**: Show random value generator
- **inputProps**: Additional input properties
- **dateInput**: Date picker configuration
- **radioGroupParams**: Radio group configuration

## Example JSON - Basic String

```json
{
  "type": "string",
  "required": true,
  "minLength": 3,
  "maxLength": 50,
  "viewSpec": {
    "type": "input",
    "layoutTitle": "Username",
    "layoutDescription": "Choose a unique username",
    "placeholder": "Enter username"
  }
}
```

## Example with Pattern Validation

```json
{
  "type": "string",
  "required": true,
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  "patternError": "Please enter a valid email address",
  "viewSpec": {
    "type": "input",
    "layoutTitle": "Email",
    "placeholder": "user@example.com"
  }
}
```

## Example with Enum (Select)

```json
{
  "type": "string",
  "required": true,
  "enum": ["small", "medium", "large", "xlarge"],
  "description": {
    "small": "Small (S)",
    "medium": "Medium (M)",
    "large": "Large (L)",
    "xlarge": "Extra Large (XL)"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "T-Shirt Size",
    "selectParams": {
      "filterPlaceholder": "Search size...",
      "meta": {
        "small": "Fits chest 34-36\"",
        "medium": "Fits chest 38-40\"",
        "large": "Fits chest 42-44\"",
        "xlarge": "Fits chest 46-48\""
      }
    }
  }
}
```

## Example with Radio Group

```json
{
  "type": "string",
  "required": true,
  "enum": ["male", "female", "other"],
  "description": {
    "male": "Male",
    "female": "Female",
    "other": "Other"
  },
  "viewSpec": {
    "type": "radio",
    "layoutTitle": "Gender",
    "radioGroupParams": {
      "direction": "horizontal"
    }
  }
}
```

## Example with Monaco Editor

```json
{
  "type": "string",
  "required": false,
  "viewSpec": {
    "type": "monaco",
    "layoutTitle": "Configuration",
    "layoutDescription": "Enter JSON configuration",
    "monacoParams": {
      "language": "json",
      "fontSize": "14px"
    }
  }
}
```

## Example with File Input

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "file",
    "layoutTitle": "Upload Avatar",
    "fileInput": {
      "accept": ".jpg, .jpeg, .png",
      "readAsMethod": "readAsDataURL",
      "ignoreText": true
    }
  }
}
```

## Example with Date Input

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "date",
    "layoutTitle": "Birth Date",
    "dateInput": {
      "outputFormat": "YYYY-MM-DD",
      "printFormat": "MMM DD, YYYY",
      "timeZone": "UTC"
    }
  }
}
```

## Example with Size Input

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "size",
    "layoutTitle": "Memory Limit",
    "sizeParams": {
      "scale": {
        "B": {
          "factor": "1",
          "title": "Bytes"
        },
        "KB": {
          "factor": "1024",
          "title": "Kilobytes"
        },
        "MB": {
          "factor": "1048576",
          "title": "Megabytes"
        },
        "GB": {
          "factor": "1073741824",
          "title": "Gigabytes"
        }
      },
      "defaultType": "B",
      "viewType": "MB"
    }
  }
}
```

## Example with Textarea

```json
{
  "type": "string",
  "required": false,
  "maxLength": 500,
  "viewSpec": {
    "type": "textarea",
    "layoutTitle": "Description",
    "layoutDescription": "Provide a detailed description (max 500 characters)",
    "placeholder": "Enter description here...",
    "inputProps": {
      "rows": 5
    }
  }
}
```

## Example with Copy Button

```json
{
  "type": "string",
  "required": false,
  "viewSpec": {
    "type": "input",
    "layoutTitle": "API Key",
    "copy": true,
    "disabled": true,
    "layoutDescription": "Use this key for API authentication"
  }
}
```

## Example with Random Value Generator

```json
{
  "type": "string",
  "required": true,
  "pattern": "^[A-Z0-9]{8}$",
  "viewSpec": {
    "type": "input",
    "layoutTitle": "Verification Code",
    "generateRandomValueButton": true,
    "placeholder": "8 character code"
  }
}
```

## Example with Text Content (Read-only Display)

```json
{
  "type": "string",
  "viewSpec": {
    "type": "text-content",
    "layoutTitle": "Status Message",
    "textContentParams": {
      "text": "Your account has been successfully verified",
      "themeLabel": "success",
      "icon": "Check",
      "themeIcon": "success"
    }
  }
}
```