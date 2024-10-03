import { Link } from '../Link.jsx'
export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para un React Router desde 0</p>
      <Link to='./about'>Ir al sobre nosotros</Link>
    </>
  )
}
