// EditProductModal.tsx
import { Categoria } from "@/configs/variable";
import { Product } from "@/redux/slices/basketSlice";
import React from "react";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  register: any; // Adjust this type according to your useForm hook
  errors: any; // Adjust this type according to your useForm hook
  editingProduct: Product | null;
  categorias: Categoria[];
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  editingProduct,
  categorias,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          {/* Edit product modal content */}
        </div>
      )}
    </>
  );
};

export default EditProductModal;