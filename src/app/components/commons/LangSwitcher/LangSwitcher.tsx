import { locales } from '../../../../../i18n'
import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'

export default function ChangeLanguage() {

    const { lang } = useTranslation()

    console.log( lang )

    let langs = []

    for(let l of locales){
        if( l !== lang ){
            langs.push(<button  key={l} onClick={async () => await setLanguage(l)}> { l.toUpperCase() } </button>)
        }
    }

    return (
        <div>
            { langs }
        </div>
    );
  }