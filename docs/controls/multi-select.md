# Array Select Control

## Description

Multi-select dropdown control for array fields. Allows users to select multiple values from a predefined list of options (enum). Built on top of Gravity UI Select component with multi-selection support.

## Configuration

**Spec Type:** `ArraySpec`  
**viewSpec.type:** `"select"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| enum | `string[]` | List of available options |
| description | `Record<string, string>` | Human-readable labels for enum values |
| selectParams | `object` | Additional select configuration |
| selectParams.filterPlaceholder | `string` | Placeholder text for search filter |
| selectParams.meta | `Record<string, string>` | Additional descriptive text for options |
| inputProps | `object` | Props passed to underlying Select component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` \| `"xl"` - Control size
- **width**: `"auto"` \| `"max"` - Width behavior
- **disabled**: `boolean` - Disable the control
- **filterable**: `boolean` - Enable option filtering

## Example - Basic Multi-Select

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
    "layoutDescription": "Select languages you know",
    "placeholder": "Choose languages...",
    "inputProps": {
      "size": "l",
      "width": "max"
    }
  }
}
```

## Example - With Filter and Meta Information

```json
{
  "type": "array",
  "required": false,
  "minLength": 1,
  "maxLength": 5,
  "enum": ["admin", "editor", "viewer", "contributor", "guest"],
  "description": {
    "admin": "Administrator",
    "editor": "Editor",
    "viewer": "Viewer",
    "contributor": "Contributor",
    "guest": "Guest"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "User Roles",
    "layoutDescription": "Assign roles to the user (max 5)",
    "selectParams": {
      "filterPlaceholder": "Search roles...",
      "meta": {
        "admin": "Full system access",
        "editor": "Can edit content",
        "viewer": "Read-only access",
        "contributor": "Can create and edit own content",
        "guest": "Limited access"
      }
    },
    "inputProps": {
      "size": "l",
      "width": "max",
      "filterable": true
    }
  }
}
```

## Example - In Form Context

```json
{
  "type": "object",
  "properties": {
    "skills": {
      "type": "array",
      "required": true,
      "minLength": 3,
      "enum": [
        "html",
        "css",
        "javascript",
        "react",
        "vue",
        "angular",
        "nodejs",
        "python",
        "docker",
        "kubernetes"
      ],
      "description": {
        "html": "HTML",
        "css": "CSS",
        "javascript": "JavaScript",
        "react": "React",
        "vue": "Vue.js",
        "angular": "Angular",
        "nodejs": "Node.js",
        "python": "Python",
        "docker": "Docker",
        "kubernetes": "Kubernetes"
      },
      "viewSpec": {
        "type": "select",
        "layoutTitle": "Technical Skills",
        "layoutDescription": "Select at least 3 skills",
        "selectParams": {
          "filterPlaceholder": "Search skills..."
        },
        "inputProps": {
          "size": "l"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Developer Profile"
  }
}
```

## References

- [Gravity UI Select](https://github.com/gravity-ui/uikit/tree/main/src/components/Select)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/array-select--select)
