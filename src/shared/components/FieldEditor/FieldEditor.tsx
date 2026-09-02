
import { useSelectedField } from '@features/form-builder/hooks/useSelectedField';

import './FieldEditor.css';
import {PropertyEditor} from '@components/PropertyEditor/PropertyEditor.tsx';
import {getFieldConfigurationError} from '@features/form-builder/utils/field-tree.utils.ts';

export function FieldEditor() {


    const selectedField =
        useSelectedField();

    if (!selectedField) {
        return (
            <div className="field-editor__empty">
                Select a field to configure its properties.
            </div>
        );
    }

    const configurationError =
        getFieldConfigurationError(
            selectedField,
        );

    return (
        <div className="field-editor">
            <header className="field-editor__header">
                <div>
                    <h3 className="field-editor__title">
                        {selectedField.label}
                    </h3>

                    <span className="field-editor__type">
            {selectedField.type}
          </span>
                </div>
            </header>

            <PropertyEditor
                field={selectedField}
            />
            {configurationError && (
                <div
                    className="field-editor__error"
                    role="alert"
                >
                    {configurationError}
                </div>
            )}
        </div>
    );
}