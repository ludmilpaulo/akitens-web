"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { AboutUsData, basAPI, fetchAboutUsData } from '@/configs/variable';

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
  const [isOpen, setIsOpen] = useState(false);

  const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAboutUsData();
      setAboutUsData(data);
    };
    fetchData();
  }, []);

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
    setIsOpen(true);
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
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${aboutUsData?.backgroundApp})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    <div className="container mx-auto py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Carreiras</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {careers.map(career => (
          <div key={career.id} className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{career.title}</h2>
            <p className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: career.description }}
            />
            <button onClick={() => handleApply(career.id)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Aplicar
            </button>
          </div>
        ))}
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto" >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-2xl font-bold mb-4">Apply for {careers.find(career => career.id === selectedCareer)?.title}</h2>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nome completo</label>
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">currículos</label>
                  <input type="file" id="resume" name="resume" onChange={handleFileChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                Enviar inscrição
                </button>
                <button onClick={() => setIsOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
    </div>
  );
};

export default Careers;
