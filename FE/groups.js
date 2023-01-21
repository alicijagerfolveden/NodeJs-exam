const getGroups = async () => {
  const request = await fetch("http://localhost:5000/groups");
  const groups = await request.json();

  return groups;
};

const groups = await getGroups();

const renderGroups = (groups) => {
  const groupsBox = document.querySelector("#groups-box");

  groups.forEach((group) => {
    const groupBox = document.createElement("div");
    const ipOfGroup = document.createElement("p");
    const nameOfGroup = document.createElement("p");

    ipOfGroup.setAttribute("id", "group-id");
    nameOfGroup.setAttribute("id", "group-name");

    ipOfGroup.textContent = `ID: ${group.id}`;
    nameOfGroup.textContent = `${group.name}`;

    groupBox.append(ipOfGroup, nameOfGroup);

    groupsBox.append(groupBox);
  });
};

renderGroups(groups);

// todo: post new group
