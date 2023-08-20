// SignInPage.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActionTypes } from '../redux/types';

const SignInPage: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('https://taki.pythonanywhere.com/api/fornecedor-sign-in/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (response.status === 200) {
                console.log("Signin successful!", result);
                dispatch({ type: AuthActionTypes.SIGNIN_SUCCESS, payload: result });
            } else {
                dispatch({ type: AuthActionTypes.AUTH_ERROR, payload: result.error });
                alert(result.error);
                console.error("Signin failed:", result);
            }
        } catch (error) {
            console.error("There was an error sending the signin data", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Entrar</h1>

            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                <input name="username" placeholder="Usuario" onChange={handleInputChange} className="p-2 border rounded" />
                <input type="password" name="password" placeholder="Senha" onChange={handleInputChange} className="p-2 border rounded" />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 self-center">Entrar</button>
            </form>
        </div>
    );
};

export default SignInPage;
