import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request) {
  try {
    // 从请求头获取 token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: '未提供认证令牌' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // 验证 token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 这里应该从数据库获取最新的用户信息
    // 示例：返回解码后的用户信息
    const user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: 'Test User'
    };

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, message: '认证失败' },
      { status: 401 }
    );
  }
} 