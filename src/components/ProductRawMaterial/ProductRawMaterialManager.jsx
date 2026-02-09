import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function ProductRawMaterialManager() {
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [associations, setAssociations] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    product: "",
    raw_material: "",
    quantity_required: ""
  });

  const loadedRef = useRef(false);

    //LOAD INICIAL (ANTI-LOOP)
  
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadData = async () => {
      try {
        const [prodRes, rmRes, assocRes] = await Promise.all([
          api.get("products/"),
          api.get("raw-materials/"),
          api.get("product-raw-materials/")
        ]);

        setProducts(prodRes.data);
        setRawMaterials(rmRes.data);
        setAssociations(assocRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    loadData();
  }, []);

  
    //HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      product: "",
      raw_material: "",
      quantity_required: ""
    });
  };

  /* =========================
     CREATE / UPDATE
  ==========================*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product: formData.product,
      raw_material: formData.raw_material,
      quantity_required: Number(formData.quantity_required)
    };

    try {
      if (formData.id) {
        const res = await api.put(
          `product-raw-materials/${formData.id}/`,
          payload
        );

        setAssociations(prev =>
          prev.map(item => (item.id === res.data.id ? res.data : item))
        );
      } else {
        const res = await api.post("product-raw-materials/", payload);
        setAssociations(prev => [...prev, res.data]);
      }

      resetForm();
    } catch (err) {
      console.error("Erro ao salvar associação:", err);
    }
  };

  
    //EDITAR
  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      product: item.product,
      raw_material: item.raw_material,
      quantity_required: item.quantity_required
    });
  };

    //DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja remover esta associação?")) return;

    try {
      await api.delete(`product-raw-materials/${id}/`);
      setAssociations(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };


  return (
    <section>
      <h3>Associar Matéria-Prima ao Produto</h3>

      <form className="form-new-update" onSubmit={handleSubmit}>
        <select
          name="product"
          value={formData.product ?? ""}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o produto</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          name="raw_material"
          value={formData.raw_material ?? ""}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a matéria-prima</option>
          {rawMaterials.map(rm => (
            <option key={rm.id} value={rm.id}>
              {rm.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity_required"
          placeholder="Quantidade necessária"
          value={formData.quantity_required ?? ""}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {formData.id ? "Atualizar" : "Adicionar"}
        </button>

        {formData.id && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <h4>Associações cadastradas</h4>

      <table className="table-list" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Matéria-prima</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {associations.map(item => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.raw_material_name}</td>
              <td>{item.quantity_required}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}

          {associations.length === 0 && (
            <tr>
              <td colSpan="4">Nenhuma associação cadastrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
