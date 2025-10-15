import { useContext } from "react";
import { AppThemeContext } from "./theme-context";

export const useAppTheme = () => useContext(AppThemeContext);