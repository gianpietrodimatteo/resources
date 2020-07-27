import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { DashboardLogger } from '../logger/dashboard-logger.service';
import CryptoJS = require('crypto-js');


export class Key {
    key: string;
}

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class CryptographyService {

    private readonly keyUri = 'http://localhost:8090/api/key';

    private key: string;

    // private readonly initializationVector = '0000000000000000';
    // private readonly algorithm = 'aes-128-cbc';
    // private readonly decryptedEncoding = 'utf8';
    // private readonly encryptedEncoding = 'base64';
    private readonly de = CryptoJS.enc.Utf8;
    private readonly ee = CryptoJS.enc.Base64;
    private readonly iv = CryptoJS.enc.Utf8.parse('');

    constructor(private readonly httpService: HttpService, private logger: DashboardLogger) {
        this.logger.setContext('CryptographyService');

        this.fetchKey();
    }

    fetchKey(): void {
        this.getKey().then(axiosRes => {
            this.key = this.de.parse(axiosRes.data.key);
            // this.key = axiosRes.data.key;
            this.logger.log('Key fetched successfully: ' + this.key);
        }).catch(() => {
            this.logger.warn('Could not connect to key backend.');
        });
    }

    getKey(): Promise<AxiosResponse<Key>> {
        return this.httpService.get(this.keyUri).toPromise();
    }

    add(x: string, y: string): string {
        return this.encryptNumber(this.decryptNumber(x) + this.decryptNumber(y));
    }
    subtract(x: string, y: string): string {
        return this.encryptNumber(this.decryptNumber(x) - this.decryptNumber(y));
    }
    multiply(x: string, y: string): string {
        return this.encryptNumber(this.decryptNumber(x) * this.decryptNumber(y));
    }
    divide(x: string, y: string): string {
        return this.encryptNumber(this.decryptNumber(x) / this.decryptNumber(y));
    }

    encryptNumber(num: number): string {
        return this.encrypt(num.toString());
    }

    encrypt(text: string): string {
        if (text == null) { return text; };
        if (this.key != null) {
            // const key = CryptoJS.enc.Utf8.parse(this.key);
            // const iv = CryptoJS.enc.Utf8.parse('');
            const encrypted = CryptoJS.AES.encrypt(text, this.key, { iv: `${this.iv}` });
            const encryptedString = this.iv.concat(encrypted.ciphertext).toString(this.ee);
            this.logger.debug('Encrypting: ' + text + ' to ' + encryptedString);
            return encryptedString;
        } else {
            this.keyNotPresent();
        }
    }

    decryptNumber(text: string): number {
        return Number(this.decrypt(text));
    }

    decrypt(text: string): string {
        if (text == null) { return text; };
        if (this.key != null) {
            // const key = CryptoJS.enc.Utf8.parse(this.key);
            // const iv = CryptoJS.enc.Utf8.parse('');
            const decrypted = CryptoJS.AES.decrypt(text, this.key, { iv: `${this.iv}` });
            const decryptedString = decrypted.toString(this.de)
            this.logger.debug('Decrypting: ' + text + ' to ' + decryptedString);
            return decryptedString;
        } else {
            this.keyNotPresent();
        }
    }

    private keyNotPresent() {
        this.fetchKey();
        this.logger.error('Key not present. Trying to fetch it...');
        throw new InternalServerErrorException();
    }

    // isEncryptedNumber(text: string): boolean {
    //     return !Number.isNaN(this.decryptNumber(text));
    // }
}
