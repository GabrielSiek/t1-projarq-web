import Button from "../Button/Button";
import "./Product.scss";
import { LuBoxes } from "react-icons/lu";

interface Product {
  id: string;
  code: string;
  description: string;
  unitPrice: number;
  essential: boolean;
}

interface ProductProps {
  product: Product;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className="product">
      <div className="product-info">
        <LuBoxes className="product-icon" size={90} />

        <div className="product-data">
          <h1 className="product-description">{product.description}</h1>
          <h2 className="product-price">R${product.unitPrice}</h2>
        </div>
      </div>

      <div className="buttons">
        <Button>Adicionar</Button>
      </div>
    </div>
  );
};

export default Product;
