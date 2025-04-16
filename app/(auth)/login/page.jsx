'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { loginUser, clearError } from '@/app/store/slices/authSlice'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // 如果已经认证，跳转到对应页面
  useEffect(() => {
    if (isAuthenticated && user) {
      // 根据用户角色跳转到不同页面
      if (user.role === 'patient') {
        router.push(`/patient-portal/${user.userId}`)
      } else if (user.role === 'provider') {
        router.push(`/provider-portal/${user.userId}`)
      } else if (user.role === 'practice') {
        router.push(`/practice-portal/${user.practiceId}`)
      } else {
        router.push('/')
      }
    }
  }, [isAuthenticated, user, router])

  // 清除错误信息
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearError())
      }
    }
  }, [dispatch, error])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="bg-white py-16 px-14 sm:px-16 md:px-24 rounded-2xl shadow-lg w-full max-w-[95%] sm:max-w-[85%] md:max-w-[600px]">
        <CardHeader className="text-center p-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-2">Login</h2>
          <p className="text-gray-600 text-base sm:text-lg">Please enter your account information</p>
        </CardHeader>

        <hr className="my-6 border-gray-300" />

        <CardContent className="p-0">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 max-w-[85%] mx-auto">
            <div className="space-y-6">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                required
                disabled={loading}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[#9590EF] text-center placeholder:text-white placeholder:text-[15px]"
                required
                disabled={loading}
              />
            </div>

            <div className="pt-8">
              <Button
                type="submit"
                className="w-full py-5 bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-lg shadow-[-4px_4px_10px_1px_rgba(0,0,0,0.40)]"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account? 
                <Link href="/signup" className="text-[#4F46E5] ml-1 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 