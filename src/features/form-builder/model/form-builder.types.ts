import type { FieldType } from './field.constants';

export interface BaseField {
    id: string;
    type: FieldType;
    label: string;
    required: boolean;
}

export interface TextField extends BaseField {
    type: 'text';
}

export interface NumberField extends BaseField {
    type: 'number';
    min?: number;
    max?: number;
}

export interface GroupField extends BaseField {
    type: 'group';
    children: FormField[];
}

export type FormField =
    | TextField
    | NumberField
    | GroupField;

export interface FormBuilderState {
    fields: FormField[];
    selectedFieldId: string | null;
}


export type FieldValue = string;

export type FormValues = Record<string, FieldValue>;

export type FormErrors = Record<string, string>;