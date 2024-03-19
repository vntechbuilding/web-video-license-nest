import { AES, enc } from 'crypto-js';
export const LocalMachineDecrypt = (
  payload: string,
  tokenId: string,
  MACHINE_ID_HASH: string,
) => {
  const secret = tokenId + MACHINE_ID_HASH;
  try {
    return AES.decrypt(payload, secret).toString(enc.Utf8);
  } catch (e) {
    return false;
  }
};

export const LocalMachineEncrypt = (
  payload: string,
  tokenId: string,
  MACHINE_ID_HASH: string,
) => {
  const secret = tokenId + MACHINE_ID_HASH;
  return AES.encrypt(payload, secret).toString();
};

export const MachineHashEncrypt = (
  machineId: string,
  tokenId: string,
  MACHINE_ID_HASH: string,
) => {
  const secret = tokenId + MACHINE_ID_HASH + machineId;
  return AES.encrypt(machineId, secret).toString();
};
export const MachineHashEncryptData = (
  payload: any,
  machineId: string,
  tokenId: string,
  MACHINE_ID_HASH: string,
) => {
  const secret = tokenId + MACHINE_ID_HASH + machineId;
  // console.log('secret', secret);
  return AES.encrypt(payload, secret).toString();
};
export const MachineHashDecrypt = (
  payload: string,
  machineId: string,
  tokenId: string,
  MACHINE_ID_HASH: string,
) => {
  const secret = tokenId + MACHINE_ID_HASH + machineId;
  try {
    return AES.decrypt(payload, secret).toString(enc.Utf8);
  } catch (e) {
    return false;
  }
};
