import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAuth } from "./AuthProvider";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  // Real-time listener: the cart updates instantly, on every device the user is signed in on
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    const cartRef = collection(db, "users", user.uid, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      setItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const addToCart = (product, shade) => {
    const key = shade ? `${product.id}-${shade.replace("#", "")}` : product.id;
    return setDoc(
      doc(db, "users", user.uid, "cart", key),
      {
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        shade: shade || null,
        qty: increment(1),
      },
      { merge: true }
    );
  };

  const changeQty = (item, delta) => {
    if (item.qty + delta <= 0) return removeItem(item.id);
    return setDoc(
      doc(db, "users", user.uid, "cart", item.id),
      { qty: increment(delta) },
      { merge: true }
    );
  };

  const removeItem = (id) => deleteDoc(doc(db, "users", user.uid, "cart", id));

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, count, total, addToCart, changeQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
