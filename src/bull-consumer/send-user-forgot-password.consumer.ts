import { Process, Processor } from '@nestjs/bull';
import { BullSendUserForgotPasswordEmail } from '../bull.config';
import { PrismaService } from '../middleware/prisma/prisma.service';
import { Job } from 'bull';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { firstValueFrom, interval, startWith } from 'rxjs';
import { SesNodemailerService } from '../middleware/services/ses-nodemailer/ses-nodemailer.service';

export declare type JobSendUserForgotPasswordData = {
  id: string;
  email: string;
  fullName: string;
};
@Processor(BullSendUserForgotPasswordEmail)
export class SendUserForgotPasswordConsumer {
  constructor(
    private prisma: PrismaService,
    private sesMailer: SesNodemailerService,
  ) {
    console.warn('Start SendUserForgotPasswordConsumer');
    interval(60000)
      .pipe(startWith(0))
      .subscribe(() => {
        this.prisma.userForgotPasswordCode.deleteMany({
          where: {
            createdAt: {
              lte: new Date(new Date().getTime() - 24 * 60 * 60000),
            },
          },
        });
      });
  }

  @Process('send')
  async sendEmail(job: Job<JobSendUserForgotPasswordData>) {
    // console.log('send Job', job);
    let forgotPasswordCode = await this.prisma.userForgotPasswordCode.findFirst(
      {
        where: {
          userId: job.data.id,
        },
        include: {
          user: true,
        },
      },
    );
    if (!forgotPasswordCode) {
      forgotPasswordCode = await this.prisma.userForgotPasswordCode.create({
        data: {
          code: randomStringGenerator(),
          userId: job.data.id,
        },
        include: {
          user: true,
        },
      });
    }
    // console.log(forgotPasswordCode);
    if (forgotPasswordCode) {
      try {
        await firstValueFrom(
          this.sesMailer.sendMail(
            forgotPasswordCode.user.email,
            'Khôi phục mật khẩu',
            './user/forgot-password.html',
            {
              user: forgotPasswordCode.user,
              code: forgotPasswordCode.code,
            },
          ),
        );
        // console.log(sendMailLog);
        await job.moveToCompleted('true', true);
        // await job.remove();
        return true;
      } catch (e) {
        // console.log(e);
        await job.moveToFailed({ message: e.message }, true);
        // await job.remove();
        return false;
      }
    }
  }
}
