import { Link } from '../Link.jsx'

export default function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://avatars.githubusercontent.com/u/141255262?s=400&u=41fde4ecc1f4d9e90e981501721ae6db2c2eff7c&v=4' alt='Perfil Lucas' />
        <p>Hola, me llamo Lucas Noguera  y Estoy haciendo un clon de React Router</p>
        <Link to='/'>Ir a la home</Link>
      </div>
    </>
  )
}
