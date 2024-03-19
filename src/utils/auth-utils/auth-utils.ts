import { sign, verify } from 'jsonwebtoken';
import { generateKeyPairSync } from 'crypto';
import { from, Observable } from 'rxjs';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
// export class AuthUtils {
//
// }

export const createKeyAndTokenPair = (payload: any) => {
  const { privateKey, publicKey } = generateKeyPair();
  return { privateKey, publicKey, ...createTokenPair(payload, privateKey) };
};
export const invalidLocalMachine = 'Invalid local machine';
export const invalidToken = 'Invalid token information';

export const invalidTokenInformation = () => {
  throw new UnauthorizedException(invalidToken, {
    description: invalidToken,
  });
};
export const invalidLogin = 'Invalid login information';
export const invalidLoginInformation = () => {
  // throw new UnauthorizedException(invalidLogin, {
  //   description: invalidLogin,
  // });
  throw new BadRequestException({
    message: [
      {
        property: 'password',
        value: '',
        errors: {
          invalid_login: invalidLogin,
        },
        code: 'invalid_login',
        message: invalidLogin,
      },
    ],
  });
};
export const loginDisabled = () => {
  // throw new UnauthorizedException('Your account is temporarily locked', {
  //   description: 'Your account is temporarily locked',
  // });
  throw new BadRequestException({
    message: [
      {
        property: 'password',
        value: '',
        errors: {
          account_locked: 'Your account is temporarily locked',
        },
        code: 'account_locked',
        message: 'Your account is temporarily locked',
      },
    ],
  });
};

export const decodeToken = (
  tokenString: string,
  publicKey: string,
): Observable<any> => {
  return from(
    new Promise((resolve, reject) => {
      verify(tokenString, publicKey, (err, decode) => {
        if (err) {
          // console.error(`Error verify::`, err);
          return reject(err);
        } else {
          // console.log(`decode verify::`, decode);
          return resolve(decode);
        }
      });
    }),
  );
};
export const createTokenPair = (
  payload: any,
  privateKey: string,
  // publicKey?: string,
) => {
  // try {
  // const { privateKey, publicKey } = generateKeyPair();
  const accessToken = sign(payload, privateKey.toString(), {
    algorithm: 'RS256',
    expiresIn: '30 minutes',
  });
  const refreshToken = sign(
    { ...payload, refreshToken: true },
    privateKey.toString(),
    {
      algorithm: 'RS256',
      expiresIn: '7 days',
    },
  );
  // if (publicKey) {
  //   verify(accessToken, publicKey, (err, decode) => {
  //     if (err) {
  //       console.error(`Error verify::`, err);
  //     } else {
  //       console.log(`decode verify::`, decode);
  //     }
  //   });
  // }
  return { accessToken, refreshToken };
  // } catch (e) {
  //   // console.log(e);
  //   return false;
  // }
};

export const generateKeyPair = () => {
  return generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
};
