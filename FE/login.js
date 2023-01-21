const loginForm = document.querySelector("form");

const getUserInputData = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = JSON.stringify({
    email: email,
    password: password,
  });

  return user;
};

const postUser = async (value) => {
  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: value,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        return alert("Incorrect details");
      }
      if (data) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("user_id", data.userID);

        alert("Logged in");
      }
    })
    .catch((err) => console.log(err));
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  await postUser(getUserInputData());
});
