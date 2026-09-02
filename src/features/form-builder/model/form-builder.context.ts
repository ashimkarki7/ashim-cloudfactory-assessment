import { createContext } from 'react';

import type { Dispatch } from 'react';

import type { FormBuilderAction } from './form-builder.actions';
import type { FormBuilderState } from './form-builder.types';

export const FormBuilderStateContext =
    createContext<FormBuilderState | null>(null);

export const FormBuilderDispatchContext =
    createContext<Dispatch<FormBuilderAction> | null>(null);