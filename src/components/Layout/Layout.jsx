import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/globalContext';
import Header from "../Header/Header"
import Modal from "../Modal/Modal";
import ProductItem from '../ProductItem/ProductItem';

const Layout = (props) => {
  const { cartItems } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const deleteCartItem = (item) => {
    props.updateCartItems((oldCartItems) => {
      const result = oldCartItems.filter(d => {
        if(d.title === item.title) {
          return false;
        }
        return true;
      })

      return result;
    })
  }

  return (
    <div>
      <Header
        onLoginClick={() => setShowLoginModal(true)}
        onCartClick={() => setShowModal(true)}
        />
      <Modal title='Your Cart!' showFooter open={showModal} onClose={() => setShowModal(false)}>
        {
          cartItems.length ? (
            <div>
              <h4>List of Products</h4>
              <ul>
                {
                  cartItems.map((d, index) => {
                    return <li key={index}>
                      <ProductItem
                        title={d.title}
                        desc={d.desc}
                        count={d.count}
                        image={d.image}
                        deleteItem={deleteCartItem}
                      />
                      </li>
                  })
                }
              </ul>
            </div>
          ) : (
            <div className='text-center p-4'>
              <h1 className='text-lg'>Continue Shopping!</h1>
            </div>
          )
        }
      </Modal>
          {
        props.children
      }
    </div>
  )
}

export default Layout