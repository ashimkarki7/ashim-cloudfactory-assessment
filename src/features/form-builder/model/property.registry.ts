import { FIELD_TYPE } from './field.constants';

import type { FieldType } from './field.constants';

export const PROPERTY_INPUT_TYPE = {
    TEXT: 'text',
    NUMBER: 'number',
    CHECKBOX: 'checkbox',
} as const;

export type PropertyInputType =
    (typeof PROPERTY_INPUT_TYPE)[keyof typeof PROPERTY_INPUT_TYPE];

export type EditablePropertyKey =
    | 'label'
    | 'required'
    | 'min'
    | 'max';

export type EditablePropertyValue =
    | string
    | number
    | boolean
    | undefined;

export interface PropertyDefinition {
    key: EditablePropertyKey;
    label: string;
    inputType: PropertyInputType;
}

export const COMMON_FIELD_PROPERTIES: readonly PropertyDefinition[] = [
    {
        key: 'label',
        label: 'Label',
        inputType: PROPERTY_INPUT_TYPE.TEXT,
    },
    {
        key: 'required',
        label: 'Required',
        inputType: PROPERTY_INPUT_TYPE.CHECKBOX,
    },
];

const NUMBER_FIELD_PROPERTIES: readonly PropertyDefinition[] = [
    {
        key: 'min',
        label: 'Minimum',
        inputType: PROPERTY_INPUT_TYPE.NUMBER,
    },
    {
        key: 'max',
        label: 'Maximum',
        inputType: PROPERTY_INPUT_TYPE.NUMBER,
    },
];

export const FIELD_PROPERTIES: Record<
    FieldType,
    readonly PropertyDefinition[]
> = {
    [FIELD_TYPE.TEXT]: [],
    [FIELD_TYPE.NUMBER]: NUMBER_FIELD_PROPERTIES,
    [FIELD_TYPE.GROUP]: [],
};