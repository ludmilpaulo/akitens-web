import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // Import Transition from @headlessui/react
import { useDispatch } from 'react-redux';
import { loginUser } from "../redux/authReducer";

import { AuthActionTypes } from '../redux/types';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const SignupPage: React.FC = () => {
    const dispatch = useDispatch();
    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        nome_fornecedor: "",
        telefone: "",
        endereco: "",
        email: "",
        logo: null as File | null,
        licenca: null as File | null,
    });

    const [loading, setLoading] = useState(false);
    const [logoLoading, setLogoLoading] = useState(false);
    const [licencaLoading, setLicencaLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            if (name === "logo") {
                setLogoLoading(true);
                // Simulate a delay for the upload. Remove this in a real use case.
                setTimeout(() => {
                    setSignupData(prevState => ({ ...prevState, [name]: files[0] }));
                    setLogoLoading(false);
                }, 2000);
            } else if (name === "licenca") {
                setLicencaLoading(true);
                // Simulate a delay for the upload. Remove this in a real use case.
                setTimeout(() => {
                    setSignupData(prevState => ({ ...prevState, [name]: files[0] }));
                    setLicencaLoading(false);
                }, 2000);
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(signupData).forEach(key => {
            const value = signupData[key as keyof typeof signupData];
            if (value !== null) formData.append(key, value as Blob | string);
        });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/fornecedor-sign-up/', {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();

            console.log("resultado", result);
    
            if (response.status === 201) {
                dispatch(loginUser(result));
                alert(
                "Você se conectou com sucesso Agora você pode saborear sua refeição",
                );
                console.log("Signup successful!", result);
            } else {
                alert(result.error);
                dispatch({ type: AuthActionTypes.SIGNUP_SUCCESS, payload: result });
                console.error("Signup failed:", result);
            }
        } catch (error) {
            console.error("There was an error sending the signup data", error);
        } finally {
            setLoading(false); // Set loading to false in a finally block to ensure it always gets turned off
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mx-auto p-4">

            <h1 className="text-2xl mb-4">Cadastro</h1>

            <div className="mt-4 self-center">
                    Don't have an account? <Link href="/SignInPage" className="text-blue-500 hover:underline">Sign In</Link>
                </div>

            <Transition
                show={loading}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Transition>

            {!loading && (
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                <input name="username" placeholder="Usuario" onChange={handleInputChange} className="p-2 border rounded" />
                <input type="password" name="password" placeholder="Senha" onChange={handleInputChange} className="p-2 border rounded" />
                <input name="nome_fornecedor" placeholder="Nome do Fornecedor ou do Negocio" onChange={handleInputChange} className="p-2 border rounded" />
                <input name="telefone" placeholder="Telefone" onChange={handleInputChange} className="p-2 border rounded" />
                <input name="endereco" placeholder="Endereço" onChange={handleInputChange} className="p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="p-2 border rounded" />

                <div className="relative">
                <input type="file" name="logo" onChange={handleFileChange} className="p-2 border rounded absolute opacity-0 w-full h-full cursor-pointer" />
                <div className="p-2 border rounded cursor-pointer">{logoLoading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto"></span> : "Carregar o Logo"}</div>
            </div>

            <div className="relative">
                <input type="file" name="licenca" onChange={handleFileChange} className="p-2 border rounded absolute opacity-0 w-full h-full cursor-pointer" />
                <div className="p-2 border rounded cursor-pointer">{licencaLoading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto"></span> : "Carregar a Licença"}</div>
            </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 self-center">Cadastrar</button>
            </form>
            )}
        </div>
        </>
    );
};

export default SignupPage;
