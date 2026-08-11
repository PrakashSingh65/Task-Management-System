import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('guest-login')
  guestLogin() {
    return {
      accessToken: 'guest-jwt-token-12345',
      user: { id: 'guest-1', name: 'Guest User', role: 'guest' },
    };
  }

  @Post('login')
  login(@Body() body: any) {
    const email = body?.email || 'dexter@gmail.com';
    return {
      accessToken: 'jwt-token-' + Date.now(),
      user: { id: 'user-1', email, name: email.split('@')[0] || 'User', role: 'user' },
    };
  }

  @Post('logout')
  logout() {
    return { success: true, message: 'Logged out successfully' };
  }
}