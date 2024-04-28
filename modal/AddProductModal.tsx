import React, { useState } from "react";
import { basAPI, Categoria } from "@/configs/variable";
import { Product } from "@/redux/slices/basketSlice";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: Categoria[];
  user: { user_id?: number; token?: string };
  // onSubmit: (data: Product) => void; // Define the onSubmit function type
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  categorias,
  user,
  // onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    image_urls: "",
    rating: 0,
    description: "",
    quantity: 0,
    shop: 0,
    shopId: 0,
    shopName: "",
    shopImage_url: "",
    category: "",
    images: [], // Initialize with an empty array
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        images: Array.from(files),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const value = formData[key as keyof Product]; // Use type assertion to access property

          if (Array.isArray(value)) {
            value.forEach((file: string | File, index: number) => {
              if (typeof file === "string") return; // Skip strings
              formDataToSend.append(`images[${index}]`, file as File); // Type assertion
            });
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      }

      if (user.user_id !== undefined) {
        formDataToSend.append("user_id", String(user.user_id));
        formDataToSend.append("access_token", String(user.token));
      }

      const response = await fetch(`${basAPI}/shops/add-product/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("adiocionar", result);
        alert("Produto adicionado com sucesso");
        setLoading(false);
        // Reset form data after successful submission
        setFormData({
          shopId: 0,
          shopName: "",
          shopImage_url: "",
          category: "",
          id: 0,
          title: "",
          price: 0,
          images: [],
          image_urls: "",
          rating: 0,
          description: "",
          quantity: 0,
          shop: 0, // Include the shop property with a default value
        });

        // Clear file input field
        const fileInput = document.getElementById(
          "fileInput",
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
        // Trigger any necessary state updates or side effects after submission
        //  onSubmit(formData);
      } else {
        console.error("Failed to add product");
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("An exception occurred:", error);
      alert(
        "An exception occurred while adding the product. Please try again.",
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Nome</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                />
              </div>

              <div>
                <label className="block mb-2">Descrição Curta</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                />
              </div>

              <div>
                <label className="block mb-2">Imagens</label>
                <input
                  id="fileInput"
                  type="file"
                  name="images"
                  onChange={handleFileChange}
                  multiple
                  className="w-full p-2 border"
                />
              </div>

              <div>
                <label className="block mb-2">Preço</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border"
                />
              </div>

              <div>
                <label className="block mb-2">Categoria</label>
                <div className="flex">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="flex-grow p-2 border mr-2"
                  >
                    <option value="">Selecione uma categoria</option>
                    {/* Default option */}
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.slug}>
                        {categoria.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Digite a categoria"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="flex-none p-2 border"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
                <button
                  onClick={onClose}
                  className="w-full md:w-auto px-4 py-2 mt-4 md:mt-0 ml-0 md:ml-4 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductModal;
