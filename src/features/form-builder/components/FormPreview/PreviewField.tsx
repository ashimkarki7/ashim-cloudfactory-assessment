import { Input } from '@shared/components';

import type {
    FormField,
    FormValues,
} from '@features/form-builder/model/form-builder.types';

interface PreviewFieldProps {
    field: FormField;
    values: FormValues;

    getFieldError: (
        field: FormField,
    ) => string | undefined;

    setFieldValue: (
        fieldId: string,
        value: string,
    ) => void;

    touchField: (
        fieldId: string,
    ) => void;
}

export function PreviewField({
                                 field,
                                 values,
                                 getFieldError,
                                 setFieldValue,
                                 touchField,
                             }: PreviewFieldProps) {
    if (field.type === 'group') {
        return null;
    }

    const value =
        values[field.id] ?? '';

    const error =
        getFieldError(field);

    const label = field.required
        ? `${field.label} *`
        : field.label;

    if (field.type === 'number') {
        return (
            <Input
                id={`preview-${field.id}`}
                type="number"
                label={label}
                value={value}
                min={field.min}
                max={field.max}
                error={error}
                onChange={(event) =>
                    setFieldValue(
                        field.id,
                        event.target.value,
                    )
                }
                onBlur={() =>
                    touchField(field.id)
                }
            />
        );
    }

    return (
        <Input
            id={`preview-${field.id}`}
            type="text"
            label={label}
            value={value}
            error={error}
            onChange={(event) =>
                setFieldValue(
                    field.id,
                    event.target.value,
                )
            }
            onBlur={() =>
                touchField(field.id)
            }
        />
    );
}