import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('guest-login')
  guestLogin() {
    return {
      accessToken: 'guest-jwt-token-12345',
      user: { id: 'guest-1', name: 'Guest User', role: 'guest' },
    };
  }
}