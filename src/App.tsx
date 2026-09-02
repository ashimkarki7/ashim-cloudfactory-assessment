
import {FormBuilderProvider} from '@features/form-builder/model/FormBuilderProvider.tsx';
import {FormBuilder} from '@components/FormBuilder/FormBuilder.tsx';

// function DebugBuilder() {
//     const { fields } = useFormBuilder();
//
//
//     return (
//         <main>
//             <h1>
//                 Configurable Form Builder
//             </h1>
//
//             <FieldToolbar />
//
//             <pre>
//         {JSON.stringify(
//             fields,
//             null,
//             2,
//         )}
//       </pre>
//         </main>
//     );
// }

export function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column',height: '100vh',width: '100%' }}>
            <FormBuilderProvider>
                <FormBuilder />
            </FormBuilderProvider>
        </div>

    );
}