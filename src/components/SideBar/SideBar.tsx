import { useState } from "react";
import Button from "../Button/Button";
import "./Sidebar.scss";
import axios from "axios";
import { toast } from "sonner";

interface QuoteItemDTO {
  code: string;
  quantity: number;
}

interface RegisterQuoteDTO {
  customerName: string;
  state: string;
  country: string;
  items: QuoteItemDTO[];
}

interface QuoteDTO {
  id: string;
  date: string;
  customerName: string;
  state: string;
  country: string;
  items: QuoteItemDTO[];
  subtotal: number;
  regionalTax: number;
  federalTax: number;
  discount: number;
  total: number;
  status: string;
}

interface ProductWithQuantity {
  id: string;
  code: string;
  description: string;
  unitPrice: number;
  essential: boolean;
  quantity: number;
}

const Sidebar = ({
  cartWithQuantity,
}: {
  cartWithQuantity: ProductWithQuantity[];
}) => {
  const [quoteResult, setQuoteResult] = useState<QuoteDTO | null>(null);

  const [mode, setMode] = useState("calcular");
  const [estado, setEstado] = useState("RS");

const handleSubmitQuote = async () => {
    const quoteData = {
      customerName: "John Doe",  
      state: estado,                    
      country: "BRAZIL",              
      items: cartWithQuantity.map(item => ({
        code: item.code,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post<QuoteDTO>("http://localhost:8080/quotes/create", quoteData);
      setQuoteResult(response.data);
      setMode("comprar")
    } catch (error) {
      toast.error("Erro ao criar orçamento");
    }
  };

  return (
    <div className="sidebar">
      {mode === "calcular" ? (
        <div className="sidebar-content">
          <p className="info-text">Selecione seu estado</p>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="estado-select"
          >
            <option value="RS">RS - Rio Grande do Sul</option>
            <option value="SP">SP - São Paulo</option>
            <option value="PE">PE - Pernambuco</option>
          </select>
          <Button className="sidebar-button" onClick={handleSubmitQuote}>
            Calcular
          </Button>
        </div>
      ) : (
        <div className="sidebar-content">
          <div className="value-group">
            <span className="label">Preço Original</span>
            <span className="value">R$ {quoteResult?.subtotal.toFixed(2)}</span>
          </div>
          <hr />
          <div className="value-group">
            <span className="label">Taxa Regional</span>
            <span className="value">R$ {quoteResult?.regionalTax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="value-group">
            <span className="label">Taxa Federal</span>
            <span className="value">R$ {quoteResult?.federalTax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="value-group total">
            <span className="label">Valor Final</span>
            <span className="value">R$ {quoteResult?.federalTax.toFixed(2)}</span>
          </div>
          <Button className="sidebar-button">Comprar</Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
