"use client";
import { AboutUsData, fetchAboutUsData, fetchTeamData, TeamData} from "@/configs/variable";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { SocialIcon } from "react-social-icons";
import { motion, useAnimation } from 'framer-motion';


import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import TeamPage from "@/components/TeamPage";

const AboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState<AboutUsData | null>(null);
    const [team, setTeam] = useState<TeamData[]>([]);
    const [isHovered, setIsHovered] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await fetchTeamData();
        if (data) {
          // Check if data is an array, if not, wrap it in an array
          const teamDataArray = Array.isArray(data) ? data : [data];
          setTeam(teamDataArray);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchTeam();
  }, []);
  
  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["100vw", "-100vw"],
        transition: { repeat: Infinity, duration: 15, ease: 'linear' },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchAboutUsData();
        
        setAboutUsData(data);
      };
      fetchData();
    }, []);
  
    return (
        <>
        <div className="mx-auto p-4 pt-6 md:p-6 lg:p-12"
         style={{
            backgroundImage: `url(${aboutUsData?.backgroundApp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
          {aboutUsData && (
            <div className="prose lg:prose-xl bg-white">
                <strong>{aboutUsData.title}</strong>
             <div dangerouslySetInnerHTML={{ __html: aboutUsData.about }} />
              
              <address>
              <motion.div
  initial={{
    x: -500,
    opacity: 0,
    scale: 0.5,
  }}
  animate={{
    x: 0,
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 2,
  }}
  className="flex flex-row items-center"
>
  <>
    {aboutUsData?.facebook && <SocialIcon url={aboutUsData.facebook} />}
    {aboutUsData?.linkedin && <SocialIcon url={aboutUsData.linkedin} />}
    {aboutUsData?.twitter && <SocialIcon url={aboutUsData.twitter} />}
   
    {aboutUsData?.instagram && <SocialIcon url={aboutUsData.instagram} />}
  </>
</motion.div>


      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
        }}
        className="flex flex-row items-center text-gray-300 cursor-pointer"
      >
        {aboutUsData.email && (
                    <Link href={`mailto:${aboutUsData.email}`}>
        <SocialIcon
          className="cursor-pointer"
          network="email"
          fgColor="gray"
          bgColor="transparent"
        />
        <p className="uppercase md:inline-flex text-sm text-gray-400">
          {" "}
          {aboutUsData.email}
        </p>
        </Link>
    )}
      </motion.div>
                <p>
                  
                  <br />
                  {aboutUsData.address}
                  <br />
                  
                      <span className="text-blue-600 hover:text-blue-800">
                       
                      </span>
                    
                  <br />
                  {aboutUsData.phone && (
                    <Link href={`tel:${aboutUsData.phone}`}>
                      <span className="text-blue-600 hover:text-blue-800">
                        {aboutUsData.phone}
                      </span>
                    </Link>
                  )}
                </p>
                
              </address>
            </div>
          )}
        </div>
      
        <div className="items-center mx-auto py-6" 
         style={{
            backgroundImage: `url(${aboutUsData?.backgroundApp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Na linha de Frente</h1>
          <motion.div
            animate={controls}
            className="flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex flex-row flex-wrap">
              {team.map((teamMember) => (
                <div className="w-64 flex-shrink-0 mx-4 my-2" key={teamMember.id}>
                  <TeamPage member={teamMember} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </>
      
      
    );
};

export default AboutUs;
