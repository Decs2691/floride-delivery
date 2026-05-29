/* FloRide Delivery — i18n: EN / ES */
const LangContext = React.createContext({ lang: 'en', setLang: () => {} });

function useLang() { return React.useContext(LangContext); }

/* useT returns a helper i(en, es) — pass both strings inline */
function useT() {
  const { lang } = useLang();
  return (en, es) => lang === 'es' ? (es != null ? es : en) : en;
}

/* useFmtDate returns a helper fd(str) that translates English month/day names to Spanish */
function useFmtDate() {
  const { lang } = useLang();
  return (str) => {
    if (lang !== 'es' || !str) return str;
    const map = {
      Monday:'Lunes', Tuesday:'Martes', Wednesday:'Miércoles', Thursday:'Jueves',
      Friday:'Viernes', Saturday:'Sábado', Sunday:'Domingo',
      Mon:'Lun', Tue:'Mar', Wed:'Mié', Thu:'Jue', Fri:'Vie', Sat:'Sáb', Sun:'Dom',
      January:'Enero', February:'Febrero', March:'Marzo', April:'Abril', May:'Mayo',
      June:'Junio', July:'Julio', August:'Agosto', September:'Septiembre',
      October:'Octubre', November:'Noviembre', December:'Diciembre',
      Jan:'Ene', Feb:'Feb', Mar:'Mar', Apr:'Abr', Jun:'Jun', Jul:'Jul',
      Aug:'Ago', Sep:'Sep', Oct:'Oct', Nov:'Nov', Dec:'Dic'
    };
    return Object.entries(map).reduce((s,[en,es]) => s.replace(new RegExp('\\b'+en+'\\b','g'), es), String(str));
  };
}

/* useD(en, es) — picks the right dataset based on language */
function useD(en, es) {
  const { lang } = useLang();
  return lang === 'es' ? es : en;
}

Object.assign(window, { LangContext, useLang, useT, useFmtDate, useD });
