import { Suspense } from 'react';
import * as styles from './Page.css';
// TODO: here we can make a layout Page main screen so all Pages goes by the same structure
export const Page = ({ children }: { title: string; children: React.ReactNode }) => (
    <Suspense fallback={<h1>Cargando</h1>}>
        <div className={styles.pageContainer}>{children}</div>
    </Suspense>
);
