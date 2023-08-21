import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthActionTypes } from "../redux/types";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { local } from "@/configs/variable";
import { loginUser } from "@/redux/authReducer";

const SignInPage: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${local}/api/fornecedor_sign_in/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log("lod", result);
      setIsLoading(false);

      if (response.status === 200) {
        alert(result.message);
        dispatch(loginUser(result));
      } else {
        dispatch({ type: AuthActionTypes.AUTH_ERROR, payload: result.error });
        alert(result.error);
      }
    } catch (error) {
      setIsLoading(false);
      alert("There was an error sending the signin data");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Entrar</h1>

      <form onSubmit={handleSubmit} className="mx-64 space-y-4 flex flex-col">
        <input
          name="username"
          placeholder="Usuario"
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleInputChange}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 self-center"
        >
          Entrar
        </button>

        <Transition
          show={isLoading}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mt-4 self-center text-blue-600">Loading...</div>
        </Transition>

        <div className="mt-4 self-center">
          <Link href="/SignupPage" className="text-blue-500 hover:underline">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="mt-4 self-center">
       <p>Não tem uma conta?</p>
    <Link href="/SignupPage" className="text-blue-500 hover:underline">
    Inscrever-se
    </Link>
</div>
      </form>
    </div>
  );
};

export default SignInPage;
