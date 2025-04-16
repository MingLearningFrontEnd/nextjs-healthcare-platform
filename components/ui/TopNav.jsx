"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import whiteLogo from '../../public/assets/Oris_Logo_White1.png'
import signOut from '../../public/assets/Sign Out.png'
import signIn from '../../public/assets/Sign In.png'
import signUp from '../../public/assets/Sign Up.png'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const TopNav = () => {
    const router = useRouter();
    const { patient } = useSelector((state) => state.patientSlice);
    const { provider } = useSelector((state) => state.providerSlice);
    
    const patientId = patient?.id || '2';
    const providerId = provider?.id || '1';

    // 简单的登录状态判断（示例）
    // 实际使用时，可以从 Redux store 或 localStorage 中获取登录状态
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (path) => {
        router.push(path);
        setIsMenuOpen(false);
    };

    // 简单的登入/登出处理
    const handleLogin = () => {
        router.push('/login');
    };
    
    const handleSignup = () => {
        router.push('/signup');
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        // 这里可以添加实际的登出逻辑
        router.push('/');
    };

    return (
        <div className='relative z-50'>
            <nav className="relative bg-[#121212] text-white h-12 px-5 flex items-center justify-between mt-8">
                {/* Logo */}
                <div className="text-xl font-bold w-2/12">
                    <Image src={whiteLogo} alt="Logo" width={200} className="absolute top-[-75px]  md:scale-75 lg:scale-100" />
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
                    className={`absolute bg-[#121212] text-xs top-16  w-full md:static md:w-auto md:flex md:space-x-2 lg:space-x-2 xl:space-x-3 transition-all duration-300 ${
                        isMenuOpen ? 'block' : 'hidden'
                    } md:block z-50`}
                >
                    {!isLoggedIn ? (
                        // 未登录状态显示的导航
                        [
                            { name: "Home", path: "/" },
                            { name: "About", path: "/about" },
                            { name: "Features", path: "/features" },
                            { name: "Insurance", path: `/patient-portal/${patientId}/insurance` },
                            { name: "Providers", path: `/provider-portal/${providerId}` },
                            { name: "Patients", path: `/patient-portal/${patientId}` },
                            {name:"Practice", path:'/practice-portal/1'}
                        ].map((item) => (
                            <div
                                key={item.name}
                                onClick={() => handleNavClick(item.path)}
                                className="block xs:pl-3 md:px-0 lg:px-2 py-2 text-sm sm:text-sm md:text-[13px] lg:text-base xl:text-lg md:inline transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984] rounded-lg cursor-pointer"
                            >
                                {item.name}
                            </div>
                        ))
                    ) : (
                        // 登录状态显示的导航
                        [
                            { name: "Home", path: "/" },
                            { name: "About", path: "/about" },
                            { name: "Insurance", path: `/patient-portal/${patientId}/insurance` },
                            { name: "Your Team", path: `/patient-portal/${patientId}/your-team` }
                        ].map((item) => (
                            <div
                                key={item.name}
                                onClick={() => handleNavClick(item.path)}
                                className="block xs:pl-3 md:px-0 lg:px-2 py-2 text-sm sm:text-sm md:text-[13px] lg:text-base xl:text-lg md:inline transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984] rounded-lg cursor-pointer"
                            >
                                {item.name}
                            </div>
                        ))
                    )}

                    {/* Small Screen Buttons */}
                    <div className="flex flex-col space-y-2 mt-4 px-4 md:hidden mb-6">
                        {isLoggedIn ? (
                            // 登录状态显示登出按钮
                            <button 
                                className="py-1 w-full rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984]"
                                onClick={handleLogout}
                            >
                                <Image src={signOut} alt="Sign Out" />
                            </button>
                        ) : (
                            // 未登录状态显示登录和注册按钮
                            <>
                                <button 
                                    className="py-1 w-full rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984]"
                                    onClick={handleLogin}
                                >
                                    <Image src={signIn} alt="Sign In" />
                                </button>
                                <button 
                                    className="py-1 w-full rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 active:border-2 active:border-[#360984]"
                                    onClick={handleSignup}
                                >
                                    <Image src={signUp} alt="Sign Up" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Large Screen Buttons */}
                <div className="hidden md:flex sm:space-x-2 md:space-x-4 lg:space-x-6 cursor-pointer">
                    {isLoggedIn ? (
                        // 登录状态显示登出按钮
                        <button 
                            className="md:w-[70px] lg:w-[90px] xl:w-[100px] rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 hover:scale-105"
                            onClick={handleLogout}
                        >
                            <Image src={signOut} alt="Sign Out" />
                        </button>
                    ) : (
                        // 未登录状态显示登录和注册按钮
                        <>
                            <button 
                                className="md:w-[70px] lg:w-[90px] xl:w-[100px] rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-800 hover:scale-105"
                                onClick={handleLogin}
                            >
                                <Image src={signIn} alt="Sign In" />
                            </button>
                            <button 
                                className="md:w-[70px] lg:w-[90px] xl:w-[100px] rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                                onClick={handleSignup}
                            >
                                <Image src={signUp} alt="Sign Up" />
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default TopNav;





