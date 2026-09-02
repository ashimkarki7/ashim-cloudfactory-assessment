import type {
    FormField,
    FormValues,
    GroupField,
} from '@features/form-builder/model/form-builder.types';

export const getInputFields = (
    fields: FormField[],
): FormField[] =>
    fields.flatMap((field) => {
        if (field.type === 'group') {
            return getInputFields(
                field.children,
            );
        }

        return [field];
    });

export const getGroups = (
    fields: FormField[],
): GroupField[] =>
    fields.flatMap((field) => {
        if (field.type !== 'group') {
            return [];
        }

        return [
            field,
            ...getGroups(
                field.children,
            ),
        ];
    });

export const hasGroupValue = (
    field: FormField,
    values: FormValues,
): boolean => {
    if (field.type !== 'group') {
        return Boolean(
            values[field.id]?.trim(),
        );
    }

    return field.children.some(
        (child) =>
            hasGroupValue(
                child,
                values,
            ),
    );
};