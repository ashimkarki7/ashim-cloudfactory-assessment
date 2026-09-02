import { useMemo } from 'react';

import { useFormBuilder } from './useFormBuilder';

import { findFieldById } from '@features/form-builder/utils/field-tree.utils';

export const useSelectedField = () => {
    const {
        fields,
        selectedFieldId,
    } = useFormBuilder();

    return useMemo(() => {
        if (selectedFieldId === null) {
            return undefined;
        }

        return findFieldById(
            fields,
            selectedFieldId,
        );
    }, [
        fields,
        selectedFieldId,
    ]);
};