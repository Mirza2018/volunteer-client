
import { Outlet } from 'react-router-dom'
import './App.css'
import Navber from './component/Navber'
import Footer from './component/Footer'

function App() {


  return (
    <>
      <img src="" alt="" />
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
