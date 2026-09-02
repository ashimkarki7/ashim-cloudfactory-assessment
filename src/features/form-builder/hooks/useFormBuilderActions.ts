import {useFormBuilderDispatch} from '@features/form-builder/hooks/useFormBuilderDispatch.ts';
import {useCallback, useMemo} from 'react';
import type {FieldType, MoveDirection} from '@features/form-builder/model/field.constants.ts';
import {FIELD_DEFINITION_MAP} from '@features/form-builder/model/field.registry.ts';
import {FORM_BUILDER_ACTION} from '@features/form-builder/model/form-builder.actions.ts';
import type {EditablePropertyKey, EditablePropertyValue} from '@features/form-builder/model/property.registry.ts';
import type {FormField} from '@features/form-builder/model/form-builder.types.ts';

export const useFormBuilderActions = () => {
    const dispatch = useFormBuilderDispatch();

    const addField = useCallback(
        (
            type: FieldType,
            parentId: string | null = null,
        ) => {
            const field =
                FIELD_DEFINITION_MAP[type].create();

            dispatch({
                type: FORM_BUILDER_ACTION.ADD_FIELD,
                payload: {
                    field,
                    parentId,
                },
            });
        },
        [dispatch],
    );

    const updateField = useCallback(
        (
            fieldId: string,
            key: EditablePropertyKey,
            value: EditablePropertyValue,
        ) => {
            dispatch({
                type: FORM_BUILDER_ACTION.UPDATE_FIELD,
                payload: {
                    fieldId,
                    key,
                    value,
                },
            });
        },
        [dispatch],
    );

    const deleteField = useCallback(
        (fieldId: string) => {
            dispatch({
                type: FORM_BUILDER_ACTION.DELETE_FIELD,
                payload: {
                    fieldId,
                },
            });
        },
        [dispatch],
    );

    const moveField = useCallback(
        (
            fieldId: string,
            direction: MoveDirection,
        ) => {
            dispatch({
                type: FORM_BUILDER_ACTION.MOVE_FIELD,
                payload: {
                    fieldId,
                    direction,
                },
            });
        },
        [dispatch],
    );

    const selectField = useCallback(
        (fieldId: string | null) => {
            dispatch({
                type: FORM_BUILDER_ACTION.SELECT_FIELD,
                payload: {
                    fieldId,
                },
            });
        },
        [dispatch],
    );

    const importConfig = useCallback(
        (fields: FormField[]) => {
            dispatch({
                type: FORM_BUILDER_ACTION.IMPORT_CONFIG,
                payload: {
                    fields,
                },
            });
        },
        [dispatch],
    );

    return useMemo(
        () => ({
            addField,
            updateField,
            deleteField,
            moveField,
            selectField,
            importConfig,
        }),
        [
            addField,
            updateField,
            deleteField,
            moveField,
            selectField,
            importConfig,
        ],
    );
};