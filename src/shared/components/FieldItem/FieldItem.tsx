import { Button } from '@shared/components';



import { useFormBuilderActions } from '@features/form-builder/hooks/useFormBuilderActions';

import type { FormField } from '@features/form-builder/model/form-builder.types';

import './FieldItem.css';
import {FieldToolbar} from '@components/FieldToolbar/FieldToolbar.tsx';
import {FieldList} from '@components/FieldList/FieldList.tsx';
import {useFormBuilder} from '@features/form-builder/hooks/useFormBuilder.ts';

interface FieldItemProps {
    field: FormField;
    parentId: string | null;
    index: number;
    totalFields: number;
}

export function FieldItem({
                              field,

                              index,
                              totalFields,
                          }: FieldItemProps) {
    const {
        deleteField,
        moveField,
        selectField,
    } = useFormBuilderActions();

    const {
        selectedFieldId,
    } = useFormBuilder();

    const isSelected =
        selectedFieldId === field.id;

    const isFirst = index === 0;
    const isLast = index === totalFields - 1;

    return (
        <article
            className={[
                'field-item',
                isSelected
                    ? 'field-item--selected'
                    : '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <header className="field-item__header">
                <button
                    type="button"
                    className="field-item__select"
                    onClick={() => selectField(field.id)}
                >
          <span className="field-item__label">
            {field.label}
          </span>

                    <span className="field-item__type">
            {field.type}
          </span>
                </button>

                <div className="field-item__actions">
                    <Button
                        variant="ghost"
                        disabled={isFirst}
                        aria-label={`Move ${field.label} up`}
                        onClick={() => moveField(field.id, 'up')}
                    >
                        ↑
                    </Button>

                    <Button
                        variant="ghost"
                        disabled={isLast}
                        aria-label={`Move ${field.label} down`}
                        onClick={() => moveField(field.id, 'down')}
                    >
                        ↓
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => deleteField(field.id)}
                    >
                        Delete
                    </Button>
                </div>
            </header>

            {field.type === 'group' && (
                <div className="field-item__group">
                    <FieldToolbar parentId={field.id}   title="Add field to group" />

                    <FieldList
                        fields={field.children}
                        parentId={field.id}
                    />
                </div>
            )}
        </article>
    );
}