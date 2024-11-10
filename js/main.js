/* DEFINE DOM VARIABLES */
const cardSubscribe = document.getElementById('card__subscribe');
const cardSuccess = document.getElementById('card__success');

const field = document.getElementById('email-field');
const label = document.getElementById('div__label');

const userEmail = document.getElementById('success__email');

const buttonSubmit = document.getElementById('send-form');
const buttonReturn = document.getElementById('return-home');

const errorMessageElement = document.createElement("p");
errorMessageElement.className = "error-message";

/* VALIDATE AND SUBMIT EMAIL */
function validateEmail(e) {
    
    e.preventDefault();

    const email = field.value;
    
    if (!email) {
        if (PrevErrorExists()) {
            errorAgain("Email required");
            return;
        }
        errorStyle("Email required");
        return;
    }

    const isValidEmail = /^\S+@\S+$/g;

    if (!isValidEmail.test(email)) {
        if (PrevErrorExists()) {
            errorAgain("Email is invalid");
            return;
        }
        errorStyle("Email is invalid");
        return;
    }

    goToSuccess(email);
    return;
}

buttonSubmit.addEventListener('click', validateEmail);

function returnHome(e) {
    cardSuccess.style.display = 'none';
    cardSubscribe.style.display = 'flex';
}

buttonReturn.addEventListener('click', returnHome);


/* STYLING FUNCTIONS */
function errorStyle(errorMessage) {
    field.style.border = "1px solid tomato";
    field.style.backgroundColor = "#ffe8e6";
    errorMessageElement.textContent = errorMessage;
    label.appendChild(errorMessageElement);
    return;
}

function resetStyle() {
    field.style.border = null;
    field.style.backgroundColor = null;
    if (PrevErrorExists()) label.removeChild(label.children[1]);
    return;
}

function errorAgain(errorMessage) {
    resetStyle();
    setTimeout(errorStyle, 250, errorMessage);
    return;
}

function PrevErrorExists() {
    return label.lastElementChild.nodeName === "P" ? true : false;
}

function goToSuccess(email) {
    userEmail.textContent = email;
    cardSuccess.style.display = 'flex';
    cardSubscribe.style.display = 'none';
    
    resetStyle();
    field.value = '';
}