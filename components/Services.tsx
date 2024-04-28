import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { basAPI, Categoria, GetService } from "@/configs/variable";

import { useSelector } from "react-redux";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import { selectUser } from "@/redux/slices/authSlice";
import AddServiceModal from "@/modal/AddServiceModal";
import EditServiceModal from "@/modal/EditServiceModal";
import ServiceTableRow from "@/modal/ServiceTableRow";
import { SubmitHandler } from "react-hook-form";

import ServiceTableContainer from "@/modal/ServiceTableContainer";

// Define the TypeScript type for a service based on the response structure.

interface ServicesProps {
  services?: GetService[];
}

const Services: React.FC<ServicesProps> = () => {
  const user = useSelector(selectUser);

  const [services, setServices] = useState<GetService[] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [serviceTable, setServiceTable] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editingService, setEditingService] = useState<GetService | null>(null);
  const [loading, setLoading] = useState(false);
  console.log("services from backend ", services);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetService>();

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${basAPI}/shops/services_categorias/`);
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchCategorias();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleUpdate = async (
    serviceId: number,
    updatedServiceData: GetService,
  ) => {
    try {
      // Include the user_id in the updatedServiceData object

      const response = await fetch(`${basAPI}/shops/update-service/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedServiceData),
      });
      console.log("update=>", response);

      if (response.ok) {
        alert("Service updated successfully!");
      } else {
        alert("Failed to update service. Please try again.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert(
        "An error occurred while trying to update the service. Please try again.",
      );
    }
  };

  // Function to open the edit modal with the selected service
  const openEditModal = (service: GetService) => {
    setEditingService(service);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="container px-4 mx-auto">
        <div className="content-wrapper">
          <div className="flex items-center justify-center page-header">
            <button
              onClick={() => {
                setIsAddModalOpen(true);
                setServiceTable(false);
              }}
              className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Adicionar serviço
            </button>
          </div>

          <Transition
            show={loading}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
              <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          </Transition>

          {!loading && (
            <>
              <AddServiceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                categorias={categorias}
                user={user}
              />

              <EditServiceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={(data) => handleUpdate(editingService?.id || 0, data)}
                register={register}
                errors={errors}
                editingService={editingService}
                categorias={categorias}
              />

              {serviceTable && <ServiceTableContainer />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
