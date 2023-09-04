import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import ShopAdd from "./ShopAdd";
import ShopEdit from "./ShopEdit";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop_add" element={<ShopAdd />} />
        <Route path="/shops/:id" element={<ShopEdit />} />
      </Routes>
    </Router>
  )
}

export default App;