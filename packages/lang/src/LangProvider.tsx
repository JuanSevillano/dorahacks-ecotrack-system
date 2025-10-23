import { I18nextProvider } from "react-i18next";
import './index';
import i18next from "i18next";

type Props = {
    children: React.ReactNode;
};

export const LangProvider = ({ children }: Props) => <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
