export default function (value: string) {
    const lastChar = value[value.length - 1];
    const firstChar = value[0];

    if (firstChar == '"' && lastChar == '"') {
        return value.substring(1, value.length - 1);
    } else {
        return value;
    }
}