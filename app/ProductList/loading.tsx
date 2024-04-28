"use client";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

function Loading() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="p-10 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center space-x-4 mx-auto space-y-4 lg:space-y-0">
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {loading && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default Loading;
