"use client";
import { AboutUsData, fetchAboutUsData, fetchTeamData, TeamData, useTeamData } from "@/configs/variable";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
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
        <div className="flex" style={{
            backgroundImage: `url(${aboutUsData?.backgroundApp})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
        <div className="mx-auto bg-white p-4 pt-6 md:p-6 lg:p-12"
         
        >
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          {aboutUsData && (
            <div className="prose lg:prose-xl">
             <div dangerouslySetInnerHTML={{ __html: aboutUsData.about }} />
              <Image
                src={aboutUsData.logo}
                alt="Company Logo"
                className="w-full md:w-1/2 lg:w-1/3 mx-auto md:mx-0"
                width={500} // Set width property here (adjust as needed)
                height={500} // Set height property here (adjust as needed)
              />
              <address>
                <p>
                  <strong>{aboutUsData.title}</strong>
                  <br />
                  {aboutUsData.address}
                  <br />
                  {aboutUsData.email && (
                    <Link href={`mailto:${aboutUsData.email}`}>
                      <span className="text-blue-600 hover:text-blue-800">
                        {aboutUsData.email}
                      </span>
                    </Link>
                  )}
                  <br />
                  {aboutUsData.phone && (
                    <Link href={`tel:${aboutUsData.phone}`}>
                      <span className="text-blue-600 hover:text-blue-800">
                        {aboutUsData.phone}
                      </span>
                    </Link>
                  )}
                </p>
                <div className="flex justify-center mt-4">
                  {aboutUsData.facebook && (
                    <Link href={aboutUsData.facebook}>
                      <span className="text-gray-600 hover:text-gray-800 mr-4">
                        <FaFacebook size={24} />
                      </span>
                    </Link>
                  )}
                  {aboutUsData.instagram && (
                    <Link href={aboutUsData.instagram}>
                      <span className="text-gray-600 hover:text-gray-800 mr-4">
                        <FaInstagram size={24} />
                      </span>
                    </Link>
                  )}
                  {aboutUsData.twitter && (
                    <Link href={aboutUsData.twitter}>
                      <span className="text-gray-600 hover:text-gray-800 mr-4">
                        <FaTwitter size={24} />
                      </span>
                    </Link>
                  )}
                </div>
              </address>
            </div>
          )}
        </div>
      
        <div className="items-center mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">Our Team</h1>
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
      </div>
      
      
    );
};

export default AboutUs;
