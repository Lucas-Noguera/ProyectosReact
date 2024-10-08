import { Link } from '../Link.jsx'

const il8n = {
  es: {
    title: 'Sobre Nosotros',
    button: 'Ir a la home',
    description: 'Hola, me llamo Lucas Noguera  y Estoy haciendo un clon de React Router'
  },
  en: {
    title: 'About Us',
    button: 'Go to home',
    description: 'Hello, my name is Lucas Noguera and I am making a clone of React Router'
  }
}

const useil8n = (lang) => {
  return il8n[lang] || il8n.en
}

export default function AboutPage ({ routeParams }) {
  const il8n = useil8n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{il8n.title}</h1>
      <div>
        <img src='https://avatars.githubusercontent.com/u/141255262?s=400&u=41fde4ecc1f4d9e90e981501721ae6db2c2eff7c&v=4' alt='Perfil Lucas' />
        <p>{il8n.description}</p>
        <Link to='/'>{il8n.button}</Link>
      </div>
    </>
  )
}
