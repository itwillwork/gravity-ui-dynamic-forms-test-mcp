# Boolean Base Control (Checkbox)

## Description

Standard checkbox control for boolean fields. Provides a simple way to represent true/false values with an optional label.

## Configuration

**Spec Type:** `BooleanSpec`  
**viewSpec.type:** `"base"` or `"checkbox"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| required | `boolean` | Shows error if value is false when true |
| defaultValue | `boolean` | Initial checkbox state |
| inputProps | `object` | Props passed to underlying Checkbox component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` - Control size
- **content**: `string` \| `ReactNode` - Label content
- **disabled**: `boolean` - Disable the control
- **indeterminate**: `boolean` - Show indeterminate state

## Example - Basic Checkbox

```json
{
  "type": "boolean",
  "defaultValue": false,
  "required": false,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Subscribe to Newsletter",
    "layoutDescription": "Receive updates about new features",
    "inputProps": {
      "size": "l",
      "content": "Yes, I want to receive newsletter"
    }
  }
}
```

## Example - Required Checkbox

```json
{
  "type": "boolean",
  "defaultValue": false,
  "required": true,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Terms and Conditions",
    "layoutDescription": "You must accept to continue",
    "inputProps": {
      "size": "l",
      "content": "I have read and agree to the Terms and Conditions"
    }
  }
}
```

## Example - Disabled Checkbox

```json
{
  "type": "boolean",
  "defaultValue": true,
  "viewSpec": {
    "type": "base",
    "layoutTitle": "Email Verified",
    "layoutDescription": "This status is managed by the system",
    "disabled": true,
    "inputProps": {
      "size": "m",
      "content": "Email address has been verified"
    }
  }
}
```

## Example - Multiple Checkboxes in Form

```json
{
  "type": "object",
  "properties": {
    "acceptTerms": {
      "type": "boolean",
      "required": true,
      "defaultValue": false,
      "viewSpec": {
        "type": "base",
        "layoutTitle": "I accept the Terms of Service",
        "inputProps": {
          "size": "l"
        }
      }
    },
    "acceptPrivacy": {
      "type": "boolean",
      "required": true,
      "defaultValue": false,
      "viewSpec": {
        "type": "base",
        "layoutTitle": "I accept the Privacy Policy",
        "inputProps": {
          "size": "l"
        }
      }
    },
    "subscribe": {
      "type": "boolean",
      "defaultValue": true,
      "viewSpec": {
        "type": "base",
        "layoutTitle": "Subscribe to marketing emails",
        "inputProps": {
          "size": "l"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Preferences",
    "order": ["acceptTerms", "acceptPrivacy", "subscribe"]
  }
}
```

## References

- [Gravity UI Checkbox](https://github.com/gravity-ui/uikit/tree/main/src/components/Checkbox)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/boolean-base--base)
