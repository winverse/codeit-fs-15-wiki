const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_MIN_LEN = 12;

const emailField = document.querySelector("#email-field");
const emailErrorMessage = document.querySelector("#email-field .error-message");
const passwordField = document.querySelector("#password-field");
const passwordErrorMessage = document.querySelector(
  "#password-field .error-message"
);
const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("input", handleFormInput);

function handleFormInput(e) {
  const input = e.target;
  const form = e.currentTarget;

  switch (input.name) {
    case "email": {
      const email = form["email"].value;

      const isEmailValid = EMAIL_REGEXP.test(email);

      emailField.classList.toggle("invalid", !isEmailValid);
      emailErrorMessage.textContent = isEmailValid
        ? ""
        : "올바르지 않은 이메일입니다";
      break;
    }

    case "password":
    case "password-repeat": {
      const password = form["password"].value;
      const passwordRepeat = form["password-repeat"].value;

      const isPasswordEqual = password === passwordRepeat;
      const isPasswordLengthValid =
        password.length >= PASSWORD_MIN_LEN &&
        passwordRepeat.length >= PASSWORD_MIN_LEN;
      const isPasswordValid = isPasswordEqual && isPasswordLengthValid;

      passwordField.classList.toggle("invalid", !isPasswordValid);
      const messages = [];
      if (!isPasswordEqual) {
        messages.push("비밀번호가 서로 다릅니다");
      }
      if (!isPasswordLengthValid) {
        messages.push(`비밀번호는 ${PASSWORD_MIN_LEN}자 이상으로 해 주세요`);
      }
      passwordErrorMessage.innerHTML = messages.join("<br>");
      break;
    }

    default:
      break;
  }
}
