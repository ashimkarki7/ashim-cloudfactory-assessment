import type {
    MoveDirection,
} from './field.constants';

import type {
    FormField,
} from './form-builder.types';

import type {
    EditablePropertyKey,
    EditablePropertyValue,
} from './property.registry';

export const FORM_BUILDER_ACTION = {
    ADD_FIELD: 'ADD_FIELD',
    UPDATE_FIELD: 'UPDATE_FIELD',
    DELETE_FIELD: 'DELETE_FIELD',
    MOVE_FIELD: 'MOVE_FIELD',
    SELECT_FIELD: 'SELECT_FIELD',
    IMPORT_CONFIG: 'IMPORT_CONFIG',
    RESET: 'RESET',
} as const;

export type FormBuilderAction =
    | {
    type: typeof FORM_BUILDER_ACTION.ADD_FIELD;
    payload: {
        field: FormField;
        parentId: string | null;
    };
}
    | {
    type: typeof FORM_BUILDER_ACTION.UPDATE_FIELD;
    payload: {
        fieldId: string;
        key: EditablePropertyKey;
        value: EditablePropertyValue;
    };
}
    | {
    type: typeof FORM_BUILDER_ACTION.DELETE_FIELD;
    payload: {
        fieldId: string;
    };
}
    | {
    type: typeof FORM_BUILDER_ACTION.MOVE_FIELD;
    payload: {
        fieldId: string;
        direction: MoveDirection;
    };
}
    | {
    type: typeof FORM_BUILDER_ACTION.SELECT_FIELD;
    payload: {
        fieldId: string | null;
    };
}
    | {
    type: typeof FORM_BUILDER_ACTION.IMPORT_CONFIG;
    payload: {
        fields: FormField[];
    };
}
    | {
    type: typeof FORM_BUILDER_ACTION.RESET;
};