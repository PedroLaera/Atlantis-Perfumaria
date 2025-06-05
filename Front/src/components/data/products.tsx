import img1 from "../assets/img1.jpg";

// Array inicial de produtos
const products: any[] = [
  {
    id: "1",
    name: "Produto",
    manufacturer: "Empresa X",
    createdDate: "2024-03-20",
    category: "claro",
    price: 100.0,
    description: "Descrição do produto exemplo.",
    image: img1,
  },
];

// Exportamos tanto os produtos quanto uma função para adicionar um novo produto
export const getProducts = () => products;

export const addProduct = (product: any) => {
  products.push({ ...product, id: String(products.length + 1) }); // Garante um ID único
};

export default products;

/*import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.webp";

const products = [
  {
    id: "1",
    name: "Notebook Gamer",
    price: "R$ 5.000",
    image: img2,
    description: "Alto desempenho para jogos e trabalho.",
  },
  {
    id: "2",
    name: "Smartphone",
    price: "R$ 2.500",
    image: img3,
    description: "Câmera poderosa e bateria de longa duração.",
  },
  {
    id: "3",
    name: "Headset Bluetooth",
    price: "R$ 300",
    image: img1,
    description: "Qualidade de som incrível e conexão estável.",
  },
];

export default products;
*/
