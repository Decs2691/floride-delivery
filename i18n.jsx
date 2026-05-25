/* FloRide Delivery — i18n: EN / ES */
const LangContext = React.createContext({ lang: 'en', setLang: () => {} });

function useLang() { return React.useContext(LangContext); }

/* useT returns a helper i(en, es) — pass both strings inline */
function useT() {
  const { lang } = useLang();
  return (en, es) => lang === 'es' ? (es != null ? es : en) : en;
}

Object.assign(window, { LangContext, useLang, useT });
