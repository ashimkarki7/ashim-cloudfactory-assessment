# Configurable Form Builder

A configurable and recursive form builder developed as part of a Senior Frontend Engineer technical assessment.

The application allows users to dynamically construct forms, configure individual field properties, create recursively nested groups, preview the generated form in real time, validate user input, and import/export the entire form configuration as JSON.

## Features

### Form Builder

The builder supports three field types:

- Text
- Number
- Group

Groups can contain text fields, number fields, and additional groups recursively.

Each field supports:

- Label configuration
- Required state
- Delete
- Move up
- Move down

Number fields additionally support:

- Minimum value
- Maximum value

### Recursive Groups

Groups can be nested to an arbitrary depth.

For example:

```text
Personal Information
├── Name
├── Age
└── Address
    ├── Street
    └── Location
        ├── City
        └── Postal Code