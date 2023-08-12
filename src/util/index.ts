function replaceText({
    replaceValue,
    searchValue,
    val,
    betweenText,
}: {
    val: string;
    searchValue: string;
    replaceValue: string;
    betweenText?: string;
}) {
    let value = val;

    if (!value) {
        return "";
    }

    if (!betweenText) {
        do {
            value = value.replace(searchValue, replaceValue);
        } while (value.indexOf(searchValue) >= 0);

        return value;
    }

    let i = 0;
    let isOpenQuote = false;
    do {
        const index = value.indexOf(betweenText, i);

        if (index < 0) {
            break;
        }

        if (!isOpenQuote) isOpenQuote = true;
        else {
            value =
                value.substring(0, i) +
                value.substring(i, index).replace(searchValue, replaceValue) +
                value.substring(index);

            isOpenQuote = false;
        }

        i = index + 1;
    } while (i < value.length);

    return value;
}
