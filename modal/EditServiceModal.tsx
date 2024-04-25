// EditServiceModal.tsx
import { Categoria, GetService } from "@/configs/variable";

import React from "react";

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GetService) => void;
  register: any; // Adjust this type according to your useForm hook
  errors: any; // Adjust this type according to your useForm hook
  editingService: GetService | null; // Renamed editingProduct to editingService
  categorias: Categoria[];
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  errors,
  editingService, // Renamed editingProduct to editingService
  categorias,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          {/* Edit service modal content */}
        </div>
      )}
    </>
  );
};

export default EditServiceModal;