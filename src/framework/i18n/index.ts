import I18n from "react-native-i18n";
import en from "./locales/en";
import vi from "./locales/vi";

I18n.fallbacks = true;

I18n.translations = {
    en,
    vi
};

const fixLocal = "vi";

export const translate = (text) => {
    if (fixLocal) {
        return I18n.t(text, {locale: fixLocal});
    }
    else {
        return I18n.t(text);
    }
};
