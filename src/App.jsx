import './App.css';
import RawMaterialList from './components/RawMaterial/RawMaterialList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import HeaderNav from './components/HeaderNav/HeaderNav';
import ProductAndMaterial from './pages/ProductAndMaterial';
import ProductionSuggestion from './components/ProductionSuggestion/ProductionSuggestion';

function App() {

  return (
    <BrowserRouter>
      <HeaderNav />
      <main className='main-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/raw-materials' element={<RawMaterialList />} />
          <Route path='/products' element={<ProductAndMaterial />} />
          <Route path='/product-suggestion' element={<ProductionSuggestion />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
