export type Paths = ReadonlyArray<Readonly<{
    path: string;
    Component: React.ComponentType,
    icon?: React.ComponentType;
    libs?: string[];
}>>;
