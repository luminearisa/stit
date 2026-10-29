import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': Record<string, unknown>;
        }
    }
}