import {
    useCallback,
    useState,
} from 'react';

import { validatePreviewField } from '@features/form-builder/model/validation.registry';

import {
    getGroups,
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
        (
            fieldId: string,
        ) => {
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
                getInputFields(
                    group.children,
                );

            const hasTouchedChild =
                descendantFields.some(
                    (field) =>
                        touched[field.id],
                );

            const hasBeenTouched =
                Boolean(touched[group.id]) ||
                hasTouchedChild;

            if (!hasBeenTouched) {
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

                const groups =
                    getGroups(fields);

                /*
                 * Mark every field and group as touched so
                 * validation errors become visible after
                 * the user attempts validation/submission.
                 */
                setTouched(
                    Object.fromEntries(
                        [
                            ...inputFields,
                            ...groups,
                        ].map(
                            (field) => [
                                field.id,
                                true,
                            ],
                        ),
                    ),
                );

                const inputErrors =
                    inputFields.flatMap(
                        (field) => {
                            const error =
                                validatePreviewField(
                                    field,
                                    values[field.id] ?? '',
                                );

                            if (!error) {
                                return [];
                            }

                            return [
                                [
                                    field.id,
                                    error,
                                ] as const,
                            ];
                        },
                    );

                const groupErrors =
                    groups.flatMap(
                        (group) => {
                            if (
                                !group.required ||
                                hasGroupValue(
                                    group,
                                    values,
                                )
                            ) {
                                return [];
                            }

                            return [
                                [
                                    group.id,
                                    `${group.label} requires at least one value`,
                                ] as const,
                            ];
                        },
                    );

                return Object.fromEntries([
                    ...inputErrors,
                    ...groupErrors,
                ]);
            },
            [
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