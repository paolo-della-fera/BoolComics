import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import MiniCart from "../components/MiniCart"

export default function DefaultLayout() {

  return (
    <>
     <AppHeader />
      
      <MiniCart /> 

      <main className="min-vh-100">
        <Outlet />
      </main>
      
      <AppFooter />
    </>
  )
}