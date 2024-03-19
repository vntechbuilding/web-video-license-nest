import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { join } from 'path';
import { catchError, from, switchMap } from 'rxjs';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { compile } from 'handlebars';
import { readFile } from 'fs/promises';
import Mail from 'nodemailer/lib/mailer';
import { findRootDir } from '../../../utils/find-root-dir';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SesNodemailerService {
  constructor(private configService: ConfigService) {
    this.templateDir = join(findRootDir(), '/mail-templates');
    this.transporter = createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      auth: {
        user: this.configService.get('SMTP_USERNAME'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }
  templateDir!: string;
  transporter!: Transporter<SMTPTransport.SentMessageInfo>;
  sendMail<T>(toAddress: string, subject: string, template: string, data: T) {
    const templatePath = join(this.templateDir, template);
    return from(readFile(templatePath, 'utf8')).pipe(
      switchMap((content) => {
        const htmlTemplate = compile(content);
        const sendData: Mail.Options = {
          // from: {
          //   name: this.configService.get('SMTP_SENDER'),
          //   address: this.configService.get('SMTP_FROM'),
          // },
          // sender: {
          //   name: this.configService.get('SMTP_SENDER'),
          //   address: this.configService.get('SMTP_FROM'),
          // },
          from: `${this.configService.get('SMTP_SENDER')} <${this.configService.get('SMTP_FROM')}>`,
          sender: `${this.configService.get('SMTP_SENDER')} <${this.configService.get('SMTP_FROM')}>`,
          to: toAddress,
          subject: subject,
          html: htmlTemplate({ ...data, config: process.env }),
        };
        return from(this.transporter.sendMail(sendData));
      }),
      catchError((err) => {
        console.log(err);
        throw new Error(err);
      }),
    );
  }
}
