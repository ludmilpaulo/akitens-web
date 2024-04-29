"use client";
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import axios from 'axios';
import { UserService, ServiceRequest, basAPI } from '@/configs/variable';

const ServicesPage = () => {
  const [services, setServices] = useState<UserService[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [formData, setFormData] = useState<ServiceRequest>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<UserService[]>(`${basAPI}/shops/services/`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleRequestService = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${basAPI}/shop/service-requests/`, {
        ...formData,
        service: selectedService,
      });
      alert('Service request submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        message: '',
      });
      setSelectedService(null);
    } catch (error) {
      console.error('Error submitting service request:', error);
      alert('Error submitting service request. Please try again.');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000 // Change slides every 5 seconds (5000 milliseconds)
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Servicos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={service.id}>
            <div className="relative h-40 w-full">
              {/* Display project images or carousel */}
              <Slider {...settings}>
              {service.image_urls.map((imageUrlOrFile: string | File, index: number) => (
                <div key={index}>
                    {/* Check if imageUrlOrFile is a string (URL) */}
                    {typeof imageUrlOrFile === 'string' ? (
                    <Image src={imageUrlOrFile} alt={`Project Image ${index}`} width={800} height={600} />
                    ) : (
                    /* Handle file case */
                    <span>File: {imageUrlOrFile.name}</span> // Example placeholder for files
                    )}
                </div>
                ))}


              </Slider>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button
                onClick={() => handleRequestService(service.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Request Service
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedService && (
        <Dialog open={selectedService !== null} onClose={() => setSelectedService(null)}>
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center" />
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Request Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Submit
              </button>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ServicesPage;
