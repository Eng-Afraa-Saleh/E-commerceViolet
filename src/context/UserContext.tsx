
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, Order, User, UserContextType } from '../types';
import person1 from '/image/person/person1.jpg';
import item1 from '/image/Items/item1.jpg';
 
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useState<User>({
    name: 'Anna Rivera',
    email: 'anna.rivera@gmail.com',
    memberSince: 'October 2023',
    avatar: person1,
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-7721',
      date: 'Feb 12, 2024',
      total: 129.99,
      status: 'Delivered',
      items: [
        {
          id: '1',
          name: 'Velvet Dusk Evening Gown',
          price: 129.99,
          quantity: 1,
          image: item1,
        }
      ]
    }
  ]);

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total,
      status: 'Processing',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider value={{ user, orders, addOrder }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
