import type {
    ButtonHTMLAttributes,
    PropsWithChildren,
} from 'react';

import './Button.css';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost';

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        PropsWithChildren {
    variant?: ButtonVariant;
}

export function Button({
                           children,
                           variant = 'secondary',
                           className = '',
                           type = 'button',
                           ...props
                       }: ButtonProps) {
    const classes = [
        'button',
        `button--${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}