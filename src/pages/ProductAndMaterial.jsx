import ProductList from "../components/Product/ProductList";
import ProductRawMaterialManager from "../components/ProductRawMaterial/ProductRawMaterialManager";

export default function ProductAndMaterial() {
    return(
        <section>
            <section>
                <ProductList />
            </section>
            <section>
                <ProductRawMaterialManager />
            </section>
        </section>
    )
}