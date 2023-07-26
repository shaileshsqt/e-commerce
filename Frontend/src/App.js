import { Route, Routes } from "react-router-dom";
import Header from "./component/Main/Header";
import Cards from "./component/Cart/Card";
import CardsDetails from "./component/Cart/ProductDetail";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Checkout from "./component/Cart/Checkout";
import ProductDetail from "./component/Cart/ProductDetail";
import "./assets/styles/Home.css";
import Theme from "./Theme/Theme";
import Man from "./pages/Man";
import Women from "./pages/Women";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route element={<Register />} path="/Signup" />
        <Route element={<Login />} path="/" />
        <Route path="/Header" element={<Header />} />
        <Route path="/Dashboard" element={<Cards />} />
        <Route path="/ProductDetail/:type/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/Theme" element={<Theme />} />
        <Route path="/Man" element={<Man />} />
        <Route path="/Women" element={<Women />} />
      </Routes>
    </>
  );
}

export default App;
