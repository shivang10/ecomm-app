const splitCamelCaseAndCapitalize = (inputString) => {
    const words = inputString.split(/(?=[A-Z])/);

    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

export default splitCamelCaseAndCapitalize;