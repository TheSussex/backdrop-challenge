import axios from 'axios';
import config from '../config';

export const capitalize = (str: string) => {
    const separateNames = str.split(' ');
    const newArr = separateNames.map((el) => {
        const cap = el[0].toUpperCase();
        return cap+el.slice(1).toLowerCase();
    })
    return newArr.join(' ');
};

export const resolveAccountNumber = async(payload: any) => {
    try {
        const options: any = {
            method: 'get',
            url: `https://api.paystack.co/bank/resolve?account_number=${payload.user_account_number}&bank_code=${payload.user_bank_code}`,
            headers: {
                Authorization: `Bearer ${config.paystackSecretkey}`,
                'Content-Type': 'application/json',
            },
        };
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
};

export const calculateLevenshteinDistance = (str1: string, str2: string) => {
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[str2.length][str1.length];
};
