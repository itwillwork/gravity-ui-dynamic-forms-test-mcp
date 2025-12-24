# ArraySpec Documentation

## Description

`ArraySpec` describes an array entity with validation rules and rendering configuration. It supports various input types including tables, selects, and custom array inputs.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | `"array"` | ✓ | Entity type identifier |
| defaultValue | `any[]` | | Default array value |
| required | `boolean` | | Whether the value can be undefined or null |
| maxLength | `integer` | | Maximum number of array elements |
| minLength | `integer` | | Minimum number of array elements |
| items | `Spec` | | Specification for array element type |
| enum | `string[]` | | Valid values for array elements |
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
- **itemLabel**: Text for add button
- **itemPrefix**: Prefix text for array items
- **table**: Column configuration for table view
- **link**: Link configuration
- **placeholder**: Input placeholder
- **addButtonPosition**: Button position ("down" or "right")
- **hidden**: Hide field
- **selectParams**: Select configuration
- **checkboxGroupParams**: Checkbox group configuration
- **inputProps**: Additional input properties

## Example JSON

```json
{
  "type": "array",
  "required": true,
  "minLength": 1,
  "maxLength": 10,
  "items": {
    "type": "string",
    "viewSpec": {
      "type": "input"
    }
  },
  "viewSpec": {
    "type": "array",
    "layout": "accordeon",
    "layoutTitle": "User Tags",
    "layoutDescription": "Add tags to categorize users",
    "layoutOpen": true,
    "itemLabel": "Add Tag",
    "itemPrefix": "Tag",
    "addButtonPosition": "down",
    "placeholder": "Enter tag name"
  }
}
```

## Example with Table View

```json
{
  "type": "array",
  "required": false,
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "viewSpec": { "type": "input" }
      },
      "email": {
        "type": "string",
        "viewSpec": { "type": "input" }
      },
      "role": {
        "type": "string",
        "enum": ["admin", "user", "guest"],
        "viewSpec": { "type": "select" }
      }
    },
    "viewSpec": {
      "type": "object"
    }
  },
  "viewSpec": {
    "type": "table",
    "layoutTitle": "Users",
    "table": [
      {
        "label": "Name",
        "property": "name",
        "width": 200
      },
      {
        "label": "Email",
        "property": "email",
        "description": "User's email address",
        "width": 250
      },
      {
        "label": "Role",
        "property": "role",
        "width": 150
      }
    ]
  }
}
```

## Example with Enum

```json
{
  "type": "array",
  "required": true,
  "enum": ["javascript", "typescript", "python", "go", "rust"],
  "description": {
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "python": "Python",
    "go": "Go",
    "rust": "Rust"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "Programming Languages",
    "selectParams": {
      "filterPlaceholder": "Search language...",
      "meta": {
        "javascript": "Interpreted, high-level",
        "typescript": "Typed superset of JavaScript",
        "python": "High-level, interpreted",
        "go": "Compiled, statically typed",
        "rust": "Systems programming"
      }
    }
  }
}
```