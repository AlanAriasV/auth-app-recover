// import jwt from 'jsonwebtoken';

// import {
//   Career_Chief,
//   Department_Chief,
//   Student,
//   Teacher,
// } from '@prisma/client';
// import { User } from '../controllers/authController';

// export function calcBlocksDuration() {
//   // ... some code here ... //
// }

// type GetTokenProps =
//   | ((
//       | Omit<Student, 'password'>
//       | Omit<Teacher, 'password'>
//       | Omit<Career_Chief, 'password'>
//       | Omit<Department_Chief, 'password'>
//     ) & { role?: string })
//   | undefined;

// export function getToken(data: GetTokenProps) {
//   if (!data) {
//     return '';
//   }

//   const token = jwt.sign(data, process.env.JWT_SECRET as string, {
//     expiresIn: '5h',
//   });

//   return token;
// }

// export function validateToken(authorization: string) {
//   const token = authorization.split(' ')[1];

//   if (token === 'null' || !token) {
//     return {
//       type: 'error',
//       msg: 'Sin autorización',
//     };
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET as string);

//     return {
//       type: 'success',
//       token,
//     };
//   } catch {
//     return {
//       type: 'error',
//       msg: 'Token inválido',
//     };
//   }
// }

// export function decodeToken(token: string) {
//   const result = jwt.decode(token) as User & { iat: number; exp: number };

//   return result;
// }
