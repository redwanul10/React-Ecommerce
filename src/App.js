import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Menu  from './component/Menu.js'
import Success from './component/Success'
import Cancel from './component/Cancel'
import Footer from './component/Footer.js'
import About  from './component/About.js'
import Shop from './component/Shop.js'
import Homepage from './Homepage.js'
import SingleProduct from './component/singleProduct.js'
import Contact from './component/Contact.js'


function Appp() {
  
  
  return (
    <>
      <BrowserRouter>
        <Menu/>
        <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/product/:productId" exact component={SingleProduct}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/about" exact component={About}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/success" exact component={Success}/>
            <Route path="/cancel" exact component={Cancel}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default Appp;
