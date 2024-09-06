import sjcl from 'sjcl';

const secretKey = '1234567890123456';

export const encryptData = (data: string) => {
    const key = sjcl.codec.utf8String.toBits(secretKey);
    return sjcl.encrypt(key, data);
};

export const decryptData = (encryptedData: any) => {
    const key = sjcl.codec.utf8String.toBits(secretKey);
    return sjcl.decrypt(key, encryptedData);
};
