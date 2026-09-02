import {
    FORM_BUILDER_ACTION,
    type FormBuilderAction,
} from '@features/form-builder/model/form-builder.actions';

import type {
    FormBuilderState,
    FormField,
} from '@features/form-builder/model/form-builder.types';

import type {
    EditablePropertyKey, EditablePropertyValue,
} from '@features/form-builder/model/property.registry';

import {
    addField,
    deleteField,
    findFieldById,
    moveField,
    updateField,
} from '@features/form-builder/utils/field-tree.utils';

const updateFieldProperty = (
    field: FormField,
    key: EditablePropertyKey,
    value: EditablePropertyValue,
): FormField => {
    switch (key) {
        case 'label':
            return {
                ...field,
                label: String(value),
            };

        case 'required':
            return {
                ...field,
                required: Boolean(value),
            };

        case 'min':
        case 'max': {
            if (field.type !== 'number') {
                return field;
            }

            if (value === '' || value === undefined) {
                const updatedField = {
                    ...field,
                };

                delete updatedField[key];

                return updatedField;
            }

            return {
                ...field,
                [key]: Number(value),
            };
        }

        default:
            return field;
    }
};

export const formBuilderReducer = (
    state: FormBuilderState,
    action: FormBuilderAction,
): FormBuilderState => {
    switch (action.type) {
        case FORM_BUILDER_ACTION.ADD_FIELD:
            return {
                ...state,
                fields: addField(
                    state.fields,
                    action.payload.field,
                    action.payload.parentId,
                ),
            };

        case FORM_BUILDER_ACTION.UPDATE_FIELD:
            return {
                ...state,
                fields: updateField(
                    state.fields,
                    action.payload.fieldId,
                    (field) =>
                        updateFieldProperty(
                            field,
                            action.payload.key,
                            action.payload.value,
                        ),
                ),
            };

        case FORM_BUILDER_ACTION.DELETE_FIELD: {
            const updatedFields = deleteField(
                state.fields,
                action.payload.fieldId,
            );

            const selectedFieldStillExists =
                state.selectedFieldId === null ||
                Boolean(
                    findFieldById(
                        updatedFields,
                        state.selectedFieldId,
                    ),
                );

            return {
                ...state,
                fields: updatedFields,
                selectedFieldId: selectedFieldStillExists
                    ? state.selectedFieldId
                    : null,
            };
        }

        case FORM_BUILDER_ACTION.MOVE_FIELD:
            return {
                ...state,
                fields: moveField(
                    state.fields,
                    action.payload.fieldId,
                    action.payload.direction,
                ),
            };

        case FORM_BUILDER_ACTION.SELECT_FIELD:
            return {
                ...state,
                selectedFieldId: action.payload.fieldId,
            };

        case FORM_BUILDER_ACTION.IMPORT_CONFIG:
            return {
                fields: action.payload.fields,
                selectedFieldId: null,
            };

        default:
            return state;
    }
};