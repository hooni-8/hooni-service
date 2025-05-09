import {nonDigitRegex, commaRegex} from "@components/utils/Regex";

export const parseNumber = (formatted) => formatted.replace(commaRegex, '');

export const numberOnly = (value) => value.replace(nonDigitRegex, '');

export const formatNumber = (value) => {
    if (!value && value !== 0) return '';
    return Number(value).toLocaleString('ko-KR');
};