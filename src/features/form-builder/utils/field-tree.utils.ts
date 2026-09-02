import type { FormField } from '@features/form-builder/model/form-builder.types';
import type {MoveDirection} from '@features/form-builder/model/field.constants.ts';




export const findFieldById = (
    fields: FormField[],
    fieldId: string,
): FormField | undefined => {
    for (const field of fields) {
        if (field.id === fieldId) {
            return field;
        }

        if (field.type === 'group') {
            const foundField = findFieldById(
                field.children,
                fieldId,
            );

            if (foundField) {
                return foundField;
            }
        }
    }

    return undefined;
};

export const addField = (
    fields: FormField[],
    field: FormField,
    parentId: string | null,
): FormField[] => {
    if (parentId === null) {
        return [...fields, field];
    }

    return fields.map((currentField) => {
        if (
            currentField.type === 'group' &&
            currentField.id === parentId
        ) {
            return {
                ...currentField,
                children: [
                    ...currentField.children,
                    field,
                ],
            };
        }

        if (currentField.type === 'group') {
            return {
                ...currentField,
                children: addField(
                    currentField.children,
                    field,
                    parentId,
                ),
            };
        }

        return currentField;
    });
};

export const deleteField = (
    fields: FormField[],
    fieldId: string,
): FormField[] =>
    fields
        .filter((field) => field.id !== fieldId)
        .map((field) => {
            if (field.type !== 'group') {
                return field;
            }

            return {
                ...field,
                children: deleteField(
                    field.children,
                    fieldId,
                ),
            };
        });

export const updateField = (
    fields: FormField[],
    fieldId: string,
    updater: (field: FormField) => FormField,
): FormField[] =>
    fields.map((field) => {
        if (field.id === fieldId) {
            return updater(field);
        }

        if (field.type === 'group') {
            return {
                ...field,
                children: updateField(
                    field.children,
                    fieldId,
                    updater,
                ),
            };
        }

        return field;
    });

const reorderFields = (
    fields: FormField[],
    fieldId: string,
    direction: MoveDirection,
): FormField[] => {
    const currentIndex = fields.findIndex(
        (field) => field.id === fieldId,
    );

    if (currentIndex === -1) {
        return fields;
    }

    const targetIndex =
        direction === 'up'
            ? currentIndex - 1
            : currentIndex + 1;

    if (
        targetIndex < 0 ||
        targetIndex >= fields.length
    ) {
        return fields;
    }

    const updatedFields = [...fields];

    const currentField = updatedFields[currentIndex];
    const targetField = updatedFields[targetIndex];

    if (!currentField || !targetField) {
        return fields;
    }

    updatedFields[currentIndex] = targetField;
    updatedFields[targetIndex] = currentField;

    return updatedFields;
};

export const moveField = (
    fields: FormField[],
    fieldId: string,
    direction: MoveDirection,
): FormField[] => {
    const existsAtCurrentLevel = fields.some(
        (field) => field.id === fieldId,
    );

    if (existsAtCurrentLevel) {
        return reorderFields(
            fields,
            fieldId,
            direction,
        );
    }

    return fields.map((field) => {
        if (field.type !== 'group') {
            return field;
        }

        return {
            ...field,
            children: moveField(
                field.children,
                fieldId,
                direction,
            ),
        };
    });
}


export const getFieldConfigurationError = (
    field: FormField,
): string | undefined => {
    if (field.label.trim() === '') {
        return 'Field label cannot be empty.';
    }

    if (
        field.type === 'number' &&
        field.min !== undefined &&
        field.max !== undefined &&
        field.min > field.max
    ) {
        return 'Minimum value cannot be greater than maximum value.';
    }

    return undefined;
};;