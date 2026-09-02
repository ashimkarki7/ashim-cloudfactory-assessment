import { Button } from '@shared/components';

import { FIELD_DEFINITIONS } from '@features/form-builder/model/field.registry';

import { useFormBuilderActions } from '@features/form-builder/hooks/useFormBuilderActions';

import './FieldToolbar.css';

interface FieldToolbarProps {
    parentId?: string | null;
    title?: string;
}

export function FieldToolbar({
                                 parentId = null,
                                 title,
                             }: FieldToolbarProps) {
    const { addField } =
        useFormBuilderActions();

    return (
        <div className="field-toolbar">
            {title && (
                <span className="field-toolbar__title">
          {title}
        </span>
            )}

            <div className="field-toolbar__actions">
                {FIELD_DEFINITIONS.map(
                    ({ type, label }) => (
                        <Button
                            key={type}
                            variant="secondary"
                            onClick={() =>
                                addField(
                                    type,
                                    parentId,
                                )
                            }
                        >
                            + {label}
                        </Button>
                    ),
                )}
            </div>
        </div>
    );
}