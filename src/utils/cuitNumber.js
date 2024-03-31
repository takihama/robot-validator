export const isCuitValid = (cuit) => {
    cuit = cuit.replace(/\D/g, '');

    if (cuit.length !== 11) {
        return false;
    }

    let sum = 0;
    const sequence = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cuit.charAt(i)) * sequence[i];
    }
    let remainder = sum % 11;

    let verificationDigit = 11 - remainder;
    if (verificationDigit === 11) {
        verificationDigit = 0;
    } else if (verificationDigit === 10) {
        verificationDigit = 9;
    }

    return parseInt(cuit.charAt(10)) === verificationDigit;
}

export const getCuitDetails = (cuit) => {
    cuit = cuit.replace(/\D/g, '');

    if (cuit.length !== 11) {
        return false;
    }

    const typeDigits = cuit.slice(0, 2);
    let type = ''

    if (['30', '33', '34'].includes(typeDigits)) {
        type = 'JURIDICA'
    } else if (['20', '23', '24', '25', '26', '27'].includes(typeDigits)) {
        type = 'FISICA'
    }
    return {
        type
    };
}