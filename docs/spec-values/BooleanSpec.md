# BooleanSpec Documentation

## Description

`BooleanSpec` describes a boolean entity with validation and rendering configuration. Typically used for checkboxes, switches, and toggle inputs.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | `"boolean"` | ✓ | Entity type identifier |
| defaultValue | `boolean` | | Default boolean value |
| required | `boolean` | | If true, shows validation error when value is false |
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
- **hidden**: Hide field
- **inputProps**: Additional input properties

## Example JSON

```json
{
  "type": "boolean",
  "defaultValue": false,
  "required": true,
  "viewSpec": {
    "type": "checkbox",
    "layoutTitle": "Accept Terms",
    "layoutDescription": "You must accept the terms and conditions to continue"
  }
}
```

## Example with Switch

```json
{
  "type": "boolean",
  "defaultValue": true,
  "viewSpec": {
    "type": "switch",
    "layout": "row",
    "layoutTitle": "Enable Notifications",
    "layoutDescription": "Receive email notifications for important updates",
    "disabled": false
  }
}
```

## Example in Object Context

```json
{
  "type": "object",
  "properties": {
    "isActive": {
      "type": "boolean",
      "defaultValue": false,
      "required": false,
      "viewSpec": {
        "type": "checkbox",
        "layoutTitle": "Active Status"
      }
    },
    "sendEmails": {
      "type": "boolean",
      "defaultValue": true,
      "viewSpec": {
        "type": "switch",
        "layoutTitle": "Email Notifications"
      }
    },
    "agreedToTerms": {
      "type": "boolean",
      "required": true,
      "viewSpec": {
        "type": "checkbox",
        "layoutTitle": "I agree to the Terms of Service",
        "layoutDescription": "This field is required"
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "User Preferences"
  }
}
```