
import Home from '../components/Home/Home'
import Auth from '../components/Auth/Auth'

const routes = [
  { name: "Home", path: "/", component: Home, auth: true },
  { name: "Auth", path: "/auth", component: Auth }
]

export default routes