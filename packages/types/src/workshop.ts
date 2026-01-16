
export type WorkshopCategory = 'BIOCONSTRUCCIÓN' | 'TECNOLOGÍAS SOCIALES' | 'GESTIÓN DE AGUA';

export type Workshop = Readonly<{
    id: string;
    title: string;
    description: string;
    detailedDescription: string;
    image: string;
    location: string;
    date: string; // ISO format
    costUSDC: number;
    rewardsB3TR: number;
    category: WorkshopCategory;
    tutor?: string;
}>;
