# String Base Control

## Description

Standard text input control for string fields. Supports various validation rules including pattern matching, length constraints, and basic text input functionality.

## Configuration

**Spec Type:** `StringSpec`  
**viewSpec.type:** `"base"` or `"input"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| minLength | `integer` | Minimum string length |
| maxLength | `integer` | Maximum string length |
| pattern | `string` | RegExp pattern for validation |
| patternError | `string` | Custom error message for pattern validation |
| defaultValue | `string` | Initial value |
| inputProps | `object` | Props passed to underlying TextInput component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` \| `"xl"` - Input size
- **type**: `"text"` \| `"email"` \| `"url"` \| `"tel"` - HTML input type
- **autoComplete**: `string` - Autocomplete hint
- **hasClear**: `boolean` - Show clear button
- **leftContent**: `ReactNode` - Content on the left side
- **rightContent**: `ReactNode` - Content on the right side
- **disabled**: `boolean` - Disable the control

## Example - Basic Text Input

```json
{
  "type": "string",
  "required": true,
  "minLength": 3,
  "maxLength": 50,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Username",
    "layoutDescription": "Choose a unique username",
    "placeholder": "Enter username",
    "inputProps": {
      "size": "l",
      "hasClear": true,
      "autoComplete": "username"
    }
  }
}
```

## Example - Email Input with Pattern

```json
{
  "type": "string",
  "required": true,
  "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
  "patternError": "Please enter a valid email address",
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Email Address",
    "placeholder": "user@example.com",
    "inputProps": {
      "size": "l",
      "type": "email",
      "autoComplete": "email",
      "hasClear": true
    }
  }
}
```

## Example - Phone Number Input

```json
{
  "type": "string",
  "required": true,
  "pattern": "^\\+?[1-9]\\d{1,14}$",
  "patternError": "Please enter a valid phone number",
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Phone Number",
    "layoutDescription": "Include country code",
    "placeholder": "+1234567890",
    "inputProps": {
      "size": "l",
      "type": "tel",
      "autoComplete": "tel",
      "leftContent": "📞"
    }
  }
}
```

## Example - URL Input

```json
{
  "type": "string",
  "required": false,
  "pattern": "^https?://.*",
  "patternError": "URL must start with http:// or https://",
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Website",
    "placeholder": "https://example.com",
    "inputProps": {
      "size": "l",
      "type": "url",
      "hasClear": true
    }
  }
}
```

## Example - Read-only with Copy

```json
{
  "type": "string",
  "required": false,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "API Key",
    "layoutDescription": "Use this key for authentication",
    "copy": true,
    "disabled": true,
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - String Fields in Form

```json
{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "required": true,
      "minLength": 2,
      "maxLength": 50,
      "viewSpec": {
        "type": "base",
        "layoutTitle": "First Name",
        "placeholder": "John",
        "inputProps": {
          "size": "l",
          "autoComplete": "given-name"
        }
      }
    },
    "lastName": {
      "type": "string",
      "required": true,
      "minLength": 2,
      "maxLength": 50,
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Last Name",
        "placeholder": "Doe",
        "inputProps": {
          "size": "l",
          "autoComplete": "family-name"
        }
      }
    },
    "email": {
      "type": "string",
      "required": true,
      "pattern": "^[^@]+@[^@]+\\.[^@]+$",
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Email",
        "placeholder": "john.doe@example.com",
        "inputProps": {
          "size": "l",
          "type": "email",
          "autoComplete": "email"
        }
      }
    },
    "company": {
      "type": "string",
      "required": false,
      "maxLength": 100,
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Company",
        "placeholder": "Acme Inc.",
        "inputProps": {
          "size": "l",
          "autoComplete": "organization"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Contact Information",
    "order": ["firstName", "lastName", "email", "company"]
  }
}
```

## References

- [Gravity UI TextInput](https://github.com/gravity-ui/uikit/tree/main/src/components/Text)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/string-base--base)
