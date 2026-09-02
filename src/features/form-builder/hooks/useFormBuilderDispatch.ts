import { useContext } from 'react';

import { FormBuilderDispatchContext } from '@features/form-builder/model/form-builder.context';

export const useFormBuilderDispatch = () => {
    const context = useContext(
        FormBuilderDispatchContext,
    );

    if (context === null) {
        throw new Error(
            'useFormBuilderDispatch must be used within FormBuilderProvider',
        );
    }

    return context;
};