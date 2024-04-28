import Image from 'next/image';
import Link from 'next/link';
import { TeamData } from '@/configs/variable';
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

interface TeamPageProps {
  member: TeamData;
}

const TeamPage: React.FC<TeamPageProps> = ({ member }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-40 w-full">
        <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold">{member.name}</h2>
        <p className="text-gray-600">{member.title}</p>
     
        <div className="flex justify-center mt-4">
          <div className="flex items-center">
            {member.github && (
              <Link href={member.github}>
                <span className="text-blue-600 hover:underline mr-2 cursor-pointer inline-block">
                  <FaGithub />
                </span>
              </Link>
            )}
            {member.linkedin && (
              <Link href={member.linkedin}>
                <span className="text-blue-600 hover:underline mr-2 cursor-pointer inline-block">
                  <FaLinkedin />
                </span>
              </Link>
            )}
            {member.facebook && (
              <Link href={member.facebook}>
                <span className="text-blue-600 hover:underline mr-2 cursor-pointer inline-block">
                  <FaFacebook />
                </span>
              </Link>
            )}
            {member.twitter && (
              <Link href={member.twitter}>
                <span className="text-blue-600 hover:underline mr-2 cursor-pointer inline-block">
                  <FaTwitter />
                </span>
              </Link>
            )}
            {member.instagram && (
              <Link href={member.instagram}>
                <span className="text-blue-600 hover:underline cursor-pointer inline-block">
                  <FaInstagram />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
