import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RestaurantLayout from '../components/RestaurantLayout';
import Sidebar from '../components/Sidebar';
import { RootState } from '@/redux/types';
import { User } from '../redux/authReducer'; // Adjust the import path accordingly


type FornecedorType = {
    id: number;
    usuario: number;
    nome_fornecedor: string;
    telefone: string;
    endereco: string;
    logo: string;
    licenca: string;
    aprovado: boolean;
    criado_em: string;
    modificado_em: string;
    children: ReactNode; 
};

const Dashboard: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user) as User;
    const [fornecedor, setFornecedor] = useState<FornecedorType | null>(null);

    useEffect(() => {
        const fetchFornecedorData = async () => {
            if (user?.user_id) { 
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/get_fornecedor/?usuario_id=${user.user_id}`);
                    if (response.ok) {
                        const data = await response.json();
                       
                        if (data.fornecedor && data.fornecedor.length > 0) {
                            setFornecedor(data.fornecedor[0]);
                        }
                    } else {
                        console.error('Failed to fetch fornecedor data');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }
        };
        fetchFornecedorData();
    }, [user]);

    return (
        <RestaurantLayout user={user} fornecedor={fornecedor}>
            <Sidebar fornecedor={fornecedor}/>
            {/* Render any other necessary components here */}
        </RestaurantLayout>
    );
};

export default Dashboard;
