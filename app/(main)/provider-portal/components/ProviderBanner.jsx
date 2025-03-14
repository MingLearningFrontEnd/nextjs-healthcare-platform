'use client'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ProviderNavigation from "./ProviderNavigation";
import { useSelector } from 'react-redux';
import ProfileWheel from '@/public/assets/profile-wheel.svg';

export default function ProviderBanner() {
  const { provider } = useSelector((state) => state.providerSlice);

  if (!provider) {
    return <div className="py-20 text-center text-3xl"> </div>;
  }
  const name = provider.name
  const email = provider.email

  const id = provider.id;

  return (
    <Card className="rounded-sm w-full bg-white border-0 border-b-2 border-black relative  ">
      <CardContent className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between p-4 sm:p-5 pt-8 sm:pt-6 gap-4">
        {/* 头像 */}
        <div className="absolute top-[5%] sm:top-[20px] left-1/2 sm:left-6 transform -translate-x-1/2 sm:translate-x-0 z-0">
          <div className="relative w-24 h-24 pt-2 sm:w-28 sm:h-28 flex items-center justify-center">
            <ProfileWheel className="absolute z-0  scale-75  " />
            <Image
              src="https://i.pravatar.cc/160"
              alt="Patient profile"
              width={120}
              height={120}
              className="rounded-full z-10 relative"
            />
          </div>
        </div>

        {/* 个人信息 */}
        <div className="flex flex-col items-center sm:items-start sm:pl-36 text-center sm:text-left mt-24 sm:mt-4 ">
          <h2 className="text-lg font-semibold sm:text-xl md:text-xl lg:text-3xl">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>

        </div>

        {/* 导航 */}
        <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-auto sm:mb-3 flex justify-center sm:justify-end">
          <ProviderNavigation providerId={id} />
        </div>
      </CardContent>
    </Card>
  );
}
