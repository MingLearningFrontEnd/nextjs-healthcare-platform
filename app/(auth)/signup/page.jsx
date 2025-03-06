'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Calendly } from "@/components/ui/Calendly"

export default function SignUpPage() {
  const [showCalendly, setShowCalendly] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里可以添加表单验证
    if (formData.name && formData.businessName && formData.email) {
      setShowCalendly(true)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="bg-white py-20 px-16 xs:px-14 sm:px-16 md:px-32 rounded-2xl shadow-lg w-full max-w-[95%] sm:max-w-[85%] md:max-w-[800px]">
        <CardHeader className="text-center p-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">Beta User Sign Up</h2>
          <p className="text-gray-600 text-lg sm:text-2xl md:text-2xl">Enter your details below.</p>
        </CardHeader>

        <hr className="my-6 border-gray-300" />

        <CardContent className="p-0">
          {!showCalendly ? (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-[85%] mx-auto">
              <div className="space-y-6">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                  required
                />
                <Input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                  required
                />

                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                />
                <Input
                  type="text"
                  placeholder="Business Type"
                  className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                />

              </div>

              <div className="pt-8">
                <Button
                  type="submit"
                  className="w-full py-5 bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-lg shadow-[-4px_4px_10px_1px_rgba(0,0,0,0.40)]"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 max-w-[85%] mx-auto">
              <h3 className="text-2xl text-center font-semibold text-gray-800">
                Schedule a Meeting
              </h3>
              <Calendly
                url="https://calendly.com/smileconnect-health/30min"
                className="min-w-[320px] h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 