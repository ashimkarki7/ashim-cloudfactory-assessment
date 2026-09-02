import type {
    PropsWithChildren,
    ReactNode,
} from 'react';

import './FieldControl.css';

interface FieldControlProps
    extends PropsWithChildren {
    label?: string;
    htmlFor?: string;
    error?: string;
    description?: ReactNode;
}

export function FieldControl({
                                 label,
                                 htmlFor,
                                 error,
                                 description,
                                 children,
                             }: FieldControlProps) {
    return (
        <div className="field-control">
            {label && (
                <label
                    className="field-control__label"
                    htmlFor={htmlFor}
                >
                    {label}
                </label>
            )}

            {children}

            {description && !error && (
                <div className="field-control__description">
                    {description}
                </div>
            )}

            {error && (
                <div
                    className="field-control__error"
                    role="alert"
                >
                    {error}
                </div>
            )}
        </div>
    );
}