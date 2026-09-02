import type {
    InputHTMLAttributes,
} from 'react';

import './Input.css';

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
                          id,
                          label,
                          error,
                          className = '',
                          ...props
                      }: InputProps) {
    const classes = [
        'input',
        error ? 'input--error' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="input-control">
            {label && (
                <label
                    className="input-control__label"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                className={classes}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error && id
                        ? `${id}-error`
                        : undefined
                }
                {...props}
            />

            {error && (
                <span
                    id={
                        id
                            ? `${id}-error`
                            : undefined
                    }
                    className="input-control__error"
                    role="alert"
                >
          {error}
        </span>
            )}
        </div>
    );
}