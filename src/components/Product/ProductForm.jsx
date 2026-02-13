import { useState } from "react";
import api from "../../services/api";

export default function ProductForm({ selectedProduct, onSuccess }) {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        price: "",
    });

    // quando clicar em Edit, atualiza direto
    if (selectedProduct && formData.id !== selectedProduct.id) {
        setFormData({
            id: selectedProduct.id,
            code: selectedProduct.code ?? "",
            name: selectedProduct.name ?? "",
            price: selectedProduct.price ?? "",
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.id) {
                await api.put(`products/${formData.id}/`, formData);
            } else {
                await api.post("products/", formData);
            }

            onSuccess();
            setFormData({ code: "", name: "", price: "" });
        } catch (err) {
            console.error("Error saving product", err);
        }
    };

    return (
        <form className="form-new-update" onSubmit={handleSubmit}>
            <h3>{formData.id ? "Editar produto" : "Novo Produto"}</h3>

            <input
                name="code"
                placeholder="Código"
                value={formData.code}
                onChange={handleChange}
                required
            />

            <input
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                name="price"
                type="number"
                placeholder="preço"
                value={formData.price}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {formData.id ? "Salvar" : "Criar"}
            </button>
        </form>
    );
}
