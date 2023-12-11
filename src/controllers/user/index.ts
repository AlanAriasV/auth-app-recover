import { hashPassword } from '@/src/common';
import { sql } from '@vercel/postgres';

interface GetUserIDProps {
  email: string;
}

export default class UserController {
  static async getUserIDByEmail({ email }: GetUserIDProps) {
    try {
      const { rows } = await sql`SELECT id FROM users WHERE email = ${email}`;

      if (!rows.length) {
        return {
          status: 404,
          message: 'User not found',
        };
      }

      const { password, ...user } = rows[0];

      return {
        status: 200,
        data: user,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  static async updatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const hashedPassword = await hashPassword(password!);

      await sql`UPDATE users SET password = ${hashedPassword} WHERE email = ${email}`;

      return {
        status: 200,
        message: 'Password updated successfully',
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}
