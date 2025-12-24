# Data Type to Spec Mapping

## Overview

Dynamic Forms supports five data types, each mapped to a specific Spec object that defines validation rules, default values, and rendering configuration.

## Type Mapping Table

| Spec Name | Type Value | Description | Available Controls |
|-----------|------------|-------------|-------------------|
| `ArraySpec` | `"array"` | Collection of elements | `select`, `table`, `array`, `checkbox-group` |
| `BooleanSpec` | `"boolean"` | True/false values | `base`, `checkbox`, `switch` |
| `NumberSpec` | `"number"` | Numeric values (integer/float) | `base`, `input` |
| `ObjectSpec` | `"object"` | Complex nested structures | `object`, `oneof`, `inline` |
| `StringSpec` | `"string"` | Text values | `base`, `input`, `password`, `select`, `textarea`, `date_input`, `radio_group`, `monaco`, `file`, `text-content` |

