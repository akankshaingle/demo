import React, {createContext, useContext, useState} from 'react';

const item = [
  {
    id: Math.random().toString(),
    partName: 'Front Brake Disk',
    vehicleMake: 'HYUNDAI',
    vehicleModel: 'SANTRO 1ST GEN',
    vehicleYear: 2002,
    partType: 'Disk Brakes',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 10,
  },
  {
    id: Math.random().toString(),
    partName: 'Front Brake Disk',
    vehicleMake: 'HYUNDAI',
    vehicleModel: 'SANTRO 1ST GEN',
    vehicleYear: 1982,
    partType: 'Disk Brakes',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    price: 10,
  },
];

export const CartContext = createContext();

export const CartProvider = ({children}: any) => {
  const [cartItems, setCartItems] = useState(item);

  const addItem = (item: any) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeItem = (itemId: any) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateItem = (itemId: any, updatedItem: any) => {
    setCartItems((prevItems: any[]) =>
      prevItems.map((item: {id: any}) =>
        item.id === itemId ? updatedItem : item,
      ),
    );
  };
  return (
    <CartContext.Provider value={{cartItems, addItem, removeItem, updateItem}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
