import { PreviewField } from './PreviewField';

import type {
    FormField,
    FormValues,
    GroupField,
} from '@features/form-builder/model/form-builder.types';

interface PreviewGroupProps {
    group: GroupField;
    values: FormValues;

    getFieldError: (
        field: FormField,
    ) => string | undefined;

    getGroupError: (
        group: GroupField,
    ) => string | undefined;

    setFieldValue: (
        fieldId: string,
        value: string,
    ) => void;

    touchField: (
        fieldId: string,
    ) => void;
}

export function PreviewGroup({
                                 group,
                                 values,
                                 getFieldError,
                                 getGroupError,
                                 setFieldValue,
                                 touchField,
                             }: PreviewGroupProps) {
    const groupError =
        getGroupError(group);

    return (
        <fieldset className="preview-group">
            <legend className="preview-group__title">
                {group.label}

                {group.required && (
                    <span aria-hidden="true">
            {' *'}
          </span>
                )}
            </legend>

            <div className="preview-group__fields">
                {group.children.map(
                    (field) => {
                        if (
                            field.type === 'group'
                        ) {
                            return (
                                <PreviewGroup
                                    key={field.id}
                                    group={field}
                                    values={values}
                                    getFieldError={
                                        getFieldError
                                    }
                                    getGroupError={
                                        getGroupError
                                    }
                                    setFieldValue={
                                        setFieldValue
                                    }
                                    touchField={
                                        touchField
                                    }
                                />
                            );
                        }

                        return (
                            <PreviewField
                                key={field.id}
                                field={field}
                                values={values}
                                getFieldError={
                                    getFieldError
                                }
                                setFieldValue={
                                    setFieldValue
                                }
                                touchField={
                                    touchField
                                }
                            />
                        );
                    },
                )}
            </div>

            {groupError && (
                <p
                    className="preview-group__error"
                    role="alert"
                >
                    {groupError}
                </p>
            )}
        </fieldset>
    );
}