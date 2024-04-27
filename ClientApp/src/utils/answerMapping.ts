export const mapAnswerToArray = (answer: Array<string> | string): Array<string> => {
    if (answer instanceof Array<string>) return answer;
    return [answer];
}

export const mapAnswerFromArray = (answer: [string] | Array<string>): Array<string> | string => {
    if (answer.length === 1) return answer[0];
    return answer;
}