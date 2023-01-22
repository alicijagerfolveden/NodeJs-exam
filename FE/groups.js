const addToGroupForm = document.querySelector("form");
const token = localStorage.getItem("token");

const getGroups = async () => {
  const request = await fetch("http://localhost:5000/groups", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const groups = await request.json();

  return groups;
};

const getUsersAccounts = async () => {
  const request = await fetch("http://localhost:5000/accounts", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const groups = await request.json();

  return groups;
};

const groups = await getGroups();
const usersGroups = await getUsersAccounts();

const addGroupOption = (groups) => {
  const groupSelection = document.querySelector("#group_id");

  groups.forEach((group) => {
    const groupOption = document.createElement("option");

    groupOption.textContent = group.id;
    groupSelection.append(groupOption);
  });
};

addGroupOption(groups);

addToGroupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const group_id = document.querySelector("#group_id").value;
  const user_id = localStorage.getItem("user_id");

  if (!group_id) {
    alert("Please provide group ID");
    return;
  }
  if (!user_id) {
    alert("Please sign in");
    return;
  }

  const newAccountData = JSON.stringify({
    group_id: group_id,
    user_id: user_id,
  });

  const response = await fetch("http://localhost:5000/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: newAccountData,
  });

  if (response.ok) {
    const responseForUser = document.createElement("h4");

    responseForUser.textContent = `You were added to ${group_id} group`;

    addToGroupForm.append(responseForUser);
  }
});

const renderGroups = (groups) => {
  const groupsBox = document.querySelector("#groups-box");

  groups.forEach((group) => {
    const linkToGroup = document.createElement("a");
    const groupBox = document.createElement("div");
    const idOfBroup = document.createElement("p");
    const nameOfGroup = document.createElement("p");

    linkToGroup.setAttribute("href", `./bills.html?group_id=${group.id}`);
    idOfBroup.setAttribute("id", "group-id");
    nameOfGroup.setAttribute("id", "group-name");

    idOfBroup.textContent = `ID: ${group.id}`;
    nameOfGroup.textContent = `${group.name}`;

    groupBox.append(idOfBroup, nameOfGroup);

    linkToGroup.append(groupBox);

    groupsBox.append(linkToGroup);
  });
};

renderGroups(usersGroups);
