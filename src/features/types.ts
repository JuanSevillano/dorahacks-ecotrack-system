export type FeatureRunMode = "page" | "modal";

export interface FeatureConfig<Store, Steps extends readonly any[]> {
  id: string;
  title: string;
  steps: Steps;
  initialStore: Store;
  mode?: FeatureRunMode; // default: "page"
  onFinish?: (store: Store) => void;
}
