const groupsBox = document.querySelector("#groups-box");

groupsBox.textContent = "Hello";

const getGroups = async () => {
  const request = await fetch("http://localhost:5000/groups");
  const groups = await request.json();

  return groups;
};

const groups = await getGroups();

const renderGroups = (groups) => {
  groups.forEach((group) => {
    const groupBox = document.createElement("div");
    //todo: finish this function, show groups on FE
  });
};

// todo: post new group
