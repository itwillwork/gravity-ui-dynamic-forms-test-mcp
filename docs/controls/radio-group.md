# String RadioGroup Control

## Description

Radio button group control for string fields with enum values. Allows users to select a single option from a set of mutually exclusive choices displayed as radio buttons.

## Configuration

**Spec Type:** `StringSpec`  
**viewSpec.type:** `"radio_group"` or `"radio"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| enum | `string[]` | List of available options (required) |
| description | `Record<string, string>` | Human-readable labels for enum values |
| required | `boolean` | Whether selection is required |
| radioGroupParams | `object` | Radio group specific configuration |
| radioGroupParams.direction | `"horizontal"` \| `"vertical"` | Layout direction (default: "horizontal") |
| radioGroupParams.disabled | `Record<string, boolean>` | Disable specific radio options |
| inputProps | `object` | Props passed to underlying RadioGroup component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` - Control size
- **disabled**: `boolean` - Disable all options

## Example - Basic Radio Group (Horizontal)

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
    "type": "radio_group",
    "layoutTitle": "Gender",
    "radioGroupParams": {
      "direction": "horizontal"
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - Vertical Radio Group

```json
{
  "type": "string",
  "required": true,
  "defaultValue": "standard",
  "enum": ["standard", "express", "overnight"],
  "description": {
    "standard": "Standard Delivery (5-7 days)",
    "express": "Express Delivery (2-3 days)",
    "overnight": "Overnight Delivery (1 day)"
  },
  "viewSpec": {
    "type": "radio_group",
    "layoutTitle": "Shipping Method",
    "layoutDescription": "Choose your preferred delivery speed",
    "radioGroupParams": {
      "direction": "vertical"
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - With Disabled Options

```json
{
  "type": "string",
  "required": true,
  "enum": ["free", "basic", "premium", "enterprise"],
  "description": {
    "free": "Free Plan - $0/month",
    "basic": "Basic Plan - $9/month",
    "premium": "Premium Plan - $29/month",
    "enterprise": "Enterprise Plan - Contact Sales"
  },
  "viewSpec": {
    "type": "radio_group",
    "layoutTitle": "Subscription Plan",
    "radioGroupParams": {
      "direction": "vertical",
      "disabled": {
        "enterprise": true
      }
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - Yes/No Question

```json
{
  "type": "string",
  "required": true,
  "enum": ["yes", "no"],
  "description": {
    "yes": "Yes",
    "no": "No"
  },
  "viewSpec": {
    "type": "radio_group",
    "layoutTitle": "Do you have previous experience?",
    "radioGroupParams": {
      "direction": "horizontal"
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - Priority Selection

```json
{
  "type": "string",
  "required": true,
  "defaultValue": "medium",
  "enum": ["low", "medium", "high", "critical"],
  "description": {
    "low": "Low - Can wait",
    "medium": "Medium - Normal priority",
    "high": "High - Important",
    "critical": "Critical - Urgent"
  },
  "viewSpec": {
    "type": "radio_group",
    "layoutTitle": "Issue Priority",
    "radioGroupParams": {
      "direction": "vertical"
    },
    "inputProps": {
      "size": "m"
    }
  }
}
```

## Example - Form with Multiple Radio Groups

```json
{
  "type": "object",
  "properties": {
    "accountType": {
      "type": "string",
      "required": true,
      "enum": ["personal", "business"],
      "description": {
        "personal": "Personal Account",
        "business": "Business Account"
      },
      "viewSpec": {
        "type": "radio_group",
        "layoutTitle": "Account Type",
        "radioGroupParams": {
          "direction": "horizontal"
        },
        "inputProps": {
          "size": "l"
        }
      }
    },
    "paymentFrequency": {
      "type": "string",
      "required": true,
      "enum": ["monthly", "quarterly", "annually"],
      "description": {
        "monthly": "Monthly",
        "quarterly": "Quarterly (Save 10%)",
        "annually": "Annually (Save 20%)"
      },
      "viewSpec": {
        "type": "radio_group",
        "layoutTitle": "Payment Frequency",
        "radioGroupParams": {
          "direction": "vertical"
        },
        "inputProps": {
          "size": "l"
        }
      }
    },
    "notificationPreference": {
      "type": "string",
      "required": true,
      "defaultValue": "email",
      "enum": ["email", "sms", "push", "none"],
      "description": {
        "email": "Email Notifications",
        "sms": "SMS Notifications",
        "push": "Push Notifications",
        "none": "No Notifications"
      },
      "viewSpec": {
        "type": "radio_group",
        "layoutTitle": "Notification Preference",
        "radioGroupParams": {
          "direction": "vertical"
        },
        "inputProps": {
          "size": "l"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Account Settings",
    "order": ["accountType", "paymentFrequency", "notificationPreference"]
  }
}
```

## Example - Survey Form

```json
{
  "type": "object",
  "properties": {
    "satisfaction": {
      "type": "string",
      "required": true,
      "enum": ["very_satisfied", "satisfied", "neutral", "dissatisfied", "very_dissatisfied"],
      "description": {
        "very_satisfied": "Very Satisfied",
        "satisfied": "Satisfied",
        "neutral": "Neutral",
        "dissatisfied": "Dissatisfied",
        "very_dissatisfied": "Very Dissatisfied"
      },
      "viewSpec": {
        "type": "radio_group",
        "layoutTitle": "How satisfied are you with our service?",
        "radioGroupParams": {
          "direction": "vertical"
        },
        "inputProps": {
          "size": "l"
        }
      }
    },
    "recommend": {
      "type": "string",
      "required": true,
      "enum": ["definitely", "probably", "not_sure", "probably_not", "definitely_not"],
      "description": {
        "definitely": "Definitely Yes",
        "probably": "Probably Yes",
        "not_sure": "Not Sure",
        "probably_not": "Probably Not",
        "definitely_not": "Definitely Not"
      },
      "viewSpec": {
        "type": "radio_group",
        "layoutTitle": "Would you recommend us to others?",
        "radioGroupParams": {
          "direction": "vertical"
        },
        "inputProps": {
          "size": "l"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Customer Satisfaction Survey",
    "order": ["satisfaction", "recommend"]
  }
}
```

## When to Use Radio Group vs Select

**Use Radio Group when:**
- You have 2-5 options
- All options should be visible at once
- The choice is important and should be emphasized
- You want to reduce cognitive load

**Use Select when:**
- You have many options (6+)
- Space is limited
- Options are familiar to users
- Filtering might be helpful

## References

- [Gravity UI RadioGroup](https://github.com/gravity-ui/uikit/tree/main/src/components/RadioGroup)
- [RadioGroup Documentation](https://preview.gravity-ui.com/uikit/?path=/docs/components-inputs-radiogroup--docs)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/string-radiogroup--radio-group)