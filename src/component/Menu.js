import React,{useRef,useEffect}from 'react';
import {gql} from 'apollo-boost'
import {Link} from 'react-router-dom'
import {useQuery,useMutation} from "@apollo/react-hooks"
import Cart from './Cart'

// Query Cache Data 
const queryCart = gql`
  query {
    mobileMenu @client
    countCartItem @client
    cartModal @client
    allOptionss {
      edges {
        node {
          footer_text
          header_logo
        }
      }
    }
  }
`
// Cart Toggle/(on/off) Mutation
const mutationToggleCartModal = gql`
  mutation{
    toggleCartModal @client
  }
`
// Mobile Menu Mutation
const mutationMobileMenu = gql`
  mutation($close:Blooean){
    toogleMobileMenu(close:$close) @client
  }
`


const Menu = () => {
  // Graphql HOOks
    const {data,loading} = useQuery(queryCart)
    const [toggleCartModal] = useMutation(mutationToggleCartModal)
    const [toogleMobileMenu] = useMutation(mutationMobileMenu)
  // Select Header
    const elem = useRef(null)

  // Sticky Menu 
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
          const scroll = document.documentElement.scrollTop
          if(scroll > 80){
            // Active Sticky Header
            if(!elem.current)return ;
            elem.current.classList.add('fixed')
            elem.current.nextElementSibling.style.marginTop = "80px";
          }else if(scroll === 0){
            // DeActive Sticky Header
            if(!elem.current)return ;
            elem.current.classList.remove('fixed')
            elem.current.nextElementSibling.style.marginTop = "0";
          }
        })
    },[])

    if(loading ||!data) return null
    console.log(data)
    
    return (  
      <div class="wrap_header" ref={elem}>
      <a href="index.html" class="logo"><img src={data.allOptionss.edges[0].node.header_logo.url} alt="IMG-LOGO"/></a>
      
      {/* MENU */}
      <ul className={`main_menu ${data.mobileMenu ?"show":""}`}>
        <li><Link onClick={e=>toogleMobileMenu({variables:{close:true}})} to="/">Home</Link></li>
        <li><Link onClick={e=>toogleMobileMenu({variables:{close:true}})} to="/shop">Shop</Link></li>
        <li><Link onClick={e=>toogleMobileMenu({variables:{close:true}})} to="/about">About</Link></li>
        <li><Link onClick={e=>toogleMobileMenu({variables:{close:true}})} to="/contact">Contact</Link></li>
      </ul>
      
      {/* Menu Cart Icon Section*/}
      <div class="header-icons">
        <div class="header-wrapicon2" onClick={toggleCartModal}>
        {/* Icon */}
          <img src="https://colorlib.com/etc/fashe/images/icons/icon-header-02.png" class="header-icon1 js-show-header-dropdown" alt="ICON"/>
        {/* Total Items */}
          <span class="header-icons-noti">{data.countCartItem}</span>
        </div>
      </div>
      {/* Display Cart Items */}
        {data.cartModal && <Cart/>}
      </div>
    );
}
 
export default Menu;