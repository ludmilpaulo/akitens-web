"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { basAPI } from '@/configs/variable';

interface Career {
  id: number;
  title: string;
  description: string;
}

interface FormValues {
  fullName: string;
  email: string;
  resume: File | null;
}

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormValues>({
    fullName: '',
    email: '',
    resume: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Career[]>(`${basAPI}/careers/careers/`);
        setCareers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApply = (careerId: number) => {
    setSelectedCareer(careerId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, email, resume } = formData;

    if (!selectedCareer || !fullName || !email || !resume) {
      alert('Please fill in all fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('career', String(selectedCareer));
    formDataToSend.append('full_name', fullName);
    formDataToSend.append('email', email);
    formDataToSend.append('resume', resume as File);

    try {
      await axios.post(`${basAPI}/careers/apply-for-job/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Application submitted successfully!');
      // Clear form data after successful submission
      setFormData({
        fullName: '',
        email: '',
        resume: null,
      });
      setSelectedCareer(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Careers</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {careers.map(career => (
          <div key={career.id} className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{career.title}</h2>
            <p className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: career.description }}
            />
            <button onClick={() => handleApply(career.id)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Apply
            </button>
          </div>
        ))}
      </div>
      {selectedCareer && (
        <form onSubmit={handleSubmit} className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Apply for {careers.find(career => career.id === selectedCareer)?.title}</h2>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume</label>
            <input type="file" id="resume" name="resume" onChange={handleFileChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default Careers;
