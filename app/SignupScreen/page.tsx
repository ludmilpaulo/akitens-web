"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/authSlice";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { basAPI, Category, useHeaderData } from "@/configs/variable";
import { Eye, EyeOff } from "lucide-react";

const SignupScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shop_category, setShop_category] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    shop_category: "",
    logo: null as File | null,
    restaurant_license: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [licencaLoading, setLicencaLoading] = useState(false);
  const headerData = useHeaderData();
  const [role, setRole] = useState<"client" | "restaurant">("client");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShop_category(value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${basAPI}/shops/shop-categories/`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as "client" | "restaurant");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "logo") {
        setLogoLoading(true);
        setTimeout(() => {
          setSignupData((prevState) => ({ ...prevState, [name]: files[0] }));
          setLogoLoading(false);
        }, 2000);
      } else if (name === "restaurant_license") {
        setLicencaLoading(true);
        setTimeout(() => {
          setSignupData((prevState) => ({ ...prevState, [name]: files[0] }));
          setLicencaLoading(false);
        }, 2000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url =
        role === "client"
          ? `${basAPI}/accounts/signup/`
          : `${basAPI}/accounts/fornecedor/`;

      let body;

      if (role === "client") {
        body = JSON.stringify({
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          password2: signupData.password,
        });
      } else if (role === "restaurant") {
        const formData = new FormData();
        (Object.keys(signupData) as Array<keyof typeof signupData>).forEach(
          (key) => {
            const value = signupData[key];
            if (value !== null) formData.append(key, value as Blob | string);
          }
        );

        // Append other form data fields here if needed
        formData.append("shop_category", shop_category);

        body = formData;
      }

      const res = await fetch(url, {
        method: "POST",
        headers:
          role === "client"
            ? {
                Accept: "application/json",
                "Content-Type": "application/json",
              }
            : {}, // For form data, don't need specific headers
        body: body,
      });

      const resJson = await res.json();
      console.log("recebido", resJson);

      if (resJson.status === 201) {
        dispatch(loginUser(resJson));
        alert("Você se conectou com sucesso");

        console.log("Type of fornecedor_id:", typeof resJson.fornecedor_id);
        console.log("Value of fornecedor_id:", resJson.fornecedor_id);

        if (
          typeof resJson.fornecedor_id === "object" &&
          resJson.fornecedor_id !== null
        ) {
          router.push("/ShopDashboard"); // Redirect to Dashboard
        } else if (resJson.is_customer === true) {
          router.push("/ShopsCategories"); // Redirect to ShopsCategories if the user is a customer
        }
      } else if (
        typeof resJson.user === "object" &&
        resJson.user !== null
      ) {
        dispatch(loginUser(resJson));

        router.push("/ShopsCategories");
      } else {
        alert(Object.values(resJson));
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-16 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg bg-white rounded shadow-lg">
        <motion.div
          animate={{
            scale: [1, 1, 1, 1, 1],
            rotate: [0, 30, 60, 240, 360],
          }}
          className="p-10 lg:w-2/3 md:w-2/3"
        >
          <div className="flex justify-center mb-6">
            <Image
              src={headerData?.logo || "/default-logo.png"}
              alt="logo"
              width={100}
              height={100}
              className="w-64 h-64"
            />
          </div>
          <h1 className="text-2xl font-extrabold leading-6 text-gray-800">
            Inscreva-se Para ter uma Conta
          </h1>

          <Link href={"/LoginScreenUser"}>
            <p className="mt-4 text-sm font-medium leading-none text-gray-500">
              Se você tem uma conta?{" "}
              <span className="text-gray-800 underline cursor-pointer">
                Entre aqui
              </span>
            </p>
          </Link>

          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={handleRoleChange}
              />
              Cliente
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="restaurant"
                checked={role === "restaurant"}
                onChange={handleRoleChange}
              />
              Fornecedor de Negocio
            </label>
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
            {loading && (
              <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
                <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </Transition>

          {!loading && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-black">
              <input
                name="username"
                placeholder="Usuario"
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                className="p-2 border rounded text-black"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Senha"
                  onChange={handleInputChange}
                  className="p-2 w-full border rounded text-black"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {role === "restaurant" && (
                <>
                  <input
                    name="name"
                    placeholder="Nome do Fornecedor ou do Negocio"
                    onChange={handleInputChange}
                    className="p-2 border rounded text-black"
                  />
                  <input
                    name="phone"
                    placeholder="Telefone"
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    name="address"
                    placeholder="Endereço"
                    onChange={handleInputChange}
                    className="p-2 border rounded text-black"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                      className="absolute w-full h-full p-2 border rounded opacity-0 cursor-pointer"
                    />
                    <div className="p-2 border rounded cursor-pointer">
                      {logoLoading ? (
                        <span className="w-5 h-5 mx-auto border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></span>
                      ) : (
                        "Carregar o Logo"
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      name="restaurant_license"
                      onChange={handleFileChange}
                      className="absolute w-full h-full p-2 border rounded opacity-0 cursor-pointer"
                    />
                    <div className="p-2 border rounded cursor-pointer">
                      {licencaLoading ? (
                        <span className="w-5 h-5 mx-auto border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></span>
                      ) : (
                        "Carregar a Licença"
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block mb-2">Categoria</label>
                    <div className="flex">
                      <select
                        name="category"
                        value={shop_category}
                        onChange={handleSelectChange}
                        className="flex-grow p-2 border mr-2"
                      >
                        <option value="">
                          Selecione a categoria do seu negocio
                        </option>
                        {category.map((categoria) => (
                          <option key={categoria.id} value={categoria.slug}>
                            {categoria.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  aria-label="Entrar na minha conta"
                  className="w-full py-4 text-sm font-semibold leading-none text-white bg-black border rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none hover:bg-indigo-600"
                >
                  Inscreva-se Agora
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignupScreen;
