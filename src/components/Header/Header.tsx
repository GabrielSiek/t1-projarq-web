import "./Header.scss";
import logo from "../../../public/logo.png";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="header">
      <img className="logo" src={logo} onClick={() => navigate("/")}/>

      {isAdminRoute && (
        <div className="admin-links">
          <span onClick={() => navigate("/admin")}>Produtos</span>
          <span onClick={() => navigate("/admin/orcamentos")}>Orçamentos</span>
        </div>
      )}

      <div className="buttons">
        <TiShoppingCart className="cart-icon" size={32} onClick={() => navigate("/carrinho")} />
        <FaUserCircle className="user-icon"  size={32}/>
      </div>
    </div>
  );
};

export default Header;
