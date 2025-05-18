import ProductCart from "../../components/ProductCart/ProductCart";
import "./ShoppingCart.scss";
import Sidebar from "../../components/SideBar/SideBar";
import { useCart } from "../../hooks/CartContext";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

interface ProductWithQuantity {
  id: string;
  code: string;
  description: string;
  unitPrice: number;
  essential: boolean;
  quantity: number;
}

const ShoppingCart = () => {
  const { cart, removeFromCart } = useCart();
  const [cartWithQuantity, setCartWithQuantity] = useState<
    ProductWithQuantity[]
  >([]);

  useEffect(() => {
    const initialCart = cart.map((product) => ({
      ...product,
      quantity: 1,
    }));
    setCartWithQuantity(initialCart);
  }, [cart]);

  const handleDelete = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartWithQuantity((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );

    console.log(cartWithQuantity);
  };

  return (
    <>
      <div className="shopping-cart">
        <div className="shopping-cart-products">
          {cartWithQuantity.map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              quantity={product.quantity}
              onQuantityChange={(quantity: number) =>
                handleQuantityChange(product.id, quantity)
              }
              onDelete={handleDelete}
            />
          ))}{" "}
        </div>

        <Sidebar cartWithQuantity={cartWithQuantity}/>

        <Toaster richColors position="bottom-right" />
      </div>
    </>
  );
};

export default ShoppingCart;
