"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import whiteLogo from '../../public/assets/Oris_Logo_White.png'
import signOut from '../../public/assets/Sign Out.png'
import { fetchPatientData } from '@/app/store/slices/paitentSlice';
import { useDispatch, useSelector } from 'react-redux';

const TopNav = () => {
    const dispatch = useDispatch();
    const { patient, loading, error } = useSelector((state) => state.patientSlice);
    const patientId = patient?.id || '1';

    useEffect(() => {
        if (patientId) {
            dispatch(fetchPatientData(patientId));
        }
    }, [dispatch, patientId]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    
      if (error) {
        return <div className="min-h-screen ">Error: {error}</div>;
      }

    return (
        <div className=''>
            <nav className="relative bg-[#121212] text-white h-12 px-5 flex items-center justify-between mt-8 z-10">
                {/* Logo */}
                <div className="text-xl font-bold w-2/12">
                    <Image src={whiteLogo} alt="Logo" width={150} className="absolute top-0 transform -translate-y-2.5" />
                </div>

                {/* Small Screen Menu Button */}
                <div className="md:hidden">
                    <button
                        className="text-white p-2 rounded-lg transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984]"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <div
                    className={`absolute bg-[#121212] top-16 left-0 w-full md:static md:w-auto md:flex sm:space-x-2 md:space-x-4 lg:space-x-6 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden'
                        } md:block z-50`}
                >
                    {[
                        { name: "Home", path: "/" },
                        { name: "About", path: "/about" },
                        { name: "Insurance", path: "/insurance" },
                        { name: "Your Team", path: "/yourteam" },
                        ...(patientId ? [{ name: "Patient", path: `/patient-portal/${patientId}` }] : [])
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="block xs:pl-3 md:px-0 lg:px-3 py-2 text-base sm:text-sm md:text-base lg:text-[17px] md:inline transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984] rounded-lg"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Small Screen Buttons */}
                    <div className="flex flex-col space-y-2 mt-4 px-4 md:hidden mb-6">
                        <button className="py-1 w-full rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984]">
                            <Image src={signOut} alt="Sign Out" />
                        </button>
                    </div>
                </div>

                {/* Large Screen Buttons */}
                <div className="hidden md:flex sm:space-x-2 md:space-x-4 lg:space-x-6 cursor-pointer">
                    <button className=" w-[100px] rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984]">
                        <Image src={signOut} alt="Sign Out" />
                    </button>
                </div>
            </nav>
        </div>

    );
};

export default TopNav;





