import { comparePassword, hashPassword } from '@/src/common';
import { DATE_LANGUAGE, DATE_TIMEZONE } from '@/src/utils/constants';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

interface GenerateCodeProps {
  userID: string;
}

export default class CodeController {
  static async generateCode({ userID }: GenerateCodeProps) {
    try {
      const code = crypto.randomBytes(3).toString('hex').toUpperCase();

      const hashCode = await hashPassword(code);

      const now = new Date();

      const expirationDate = new Date(
        Date.now() + 1000 * 60 * 20,
      ).toISOString();

      const { rows } =
        await sql`INSERT INTO codes_recover (code, expiration_date, user_id) VALUES (${hashCode}, ${expirationDate}, ${userID}) RETURNING id, expiration_date`;

      if (!rows.length) {
        return {
          status: 422,
          message: 'Error generating code',
        };
      }

      const data = rows[0];
      data.expiration_date = new Date(data.expiration_date);
      data.date = now;
      data.code = code;

      return {
        status: 200,
        data,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  static async validateCode({ code, id }: { code: string; id: number }) {
    try {
      const { rows } =
        await sql`SELECT code, expiration_date FROM codes_recover WHERE user_id = ${id} ORDER BY id DESC LIMIT 1`;

      if (!rows.length) {
        return {
          status: 404,
          message: 'Code not found',
        };
      }

      const { code: hashCode, expiration_date } = rows[0];

      if (new Date() > new Date(expiration_date)) {
        return {
          status: 400,
          message: 'Code has expired',
        };
      }

      if (await comparePassword(code, hashCode)) {
        return {
          status: 200,
          message: 'Code is valid',
        };
      }

      return {
        status: 400,
        message: 'Code is invalid',
      };
    } catch (error: any) {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}
