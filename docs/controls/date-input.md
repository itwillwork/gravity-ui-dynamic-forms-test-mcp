# String DateInput Control

## Description

Date picker control for string fields representing dates. Supports various date formats, timezones, and provides an intuitive calendar interface for date selection.

## Configuration

**Spec Type:** `StringSpec`  
**viewSpec.type:** `"date_input"` or `"date"`

## Properties

| Property | Type | Description |
|----------|------|-------------|
| required | `boolean` | Whether date selection is required |
| dateInput | `object` | Date-specific configuration |
| dateInput.outputFormat | `string` | Format for stored value (e.g., "YYYY-MM-DD") |
| dateInput.printFormat | `string` | Format for display (e.g., "MMM DD, YYYY") |
| dateInput.timeZone | `string` | Timezone (e.g., "UTC", "America/New_York") |
| inputProps | `object` | Props passed to underlying DatePicker component |

## Common inputProps

- **size**: `"s"` \| `"m"` \| `"l"` \| `"xl"` - Control size
- **format**: `string` - Display format (Day.js format)
- **minValue**: `string` - Minimum selectable date
- **maxValue**: `string` - Maximum selectable date
- **disabled**: `boolean` - Disable the control

## Date Format Tokens

Common Day.js format tokens:
- **YYYY**: 4-digit year (e.g., 2024)
- **MM**: 2-digit month (01-12)
- **DD**: 2-digit day (01-31)
- **MMM**: Short month name (Jan-Dec)
- **MMMM**: Full month name (January-December)

[Full format reference](https://day.js.org/docs/en/display/format)

## Example - Basic Date Input

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "date_input",
    "layoutTitle": "Birth Date",
    "layoutDescription": "Select your date of birth",
    "dateInput": {
      "outputFormat": "YYYY-MM-DD",
      "printFormat": "MMMM DD, YYYY"
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - With Min/Max Dates

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "date_input",
    "layoutTitle": "Appointment Date",
    "layoutDescription": "Select a date within the next 30 days",
    "dateInput": {
      "outputFormat": "YYYY-MM-DD",
      "printFormat": "MMM DD, YYYY",
      "timeZone": "UTC"
    },
    "inputProps": {
      "size": "l",
      "minValue": "2024-01-01",
      "maxValue": "2024-12-31"
    }
  }
}
```

## Example - With Custom Format

```json
{
  "type": "string",
  "required": false,
  "viewSpec": {
    "type": "date_input",
    "layoutTitle": "Event Date",
    "dateInput": {
      "outputFormat": "YYYY-MM-DD",
      "printFormat": "DD.MM.YYYY"
    },
    "inputProps": {
      "size": "l",
      "format": "DD.MM.YYYY"
    }
  }
}
```

## Example - With Timezone

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "date_input",
    "layoutTitle": "Meeting Date",
    "layoutDescription": "All times in Eastern Time",
    "dateInput": {
      "outputFormat": "YYYY-MM-DD",
      "printFormat": "MMMM DD, YYYY",
      "timeZone": "America/New_York"
    },
    "inputProps": {
      "size": "l"
    }
  }
}
```

## Example - Age Verification

```json
{
  "type": "string",
  "required": true,
  "viewSpec": {
    "type": "date_input",
    "layoutTitle": "Date of Birth",
    "layoutDescription": "You must be 18 or older",
    "dateInput": {
      "outputFormat": "YYYY-MM-DD",
      "printFormat": "MM/DD/YYYY"
    },
    "inputProps": {
      "size": "l",
      "minValue": "1900-01-01",
      "maxValue": "2006-12-31"
    }
  }
}
```

## Example - Form with Multiple Dates

```json
{
  "type": "object",
  "properties": {
    "startDate": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "date_input",
        "layoutTitle": "Start Date",
        "dateInput": {
          "outputFormat": "YYYY-MM-DD",
          "printFormat": "MMM DD, YYYY"
        },
        "inputProps": {
          "size": "l"
        }
      }
    },
    "endDate": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "date_input",
        "layoutTitle": "End Date",
        "dateInput": {
          "outputFormat": "YYYY-MM-DD",
          "printFormat": "MMM DD, YYYY"
        },
        "inputProps": {
          "size": "l"
        }
      }
    },
    "reminderDate": {
      "type": "string",
      "required": false,
      "viewSpec": {
        "type": "date_input",
        "layoutTitle": "Reminder Date",
        "layoutDescription": "Optional reminder before end date",
        "dateInput": {
          "outputFormat": "YYYY-MM-DD",
          "printFormat": "MMM DD, YYYY"
        },
        "inputProps": {
          "size": "l"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Project Timeline",
    "order": ["startDate", "endDate", "reminderDate"]
  }
}
```

## Example - Booking Form

```json
{
  "type": "object",
  "properties": {
    "checkIn": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "date_input",
        "layoutTitle": "Check-in Date",
        "dateInput": {
          "outputFormat": "YYYY-MM-DD",
          "printFormat": "ddd, MMM DD, YYYY"
        },
        "inputProps": {
          "size": "l",
          "minValue": "2024-01-01"
        }
      }
    },
    "checkOut": {
      "type": "string",
      "required": true,
      "viewSpec": {
        "type": "date_input",
        "layoutTitle": "Check-out Date",
        "dateInput": {
          "outputFormat": "YYYY-MM-DD",
          "printFormat": "ddd, MMM DD, YYYY"
        },
        "inputProps": {
          "size": "l",
          "minValue": "2024-01-01"
        }
      }
    }
  },
  "viewSpec": {
    "type": "object",
    "layoutTitle": "Hotel Reservation",
    "order": ["checkIn", "checkOut"]
  }
}
```

## Timezone List

Common timezones:
- **UTC**: Coordinated Universal Time
- **America/New_York**: Eastern Time
- **America/Chicago**: Central Time
- **America/Los_Angeles**: Pacific Time
- **Europe/London**: GMT/BST
- **Europe/Paris**: Central European Time
- **Asia/Tokyo**: Japan Standard Time

[Full timezone list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)

## References

- [Gravity UI DatePicker](https://github.com/gravity-ui/date-components/tree/main/src/components/DatePicker)
- [DatePicker Documentation](https://preview.gravity-ui.com/date-components/?path=/docs/components-datepicker--docs)
- [Day.js Format](https://day.js.org/docs/en/display/format)
- [Storybook Demo](https://preview.gravity-ui.com/dynamic-forms/?path=/story/string-dateinput--date-input)
