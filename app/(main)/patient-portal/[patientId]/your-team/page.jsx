'use client';
import PatientBanner from '../../components/PatientBanner';
import { useState } from 'react';
import React from 'react';
import Image from 'next/image';

// 模拟医生数据
const mockDoctors = {
  primary_dentist: {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Primary Dentist",
    clinic: "Bright Smile Dental",
    phone: "(555) 123-4567",
    email: "sarah.johnson@brightsmile.com",
    address: "123 Dental Street, Suite 100, Seattle, WA 98101",
    avatar: "/assets/doctor-avatars/sarah.jpg"
  },
  orthodontist: {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Orthodontist",
    clinic: "Perfect Alignment Orthodontics",
    phone: "(555) 234-5678",
    email: "m.chen@perfectalign.com",
    address: "456 Braces Ave, Seattle, WA 98102",
    avatar: "/assets/doctor-avatars/michael.jpg"
  },
  periodontist: {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Periodontist",
    clinic: "Healthy Gums Specialty",
    phone: "(555) 345-6789",
    email: "e.rodriguez@healthygums.com",
    address: "789 Gum Health Road, Seattle, WA 98103",
    avatar: "/assets/doctor-avatars/emily.jpg"
  },
  prosthodontist: {
    id: 4,
    name: "Dr. James Wilson",
    role: "Prosthodontist",
    clinic: "Advanced Prosthetic Dentistry",
    phone: "(555) 456-7890",
    email: "j.wilson@advancedprosthetic.com",
    address: "321 Crown Street, Seattle, WA 98104",
    avatar: "/assets/doctor-avatars/james.jpg"
  },
  oral_surgeon: {
    id: 5,
    name: "Dr. Lisa Kim",
    role: "Oral Surgeon",
    clinic: "Precision Oral Surgery",
    phone: "(555) 567-8901",
    email: "l.kim@precisionoral.com",
    address: "654 Surgical Center Drive, Seattle, WA 98105",
    avatar: "/assets/doctor-avatars/lisa.jpg"
  }
};

const StageCard = ({ stage }) => {
  const stageNames = {
    primary_dentist: "Primary Dentist",
    orthodontist: "Orthodontist",
    periodontist: "Periodontist",
    prosthodontist: "Prosthodontist",
    oral_surgeon: "Oral Surgeon"
  };

  return (
    <div className="w-full min-w-[160px] p-4 lg:p-5 rounded-lg shadow-md border border-gray-200 bg-white text-center">
      <h3 className="font-medium text-sm lg:text-lg">{stageNames[stage]}</h3>
    </div>
  );
};

const DoctorCard = ({ doctor, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`w-full min-w-[160px] p-4 lg:p-5 rounded-lg shadow-md transition-all bg-white text-center
        ${isSelected ? 'border-2 border-[#7b61ff]' : 'border border-gray-200'}
        hover:border-[#7b61ff]`}
    >
      <h3 className="font-medium text-sm lg:text-lg">{doctor.name}</h3>
    </div>
  );
};

const DoctorInfo = ({ doctor }) => {
  if (!doctor) return null;
  
  return (
    <div className="col-span-2 p-6 lg:p-8 border rounded-lg shadow-md bg-white mt-4 flex flex-col items-center text-center">
      <Image
        src="https://i.pravatar.cc/160"
        alt="Doctor profile"
        width={120}
        height={120}
        className="rounded-full z-10 relative"
      />
      <h3 className="text-lg lg:text-2xl font-bold mb-2 lg:mb-4">{doctor.name}</h3>
      <div className="space-y-2 lg:space-y-3 w-full">
        <p className="text-sm lg:text-base">{doctor.clinic}</p>
        <p className="text-sm lg:text-base">{doctor.phone}</p>
        <p className="text-sm lg:text-base">{doctor.email}</p>
        <p className="text-sm lg:text-base">{doctor.address}</p>
      </div>
      
      <button className="mt-6 lg:mt-8 px-6 py-2 lg:px-8 lg:py-3 bg-[#7b61ff] text-white rounded-lg hover:bg-[#6347ff] transition-colors text-sm lg:text-base">
        View Profile
      </button>
    </div>
  );
};

export default function YourTeamPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(selectedDoctor?.id === doctor.id ? null : doctor);
  };

  return (
    <div className='min-h-screen'>
      <PatientBanner />
      <div className='container mx-auto py-12 px-4'>
        <h2 className='text-2xl lg:text-4xl font-bold mb-8 lg:mb-12 text-center'>
          Your Current Healthcare Team
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:gap-6 max-w-2xl mx-auto">
          <div></div>
          <div className="w-full min-w-[160px] p-4 lg:p-5 rounded-lg shadow-md border border-gray-200 bg-white text-center">
            <h3 className="font-medium text-sm lg:text-lg">You</h3>
          </div>

          {Object.entries(mockDoctors).map(([stage, doctor]) => (
            <React.Fragment key={stage}>
              <StageCard stage={stage} />
              <div>
                <DoctorCard 
                  doctor={doctor}
                  isSelected={selectedDoctor?.id === doctor.id}
                  onClick={() => handleDoctorClick(doctor)}
                />
              </div>
              {selectedDoctor?.id === doctor.id && (
                <DoctorInfo doctor={selectedDoctor} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
} 