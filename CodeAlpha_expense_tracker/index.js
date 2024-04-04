let budget = 0.0, expense = 0.0, am = 0.0;
document.querySelector(".tot").innerHTML = "&#8377;" + 0;
const expenses = [];
const storedData = localStorage.getItem('budgetData');
if (storedData) {
  const { budget: storedBudget, expenses: storedExpenses, am: storedAm } = JSON.parse(storedData);
  budget = storedBudget;
  expenses.push(...storedExpenses);
  am = storedAm;
  updateExpenseList();
  document.querySelector(".tot").innerHTML = "&#8377;" + am.toFixed(2);
}

function up() {
  const budgetInput = document.getElementById("budget").value;
  budget = Number(budgetInput) || 0;
  updateam(budget, 0);
  saveData();
}

function upd() {
  let expens = document.getElementById("expense").value;
  expense = Number(expens) || 0;
  const tra = document.getElementById("desc").value;
  expenses.push({ description: tra, valu: expense });
  console.log(expenses);
  updateam(0, expense);
  saveData();
}

function updateam(budget, expense) {
  am += budget;
  am -= expense;
  if (am >= 0) {
    document.querySelector(".tot").innerHTML = "&#8377;" + am.toFixed(2);
    updateExpenseList();
  } else {
    am = 0;
    expenses.pop();
    document.querySelector(".tot").innerHTML = "Oh snap!! Take a loan.";
  }
  saveData();
}

function updateExpenseList() {
  const ex = document.getElementById("os");
  const heading = document.createElement("h2");
  heading.textContent = "Expenses:";
  const expenseSum = expenses.reduce((total, expense) => total + expense.valu, 0);
  ex.innerHTML = `<h2 >${heading.textContent} &#8377;${expenseSum}</h2> <ul id="expenseList"></ul>`;
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = ` <span>Expense ${index + 1}: &#8377;${expense.valu}</span> <br> <span>${expense.description}<span> <span style="float:right;"> <button onclick="editExpense(${index})"><i class="material-icons" style="font-size:20px;" >edit</i></button> <button onclick="deleteExpense(${index})"><i class="material-icons" style="color:red; font-size:20px;">delete</i></button></span>`;
    expenseList.appendChild(listItem);
  });
}

function editExpense(index) {
  const newDescription = prompt("Enter the new description for the expense:", expenses[index].description);
  const newValue = prompt("Enter the new value for the expense:", expenses[index].valu);
  if (newDescription !== null && newValue !== null) {
    const parsedValue = parseInt(newValue);
    if (!isNaN(parsedValue)) {
      updateam(expenses[index].valu, 0);
      expenses[index].description = newDescription;
      expenses[index].valu = parsedValue;
      updateExpenseList();
      updateam(0, parsedValue);
      saveData();
    } else {
      alert("Invalid input for value. Please enter a valid number.");
    }
  }
}

function deleteExpense(index) {
  updateam(expenses[index].valu, 0);
  expenses.splice(index, 1);
  updateExpenseList();
  saveData();
}

function change() {
  const descr = document.getElementById("desc");
  descr.placeholder = "";
}

function ch() {
  document.getElementById("desc").placeholder = "Description";
}

function saveData() {
  const budgetData = {
    budget,
    expenses,
    am
  };
  localStorage.setItem('budgetData', JSON.stringify(budgetData));
}
