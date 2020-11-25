const URL = "http://localhost:3030";
let regexValidation = new RegExp(/^[a-zA-Z]{3,}$/);

const addGreeting = () => {
  firstName = document.querySelector(".firstName").value;
  lastName = document.querySelector(".lastName").value;
  message = document.querySelector(".greeting").value;

  if (!regexValidation.test(firstName)) {
    document.getElementById("first-name").style.cssText +=
      "display : block !important";
  }

  if (!regexValidation.test(lastName)) {
    document.getElementById("last-name").style.cssText +=
      "display : block !important";
  }

  if (message.length < 3) {
    document.getElementById("greeting-message").style.cssText +=
      "display : block !important";
  }

  if (
    regexValidation.test(firstName) &&
    regexValidation.test(lastName) &&
    message.length >= 3
  ) {
    fetch(`${URL}/createGreeting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        message: message,
      }),
    })
      .then((result) => {
        result.json();
      })
      .catch((err) => {
        return err;
      });
    location.reload();
  }
};

const list = document.querySelector(".list-greeting");
const greetingList = document.querySelector(".display-card");

list.addEventListener("click", function () {
  getAllGreeting();
});
const getAllGreeting = () => {
  fetch(`${URL}/getAllGreeting`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    result
      .json()
      .then((data) => {
        let list = data.result.reverse();
        getList(list);
      })
      .catch((err) => {
        return err;
      });
  });
};

const getList = (data) => {
  let greeting = " ";

  data.forEach((element) => {
    let date =
      element.createdAt.split("-")[2].slice(3, 8) +
      " Time - " +
      element.createdAt.split(" - ")[0].slice(0, 10) +
      " Date";
    greeting += `<div class="card col-md-3 shadow p-3 mb-3 bg-white rounded">
    <div class="cardBody">
      <div class="objectId">${element._id}</div>
      <p class="card-text" >${element.message}<h7 class="name"> (Greeting)</h7></p>
        <div class="card-title mb-7 ">${element.firstname} ${element.lastname} <h7 class="name">(name)</h7></div> 
        <div class="date justify-content-start" data-toggle="tooltip" title="Create Time">${date} </div>

        <span class="fa fa-trash offset-xl-8 edit-delete-button" data-toggle="tooltip" title="Delete" id="DeleteCard" onclick="showMessage(this is message 1)"> </span>
        <span class="fa fa-edit offset-xl-2 edit-delete-button" title="Edit" data-toggle="modal" data-target="#editModalCenter" id="EditCard"></span> 
      </div>
    </div>
  </div>`;
  });
  greetingList.innerHTML = greeting;
};

let id = " ";
greetingList.addEventListener("click", function (e) {
  e.preventDefault();
  let editCard = e.target.id == "EditCard";
  let deleteCard = e.target.id == "DeleteCard";

  id = e.target.parentElement.children[0].textContent.split(" ")[0];

  if (editCard) {
    let first = e.target.parentElement.children[2].textContent.split(" ")[0];
    let last = e.target.parentElement.children[2].textContent.split(" ")[1];
    let message = e.target.parentElement.children[1].textContent.split(" ");

    let msg = message.length;
    let greetingMesssage = message.slice(0, msg - 1).join(" ");

    document.querySelector(".editfirstName").value = first;
    document.querySelector(".editlastName").value = last;
    document.querySelector(".editgreetingmessage").value = greetingMesssage;
  }

  if (deleteCard) {
    deleteGreetingCard();
  }
});
const deleteGreetingCard = () => {
  document.querySelector(".delete-form").style.display = "block";
};
const cancleDeleteGreetingCard = () => {
  document.querySelector(".delete-form").style.display = "none";
};

const editGreeting = () => {
  firstName = document.querySelector(".editfirstName").value;
  lastName = document.querySelector(".editlastName").value;
  message = document.querySelector(".editgreetingmessage").value;

  if (!regexValidation.test(firstName)) {
    document.getElementById("edit-first-name").style.cssText +=
      "display : block !important";
  }

  if (!regexValidation.test(lastName)) {
    document.getElementById("edit-last-name").style.cssText +=
      "display : block !important";
  }

  if (message.length < 3) {
    document.getElementById("edit-greeting-message").style.cssText +=
      "display : block !important";
  }

  if (
    regexValidation.test(firstName) &&
    regexValidation.test(lastName) &&
    message.length >= 3
  ) {
    fetch(`${URL}/updateGreeting/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        message: message,
      }),
    })
      .then((res) => {
        res.json(), alert("Successfull Edit Greeting");
      })
      .catch((err) => {
        return err;
      });
    location.reload();
  }
};

const deleteGreeting1 = () => {
  fetch(`${URL}/deleteGreeting/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      res.json();
    })
    .catch((err) => {
      return err;
    });
  location.reload();
};

const myFunction = () => {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};
//myFunction();

// const getAllGreeting1 = () => {
//   const Http = new XMLHttpRequest();

//   const url = "http://localhost:3030/getAllGreeting";
//   Http.open("GET", url);
//   Http.send();
//   Http.readyState = function (data) {
//     let list = data.result.reverse();
//     console.log(list);
//     getList(list);
//   };
//   Http.onerror = function (err) {
//     console.warn(err);
//   };
// };

const deleteGreeting = () => {
  const Http = new XMLHttpRequest();

  const url = `http://localhost:3030/deleteGreeting/${id}`;
  Http.open("DELETE", url);
  Http.send();
  location.reload();
};
