import Image from "next/image";
import Link from "next/link";
import Vector from '../../public/assets/Vector.svg';
import blackLogo from '../../public/assets/Oris_Logo_Black.png';

const Footer = () => {
  return (

    <footer className="w-full mx-auto 
            2xl:w-[99vw] 
            xl:w-[99vw] 
            lg:w-[99vw] 
            md:w-[99vw] 
            sm:w-[99vw] bg-white rounded-t-[60px] mt-auto z-100">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-6 py-4 gap-y-4">

        {/* 左侧版权信息（小屏幕居中，大屏幕左对齐） */}
        <div className="text-black flex items-center text-center text-sm sm:text-base md:text-sm lg:text-sm">
          <span className="mr-2">
            <Vector className="w-5 h-5" />
          </span>
          SmileConnect, Inc. All rights reserved
        </div>

        {/* 中间导航链接（小屏幕换行，大屏幕水平排列） */}
        <div className="text-black flex flex-wrap justify-center space-x-4 sm:space-x-6">
          <Link href="/privacy" className="hover:underline font-semibold text-sm sm:text-base md:text-sm lg:text-base">Privacy</Link>
          <Link href="/terms" className="hover:underline font-semibold text-sm sm:text-base md:text-sm lg:text-base">Terms of Service</Link>
          <Link href="/security" className="hover:underline font-semibold text-sm sm:text-base md:text-sm lg:text-base">Security</Link>
          <Link href="/company" className="hover:underline font-semibold text-sm sm:text-base md:text-sm lg:text-base">Company</Link>
        </div>

        {/* 右侧Logo（小屏幕居中，大屏幕右对齐） */}
        <div className="flex justify-center md:justify-end">
          <Image src={blackLogo} width={120} alt="Oris Logo" />
        </div>
      </div>
    </footer>


  );
};

export default Footer;

