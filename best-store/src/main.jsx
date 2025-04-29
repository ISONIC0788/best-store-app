import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Footer, Navbar } from './components/Layout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';
import ProductLists from './pages/admin/products/ProductLists';
import CreateProduct from './pages/admin/products/CreateProduct';

function App(){
  return(<BrowserRouter>
       <Navbar/>
         <Routes>
            <Route path='/' element ={<Home/>}/>
            <Route path='/contacts' element ={<Contacts/>}/>
            <Route path='/admin/products' element ={<ProductLists/>}/>
            <Route path='/admin/products/create' element ={<CreateProduct/>}/>
            <Route path='*' element ={<NotFound/>}/>
         </Routes>
       <Footer/>
     </BrowserRouter>);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
