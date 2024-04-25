import React, { useState } from "react";
import { basAPI, Categoria, Service } from "@/configs/variable";
interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: Categoria[];
  user: { user_id?: number; token?: string };
  // onSubmit: (data: Service) => void; // Define the onSubmit function type
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  categorias,
  user,
  // onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Service>({
    category: "",
    title: "",
    images: [],
    description: "",
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

      // Append form data to formDataToSend
      formDataToSend.append("category", formData.category);
      formDataToSend.append("title", formData.title);
      formData.images.forEach((file, index) => {
        formDataToSend.append(`images[${index}]`, file);
      });
      formDataToSend.append("description", formData.description);

      // Append user_id and access_token
      if (user.user_id !== undefined) {
        formDataToSend.append("user_id", String(user.user_id));
        formDataToSend.append("access_token", String(user.token));
      }

      const response = await fetch(`${basAPI}/shops/add-service/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("adiocionar", result);
        alert("Serviço adicionado com sucesso");
        setLoading(false);
        // Reset form data after successful submission
        setFormData({
          category: "",
          title: "",
          images: [],
          description: "",
        });

        // Clear file input field
        const fileInput = document.getElementById(
          "fileInput"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        console.error("Failed to add service");
        alert("Failed to add service. Please try again.");
        setLoading(false)
      }
    } catch (error) {
      console.error("An exception occurred:", error);
      alert("An exception occurred while adding the service. Please try again.");
    }
  };

  return (
    <>
    {isOpen && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
          <h2 className="mb-4 text-xl font-bold">Adicionar Serviço</h2>
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

export default AddServiceModal;