
import { useFormBuilder } from '@features/form-builder/hooks/useFormBuilder';

import './FormBuilder.css';
import {FieldToolbar} from '@components/FieldToolbar/FieldToolbar.tsx';
import {FieldList} from '@components/FieldList/FieldList.tsx';
import {FieldEditor} from '@components/FieldEditor/FieldEditor.tsx';


export function FormBuilder() {
    const {
        fields,
    } = useFormBuilder();

    return (
        <section className="form-builder">
            <header className="form-builder__header">
                <div>
                    <h1 className="form-builder__title">
                        Configurable Form Builder
                    </h1>

                    <p className="form-builder__description">
                        Add fields, configure properties,
                        create nested groups and preview
                        your form.
                    </p>
                </div>
            </header>

            <div className="form-builder__workspace">
                <section className="form-builder__panel">
                    <div className="form-builder__panel-header">
                        <h2>Form Structure</h2>

                        <FieldToolbar />
                    </div>

                    <FieldList
                        fields={fields}
                    />
                </section>

                <aside className="form-builder__panel">
                    <h2>Field Properties</h2>

                    <FieldEditor />
                </aside>
            </div>
        </section>
    );
}