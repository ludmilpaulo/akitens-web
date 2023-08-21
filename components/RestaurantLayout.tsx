import React, { ReactNode } from 'react';
import Image from 'next/image';
import { User } from '../redux/authReducer'; // Adjust the import path accordingly



type FornecedorLayoutProps = {
    user: User;
    fornecedor: FornecedorType | null;
    children?: React.ReactNode;
  };
// ... rest of the code ...


type UserType = {
  user_id?: number;
  username: string;
  // ... any other properties that 'user' might have ...
};

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




const RestaurantLayout: React.FC<FornecedorLayoutProps> = ({ user, fornecedor, children }) => {
  // Your component logic here
  
  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      {fornecedor && (
        <div>
          <h3>Fornecedor: {fornecedor.nome_fornecedor}</h3>
          <Image src={fornecedor.logo} 
          layout="fill"
          alt={fornecedor.nome_fornecedor} />
          {/* Add more details if necessary */}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default RestaurantLayout;
