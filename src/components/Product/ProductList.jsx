import { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
import ProductForm from "./ProductForm";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('products/');
            setProducts(response.data);
        } catch (err) {
            setError("Error loading!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading products...</p>

    if (error) return <p>{error}</p>;

    const handleDelete = async (id) => {
        if (!window.confirm("Confirm delete?")) return;

        await api.delete(`products/${id}/`);
        fetchProducts();
    };

    return (
        <section className="div-product-list">
            <h2>Produtos</h2>

            <ProductForm
                selectedProduct={selectedProduct}
                onSuccess={() => {
                    fetchProducts();
                    setSelectedProduct(null);
                }}
            />

            <table className="table-list" border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => setSelectedProduct(product)}>Editar</button>
                                <button onClick={() => handleDelete(product.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )

};