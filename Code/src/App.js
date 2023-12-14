
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Profile from './Components/Profile/Profile';
import CreateListing from './Pages/CreateListing';
import UserListing from './Pages/UserListing';
import Login from './Pages/Login';
import Sports from './Pages/Sports';
import General from './Pages/General';
import Electronics from './Pages/Electronics';
import Furniture from './Pages/Furniture';
import Clothing from './Pages/Clothing';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <div>
    <GoogleOAuthProvider clientId="235433750685-tob4g20h94o3oof65g596u7ltlnkucms.apps.googleusercontent.com">
      
  
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/home' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile />} /> {/* Profile page route */}
        <Route path='/user/:id' element={<UserListing/>}/>
        <Route path = '/create' element={<CreateListing/>}/>
        <Route path='/Clothing' element={<Clothing/>}/>
        <Route path= '/Furniture' element={<Furniture/>}/>
        <Route path='/Electronics' element={<Electronics/>}/>
        <Route path='/General' element={<General/>}/>
        <Route path='/Sports' element={<Sports/>}/>
      </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
