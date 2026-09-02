import {
    useReducer,
    type PropsWithChildren,
} from 'react';

import {
    FormBuilderDispatchContext,
    FormBuilderStateContext,
} from '@features/form-builder/model/form-builder.context';

import { formBuilderReducer } from '@features/form-builder/model/form-builder.reducer';

import { INITIAL_FORM_BUILDER_STATE } from '@features/form-builder/model/initial-state';

export function FormBuilderProvider({
                                        children,
                                    }: PropsWithChildren) {
    const [state, dispatch] = useReducer(
        formBuilderReducer,
        INITIAL_FORM_BUILDER_STATE,
    );

    return (
        <FormBuilderStateContext value={state}>
            <FormBuilderDispatchContext value={dispatch}>
                {children}
            </FormBuilderDispatchContext>
        </FormBuilderStateContext>
    );
}