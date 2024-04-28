import React, { useCallback, useEffect, useState } from "react";
import ServiceTableRow from "./ServiceTableRow"; // Changed from ProductTableRow to ServiceTableRow
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/authSlice";
import { basAPI, GetService } from "@/configs/variable";

const ServiceTableContainer = () => {
  // Changed from ProductTableContainer to ServiceTableContainer
  const [services, setServices] = useState<GetService[] | null>(null); // Changed from products to services
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  console.log("serviços==>", services);

  const fetchServiceData = useCallback(async () => {
    // Changed from fetchProductData to fetchServiceData
    setLoading(true);
    if (user?.token) {
      try {
        const response = await fetch(
          `${basAPI}/shops/get_services/?access_token=${user.token}`, // Changed from get_products to get_services
        );
        if (response.ok) {
          const data = await response.json();
          console.log("service fetched ==>", data);
          // Changed from produtos to serviços
          if (data && Array.isArray(data.service)) {
            // Changed from products to services
            setServices(data.service); // Changed from products to services
          } else if (data && data.length === 0) {
            alert("No services available. Please add services."); // Changed from products to services
          }
        } else {
          console.error("Failed to fetch service data"); // Changed from product to service
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchServiceData(); // Changed from fetchProductData to fetchServiceData
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the interval when the component unmounts or when fetchServiceData changes
    return () => clearInterval(intervalId);
  }, [fetchServiceData]);

  const handleDelete = async (serviceId: number) => {
    // Changed from productId to serviceId
    const user_id = user?.user_id;

    if (!user_id) {
      alert("User ID not provided.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this service?")) {
      // Changed from product to service
      try {
        const response = await fetch(
          `${basAPI}/shops/delete-service/${serviceId}/`, // Changed from delete-product to delete-service
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id }),
          },
        );

        if (response.ok) {
          alert("Service deleted successfully!"); // Changed from product to service
          setServices((prevServices) => {
            if (prevServices) {
              return prevServices.filter((service) => service.id !== serviceId); // Changed from product to service
            } else {
              return null;
            }
          });
        } else {
          alert("Failed to delete service. Please try again."); // Changed from product to service
        }
      } catch (error) {
        console.error("Error deleting service:", error); // Changed from product to service
        alert(
          "An error occurred while trying to delete the service. Please try again.",
        );
      }
    }
  };

  return (
    <div className="table-responsive">
      {loading && <p>Loading...</p>}
      {services && (
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Pequena descrição</th>

              <th className="px-4 py-2 border">Imagem</th>
            </tr>
          </thead>
          <tbody>
            {services.map(
              (
                service,
                index, // Changed from products to services
              ) => (
                <ServiceTableRow // Changed from ProductTableRow to ServiceTableRow
                  key={index}
                  service={service} // Changed from product to service
                  index={index}
                  handleDelete={handleDelete}
                />
              ),
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ServiceTableContainer; // Changed from ProductTableContainer to ServiceTableContainer
