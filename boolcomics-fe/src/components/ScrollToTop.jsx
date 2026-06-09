import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Dice al browser di resettare lo scroll a coordinata 0,0 (in cima)
    window.scrollTo(0, 0);
  }, [pathname]); // Si attiva ogni volta che il percorso della pagina (URL) cambia

  return null; // Questo componente serve solo per la logica, non mostra nulla a schermo
}
