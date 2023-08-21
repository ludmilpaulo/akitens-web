import React, { useEffect, useState } from "react";
import Link from "next/link";
import { local } from "@/configs/variable";
import { User } from "@/redux/authReducer";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useForm } from "react-hook-form";

// Define the TypeScript type for a product based on the response structure.
type Product = {
  id?: number;
  nome: string;
  descricao_curta: string;
  imagem: string;
  preco: string;
  categoria: string | number; // I've added this line. Adjust the type based on your needs.
  // Add other fields if necessary...
};

type Categoria = {
  id: number;
  nome: string;
  slug: string;
};

interface ProductsProps {
  products?: Product[]; // This is optional and can be useful if you want to pass initial products as a prop.
}

const Products: React.FC<ProductsProps> = () => {
  // Use the useSelector hook to get the current user from the Redux state.
  const user = useSelector((state: RootState) => state.auth.user) as User;

  // Define a state to hold the fetched products.
  const [products, setProducts] = useState<Product[] | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        // Make an API call to fetch categories.
        const response = await fetch(`${local}/api/categorias/`);
        console.log("categorias", response);
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchCategorias();
  }, []);

  const onSubmit = async (data: Product) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, String(value)); // This will convert everything to a string
    }
    if (user.user_id !== undefined) {
      formData.append("user_id", String(user.user_id)); // Convert user_id to a string
      formData.append("fornecedor", String(user.user_id)); // Similarly, convert fornecedor to a string
    }

    // For the image specifically, you'd append the actual File object
    if (data.imagem) {
      formData.append("imagem", data.imagem[0]);
    }

    try {
      const response = await fetch(`${local}/api/add-product/?`, {
        // mode: 'no-cors',
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      console.log("resultado", result);

      // ... rest of your code
    } catch (error) {
      console.error("An exception occurred:", error);
    }
  };

  // useEffect hook to run the fetchProductData function once the component mounts or user changes.
  useEffect(() => {
    const fetchProductData = async () => {
      if (user?.user_id) {
        try {
          // Make an API call to fetch products for the given user_id.
          const response = await fetch(
            `${local}/api/get_products/?user_id=${user.user_id}`,
          );
          if (response.ok) {
            const data = await response.json();
            console.log("product", data);
            // If the data is valid, update the products state.
            if (data && data.length > 0) {
              setProducts(data);
            }
          } else {
            console.error("Failed to fetch product data");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    };

    fetchProductData();
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <div className="content-wrapper">
        <div className="page-header flex justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Adicionar produto
          </button>
        </div>

        {isModalOpen ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block mb-2">Nome</label>
                  <input
                    {...register("nome", { required: true })}
                    className="w-full p-2 border"
                  />
                  {errors.nome && (
                    <span className="text-red-500">Nome is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Descrição Curta</label>
                  <input
                    {...register("descricao_curta", { required: true })}
                    className="w-full p-2 border"
                  />
                  {errors.descricao_curta && (
                    <span className="text-red-500">
                      Descrição Curta is required
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Imagem URL</label>
                  <input
                    type="file"
                    {...register("imagem", { required: true })}
                    className="w-full p-2 border"
                  />

                  {errors.imagem && (
                    <span className="text-red-500">Imagem URL is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("preco", { required: true })}
                    className="w-full p-2 border"
                  />
                  {errors.preco && (
                    <span className="text-red-500">Preço is required</span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Categoria</label>
                  <select
                    {...register("categoria", { required: true })}
                    className="w-full p-2 border"
                  >
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </option>
                    ))}
                  </select>

                  {errors.categoria && (
                    <span className="text-red-500">Categoria is required</span>
                  )}
                </div>

                {/* ... (Add other form fields similarly) */}

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="min-w-full bg-white border rounded-lg">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border">No</th>
                          <th className="py-2 px-4 border">Nome</th>
                          <th className="py-2 px-4 border">
                            Pequena descrição
                          </th>
                          <th className="py-2 px-4 border">Preço</th>
                          <th className="py-2 px-4 border">Imagem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Check if the products exist and then map through them to render the rows. */}
                        {products?.map((product, index) => (
                          <tr key={index} className="table-info">
                            <td className="py-2 px-4 border">{product.id}</td>
                            <td className="py-2 px-4 border text-black">
                              <Link
                                href={`/restaurant/edit-product/${product.id}`}
                              >
                                <p className="text-black">{product.nome}</p>
                              </Link>
                            </td>
                            <td className="py-2 px-4 border">
                              {product.descricao_curta}
                            </td>
                            <td className="py-2 px-4 border">
                              {product.preco} Kz
                            </td>
                            <td className="py-2 px-4 border text-center relative">
                              {" "}
                              {/* Add "relative" class for Image positioning */}
                              <div className="absolute inset-0">
                                <Image
                                  className="rounded-full object-cover" // object-cover will make sure the image covers the entire parent without distorting
                                  src={
                                    product.imagem ||
                                    "/path/to/default/image.png"
                                  }
                                  layout="fill"
                                  alt={product.nome}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

// You can fetch the 'meals' data using `getStaticProps` or `getServerSideProps` if this component is in the pages directory
