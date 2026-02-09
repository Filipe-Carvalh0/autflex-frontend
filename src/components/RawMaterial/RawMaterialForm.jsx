import { useState } from "react";
import api from "../../services/api";

export default function RawMaterialForm({ selectedRawMaterial, onSuccess }) {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        stock_quantity: "",
    });

    // quando clicar em Edit, atualiza direto
    if (selectedRawMaterial && formData.id !== selectedRawMaterial.id) {
        setFormData({
            id: selectedRawMaterial.id,
            code: selectedRawMaterial.code ?? "",
            name: selectedRawMaterial.name ?? "",
            stock_quantity: selectedRawMaterial.stock_quantity ?? "",
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
                await api.put(`raw-materials/${formData.id}/`, formData);
            } else {
                await api.post("raw-materials/", formData);
            }

            onSuccess();
            setFormData({ code: "", name: "", stock_quantity: "" });
        } catch (err) {
            console.error("Error saving RawMaterial", err);
        }
    };

    return (
        <form className="form-new-update" onSubmit={handleSubmit}>
            <h3>{formData.id ? "Editar Materia-prima" : "Nova Materia-prima"}</h3>

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
                name="stock_quantity"
                type="number"
                placeholder="Quantidade"
                value={formData.stock_quantity}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {formData.id ? "Salvar" : "Criar"}
            </button>
        </form>
    );
}
