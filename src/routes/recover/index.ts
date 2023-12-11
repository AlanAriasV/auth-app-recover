import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { Router } from 'express';

import { CodeController, UserController, sendEmail } from '@/src/controllers';

const recoverRouter = Router();

recoverRouter.post('/validate-code', async (req, res) => {
  const { email, code } = req.body;

  const {
    status: userStatus,
    data: userData,
    message: userMessage,
  } = await UserController.getUserIDByEmail({ email });

  if (userStatus !== 200) {
    return res.status(userStatus).json({ message: userMessage });
  }

  const { status, message } = await CodeController.validateCode({
    code,
    id: userData!.id,
  });

  res.status(status).json({ message });
});

recoverRouter.post('/request-code', async (req, res) => {
  const { email, os, webBrowser } = req.body;

  const {
    status: userStatus,
    data: userData,
    message: userMessage,
  } = await UserController.getUserIDByEmail({ email });

  if (userStatus !== 200) {
    return res.status(userStatus).json({ message: userMessage });
  }

  const {
    status: codeStatus,
    data: codeData,
    message: codeMessage,
  } = await CodeController.generateCode({ userID: userData!.id });

  if (codeStatus !== 200) {
    return res.status(codeStatus).json({ message: codeMessage });
  }

  const html = fs
    .readFileSync(
      path.resolve(__dirname, '../../../public/template_recover.html'),
      'utf8',
    )
    .replace('REPLACE_CODE', codeData!.code)
    .replace('REPLACE_DATE', codeData!.date)
    .replace('REPLACE_SO', os)
    .replace('REPLACE_WEB_BROWSER', webBrowser);

  const { status, message } = await sendEmail(
    email,
    'Recuperación de contraseña',
    '',
    html,
  );

  res.status(status).json({ message });
});

recoverRouter.post('/change-password', async (req, res) => {
  const { email, password } = req.body;

  const { status, message } = await UserController.updatePassword({
    email,
    password,
  });

  res.status(status).json({ message });
});

export default recoverRouter;
