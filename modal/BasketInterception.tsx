"use client";
import Basket from "@/components/Basket";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const BasketInterception = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  function onDismiss() {
    router.back();
  }

  return (
    <div>
      {/* Modal toggle */}

      {/* Main modal */}
      {isOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cesta
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onDismiss();
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Conteúdo da sua cesta
                </p>
                <Basket />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketInterception;
