import type {
    FormField,
} from '@features/form-builder/model/form-builder.types';

export type FieldValidator = (
    field: FormField,
    value: string,
) => string | undefined;

const requiredValidator: FieldValidator = (
    field,
    value,
) => {
    if (!field.required) {
        return undefined;
    }

    if (value.trim() === '') {
        return `${field.label} is required`;
    }

    return undefined;
};

const numberValidator: FieldValidator = (
    field,
    value,
) => {
    if (field.type !== 'number') {
        return undefined;
    }

    if (value.trim() === '') {
        return undefined;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
        return `${field.label} must be a valid number`;
    }

    if (
        field.min !== undefined &&
        numericValue < field.min
    ) {
        return `${field.label} must be at least ${field.min}`;
    }

    if (
        field.max !== undefined &&
        numericValue > field.max
    ) {
        return `${field.label} must be at most ${field.max}`;
    }

    return undefined;
};

export const VALIDATION_REGISTRY = {
    text: [
        requiredValidator,
    ],

    number: [
        requiredValidator,
        numberValidator,
    ],

    group: [],
} satisfies Record<
    FormField['type'],
    FieldValidator[]
>;

export const validatePreviewField = (
    field: FormField,
    value: string,
): string | undefined => {
    const validators =
        VALIDATION_REGISTRY[field.type];

    for (const validator of validators) {
        const error = validator(
            field,
            value,
        );

        if (error) {
            return error;
        }
    }

    return undefined;
};