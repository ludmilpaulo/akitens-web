"use client";
import Link from 'next/link';
import { SocialIcon } from "react-social-icons";
import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { AboutUsData, basAPI, fetchAboutUsData } from '@/configs/variable';

const ContactForm: React.FC = () => {
    const controls = useAnimation();
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    phone : '',
    message: '',
  });

  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAboutUsData();
      setAboutUsData(data);
    };
    fetchData();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Handle form submission
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    try {
      // Call the API endpoint to submit the form data
      const response = await fetch(`${basAPI}/info/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully', formData);
  
        // Reset form data after successful submission
        setFormData({
          subject: '',
          name: '',
          email: '',
          phone: '',
          message: '',
        });
  
        // Show alert to notify the user
        alert('Your form has been submitted successfully. We will contact you within 24 hours.');
  
        // Redirect the user to '/services'
        router.push('/');
      } else {
        // Handle errors if any
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <div style={{ backgroundImage: `url(${aboutUsData?.backgroundApp})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="container mx-auto py-8">
      <motion.div
  initial={{
    x: -500,
    opacity: 0,
    scale: 0.5,
  }}
  animate={{
    x: 0,
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 2,
  }}
  className="flex flex-row items-center"
>
  <>
    {aboutUsData?.facebook && <SocialIcon url={aboutUsData.facebook} />}
    {aboutUsData?.linkedin && <SocialIcon url={aboutUsData.linkedin} />}
    {aboutUsData?.twitter && <SocialIcon url={aboutUsData.twitter} />}
   
    {aboutUsData?.instagram && <SocialIcon url={aboutUsData.instagram} />}
  </>
</motion.div>


    
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center">Let’s chat and get a quote!</h2>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="name">
              Subject
            </label>
            <div className="flex items-center">
              <FiUser className="text-gray-600 mr-2" />
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your Subject"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <div className="flex items-center">
              <FiUser className="text-gray-600 mr-2" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="flex items-center">
              <FiMail className="text-gray-600 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
        
       
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="phone">
              Phone
            </label>
            <div className="flex items-center">
              <FiPhone className="text-gray-600 mr-2" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <div className="flex items-center">
              <FiMessageCircle className="text-gray-600 mr-2" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Enter your message"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;