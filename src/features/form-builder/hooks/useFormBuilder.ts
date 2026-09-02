import { useContext } from 'react';

import { FormBuilderStateContext } from '@features/form-builder/model/form-builder.context.ts';

export const useFormBuilder = () => {
    const context = useContext(
        FormBuilderStateContext,
    );

    if (context === null) {
        throw new Error(
            'useFormBuilder must be used within FormBuilderProvider',
        );
    }

    return context;
};