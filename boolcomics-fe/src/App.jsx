import { BrowserRouter, Route, Routes } from "react-router-dom"

import { CartProvider } from "./components/CartProvider"

import DefaultLayout from "./layouts/DefaultLayout"

import HomePage from "./pages/HomePage"
import ComicPage from "./pages/ComicPage"
import CatalogPage from "./pages/CatalogPage"
import CheckoutPage from "./pages/CheckoutPage"
import CartPage from "./pages/CartPage"
import NotFoundPage from "./pages/notFoundPage"
import Whishlist from "./pages/Whishlist"

import ScrollToTop from "./components/ScrollToTop"

function App() {

  return (
    <CartProvider>
      <BrowserRouter>

        <ScrollToTop />

        <Routes>

          <Route element={<DefaultLayout />}>

            <Route index element={<HomePage />} />

            <Route path="/catalog" element={<CatalogPage />} />

            <Route path="/products/:slug" element={<ComicPage />} />

            <Route path="/checkout" element={<CheckoutPage />} />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/wishlist" element={<Whishlist />} />

          </Route>

          <Route path="*" element={<NotFoundPage />} />

        </Routes>

      </BrowserRouter>
    </CartProvider>
  )
}

export default App;