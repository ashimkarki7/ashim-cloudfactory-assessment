import {
    useState,
} from 'react';

import { Button } from '@shared/components';

import { useFormBuilder } from '@features/form-builder/hooks/useFormBuilder';
import { useFormBuilderActions } from '@features/form-builder/hooks/useFormBuilderActions';

import {
    exportConfiguration,
    parseConfiguration,
} from '@features/form-builder/utils/config.utils';

import './ConfigTransfer.css';

type Feedback =
    | {
    type: 'success' | 'error';
    message: string;
}
    | null;

export function ConfigTransfer() {
    const {
        fields,
    } = useFormBuilder();

    const {
        importConfig,
    } = useFormBuilderActions();

    const [
        json,
        setJson,
    ] = useState('');

    const [
        feedback,
        setFeedback,
    ] = useState<Feedback>(
        null,
    );

    const handleExport = () => {
        setJson(
            exportConfiguration(fields),
        );

        setFeedback({
            type: 'success',
            message:
                'Configuration exported successfully.',
        });
    };

    const handleImport = () => {
        const result =
            parseConfiguration(json);

        if (!result.success) {
            setFeedback({
                type: 'error',
                message: result.error,
            });

            return;
        }

        importConfig(result.fields);

        setFeedback({
            type: 'success',
            message:
                'Configuration imported successfully.',
        });
    };

    const handleClear = () => {
        setJson('');
        setFeedback(null);
    };

    return (
        <section className="config-transfer">
            <div className="config-transfer__header">
                <div>
                    <h2>
                        Configuration
                    </h2>

                    <p>
                        Export or import the form
                        configuration as JSON. Please Enter JSON to Update Fields
                    </p>
                </div>

                <div className="config-transfer__actions">
                    <Button
                        variant="secondary"
                        onClick={handleExport}
                    >
                        Export JSON
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleImport}
                    >
                        Import JSON
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            </div>

            <label
                className="config-transfer__label"
                htmlFor="form-configuration"
            >
                JSON Configuration
            </label>

            <textarea
                id="form-configuration"
                className="config-transfer__textarea"
                value={json}
                spellCheck={false}
                placeholder={`{
  "fields": []
}`}
                onChange={(event) => {
                    setJson(
                        event.target.value,
                    );

                    setFeedback(null);
                }}
            />

            {feedback && (
                <p
                    className={[
                        'config-transfer__feedback',
                        `config-transfer__feedback--${feedback.type}`,
                    ].join(' ')}
                    role={
                        feedback.type === 'error'
                            ? 'alert'
                            : 'status'
                    }
                >
                    {feedback.message}
                </p>
            )}
        </section>
    );
}