const billsForm = document.querySelector("form");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const group_id = +urlParams.get("group_id");
const token = localStorage.getItem("token");

const getGroupName = async () => {
  const request = await fetch("http://localhost:5000/groups", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const groups = await request.json();

  const group = groups[group_id - 1];

  const groupName = group.name;

  return groupName;
};

const changeGroupsName = async () => {
  const groupName = await getGroupName();

  const nameElement = document.querySelector("h3");
  nameElement.textContent = `${groupName}'s bills`;
};

changeGroupsName();

const groupName = await getGroupName();

const nameElement = document.querySelector("h3");
nameElement.textContent = `${groupName}'s bills`;

const getBills = async () => {
  const request = await fetch(`http://localhost:5000/bills/${group_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const bills = await request.json();

  return bills;
};

const createElementWithParams = (tagName, params) => {
  const element = document.createElement(tagName);

  Object.assign(element, params);

  return element;
};

const getTableDataElement = (text) => {
  const tdElement = createElementWithParams("td", { textContent: text });

  return tdElement;
};

const populateTable = (bills, tbodyElement) => {
  bills.forEach((bill) => {
    addRow(bill, tbodyElement);
  });
};

const addRow = (bill, tbodyElement) => {
  const rowElement = document.createElement("tr");

  const { id, description, amount } = bill;

  const amountOfBill = `$${amount}`;

  const idElement = getTableDataElement(id);
  const descriptionElement = getTableDataElement(description);
  const amountElement = getTableDataElement(amountOfBill);

  rowElement.append(idElement, descriptionElement, amountElement);

  tbodyElement.append(rowElement);
};

const renderBills = (bills) => {
  const billsBox = document.querySelector("#bills-box");
  const tableElement = document.createElement("table");
  const theadElement = document.createElement("thead");
  const tbodyElement = document.createElement("tbody");
  const idHeader = createElementWithParams("th", { innerText: "ID" });
  const descriptionHeader = createElementWithParams("th", {
    innerText: "Description",
  });
  const amountHeader = createElementWithParams("th", { innerText: "Amount" });

  theadElement.append(idHeader, descriptionHeader, amountHeader);

  populateTable(bills, tbodyElement);

  tableElement.append(theadElement, tbodyElement);

  billsBox.append(tableElement);
};

const bills = await getBills();

renderBills(bills);

const getUserInputData = () => {
  const amount = document.querySelector("#amount").value;
  const description = document.querySelector("#description").value;

  const newBill = JSON.stringify({
    group_id: group_id,
    amount: amount,
    description: description,
  });

  return newBill;
};

const postNewBill = async (value) => {
  const response = await fetch(`http://localhost:5000/bills/${group_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
    },
    body: value,
  });

  if (response.ok) {
    const responseForUser = document.createElement("h4");

    responseForUser.textContent = "New user successfully created";

    billsForm.append(responseForUser);
  }
};

billsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  await postNewBill(getUserInputData());
});
