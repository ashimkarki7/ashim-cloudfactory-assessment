import {
    useCallback,
    useState,
} from 'react';

import { validatePreviewField } from '@features/form-builder/model/validation.registry';

import {
    getInputFields,
    hasGroupValue,
} from '@features/form-builder/utils/preview.utils';

import type {
    FormErrors,
    FormField,
    FormValues,
    GroupField,
} from '@features/form-builder/model/form-builder.types';

type TouchedFields =
    Record<string, boolean>;

export const useFormPreview = (
    fields: FormField[],
) => {
    const [
        values,
        setValues,
    ] = useState<FormValues>({});

    const [
        touched,
        setTouched,
    ] = useState<TouchedFields>({});

    const setFieldValue = useCallback(
        (
            fieldId: string,
            value: string,
        ) => {
            setValues((previous) => ({
                ...previous,
                [fieldId]: value,
            }));
        },
        [],
    );

    const touchField = useCallback(
        (fieldId: string) => {
            setTouched((previous) => ({
                ...previous,
                [fieldId]: true,
            }));
        },
        [],
    );

    const getFieldError = useCallback(
        (
            field: FormField,
        ): string | undefined => {
            if (!touched[field.id]) {
                return undefined;
            }

            return validatePreviewField(
                field,
                values[field.id] ?? '',
            );
        },
        [
            touched,
            values,
        ],
    );

    const getGroupError = useCallback(
        (
            group: GroupField,
        ): string | undefined => {
            if (!group.required) {
                return undefined;
            }

            const descendantFields =
                getInputFields(group.children);

            const hasTouchedChild =
                descendantFields.some(
                    (field) =>
                        touched[field.id],
                );

            if (!hasTouchedChild) {
                return undefined;
            }

            if (
                !hasGroupValue(
                    group,
                    values,
                )
            ) {
                return `${group.label} requires at least one value`;
            }

            return undefined;
        },
        [
            touched,
            values,
        ],
    );

    const validateAll =
        useCallback((): FormErrors => {
            const inputFields =
                getInputFields(fields);

            setTouched(
                Object.fromEntries(
                    inputFields.map(
                        (field) => [
                            field.id,
                            true,
                        ],
                    ),
                ),
            );

            return Object.fromEntries(
                inputFields.flatMap(
                    (field) => {
                        const error =
                            validatePreviewField(
                                field,
                                values[field.id] ?? '',
                            );

                        return error
                            ? [[field.id, error]]
                            : [];
                    },
                ),
            );
        }, [
            fields,
            values,
        ]);

    return {
        values,
        touched,

        setFieldValue,
        touchField,

        getFieldError,
        getGroupError,

        validateAll,
    };
};