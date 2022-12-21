// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         window.location.href = "../home/home.html";
//     }
// })


function onChangeEmail(){
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();

}

function onChangePassword(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword(){
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function register(){
    showLoading();

    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        hideLoading();
        window.location.href = "../../pages/home/home.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    })
}
function login(){
    window.location.href = '../../index.html'
 }

function getErrorMessage(error){
    if(error.code == "auth/email-already-in-use"){
        return "Email já em uso!";
    }
    return error.message;
}

function validatePasswordsMatch(){
    const confirmPassword = form.confirmPassword().value;
    const password = form.password().value;

    form.passwordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";

}
function toggleRegisterButtonDisable(){
   form.registerButton().disabled = !isFormValid();
}

function isFormValid(){
    const email = form.email().value;
    if(!email || !validateEmail(email)){
        return false;
    }
    const password = form.password().value;
    if(!password || password.length< 6){
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if(!confirmPassword || confirmPassword != password){
        return false;
    }

    return true;

}


const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    confirmPassword: () => document.getElementById('confirmPassword'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    registerButton: () => document.getElementById('register-button')
}