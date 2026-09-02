import { Button } from '@shared/components';

import { PreviewField } from './PreviewField';
import { PreviewGroup } from './PreviewGroup';

import { useFormBuilder } from '@features/form-builder/hooks/useFormBuilder';
import { useFormPreview } from '@features/form-builder/hooks/useFormPreview';

import './FormPreview.css';

export function FormPreview() {
    const {
        fields,
    } = useFormBuilder();

    const {
        values,

        setFieldValue,
        touchField,

        getFieldError,
        getGroupError,

        validateAll,
    } = useFormPreview(fields);

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const errors =
            validateAll();

        if (
            Object.keys(errors).length > 0
        ) {
            return;
        }

        console.log(
            'Preview values:',
            values,
        );
    };

    if (fields.length === 0) {
        return (
            <section className="form-preview">
                <h2>Live Preview</h2>

                <div className="form-preview__empty">
                    Add fields to see your form preview.
                </div>
            </section>
        );
    }

    return (
        <section className="form-preview">
            <div className="form-preview__header">
                <div>
                    <h2>Live Preview</h2>

                    <p>
                        Preview and validate the generated form.
                    </p>
                </div>
            </div>

            <form
                className="form-preview__form"
                onSubmit={handleSubmit}
                noValidate
            >
                {fields.map((field) => {
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
                })}

                <div className="form-preview__actions">
                    <Button
                        type="submit"
                        variant="primary"
                    >
                        Validate Form
                    </Button>
                </div>
            </form>
        </section>
    );
}