import { PageContextProvider } from './PageContext';

import type { Breadcrumbs } from '@design-system/Breadcrumbs';
import { useAppContext } from '.';
import { Box } from '@mui/material';

type PageBaseComponent = {
  children: React.ReactNode;
  header?: Readonly<{
    canGoBack?: boolean;
  }>;
  keepScroll?: boolean;
};

export { PageContextProvider } from './PageContext';

type PageProps = Readonly<
  PageBaseComponent & {
    mobileTitle?: React.ReactElement;
    breadcrumbs: Exclude<React.ComponentProps<typeof Breadcrumbs>['items'], undefined>;
    // TODO: TYpe porpely what could be a arra of operatives
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operatives?: ReadonlyArray<any>;
    distributive?: boolean;
    // TODO: change this to a proper Footer component
    footer?: ReturnType<typeof Box>;
  }
>;

export type PageComponent = React.ComponentType<PageProps>;

type PageSimpleProps = Readonly<
  PageBaseComponent & {
    className?: string;
    title?: string | React.ReactElement;
    footer?: ReturnType<typeof Box>;
  }
>;

export type PageSimpleComponent = React.ComponentType<PageSimpleProps>;

export const Page: PageComponent = props => {
  const { pageComponent } = useAppContext();
  return (
    <PageContextProvider operatives={props.operatives ?? []} distributive={!!props.distributive}>
      <PageMiddleWare props={props} component={pageComponent} />
    </PageContextProvider>
  );
};

export const PageSimple: PageSimpleComponent = props => {
  const { pageSimpleComponent } = useAppContext();
  return (
    <PageContextProvider operatives={[]} distributive={false}>
      <PageMiddleWare props={props} component={pageSimpleComponent} />
    </PageContextProvider>
  );
};

const PageMiddleWare = ({
  component: Component,
  props,
}: {
  component: PageComponent | PageSimpleComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
}) => {
  const { footer } = useSlotContext();
  return <Component footer={footer} {...props} />;
};
