
import {FormBuilderProvider} from '@features/form-builder/model/FormBuilderProvider.tsx';
import { FormBuilder } from '@features/form-builder';


export function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column',height: '100vh',width: '100%' }}>
            <FormBuilderProvider>
                <FormBuilder />
            </FormBuilderProvider>
        </div>

    );
}