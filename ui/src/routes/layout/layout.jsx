import { Outlet } from 'react-router-dom'
import './layout.scss'
import Navbar from "../../components/navbar/Navbar"
function Layout(){
  return (
     <div className="layout">
      <div className="navbar">
          <Navbar></Navbar>
      </div>
      <div className="content">
       <Outlet></Outlet>
      </div>
      
    </div>
  )
}

export default Layout