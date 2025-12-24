# Number Base Control

## Description

Numeric text input control for number fields. Supports validation for integers and floating-point numbers with min/max constraints.

## Configuration

**Spec Type:** `NumberSpec`  
**viewSpec.type:** `"base"` or `"input"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| minimum | `number` | Minimum allowed value |
| maximum | `number` | Maximum allowed value |
| format | `"int64"` \| `"float"` | Number format validation |
| defaultValue | `number` | Initial value |
| inputProps | `object` | Props passed to underlying TextInput component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` \| `"xl"` - Input size
- **type**: `"number"` - HTML input type
- **step**: `string` \| `number` - Step value for number input
- **leftContent**: `ReactNode` - Content on the left side (e.g., currency symbol)
- **rightContent**: `ReactNode` - Content on the right side (e.g., unit)
- **hasClear**: `boolean` - Show clear button
- **disabled**: `boolean` - Disable the control

## Example - Basic Integer Input

```json
{
  "type": "number",
  "required": true,
  "minimum": 1,
  "maximum": 100,
  "format": "int64",
  "defaultValue": 1,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Quantity",
    "layoutDescription": "Enter quantity (1-100)",
    "placeholder": "0",
    "inputProps": {
      "size": "l",
      "type": "number"
    }
  }
}
```

## Example - Currency Input

```json
{
  "type": "number",
  "required": true,
  "minimum": 0,
  "maximum": 999999.99,
  "format": "float",
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Price",
    "layoutDescription": "Enter product price",
    "placeholder": "0.00",
    "inputProps": {
      "size": "l",
      "type": "number",
      "step": "0.01",
      "leftContent": "$"
    }
  }
}
```

## Example - Percentage Input

```json
{
  "type": "number",
  "required": false,
  "minimum": 0,
  "maximum": 100,
  "format": "float",
  "defaultValue": 0,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Discount",
    "layoutDescription": "Discount percentage",
    "placeholder": "0",
    "inputProps": {
      "size": "l",
      "type": "number",
      "step": "0.1",
      "rightContent": "%"
    }
  }
}
```

## Example - Read-only with Copy

```json
{
  "type": "number",
  "required": false,
  "format": "int64",
  "viewSpec": {
    "type": "base",
    "layoutTitle": "User ID",
    "layoutDescription": "Unique identifier (read-only)",
    "copy": true,
    "disabled": true,
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - Number Fields in Form

```json
{
  "type": "object",
  "properties": {
    "age": {
      "type": "number",
      "required": true,
      "minimum": 18,
      "maximum": 120,
      "format": "int64",
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Age",
        "placeholder": "18",
        "inputProps": {
          "size": "l",
          "type": "number"
        }
      }
    },
    "salary": {
      "type": "number",
      "required": false,
      "minimum": 0,
      "format": "float",
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Expected Salary",
        "placeholder": "0.00",
        "inputProps": {
          "size": "l",
          "type": "number",
          "step": "1000",
          "leftContent": "$",
          "rightContent": "/year"
        }
      }
    },
    "experience": {
      "type": "number",
      "required": true,
      "minimum": 0,
      "maximum": 50,
      "format": "int64",
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Years of Experience",
        "inputProps": {
          "size": "l",
          "type": "number",
          "rightContent": "years"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Professional Information"
  }
}
```

## References

- [Gravity UI TextInput](https://github.com/gravity-ui/uikit/tree/main/src/components/Text)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/number-base--base)
