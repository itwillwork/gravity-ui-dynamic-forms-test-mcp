# String Select Control

## Description

Dropdown select control for string fields with predefined options. Allows users to choose a single value from an enum list with support for filtering and additional metadata.

## Configuration

**Spec Type:** `StringSpec`  
**viewSpec.type:** `"select"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| enum | `string[]` | List of available options (required) |
| description | `Record<string, string>` | Human-readable labels for enum values |
| required | `boolean` | Whether selection is required |
| selectParams | `object` | Additional select configuration |
| selectParams.filterPlaceholder | `string` | Placeholder for search filter |
| selectParams.meta | `Record<string, string>` | Additional descriptive text for options |
| inputProps | `object` | Props passed to underlying Select component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` \| `"xl"` - Control size
- **width**: `"auto"` \| `"max"` - Width behavior
- **disabled**: `boolean` - Disable the control
- **filterable**: `boolean` - Enable option filtering

## Example - Basic Select

```json
{
  "type": "string",
  "required": true,
  "enum": ["xs", "s", "m", "l", "xl"],
  "description": {
    "xs": "Extra Small",
    "s": "Small",
    "m": "Medium",
    "l": "Large",
    "xl": "Extra Large"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "Size",
    "layoutDescription": "Choose your size",
    "placeholder": "Select size",
    "inputProps": {
      "size": "l",
      "width": "max"
    }
  }
}
```

## Example - With Filter and Meta

```json
{
  "type": "string",
  "required": true,
  "enum": ["pending", "processing", "completed", "failed", "cancelled"],
  "description": {
    "pending": "Pending",
    "processing": "Processing",
    "completed": "Completed",
    "failed": "Failed",
    "cancelled": "Cancelled"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "Order Status",
    "layoutDescription": "Current status of the order",
    "selectParams": {
      "filterPlaceholder": "Search status...",
      "meta": {
        "pending": "Order is waiting to be processed",
        "processing": "Order is being prepared",
        "completed": "Order has been delivered",
        "failed": "Order processing failed",
        "cancelled": "Order was cancelled by user"
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

## Example - Country Select

```json
{
  "type": "string",
  "required": true,
  "enum": ["us", "uk", "ca", "au", "de", "fr", "jp", "cn", "in", "br"],
  "description": {
    "us": "United States",
    "uk": "United Kingdom",
    "ca": "Canada",
    "au": "Australia",
    "de": "Germany",
    "fr": "France",
    "jp": "Japan",
    "cn": "China",
    "in": "India",
    "br": "Brazil"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "Country",
    "layoutDescription": "Select your country",
    "selectParams": {
      "filterPlaceholder": "Search country...",
      "meta": {
        "us": "North America",
        "uk": "Europe",
        "ca": "North America",
        "au": "Oceania",
        "de": "Europe",
        "fr": "Europe",
        "jp": "Asia",
        "cn": "Asia",
        "in": "Asia",
        "br": "South America"
      }
    },
    "inputProps": {
      "size": "l",
      "filterable": true
    }
  }
}
```

## Example - Priority Select

```json
{
  "type": "string",
  "required": true,
  "defaultValue": "medium",
  "enum": ["low", "medium", "high", "critical"],
  "description": {
    "low": "Low Priority",
    "medium": "Medium Priority",
    "high": "High Priority",
    "critical": "Critical Priority"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "Priority",
    "selectParams": {
      "meta": {
        "low": "Can be addressed later",
        "medium": "Normal priority",
        "high": "Requires prompt attention",
        "critical": "Immediate action required"
      }
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - Form with Multiple Selects

```json
{
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "required": true,
      "enum": ["electronics", "clothing", "food", "books", "toys"],
      "description": {
        "electronics": "Electronics",
        "clothing": "Clothing",
        "food": "Food & Beverages",
        "books": "Books",
        "toys": "Toys & Games"
      },
      "viewSpec": {
        "type": "select",
        "layoutTitle": "Category",
        "inputProps": {
          "size": "l"
        }
      }
    },
    "condition": {
      "type": "string",
      "required": true,
      "enum": ["new", "like_new", "good", "fair", "poor"],
      "description": {
        "new": "Brand New",
        "like_new": "Like New",
        "good": "Good Condition",
        "fair": "Fair Condition",
        "poor": "Poor Condition"
      },
      "viewSpec": {
        "type": "select",
        "layoutTitle": "Condition",
        "selectParams": {
          "meta": {
            "new": "Never used, in original packaging",
            "like_new": "Barely used, excellent condition",
            "good": "Used with minor signs of wear",
            "fair": "Used with noticeable wear",
            "poor": "Heavy wear, may have defects"
          }
        },
        "inputProps": {
          "size": "l"
        }
      }
    },
    "availability": {
      "type": "string",
      "required": true,
      "defaultValue": "in_stock",
      "enum": ["in_stock", "limited", "out_of_stock", "preorder"],
      "description": {
        "in_stock": "In Stock",
        "limited": "Limited Stock",
        "out_of_stock": "Out of Stock",
        "preorder": "Pre-order"
      },
      "viewSpec": {
        "type": "select",
        "layoutTitle": "Availability",
        "inputProps": {
          "size": "l"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Product Details",
    "order": ["category", "condition", "availability"]
  }
}
```

## Example - Disabled Options (via visibility)

```json
{
  "type": "string",
  "required": true,
  "enum": ["standard", "premium", "enterprise", "_UNSPECIFIED"],
  "description": {
    "standard": "Standard Plan",
    "premium": "Premium Plan",
    "enterprise": "Enterprise Plan",
    "_UNSPECIFIED": "Not Specified"
  },
  "viewSpec": {
    "type": "select",
    "layoutTitle": "Subscription Plan",
    "hideValues": ["_UNSPECIFIED"],
    "selectParams": {
      "meta": {
        "standard": "$9.99/month",
        "premium": "$19.99/month",
        "enterprise": "Custom pricing"
      }
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## References

- [Gravity UI Select](https://github.com/gravity-ui/uikit/tree/main/src/components/Select)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/string-select--select)
