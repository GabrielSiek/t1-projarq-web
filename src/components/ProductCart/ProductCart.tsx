import "./ProductCart.scss";
import { LuBoxes } from "react-icons/lu";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Product {
  id: string;
  code: string;
  description: string;
  unitPrice: number;
  essential: boolean;
}

interface ProductProps {
  product: Product;
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
  onDelete?: (id: string) => void;
}

const ProductCart = ({
  product,
  quantity,
  onQuantityChange,
  onDelete,
}: ProductProps) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange?.(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange?.(quantity + 1);
  };

  const handleDelete = () => {
    onDelete?.(product.id);
  };

  return (
    <div className="product-cart">
      <div className="product-cart-info">
        <LuBoxes className="product-icon" size={60} />

        <div className="product-cart-data">
          <h1 className="product-cart-description">{product.description}</h1>
          <h2 className="product-cart-price">R${product.unitPrice}</h2>
        </div>
      </div>

      <div className="product-cart-actions">
        <FaRegTrashAlt
          size={16}
          className="product-cart-trash"
          onClick={handleDelete}
        />

        <button className="product-cart-button" onClick={handleDecrease}>
          -
        </button>
        <span>{quantity}</span>
        <button className="product-cart-button" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
