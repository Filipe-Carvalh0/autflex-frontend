import { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";
import RowMaterialForm from "./RawMaterialForm";

export default function RawMaterialList() {
    const [rawMaterials, setrawMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);

    useEffect(() => {
        fetchRawMaterial();
    }, []);

    const fetchRawMaterial = async () => {
        try {
            const response = await api.get('raw-materials/');
            setrawMaterials(response.data);
        } catch (err) {
            setError("Error loading Raw Material!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading Raw Material...</p>

    if (error) return <p>{error}</p>;

    const handleDelete = async (id) => {
        if (!window.confirm("Confirm delete?")) return;

        await api.delete(`raw-materials/${id}/`);
        fetchRawMaterial();
    };

    return (
        <section className="div-raw-materials-list">
            <h2>Materias-Primas</h2>

            <RowMaterialForm selectedRawMaterial={selectedRawMaterial}
                onSuccess={() => {
                    fetchRawMaterial();
                    setSelectedRawMaterial(null);
                }}
            />

            <table className="table-list" border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>

                <tbody>
                    {rawMaterials.map((rawMaterial) => (
                        <tr key={rawMaterial.id}>
                            <td>{rawMaterial.code}</td>
                            <td>{rawMaterial.name}</td>
                            <td>{rawMaterial.stock_quantity}</td>
                            <td>
                                <button onClick={() => setSelectedRawMaterial(rawMaterial)}>Editar</button>
                                <button onClick={() => handleDelete(rawMaterial.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )

}