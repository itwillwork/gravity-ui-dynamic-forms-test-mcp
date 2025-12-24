# NumberSpec Documentation

## Description

`NumberSpec` describes a numeric entity with validation rules for integers and floating-point numbers. Supports minimum/maximum constraints and format validation.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | `"number"` | ✓ | Entity type identifier |
| defaultValue | `number` | | Default numeric value |
| required | `boolean` | | Whether the value can be undefined or null |
| maximum | `number` | | Maximum allowed value |
| minimum | `number` | | Minimum allowed value |
| format | `"float"` \| `"int64"` | | Number format validation |
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
- **placeholder**: Input placeholder
- **copy**: Show copy button
- **hidden**: Hide field
- **inputProps**: Additional input properties

## Example JSON

```json
{
  "type": "number",
  "defaultValue": 0,
  "required": true,
  "minimum": 0,
  "maximum": 100,
  "format": "int64",
  "viewSpec": {
    "type": "input",
    "layoutTitle": "Age",
    "layoutDescription": "Enter your age (0-100)",
    "placeholder": "Enter age"
  }
}
```

## Example with Float

```json
{
  "type": "number",
  "required": true,
  "minimum": 0.0,
  "maximum": 999999.99,
  "format": "float",
  "viewSpec": {
    "type": "input",
    "layoutTitle": "Price",
    "layoutDescription": "Product price in USD",
    "placeholder": "0.00",
    "inputProps": {
      "step": "0.01"
    }
  }
}
```

## Example with Copy Button

```json
{
  "type": "number",
  "required": false,
  "format": "int64",
  "viewSpec": {
    "type": "input",
    "layoutTitle": "User ID",
    "copy": true,
    "disabled": true,
    "layoutDescription": "Unique identifier (read-only)"
  }
}
```

## Example in Form Context

```json
{
  "type": "object",
  "properties": {
    "quantity": {
      "type": "number",
      "required": true,
      "minimum": 1,
      "maximum": 1000,
      "format": "int64",
      "defaultValue": 1,
      "viewSpec": {
        "type": "input",
        "layoutTitle": "Quantity",
        "placeholder": "Enter quantity"
      }
    },
    "discount": {
      "type": "number",
      "required": false,
      "minimum": 0,
      "maximum": 100,
      "format": "float",
      "viewSpec": {
        "type": "input",
        "layoutTitle": "Discount %",
        "placeholder": "0.00"
      }
    },
    "totalPrice": {
      "type": "number",
      "required": true,
      "format": "float",
      "viewSpec": {
        "type": "input",
        "layoutTitle": "Total Price",
        "disabled": true,
        "copy": true
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Order Details"
  }
}
```