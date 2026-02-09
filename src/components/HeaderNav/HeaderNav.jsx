import { Link } from "react-router-dom";
import "./styles.css";

export default function HeaderNav() {
    return (
        <header className="header-autoflex">
            <nav className="menu-autoflex">
                <Link to="/">Home</Link>
                <Link to="/products">Produtos</Link>
                <Link to="/raw-materials">Matérias-primas</Link>
                <Link to="/product-suggestion">Sugestões</Link>
            </nav>

            <div className="header-content">
                <h1>AutoFlex</h1>
            </div>
        </header>
    );
}
