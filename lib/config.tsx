
export const baseURL = "http://localhost:3000/"
export const backgroundColor = "#DDDFE5"

export interface OptionProps {
    id: number,
    name: string
}

export interface SearchParams {
    status?: string
    page?: number,
    numberLine?: number,
    partner?: string,
    dateStart?: string,
    dateEnd?: string,
    input?: string,
    option?: string
}

export const getOptionsName = (id: number, options: OptionProps[]): string => {
    return options.find((value) => value.id === id)?.name as string
}

export const checkDuplicate = (data: number, option: number[]) => {
    const isDuplicate = option.find((value) => value === data)
    return isDuplicate
}

export function encodeTextToNumber(text: string) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += text.charCodeAt(i).toString().padStart(3, '0');
    }
    return `1` + result;
}

export function decodeNumberToText(number: string) {
    let result = '';
    for (let i = 1; i < number.length; i += 3) {
        const charCode = parseInt(number.substring(i, i + 3));
        result += String.fromCharCode(charCode);
    }
    return result;
}


export const convertArrayToString = (array: any[]): string => {
    let string = ""
    array.forEach(item => string += `-${item}`)
    return string.slice(1, string.length)
}

export const convertStringToArray = (data: string | undefined): any[] => {
    if (data) {
        const array = data.split("-")
        return array
    } else {
        return []
    }
}

