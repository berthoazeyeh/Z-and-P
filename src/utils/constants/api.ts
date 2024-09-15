
export const logo = require("assets/images/logo_ZP.png")




export function validateFormData(formData: any) {
    const { name, email, phone, selectField } = formData;

    // Vérification du nom (non vide)
    if (!name || name.trim() === '') {
        return {
            isValid: false,
            message: "Le champ 'nom' est requis."
        };
    }

    // Vérification de l'email (format correct)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        return {
            isValid: false,
            message: "Le champ 'email' n'est pas valide."
        };
    }

    // Vérification du téléphone (numérique et de longueur correcte)
    const phonePattern = /^\d{9,12}$/;
    if (!phone || !phonePattern.test(phone)) {
        return {
            isValid: false,
            message: "Le champ 'téléphone' doit contenir entre 9 et 12 chiffres."
        };
    }

    // Vérification du champ select (non vide)
    if (!selectField || selectField === 'default') {
        return {
            isValid: false,
            message: "Veuillez sélectionner une option dans le champ 'select'."
        };
    }

    // Si tout est valide
    return {
        isValid: true,
        message: "Tous les champs sont valides."
    };
}
export function validateEmailData(email: any) {

    // Vérification de l'email (format correct)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        return {
            isValid: false,
            message: "Le champ 'email' n'est pas valide."
        };
    }



    // Si tout est valide
    return {
        isValid: true,
        message: "Tous les champs sont valides."
    };
}
