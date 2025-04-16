import Image from 'next/image'
import Link from 'next/link'

import { Card,  CardContent} from "@/components/ui/card"
import squiggles from '../../public/assets/Squiggles.png'
import laptop1 from '../../public/assets/-Black1.png'
import laptop2 from '../../public/assets/-Black2.png'
import laptop3 from '../../public/assets/-Black3.png'
import laptop4 from '../../public/assets/-Black4.png'
import ellipse from '../../public/assets/Ellipse 62.png'
import homeSignUp from '../../public/assets/homeSignUp.png'
import homeSignUp2 from '../../public/assets/homeSignUp2.png'
import text1 from '../../public/assets/homepage1text.png'
import text2 from '../../public/assets/homepage2text.png'
import text3 from '../../public/assets/homepage3text.png'
import text6 from '../../public/assets/homepage6text.png'
import text7 from '../../public/assets/homepage7text.png'
import boxs from '../../public/assets/box.png'
import text4 from '../../public/assets/homepage4text.png'
import blog from '../../public/assets/blog_featured.png'
import pearInt from '../../public//assets/pearlnet_blankBG.png'
import learnmore from '../../public/assets/learnmore.png'
import patientpic1 from '../../public/assets/patientpic1.png'
import patientpic2 from '../../public/assets/paitentpic2.png'
import signUpText from '../../public/assets/Sign UP_text.png'
import ScrollDownButton from '@/components/ui/ScrollDownButton'

const App = () => {
  return (
    <>
      <main className='w-[99vw] ' role="main" aria-label="ORIS Health Platform">
      {/* Hero Section */}
      <section id="section-1" className="w-full bg-black rounded-b-3xl  overflow-hidden" aria-labelledby="hero-title">
        <div className="relative w-full aspect-[16/9] max-h-[100vh] mt-20">
          <div className="absolute inset-0">
            <Image src={squiggles} className="absolute w-full top-[10%] object-cover" alt="Decorative background pattern" role="presentation" />
            <Image src={ellipse} className="absolute w-[95%] left-1/2 -translate-x-1/2 top-[93%]" alt="Decorative ellipse" role="presentation" />

            <div className="absolute w-full top-[5%] flex justify-center">
              <div className="text-center">
                <h1 id="hero-title" className="sr-only">
                  Welcome to ORIS Health - Revolutionizing Healthcare Management
                </h1>
                <Image
                  src={text1}
                  alt="ORIS Health: Revolutionizing healthcare management with blockchain technology"
                  role="heading"
                  aria-level="1"
                  className="w-[80vw] max-w-[1300px]"
                />
              </div>
            </div>

            {/* Interactive Devices Display */}
            <div className="absolute w-full top-[50%] left-0" aria-label="Interactive healthcare devices showcase">
              <div className="relative w-full h-[50vh]">
        <Image 
          src={laptop1} 
                  className="absolute lg:top-[14%] lg:left-[11%] 
                md:top-[10%] md:left-[8%] 
                 sm:top-[6%] sm:left-[6%] 
                 xs:top-[5%] xs:left-[10%]
                  w-[37%]  min-w-[100px] transform-gpu hover:scale-105 transition-transform duration-300"
          alt="Laptop 1"
        />
        <Image 
          src={laptop2} 
                  className="absolute lg:top-[43%] lg:left-[42%] 
                md:top-[18%] md:left-[42%]
                 sm:top-[15%] sm:left-[42%]
                 xs:top-[10%] xs:left-[42%]
                  w-[20%] min-w-[90px] transform-gpu hover:scale-105 transition-transform duration-300"
          alt="Laptop 2"

        />
        <Image 
          src={laptop3} 
                  className="absolute lg:top-[18%] lg:left-[63%]
                 md:top-[6%] md:left-[63%] 
                 sm:top-[6%] sm:left-[63%] 
                 xs:top-[4%] xs:left-[63%]

                 w-[17%] min-w-[80px] transform-gpu hover:scale-105 transition-transform duration-300"
          alt="Laptop 3"
        />
        <Image 
          src={laptop4} 
                  className="absolute lg:top-[7%] lg:left-[85%]
                 md:top-[3%] md:left-[83%] 
                 sm:top-[3%] sm:left-[83%] 
                 xs:top-[1%] xs:left-[84%]
                 w-[12%] min-w-[50px] transform-gpu hover:scale-105 transition-transform duration-300"
          alt="Laptop 4"
        />
              </div>
            </div>

            {/* CTA Button */}
            <div className="absolute w-full top-[45%] flex justify-center">
              <Link 
                href="/signup"
                className="w-[9%] min-w-[1px] hover:scale-105 transition-transform duration-300"
                aria-label="Sign up for ORIS Health platform"
              >
                <Image src={homeSignUp2} className="w-full h-auto" alt="Sign Up" role="img" />
              </Link>
            </div>
          </div>
        </div>

        <nav className="w-full flex justify-end" aria-label="Page navigation">
          <div className="lg:translate-x-6 md:translate-x-9 sm:translate-x-9 xs:translate-x-9 mb-4">
            <ScrollDownButton section={1} />
          </div>
        </nav>
      </section>

      <section id="section-2" className="relative  bg-white rounded-[30px] flex flex-col w-full sm:px-12 lg:px-10 pt-12 md:pt-16 lg:pt-20 overflow-hidden" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">ORIS Health Features and Benefits</h2>
        {/* 测试圆角是否工作 */}
        <div className="absolute inset-0 bg-[url('/assets/homebg1.png')] bg-cover bg-center bg-no-repeat" />

        {/* 内容层 */}
        <div className="relative z-10">
          <div className="w-full flex flex-col-reverse md:flex-row items-center md:items-start justify-between text-center md:text-left">
            {/* 左侧文本 & 按钮 */}
            <div className="max-w-xl flex flex-col items-center md:items-start">
              <h2 className="sr-only">
                Secure Healthcare Data Management
              </h2>
              <Image
                src={text3}
                alt="Secure and efficient healthcare data management system"
                className="w-full max-w-[600px] transition-transform duration-300 
                   xs:scale-90 sm:scale-95 md:scale-100 lg:scale-100 xl:scale-125 xl:ml-16"
              />
              <Link 
                href="/signup"
                className="mt-5 xs:ml-6 sm:ml-3 md:ml-1 md:mt-6 lg:mt-13 xl:mt-16 self-start hover:scale-110 transition-transform duration-300"
              >
                <Image 
                  src={homeSignUp} 
                  alt="Sign Up" 
                  className="xl:w-[200px] lg:w-[150px] sm:w-[130px] xs:w-[120px]" 
                />
              </Link>
            </div>

            {/* 右侧文本 */}
            <div className="max-w-xl xs:mt-[-50px] md:mt-0 flex justify-center md:justify-end">
              <Image
                src={text2}
                alt="Text 2"
                className="w-full max-w-[600px] transition-transform duration-300 
                     xs:scale-75 sm:scale-75 md:scale-100 lg:scale-95 xl:scale-105"
              />
            </div>
          </div>

          {/* 下半部分*/}
          <div className="relative w-full flex justify-center md:justify-end ">
            <div className="relative max-h-[800px]">
              <Image
                src={boxs}
                alt="3D Boxes"
                className="relative left-0 xs:left-[1%] xs:-top-[13%] sm:left-[1%] sm:-top-[10%] md:-left-[2%] md:-top-[20%] lg:-left-[10%] lg:-top-[10%] xl:-left-[10%] xl:-top-[25%] 
                     w-[70vw] xs:w-[80vw] sm:w-[80vw] md:w-[80vw]  xl:w-[70vw]
                     transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* 下一页指示器 */}
        <div className="w-full flex justify-end -mb-8 mt-10">
          <div className="lg:translate-x-[70px] lg:-translate-y-10 md:translate-x-20 md:-translate-y-10 sm:translate-x-20 sm:-translate-y-10 xs:translate-x-10 xs:-translate-y-10">
            <ScrollDownButton section={2} isBlack />
          </div>
        </div>
      </section>

      <section id="section-3" className="relative  w-full px-4 sm:px-8 lg:px-16 py-16 bg-black text-white rounded-[30px] overflow-hidden" aria-labelledby="network-title">
        <h2 id="network-title" className="sr-only">ORIS Network Solutions</h2>
        {/* 背景层 */}
        <div className="absolute inset-0 bg-[url('/assets/homebg2.png')] bg-cover bg-center bg-no-repeat rounded-[30px]" />

        {/* 内容层 */}
        <div className="relative z-10">
          {/* 标题 */}
          <div className="text-center lg:text-left mb-10">
            <Image
              src={text4}
              alt="ORIS Network: Advanced healthcare management solutions"
            />
          </div>

          {/* 主要内容部分 */}
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">
            {/* 左侧：主要展示图 */}
            <Card className="w-full bg-[#181818] p-6 rounded-lg lg:w-2/3 flex justify-center items-center border-0" role="article" aria-labelledby="network-demo">
              <CardContent className="p-0">
                <h3 id="network-demo" className="sr-only">ORIS Network Demo</h3>
                <Image
                  src={pearInt}
                  alt="ORIS Network"
                  className="w-full max-w-3xl rounded-lg shadow-lg"
                />
              </CardContent>
            </Card>

            {/* 右侧：信息卡片 */}
            <Card className="w-full lg:w-1/3 bg-[#181818] rounded-lg shadow-md border-0" role="article" aria-labelledby="network-info">
              <CardContent className="flex flex-col items-center lg:items-start p-0">
                <div className="w-full px-[2px] pt-8">
                  <Image
                    src={blog}
                    alt="Healthcare Technology Innovation: Modern solutions for patient care"
                    className="w-full mb-4"
                  />
                </div>
                <p className="text-white px-6 text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl mb-4 leading-relaxed">
                  Take control of your health like never before. Access your records, manage insurance claims,
                  explore coverage, and track your well-being with ease. We're building a future that's efficient,
                  precise, and patient-focused—putting you at the center of it all.
                </p>
                <Link
                  href="/signup"
                  className="rounded-md px-6 pb-4 hover:scale-105 transition-transform duration-300"
                  aria-label="Learn more about ORIS Health solutions"
                >
                  <Image
                    src={learnmore}
                    alt="Learn more about our healthcare management solutions"
                    className="w-[120px] xs:w-[100px] sm:w-[130px] md:w-[170px] lg:w-[130px] xl:w-[150px] transition-all duration-300"
                  />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* DownPage */}
        <div className="w-full flex justify-end -mb-8 mt-10">
          <div className="lg:translate-x-24 md:translate-x-16 sm:translate-x-16 xs:translate-x-14">
            <ScrollDownButton section={3} />
          </div>
        </div>
      </section>


      <section id="section-4" className="mx-auto w-full bg-white rounded-[30px] overflow-hidden" aria-labelledby="solutions-title">
        <h2 id="solutions-title" className="sr-only">ORIS Healthcare Solutions</h2>
        <div className="relative w-full px-4 sm:px-8 lg:px-16 py-16">
          {/* 背景层 */}
          <div className="absolute inset-0 bg-[url('/assets/homebg1.png')] bg-cover bg-center bg-no-repeat" />

          {/* 内容层 */}
          <div className="relative z-10">
            {/* 第四个 section */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
              {/* 左侧文本 */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="w-full max-w-[600px]">
                  <Image 
                    src={text6}
                    alt="Description"
                    className="w-full scale-90 md:scale-100 lg:scale-100"
                  />
                </div>
              </div>

              {/* 右侧大标题 */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <div className="w-full max-w-[500px]">
                  <Image 
                    src={text7}
                    alt="Title"
                    className="w-full scale-90 md:scale-100 lg:scale-100"
                  />
                </div>
              </div>
            </div>

            {/* 下半部分 - 两个卡片 */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* 第一个卡片 */}
              <Card className="shadow-all flex flex-col lg:flex-row items-center gap-4 p-3 lg:p-4 py-6 lg:py-8 overflow-hidden" role="listitem" aria-labelledby="solution-1">
                <div className="w-full lg:w-[220px] xl:w-[340px] xl:h-[220px] 2xl:w-[400px] 2xl:h-[240px] lg:min-w-[200px] h-[200px] lg:h-[160px] mb-4 lg:mb-0">
                  <Image
                    src={patientpic1}
                    alt="ORIS Plan"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <CardContent className="w-full lg:flex-1 p-0 flex flex-col items-center text-center">
                  <h3 id="solution-1" className="text-3xl mb-2 sm:text-2xl md:text-4xl lg:text-4xl font-bold text-indigo-700 transition-all duration-300">Dental</h3>
                  <p className="mt-2  mb-3 leading-relaxed text-semibold px-2
                    text-lg sm:text-base md:text-xl lg:text-base xl:text-lg 2xl:text-xl
                    transition-all duration-300">
                    Know your plan. <br />
                    Manage your team. <br />
                    Organize your records.
                  </p>
                  <Link href="/signup" className="text-[#FF4DC4] mt-3 
                    text-lg sm:text-base md:text-xl lg:text-base xl:text-lg 2xl:text-xl
                    hover:underline inline-block transition-all duration-300">
                    Get started here &gt;
                  </Link>
                </CardContent>
              </Card>

              {/* 第二个卡片 */}
              <Card className="shadow-all flex flex-col lg:flex-row items-center gap-4 p-3 lg:p-4 py-6 lg:py-8 overflow-hidden" role="listitem" aria-labelledby="solution-2">
                <div className="w-full lg:w-[220px] xl:w-[340px] xl:h-[220px] 2xl:w-[400px] 2xl:h-[240px] lg:min-w-[200px] h-[200px] lg:h-[160px] mb-4 lg:mb-0">
                  <Image
                    src={patientpic2}
                    alt="ORIS Profile"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <CardContent className="w-full lg:flex-1 p-0 flex flex-col items-center text-center">
                  <h3 id="solution-2" className="text-3xl mb-2 sm:text-2xl md:text-4xl lg:text-4xl font-bold text-indigo-700 transition-all duration-300">Dental</h3>
                  <p className="mt-2  mb-3 leading-relaxed text-semibold px-2
                    text-lg sm:text-base md:text-xl lg:text-base xl:text-lg 2xl:text-xl
                    transition-all duration-300">
                    Seamless Integration. <br />
                    Simple & Easy. <br />
                    Created for everyone.
                  </p>
                  <Link href="/signup" className="text-[#FF4DC4] mt-3 
                    text-lg sm:text-base md:text-xl lg:text-base xl:text-lg 2xl:text-xl
                    hover:underline inline-block transition-all duration-300">
                      View my profile &gt;
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* DownPageBlack */}
          <div className="w-full flex justify-end -mb-10 mt-10">
            <div className="lg:translate-x-24 md:translate-x-16 sm:translate-x-16 xs:translate-x-14">
              <ScrollDownButton section={4} isBlack />
            </div>
          </div>
        </div>
      </section>
      
      <section id="section-5" className="relative rounded-t-3xl flex flex-col items-center w-full 
                        min-h-[100px] xs:min-h-[500px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-screen 
                        px-6 sm:px-12 lg:px-24 pt-16 pb-10 overflow-hidden">
        {/* 背景层 */}
        <div className="absolute inset-0 bg-[url('/assets/homebg2.png')] bg-cover bg-center bg-no-repeat bg-black" />

        {/* 内容层 */}
        <div className="relative w-full flex flex-col items-center mt-18">
          {/* 左上角标题 */}
          <div className="self-start mb-3">
        <Image 
              src={signUpText} 
              alt="Sign Up" 
              className="w-[140px] 
                        xs:w-[140px] 
                        sm:w-[160px] 
                        md:w-[180px] 
                        lg:w-[220px] 
                        xl:w-[240px] 
                        2xl:w-[260px] 
                        transition-all duration-300" 
            />
          </div>

          {/* 中间内容卡片 */}
          <Card className="bg-[#121212] border-0 shadow-lg w-full max-w-4xl">
            <CardContent className="p-10 md:p-16 text-[#C288E2]">
              {/* 每个痛点 */}
              <div className="space-y-12 md:space-y-14">
                <p className="flex items-start gap-8">
                  <span className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic leading-none ">1</span>
                  <span className="text-lg xs:text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed mt-2">
                    "My current management platform does not allow me to connect with other management systems."
                  </span>
                </p>
                <p className="flex items-start gap-8">
                  <span className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic leading-none ">2</span>
                  <span className="text-lg xs:text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed mt-2">
                    "I don't have the ability to connect with providers instantly."
                  </span>
                </p>
                <p className="flex items-start gap-8">
                  <span className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic leading-none ">3</span>
                  <span className="text-lg xs:text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed mt-2">
                    "I don't have access to this patient's history and need to follow up or submit requests."
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sign Up 按钮 */}
          <Link href="/signup" className="mt-10 hover:scale-105 transition-transform duration-300">
            <Image 
              src={homeSignUp2} 
              alt="Sign Up" 
              className="xs:w-[120px] sm:w-[150px] md:w-[170px] lg:w-[170px] xl:w-[190px] 2xl:w-[200px] transition-all duration-300" 
            />
          </Link>

           {/* DownPage */}
           <div className="w-full flex justify-end mt-auto">
            <div className="lg:translate-x-20 md:translate-x-10 sm:translate-x-12 xs:translate-x-10">
              <ScrollDownButton section={5} rotate />
            </div>
      </div>
    </div>
      </section>
    </main>

    </>
  

  );
};

export default App;
