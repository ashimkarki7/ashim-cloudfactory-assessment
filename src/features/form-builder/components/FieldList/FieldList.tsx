
import type { FormField } from '@features/form-builder/model/form-builder.types.ts';

import './FieldList.css';
import {FieldItem} from '@features/form-builder/components/FieldItem/FieldItem.tsx';

interface FieldListProps {
    fields: FormField[];
    parentId?: string | null;
}

export function FieldList({
                              fields,
                              parentId = null,
                          }: FieldListProps) {
    if (fields.length === 0) {
        return (
            <div className="field-list__empty">
                No fields added yet.
            </div>
        );
    }

    return (
        <div className="field-list">
            {fields.map((field, index) => (
                <FieldItem
                    key={field.id}
                    field={field}
                    parentId={parentId}
                    index={index}
                    totalFields={fields.length}
                />
            ))}
        </div>
    );
}