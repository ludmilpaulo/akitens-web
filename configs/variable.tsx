import { ReactNode } from "react";
import React, { useState, useEffect } from "react";
export const googleAPi = "AIzaSyAALuGqF68jJ8v9_69tXtEcGkRdX5NgU1s";

//export const basAPI = "https://taki.pythonanywhere.com";

export const basAPI = "http://127.0.0.1:8000";

export type UserDetails = {
  // customer_detais: string;
  address: string;
  avatar: string;
  id: number;
  phone: number;
};

export type FornecedorType = {
  id: number;
  user: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
  licenca: string;
  aprovado: boolean;
  criado_em: string;
  modificado_em: string;
  children: ReactNode;
};

export interface OrderTypes {
  id: number;
  order_details: {
    id: number;
    product: {
      title: string;
      price: number;
    };
    quantity: number;
    sub_total: number;
  }[];
  customer: {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    address: string;
  };
  driver: {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    address: string;
  };
  total: number;
  status: string;
}

export type Shop = {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
  category?: {
    name: string;
    image: string;
  };
  is_approved: boolean;
  barnner: boolean;
};

export interface Categoria {
  id: number;
  name: string;
  className?: string;
  image: string | null;
  slug?: string;
}

export interface Category {
  id: number;
  name: string;
  className?: string;
  image: string | null;
  slug?: string;
}

export type Service = {
  // id : number;
  category: string;
  title: string;
  images: (string | File)[];
  description: string;
};

export type GetService = {
  id: number;
  category: string;
  title: string;
  image_urls: (string | File)[];

  images: (string | File)[];
  description: string;
};

export interface AboutUsData {
  id: number;
  title: string;
  logo: string;
  back: string;
  backgroundApp: string;
  about: string;
  born_date: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  linkedin: string | null;
  facebook: string;
  twitter: string;
  instagram: string;
}

export async function fetchAboutUsData(): Promise<AboutUsData | null> {
  try {
    const response = await fetch(`${basAPI}/info/aboutus/`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // Assuming the API returns an array and we want the first item
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}

export const useHeaderData = () => {
  const [headerData, setHeaderData] = useState<AboutUsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${basAPI}/info/aboutus/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setHeaderData(data[0]);
        } else {
          throw new Error("Data format is not as expected");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup tasks if needed
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return headerData;
};

export const useCategoriesData = () => {
  const [categoriesData, setCategoriesData] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetch(`${basAPI}/shops/shop-categories/`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories data");
        }
        const data = await response.json();
        console.log("category fethed", data);
        if (Array.isArray(data)) {
          setCategoriesData(data);
        } else {
          throw new Error("Categories data format is not as expected");
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchCategoriesData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup tasks if needed
    };
  }, []); // Empty dependency array means this effect runs only once on component mount

  return categoriesData;
};


export interface TeamData {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  github?: string | null;
  linkedin?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
}


export async function fetchTeamData(): Promise<TeamData | null> {
  try {
    const response = await fetch(`${basAPI}/info/teams/`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    // Assuming the API returns an array and we want the first item
    console.log("team data fetched", data)
    return data || null;
  } catch (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }
}
