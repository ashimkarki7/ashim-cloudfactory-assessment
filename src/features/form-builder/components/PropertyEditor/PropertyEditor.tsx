import {
    Checkbox,
    Input,
} from '@shared/components';

import {
    COMMON_FIELD_PROPERTIES,
    FIELD_PROPERTIES,
} from '@features/form-builder/model/property.registry.ts';

import { useFormBuilderActions } from '@features/form-builder/hooks/useFormBuilderActions.ts';

import type {
    EditablePropertyKey,
    PropertyDefinition,
} from '@features/form-builder/model/property.registry.ts';

import type {
    FormField,
} from '@features/form-builder/model/form-builder.types.ts';

import './PropertyEditor.css';

interface PropertyEditorProps {
    field: FormField;
}

export function PropertyEditor({
                                   field,
                               }: PropertyEditorProps) {
    const {
        updateField,
    } = useFormBuilderActions();

    const properties = [
        ...COMMON_FIELD_PROPERTIES,
        ...FIELD_PROPERTIES[field.type],
    ];

    const handleChange = (
        property: PropertyDefinition,
        value: string | boolean,
    ) => {
        updateField(
            field.id,
            property.key,
            value,
        );
    };

    return (
        <div className="property-editor">
            {properties.map((property) => (
                <PropertyControl
                    key={property.key}
                    field={field}
                    property={property}
                    onChange={handleChange}
                />
            ))}
        </div>
    );
}

interface PropertyControlProps {
    field: FormField;
    property: PropertyDefinition;
    onChange: (
        property: PropertyDefinition,
        value: string | boolean,
    ) => void;
}

function PropertyControl({
                             field,
                             property,
                             onChange,
                         }: PropertyControlProps) {
    const value = getPropertyValue(
        field,
        property.key,
    );

    const inputId =
        `${field.id}-${property.key}`;

    switch (property.inputType) {
        case 'checkbox':
            return (
                <Checkbox
                    id={inputId}
                    label={property.label}
                    checked={Boolean(value)}
                    onChange={(event) =>
                        onChange(
                            property,
                            event.target.checked,
                        )
                    }
                />
            );

        case 'number':
            return (
                <Input
                    id={inputId}
                    type="number"
                    label={property.label}
                    value={
                        value === undefined
                            ? ''
                            : String(value)
                    }
                    onChange={(event) =>
                        onChange(
                            property,
                            event.target.value,
                        )
                    }
                />
            );

        case 'text':
            return (
                <Input
                    id={inputId}
                    type="text"
                    label={property.label}
                    value={String(value ?? '')}
                    onChange={(event) =>
                        onChange(
                            property,
                            event.target.value,
                        )
                    }
                />
            );

        default:
            return null;
    }
}

const getPropertyValue = (
    field: FormField,
    key: EditablePropertyKey,
): string | number | boolean | undefined => {
    switch (key) {
        case 'label':
            return field.label;

        case 'required':
            return field.required;

        case 'min':
            return field.type === 'number'
                ? field.min
                : undefined;

        case 'max':
            return field.type === 'number'
                ? field.max
                : undefined;

        default:
            return undefined;
    }
};