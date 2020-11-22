import { useState } from "react";
import HeaderComponent from "./components/headerComponent/HeaderComponent";
import FooterComponent from "./components/footercomponent/FooterComponent";
import HomePage from "./containers/HomePage/HomePage";
import cartContext from "./contexts/cartContext";

import "./App.scss";

function App() {
  const [cartToggle, updateCartToggle] = useState(false);
  return (
    <div className="app">
      <HeaderComponent cartToggleHandler={updateCartToggle} />
      <main>
        <HomePage showCart={cartToggle} cartToggleHandler={updateCartToggle} />
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
