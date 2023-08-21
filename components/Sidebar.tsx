import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { MdLaptop, MdContacts, MdBarChart, MdTableBar, MdLogout } from 'react-icons/md';
import { ReactNode } from 'react';

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

type SidebarProps = {
    fornecedor: FornecedorType | null;
};

const Sidebar: React.FC<SidebarProps> = ({ fornecedor }) => {
  const router = useRouter();


  const isActive = (path: string) => {
    return router.pathname === path ? 'bg-blue-500 text-white' : '';
  }

  return (
    <nav className="h-screen w-64 bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        {/* Profile Section */}
        <li className="flex items-center space-x-4">
          <div className="w-12 h-12 relative">
          <Image src={fornecedor?.logo || "/path/to/default/image.png"}
            width={500} 
            height={300}
           // layout="fill"
             className="rounded-full" alt="" />
            <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-400 rounded-full"></span>
          </div>
          <div>
            <h5 className="font-semibold">{fornecedor?.nome_fornecedor}</h5>
            <span>{fornecedor?.nome_fornecedor}</span>
          </div>
        </li>

        <li className="uppercase font-semibold tracking-wide text-xs mt-4 mb-2">Painel</li>

        {/* Menu Items */}
        {[
          {path: '/restaurant-order', icon: MdLaptop, title: 'Pedidos'},
          {path: '/restaurant-meal', icon: MdContacts, title: 'Refeições'},
          {path: '/restaurant-report', icon: MdBarChart, title: 'Relatórios'},
          {path: '/restaurant-customers', icon: MdTableBar, title: 'Clientes'},
          {path: '/restaurant-drivers', icon: MdBarChart, title: 'Motoristas'},
          {path: '/restaurant-account', icon: MdContacts, title: 'Conta'},
        ].map((item) => (
          <li key={item.path} className={`hover:bg-blue-500 p-2 rounded ${isActive(item.path)}`}>
            <Link 
            href={item.path}
            className="flex items-center space-x-3"
            >
             
                <item.icon className="text-lg" />
                <span>{item.title}</span>
             
            </Link>
          </li>
        ))}

        {/* Logout */}
        <li className="hover:bg-red-500 p-2 rounded mt-4">
          <Link 
          className="flex items-center space-x-3 text-red-400"
          href="/restaurant-sign-out">
            
              <MdLogout className="text-lg" />
              <span>Sair</span>
           
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
