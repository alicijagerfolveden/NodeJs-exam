const registerForm = document.querySelector("form");

const getUserInputData = () => {
  const full_name = document.querySelector("#full-name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const repeatPassword = document.querySelector("#repeat-password").value;

  if (password !== repeatPassword) {
    alert("Please repeat similar password");
    return;
  }

  const newUser = JSON.stringify({
    full_name: full_name,
    email: email,
    password: password,
  });

  return newUser;
};

const postNewUser = async (value) => {
  const response = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: value,
  });

  if (response.ok) {
    const responseForUser = document.createElement("h4");

    responseForUser.textContent = "New user successfully created";

    registerForm.append(responseForUser);
  }
};

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  await postNewUser(getUserInputData());
});
