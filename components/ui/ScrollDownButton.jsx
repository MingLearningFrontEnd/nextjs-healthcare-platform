'use client'
import { useRef } from 'react'
import DownPage from '../../public/assets/Down_Page.svg'
import DownPageBlack from '../../public/assets/Down Page black.svg'

const ScrollDownButton = ({ section, isBlack = false, className = '', rotate = false }) => {
  const handleScroll = (currentSection) => {
    const scrollOptions = {
      behavior: 'smooth'
    };

    // 获取下一个 section
    const nextSection = document.getElementById(`section-${currentSection + 1}`);
    if (currentSection === 5) {
      // 最后一个 section，滚动到顶部
      window.scrollTo({
        top: 0,
        ...scrollOptions
      });
    } else if (nextSection) {
      nextSection.scrollIntoView(scrollOptions);
    }
  };

  const Icon = isBlack ? DownPageBlack : DownPage;

  return (
    <button onClick={() => handleScroll(section)} className="cursor-pointer">
      <Icon className={`lg:scale-100 md:scale-95 sm:scale-75 xs:scale-50 
                     min-w-[80px] max-w-[120px] 
                     cursor-pointer 
                     hover:lg:scale-110 hover:md:scale-105 hover:sm:scale-90 hover:xs:scale-7
                     transition-transform duration-300
                     ${rotate ? 'rotate-180' : ''}
                     ${isBlack ? '' : 'fill-white'}
                     ${className}`} />
    </button>
  );
};

export default ScrollDownButton; 