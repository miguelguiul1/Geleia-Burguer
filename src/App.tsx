import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Destaque } from "./components/Destaque";
import { Cardapio } from "./components/Cardapio";
import { Sobre } from "./components/Sobre";
import { InstagramSection } from "./components/InstagramSection";
import { Localizacao } from "./components/Localizacao";
import { CTAFinal } from "./components/CTAFinal";
import { Footer } from "./components/Footer";
import { StickyOrderBar } from "./components/StickyOrderBar";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutPanel } from "./components/CheckoutPanel";
import { CartProvider } from "./context/CartContext";
import { ProductModalProvider } from "./context/ProductModalContext";

function App() {
  return (
    <CartProvider>
      <ProductModalProvider>
        <div className="pb-20 md:pb-0">
          <Navbar />
          <main>
            <Hero />
            <Destaque />
            <Cardapio />
            <Sobre />
            <InstagramSection />
            <Localizacao />
            <CTAFinal />
          </main>
          <Footer />
          <StickyOrderBar />
          <ProductModal />
          <CartDrawer />
          <CheckoutPanel />
        </div>
      </ProductModalProvider>
    </CartProvider>
  );
}

export default App;
