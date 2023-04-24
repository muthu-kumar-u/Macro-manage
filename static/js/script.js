const Form = document.getElementById("form");
const Form2 = document.getElementById("Form2");
const username = document.getElementById("name");
const Email = document.getElementById("email");
const T_Event = document.getElementById("t-Event");
const Num = document.getElementById("number");
const Attend = document.getElementById("attend");
const date_event = document.getElementById("date");
const Email2 = document.getElementById("email_subscribe");

function checkRequired(inputs) {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      error(input, `${getName(input)} field is required`);
    } else {
      success(input);
    }
  });
}

function error(input, message) {
  const parentOfInput = input.parentElement;
  parentOfInput.classList = "error";
  const p = parentOfInput.querySelector("p");
  p.innerHTML = message;
}

function success(input) {
  const parentOfInput = input.parentElement;
  parentOfInput.classList = "success";
  const p = parentOfInput.querySelector("p");
  p.innerHTML = " ";
}

function getName(input) {
  return input.getAttribute("data-name");
}

const checkLength = (input, min) => {
  const data = input.value.trim().length;
  if (input.value === "") {
    error(input, `${getName(input)} field is mandatory`);
  } else {
    if (data < min) {
      error(input, `${getName(input)} must be atleast ${min} letters`);
    } else {
      success(input);
      return true;
    }
  }
};

String.prototype.isEmail = function () {
  return !this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
};

const checkEmail = (e) => {
  if (e.value === "") {
    error(e, `${getName(e)} field is mandatory`);
  } else {
    if (!!e.value.trim().isEmail()) {
      error(e, "This is not an valid email address");
    } else {
      success(e);
      return true;
    }
  }
};

const isNumber = (e) => {
  let pattern = /^[6789]\d{9}$/;
  return pattern.test(e);
};

const validNumber = (e, letter) => {
  const numberValid = e.value;
  const numberCount = e.value.length;

  if (numberValid === "") {
    error(e, `${getName(e)} field is mandatory`);
  } else {
    if ((numberCount > letter) | (numberCount < letter)) {
      error(
        e,
        `only numbers can be acceptable and length should be  ${letter}`
      );
    } else if (!isNumber(numberValid)) {
      error(e, "Please provide a valid number");
    } else {
      success(e);
      return true;
    }
  }
};

const isvalid_attnd = (e) => {
  let pattern = /^[0-9]*$/;
  return pattern.test(e);
};

const attendValid = (O, maxCount_A) => {
  var n_Attend = O.value;
  if (n_Attend === "") {
    error(O, `${getName(O)} field is mandotory`);
  } else {
    if (isvalid_attnd(n_Attend)) {
      success(O);
      if (n_Attend > maxCount_A) {
        error(O, `the limit should be less than ${maxCount_A}`);
      } else {
        success(O);
      }
    } else {
      error(O, "only numbers should be acceptable");
    }
  }
  return true;
};

function handleEnter(event) {
  if (event.key === "Enter") {
    const form = document.getElementById("form");
    const index = [...form].indexOf(event.target);
    form.elements[index + 1].focus();
  }
}

const valid_date = (date_1) => {
  const today = new Date();
  const date_pattern = /^\d{4}-\d{2}-\d{2}$/;
  const selected_date = new Date(date_1.value);

  if (!date_pattern.test(date_event.value)) {
    error(date_1, "Please provide date as (DD-MM-YYYY) format");
    return false;
  } else {
    if (selected_date <= today) {
      error(date_1, "Please provide a valid date");
      return false;
    } else {
      success(date_1);
      return true;
    }
  }
};

Form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired[(username, Email, Num, T_Event, Attend, date_event)];
  checkLength(username, 5);
  checkLength(T_Event, 7);
  checkEmail(Email);
  validNumber(Num, 10);
  attendValid(Attend, 1000);
  valid_date(date_event);

  if (
    checkLength(username, 5) &&
    checkLength(T_Event, 7) &&
    checkEmail(Email) &&
    validNumber(Num, 10) &&
    attendValid(Attend, 1000) &&
    valid_date(date_event)
  ) {
    const formData = new FormData(Form);
    fetch("http://127.0.0.1:8000/signup/booking/", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network is not ok");
        }
        return res.json();
      })
      .then((data) => {
        let data1 = data;
        console.log("Success", data);
        let interval = setTimeout(callback_f(data1), 2000);
        clearInterval(interval);
        function callback_f(e) {
          var success = document.getElementById("success");
          success.classList = "alert alert-success";
          success.innerHTML = e.message;
          setTimeout(() => {
            success.classList.remove("alert");
            success.classList.remove("alert-success");
            success.innerHTML = "";
          }, 5000);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    Form.reset();
  }
});

Form2.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([Email2]);
  checkEmail(Email2);
  if(checkEmail(Email2)){
    console.log("Successfully registered")
    Form2.reset();
  }
});
