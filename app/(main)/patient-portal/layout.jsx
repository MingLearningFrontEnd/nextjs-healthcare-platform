import bgColor from '@/public/assets/Color_Gradient_Baackground.png'


export default function PatientLayout({
  children,
}) {
  return (

    <div className=''>
      <main className=" m-2 mt-8 rounded-sm
                              2xl:m-8 2xl:mt-14
                              xl:m-6 xl:mt-14
                              lg:m-6 lg:mt-14
                              md:m-6 md:mt-14
                              sm:m-4 sm:mt-12"
        style={{
          backgroundImage: `url(${bgColor.src})`,
          backgroundSize: 'cover 100%',
          backgroundPosition: 'center -300px',
        }}>
        {children}
      </main>

    </div>



  );
}