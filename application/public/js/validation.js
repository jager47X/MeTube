let passwordFlag=false;
let userNameFlag=false;
let pwdConfirmFlag=false;
function nameLengthValid(username){
    return username.length>=3;
}
function nameBeginValid(username){
    let regExp = /^[a-zA-Z]/;
    return regExp.test(username);
}
function alphanumericValid(username){
    let regExp = /^[a-zA-Z0-9]+$/;
    return regExp.test(username);
}
function userNameValid(username) {
    let regExp = /^[a-zA-Z]+[a-zA-Z0-9]{2,}$/g;
    return regExp.test(username);
}

function pwdLengthValid(username){
    return username.length>=8;
}
function pwdUpperValid(username) {
    let regExp = /^(?=.*[A-Z]).+$/;
    return regExp.test(username);
}
function pwdNumberValid(username) {
    let regExp = /^(?=.*\d).+$/;
    return regExp.test(username);
}
function pwdSpecialValid(username) {
    let regExp = /^(?=.*[/\-*+!@#$^&~\[\]]).+$/;
    return regExp.test(username);
}


function passWordValid(password) {
    let regExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/\-*+!@#$^&~\[\]]).{8,}$/;
    return regExp.test(password);
}



document.getElementById("username").addEventListener('input', function (ev) {
    let userInput = ev.currentTarget;
    let username = userInput.value;
    let usernameTest = userInput.nextElementSibling;
    let usernameBegin = document.getElementById('username-begin');
    let usernameLength = document.getElementById('username-length');
    let usernameAlphanumeric = document.getElementById('username-alphanumeric');
    userNameFlag=userNameValid(username);
    if (userNameFlag) {
        userInput.classList.add("valid-text");
        userInput.classList.remove("invalid-text");

        usernameTest.classList.add("valid-text");
        usernameTest.classList.remove("invalid-text");
    } else {
        userInput.classList.add("invalid-text");
        userInput.classList.remove("valid-text");

        usernameTest.classList.add("invalid-text");
        usernameTest.classList.remove("valid-text");
    }

    if(nameLengthValid(username)){
        usernameLength.innerText = "✅ Username must be at least 3 characters long.";
    }
    else{
        usernameLength.innerText = "❌ Username must be at least 3 characters long.";
    }


    if (nameBeginValid(username)) {
        usernameBegin.innerText = "✅ Username must begin with a character.";
    }
    else {
        usernameBegin.innerText = "❌ Username must begin with a character.";
    }

    if (alphanumericValid(username)) {
        usernameAlphanumeric.innerText = "✅ Username must be alphanumeric characters.";
    }
    else {
        usernameAlphanumeric.innerText = "❌ Username must be alphanumeric characters.";
    }
});

document.getElementById("password").addEventListener('input', function (ev) {
    let pwdInput = ev.currentTarget;
    let password = pwdInput.value;
    let passwordTest = pwdInput.nextElementSibling;

    let passwordNumber = document.getElementById('password-number');
    let passwordLength = document.getElementById('password-length');
    let passwordUpper = document.getElementById('password-upper');
    let passwordSpecial = document.getElementById('password-special');

    let pwdConfirmInput=document.getElementById("confirm-password");
    passwordFlag=passWordValid(password);

    pwdConfirmFlag = pwdConfirmInput.value === password;

    if (passwordFlag) {
        pwdInput.classList.add("valid-text");
        pwdInput.classList.remove("invalid-text");

        passwordTest.classList.add("valid-text");
        passwordTest.classList.remove("invalid-text");
    } else {
        pwdInput.classList.add("invalid-text");
        pwdInput.classList.remove("valid-text");

        passwordTest.classList.add("invalid-text");
        passwordTest.classList.remove("valid-text");
    }

    if (pwdLengthValid(password)) {
        passwordLength.innerText = "✅ Password must be at least 8 characters long.";
    }
    else {
        passwordLength.innerText = "❌ Password must be at least 8 characters long.";
    }

    if (pwdNumberValid(password)) {
        passwordNumber.innerText = "✅ Password must contain at least 1 number.";
    }
    else {
        passwordNumber.innerText = "❌ Password must contain at least 1 number.";
    }
    if (pwdUpperValid(password)) {
        passwordUpper.innerText = "✅ Password must contain at least 1 upper case letter.";
    }
    else {
        passwordUpper.innerText = "❌ Password must contain at least 1 upper case letter.";
    }
    if (pwdSpecialValid(password)) {
        passwordSpecial.innerText = "✅ Password must contain at least 1 special characters.";
    }
    else {
        passwordSpecial.innerText = "❌ Password must contain at least 1 special characters.";
    }

    let confirmPasswordTest = pwdConfirmInput.nextElementSibling;
    let passwordMatch= document.getElementById('password-match');

    if (pwdConfirmFlag) {
        pwdConfirmInput.classList.add("valid-text");
        pwdConfirmInput.classList.remove("invalid-text");

        passwordMatch.innerText = "✅ Passwords match.";
        confirmPasswordTest.classList.add("valid-text");
        confirmPasswordTest.classList.remove("invalid-text");
    } else {
        pwdConfirmInput.classList.add("invalid-text");
        pwdConfirmInput.classList.remove("valid-text");

        passwordMatch.innerText = "❌ Passwords do not match.";
        confirmPasswordTest.classList.add("invalid-text");
        confirmPasswordTest.classList.remove("valid-text");
    }
});

document.getElementById("confirm-password").addEventListener('input', function (ev) {
    let pwdConfirmInput = ev.currentTarget;
    let confirmPassword = pwdConfirmInput.value;
    let password=document.getElementById("password").value;
    let confirmPasswordTest = pwdConfirmInput.nextElementSibling;
    let passwordMatch= document.getElementById('password-match');

    pwdConfirmFlag = confirmPassword === password;

    if (pwdConfirmFlag) {
        pwdConfirmInput.classList.add("valid-text");
        pwdConfirmInput.classList.remove("invalid-text");

        passwordMatch.innerText = "✅ Passwords match.";
        confirmPasswordTest.classList.add("valid-text");
        confirmPasswordTest.classList.remove("invalid-text");
    } else {
        pwdConfirmInput.classList.add("invalid-text");
        pwdConfirmInput.classList.remove("valid-text");

        passwordMatch.innerText = "❌ Passwords do not match.";
        confirmPasswordTest.classList.add("invalid-text");
        confirmPasswordTest.classList.remove("valid-text");
    }

});
document.getElementById('reg-form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (userNameFlag&&passwordFlag&&pwdConfirmFlag) {
        ev.currentTarget.submit();
    } else {
        return;
    }
});
