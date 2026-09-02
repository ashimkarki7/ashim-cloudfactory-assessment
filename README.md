# Configurable Form Builder

Senior Frontend Engineer technical assessment implementation.

The application allows users to dynamically create form fields, configure their properties, create recursively nested groups, preview the generated form, validate input, and import/export the configuration as JSON.

## Features

- Text fields
- Number fields with optional min/max
- Recursive groups
- Configurable labels
- Required fields
- Delete fields
- Move fields up/down within the same group
- Live form preview
- Required and numeric validation
- Required group validation
- JSON export
- Validated JSON import
- Duplicate ID validation
- Recursive configuration validation

## Technical Approach

Built with:

- React
- TypeScript
- Vite
- Context API
- useReducer
- Custom hooks
- Native HTML controls
- CSS

No state management library, form library, validation library, or UI framework is used.

## Architecture

The project uses feature-based organization:

```text
src/
├── features/
│   └── form-builder/
│       ├── components/
│       ├── hooks/
│       ├── model/
│       └── utils/
└── shared/
    └── components/