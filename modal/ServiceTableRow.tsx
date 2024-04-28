import React from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { GetService } from "@/configs/variable";

interface ServiceTableRowProps {
  service: GetService; // Changed from Product to Service
  index: number;
  handleDelete: (serviceId: number) => void; // Changed from productId to serviceId
}

const ServiceTableRow: React.FC<ServiceTableRowProps> = ({
  // Changed from ProductTableRow to ServiceTableRow
  service, // Changed from product to service
  index,
  handleDelete,
}) => {
  return (
    <tr className="table-info">
      <td className="px-4 py-2 border">{service.id}</td>
      <td className="px-4 py-2 text-black border">
        <Link href={`/restaurant/edit-service/${service.id}`}>
          <p className="text-black">{service.title}</p>
        </Link>
      </td>
      <td className="px-4 py-2 border">{service.description}</td>

      <td className="px-4 py-2 border">
        <div className="relative h-16 w-16">
          {typeof service.image_urls[0] === "string" &&
          service.image_urls[0].length > 0 ? (
            <Image
              className="object-cover rounded-full"
              src={service.image_urls[0] as string}
              layout="fill"
              alt={service.title}
            />
          ) : (
            <Image
              className="object-cover rounded-full"
              src="/path/to/default/image.png"
              layout="fill"
              alt={service.title}
            />
          )}
        </div>
      </td>
      <td className="flex justify-around px-4 py-2 border">
        <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
          <FaEdit />
        </button>
        <button
          className="text-red-600 hover:text-red-800 focus:outline-none"
          onClick={() => handleDelete(service.id)} // Changed from product to service
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ServiceTableRow; // Changed from ProductTableRow to ServiceTableRow
