import "./Home.scss";
import Product from "../../components/Product/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../hooks/CartContext";
import { Toaster, toast } from "sonner";

const mockProducts = [
  {
    id: "1",
    code: "PROD-001",
    description: "Camiseta Básica Azul",
    unitPrice: 59.9,
    essential: true,
  },
  {
    id: "2",
    code: "PROD-002",
    description: "Calça Jeans Masculina",
    unitPrice: 129.9,
    essential: true,
  },
  {
    id: "3",
    code: "PROD-003",
    description: "Tênis Esportivo",
    unitPrice: 199.9,
    essential: false,
  },
  {
    id: "4",
    code: "PROD-004",
    description: "Jaqueta Corta Vento",
    unitPrice: 149.9,
    essential: false,
  },
  {
    id: "5",
    code: "PROD-005",
    description: "Camisa Polo Branca",
    unitPrice: 89.9,
    essential: true,
  },
  {
    id: "6",
    code: "PROD-006",
    description: "Bermuda de Moletom",
    unitPrice: 69.9,
    essential: true,
  },
  {
    id: "7",
    code: "PROD-007",
    description: "Relógio Digital Esportivo",
    unitPrice: 249.9,
    essential: false,
  },
  {
    id: "8",
    code: "PROD-008",
    description: "Boné Preto Casual",
    unitPrice: 39.9,
    essential: false,
  },
  {
    id: "9",
    code: "PROD-009",
    description: "Meias Esportivas (3 pares)",
    unitPrice: 29.9,
    essential: true,
  },
  {
    id: "10",
    code: "PROD-010",
    description: "Óculos de Sol",
    unitPrice: 99.9,
    essential: false,
  },
];

interface ProductDTO {
  id: string;
  code: string;
  description: string;
  unitPrice: number;
  essential: boolean;
}

const Home = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get<ProductDTO[]>("http://localhost:8080/products/all");
        // setProducts(response.data);
        setProducts(mockProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (product: ProductDTO) => {
    addToCart(product);
    toast.success("Produto adicionado ao carrinho.")
  };

  return (
    <div className="home">
      <div className="home-title">Produtos</div>

      <div className="home-products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            onClick={() => handleClick(product)}
          />
        ))}{" "}
      </div>

      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default Home;
