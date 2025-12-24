# String Password Control

## Description

Password input control with show/hide toggle functionality. Provides secure text input with option to reveal the password.

## Configuration

**Spec Type:** `StringSpec`  
**viewSpec.type:** `"password"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| minLength | `integer` | Minimum password length |
| maxLength | `integer` | Maximum password length |
| pattern | `string` | RegExp pattern for validation (e.g., complexity rules) |
| patternError | `string` | Custom error message for pattern validation |
| required | `boolean` | Whether field is required |
| inputProps | `object` | Props passed to underlying TextInput component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` \| `"xl"` - Input size
- **autoComplete**: `"new-password"` \| `"current-password"` - Autocomplete hint
- **disabled**: `boolean` - Disable the control
- **hasClear**: `boolean` - Show clear button

## Example - Basic Password

```json
{
  "type": "string",
  "required": true,
  "minLength": 8,
  "viewSpec": {
    "type": "password",
    "layoutTitle": "Password",
    "layoutDescription": "At least 8 characters",
    "placeholder": "Enter password",
    "inputProps": {
      "size": "l",
      "autoComplete": "new-password"
    }
  }
}
```

## Example - Password with Complexity Rules

```json
{
  "type": "string",
  "required": true,
  "minLength": 8,
  "maxLength": 128,
  "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
  "patternError": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  "viewSpec": {
    "type": "password",
    "layoutTitle": "Password",
    "layoutDescription": "Must include uppercase, lowercase, number, and special character",
    "placeholder": "Enter strong password",
    "inputProps": {
      "size": "l",
      "autoComplete": "new-password"
    }
  }
}
```

## Example - Current Password

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "password",
    "layoutTitle": "Current Password",
    "layoutDescription": "Enter your current password to confirm changes",
    "placeholder": "Current password",
    "inputProps": {
      "size": "l",
      "autoComplete": "current-password"
    }
  }
}
```

## Example - Password Change Form

```json
{
  "type": "object",
  "properties": {
    "currentPassword": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "password",
        "layoutTitle": "Current Password",
        "placeholder": "Enter current password",
        "inputProps": {
          "size": "l",
          "autoComplete": "current-password"
        }
      }
    },
    "newPassword": {
      "type": "string",
      "required": true,
      "minLength": 8,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$",
      "patternError": "Password must be at least 8 characters with uppercase, lowercase, and numbers",
      "viewSpec": {
        "type": "password",
        "layoutTitle": "New Password",
        "layoutDescription": "At least 8 characters with uppercase, lowercase, and numbers",
        "placeholder": "Enter new password",
        "inputProps": {
          "size": "l",
          "autoComplete": "new-password"
        }
      }
    },
    "confirmPassword": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "password",
        "layoutTitle": "Confirm New Password",
        "placeholder": "Re-enter new password",
        "inputProps": {
          "size": "l",
          "autoComplete": "new-password"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Change Password",
    "layoutDescription": "Update your account password",
    "order": ["currentPassword", "newPassword", "confirmPassword"]
  }
}
```

## Example - Registration Form

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "required": true,
      "pattern": "^[^@]+@[^@]+\\.[^@]+$",
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Email",
        "placeholder": "user@example.com",
        "inputProps": {
          "size": "l",
          "type": "email"
        }
      }
    },
    "password": {
      "type": "string",
      "required": true,
      "minLength": 12,
      "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$",
      "patternError": "Password must be 12+ characters with uppercase, lowercase, number, and special character",
      "viewSpec": {
        "type": "password",
        "layoutTitle": "Password",
        "layoutDescription": "Minimum 12 characters with mixed case, numbers, and symbols",
        "inputProps": {
          "size": "l",
          "autoComplete": "new-password"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Create Account"
  }
}
```

## Security Best Practices

1. **Minimum Length**: Use at least 8 characters, preferably 12+
2. **Complexity**: Require mix of uppercase, lowercase, numbers, and special characters
3. **AutoComplete**: Use appropriate autocomplete values
4. **No Validation on Type**: Avoid showing password strength while typing (for UX)
5. **Max Length**: Set reasonable maximum (e.g., 128 characters)

## References

- [Gravity UI TextInput](https://github.com/gravity-ui/uikit/tree/main/src/components/Text)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/string-password--password)
