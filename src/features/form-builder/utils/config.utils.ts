import { FIELD_TYPE } from '@features/form-builder/model/field.constants';

import type {
    FieldType,
} from '@features/form-builder/model/field.constants';

import type {
    BaseField,
    FormField,
    GroupField,
    NumberField,
    TextField,
} from '@features/form-builder/model/form-builder.types';

interface FormConfiguration {
    fields: FormField[];
}

export type ConfigParseResult =
    | {
    success: true;
    fields: FormField[];
}
    | {
    success: false;
    error: string;
};

const isRecord = (
    value: unknown,
): value is Record<string, unknown> =>
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value);

const isFieldType = (
    value: unknown,
): value is FieldType =>
    typeof value === 'string' &&
    Object.values(FIELD_TYPE).includes(
        value as FieldType,
    );

const isValidCommonField = (
    value: unknown,
): value is BaseField => {
    if (!isRecord(value)) {
        return false;
    }

    return (
        typeof value.id === 'string' &&
        value.id.trim() !== '' &&
        typeof value.label === 'string' &&
        typeof value.required === 'boolean' &&
        isFieldType(value.type)
    );
};

const isTextField = (
    value: unknown,
): value is TextField =>
    isValidCommonField(value) &&
    value.type === FIELD_TYPE.TEXT;

const isNumberField = (
    value: unknown,
): value is NumberField => {
    if (
        !isRecord(value) ||
        !isValidCommonField(value) ||
        value.type !== FIELD_TYPE.NUMBER
    ) {
        return false;
    }

    const min = value.min;
    const max = value.max;

    if (
        min !== undefined &&
        (
            typeof min !== 'number' ||
            !Number.isFinite(min)
        )
    ) {
        return false;
    }

    if (
        max !== undefined &&
        (
            typeof max !== 'number' ||
            !Number.isFinite(max)
        )
    ) {
        return false;
    }

    if (
        typeof min === 'number' &&
        typeof max === 'number' &&
        min > max
    ) {
        return false;
    }

    return true;
};

const isGroupField = (
    value: unknown,
    ids: Set<string>,
): value is GroupField => {
    if (
        !isRecord(value) ||
        !isValidCommonField(value) ||
        value.type !== FIELD_TYPE.GROUP ||
        !Array.isArray(value.children)
    ) {
        return false;
    }

    return value.children.every(
        (child) =>
            isFormField(
                child,
                ids,
            ),
    );
};

const isFormField = (
    value: unknown,
    ids: Set<string>,
): value is FormField => {
    if (!isValidCommonField(value)) {
        return false;
    }

    /*
     * IDs identify fields throughout the builder.
     * Duplicate IDs would break selection, editing,
     * preview values and tree operations.
     */
    if (ids.has(value.id)) {
        return false;
    }

    ids.add(value.id);

    switch (value.type) {
        case FIELD_TYPE.TEXT:
            return isTextField(value);

        case FIELD_TYPE.NUMBER:
            return isNumberField(value);

        case FIELD_TYPE.GROUP:
            return isGroupField(
                value,
                ids,
            );

        default:
            return false;
    }
};

export const exportConfiguration = (
    fields: FormField[],
): string => {
    const configuration: FormConfiguration = {
        fields,
    };

    return JSON.stringify(
        configuration,
        null,
        2,
    );
};

export const parseConfiguration = (
    json: string,
): ConfigParseResult => {
    if (json.trim() === '') {
        return {
            success: false,
            error:
                'Paste a JSON configuration first.',
        };
    }

    try {
        const parsed: unknown =
            JSON.parse(json);

        if (!isRecord(parsed)) {
            return {
                success: false,
                error:
                    'Configuration must be a JSON object.',
            };
        }

        if (!Array.isArray(parsed.fields)) {
            return {
                success: false,
                error:
                    'Configuration must contain a fields array.',
            };
        }

        const ids = new Set<string>();

        const isValid =
            parsed.fields.every(
                (field) =>
                    isFormField(
                        field,
                        ids,
                    ),
            );

        if (!isValid) {
            return {
                success: false,
                error:
                    'Invalid form configuration. Check field types, properties, nested groups, number ranges and unique IDs.',
            };
        }

        return {
            success: true,
            fields: parsed.fields,
        };
    } catch {
        return {
            success: false,
            error: 'Invalid JSON syntax.',
        };
    }
};