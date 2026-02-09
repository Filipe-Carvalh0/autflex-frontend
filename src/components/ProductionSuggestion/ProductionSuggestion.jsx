import { useEffect, useState, useCallback } from "react";
import api from "../../services/api";

export default function ProductionSuggestion() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Evita que o useEffect sinta que precisa "sincronizar" algo novo.
    const fetchSuggestion = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get("production/suggestion/");
            setData(res.data);
        } catch (error) {
            console.error("Erro ao buscar sugestão:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSuggestion();
    }, [fetchSuggestion]);

    
    if (loading) return <p>Loading...</p>;
    if (!data || !data.products) return <p>Não há dados disponíveis.</p>;

    return (
        <section>
            <h2>Sugestão de produto</h2>

            <table className="table-list" border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.products.map(p => (
                        <tr key={p.product_id}>
                            <td>{p.product_name}</td>
                            <td>{p.quantity}</td>
                            <td>R$ {p.unit_price}</td>
                            <td>R$ {p.total_value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Total Value: R$ {data.total_value}</h3>
            
            {/* Botão opcional para atualizar manualmente sem remontar o componente */}
            <button onClick={fetchSuggestion}>Refresh data</button>
        </section>
    );
}