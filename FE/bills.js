const billsForm = document.querySelector("form");

const getUserInputData = () => {
  const amount = document.querySelector("#amount").value;
  const description = document.querySelector("#description").value;
  //   const group_id =

  const newBill = JSON.stringify({
    amount: amount,
    description: description,
  });

  return newBill;
};

billsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  console.log(getUserInputData());
});
