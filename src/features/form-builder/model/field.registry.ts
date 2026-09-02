import { createId } from '@shared/utils/id.utils';

import { FIELD_TYPE } from './field.constants';

import type { FieldType } from './field.constants';
import type {
    FormField,
    GroupField,
    NumberField,
    TextField,
} from './form-builder.types';

export interface FieldDefinition {
    type: FieldType;
    label: string;
    create: () => FormField;
}

const createTextField = (): TextField => ({
    id: createId(),
    type: FIELD_TYPE.TEXT,
    label: 'Text field',
    required: false,
});

const createNumberField = (): NumberField => ({
    id: createId(),
    type: FIELD_TYPE.NUMBER,
    label: 'Number field',
    required: false,
});

const createGroupField = (): GroupField => ({
    id: createId(),
    type: FIELD_TYPE.GROUP,
    label: 'Group',
    required: false,
    children: [],
});

export const FIELD_DEFINITIONS: readonly FieldDefinition[] = [
    {
        type: FIELD_TYPE.TEXT,
        label: 'Text',
        create: createTextField,
    },
    {
        type: FIELD_TYPE.NUMBER,
        label: 'Number',
        create: createNumberField,
    },
    {
        type: FIELD_TYPE.GROUP,
        label: 'Group',
        create: createGroupField,
    },
];

export const FIELD_DEFINITION_MAP: Record<
    FieldType,
    FieldDefinition
> = Object.fromEntries(
    FIELD_DEFINITIONS.map((definition) => [
        definition.type,
        definition,
    ]),
) as Record<FieldType, FieldDefinition>;