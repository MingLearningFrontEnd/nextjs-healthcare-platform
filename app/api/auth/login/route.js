import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 模拟用户数据（实际应用中应该从数据库获取）
const users = [
  {
    id: 1,
    email: 'patient@test.com',
    password: 'patient123',
    role: 'patient',
    name: 'John Doe',
    userId: '2'
  },
  {
    id: 2,
    email: 'provider@test.com',
    password: 'provider123',
    role: 'provider',
    name: 'Dr. Smith',
    userId: 'DR001',
    speciality: 'Dentist'
  },
  {
    id: 3,
    email: 'practice@test.com',
    password: 'practice123',
    role: 'practice',
    name: 'Dental Clinic',
    practiceId: '1',
    address: '123 Medical St'
  }
];

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log('API: Received login request for:', email);

    // 查找匹配的用户
    const user = users.find(u => u.email === email && u.password === password);
    console.log('API: Found user:', user ? 'yes' : 'no');

    if (user) {
      // 根据角色选择要包含在token中的信息
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        // 根据角色添加特定字段
        ...(user.role === 'patient' && { patientId: user.userId }),
        ...(user.role === 'provider' && { providerId: user.userId }),
        ...(user.role === 'practice' && { practiceId: user.practiceId })
      };

      // 生成 JWT token
      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });
      console.log('API: Generated token:', token.substring(0, 20) + '...');

      // 移除密码字段
      const { password: _, ...safeUser } = user;

      const response = {
        success: true,
        user: safeUser,
        token,
        message: 'Login successful'
      };
      console.log('API: Sending response with token');
      
      return NextResponse.json(response);
    }

    console.log('API: Login failed - invalid credentials');
    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('API: Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed, please try again later' },
      { status: 500 }
    );
  }
} 