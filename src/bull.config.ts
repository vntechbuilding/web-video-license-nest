import { BullModule } from '@nestjs/bull';
export const BullSendUserForgotPasswordEmail =
  'send-user-forgot-password-email';
export const BullRegister = [
  BullModule.registerQueue({
    name: BullSendUserForgotPasswordEmail,
  }),
];
