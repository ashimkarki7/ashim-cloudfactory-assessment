import type {
    InputHTMLAttributes,
} from 'react';

import './Checkbox.css';

interface CheckboxProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'type'
    > {
    label: string;
}

export function Checkbox({
                             id,
                             label,
                             className = '',
                             ...props
                         }: CheckboxProps) {
    return (
        <label
            className={[
                'checkbox',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            htmlFor={id}
        >
            <input
                id={id}
                type="checkbox"
                className="checkbox__input"
                {...props}
            />

            <span className="checkbox__label">
        {label}
      </span>
        </label>
    );
}