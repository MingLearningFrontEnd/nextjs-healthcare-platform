'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { fetchProviderData } from '@/app/store/slices/providerSlice'
import ProviderBanner from '../components/ProviderBanner'
import DailySchedule from "../components/DailySchedule"

export default function ProviderPortal() {
  const params = useParams()
  const dispatch = useDispatch()
  const providerId = params.providerId

  // 在组件挂载时获取provider数据
  useEffect(() => {
    if (providerId) {
      dispatch(fetchProviderData(providerId))
    }
  }, [dispatch, providerId])

  return (
    <div className="min-h-screen">
      <ProviderBanner />
      <main className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold mb-4">Provider Dashboard</h1>
        <DailySchedule />
      </main>
    </div>
  )
} 