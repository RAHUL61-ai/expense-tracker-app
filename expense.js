
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name}</span>
            <span>$${expense.amount}</span>
            <div class="btn-group">
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });

    
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function addExpense() {
    const name = document.getElementById('expenseName').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value.trim());

    if (name === '' || isNaN(amount)) {
        alert('Please enter valid data.');
        return;
    }

    expenses.push({ name, amount });
    renderExpenses();
    clearFields();
}

function editExpense(index) {
    const newName = prompt('Enter new name:');
    const newAmount = parseFloat(prompt('Enter new amount:'));

    if (newName !== null && newAmount !== null) {
        if (newName !== '' && !isNaN(newAmount)) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            renderExpenses();
        } else {
            alert('Please enter valid data.');
        }
    }
}

function deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses.splice(index, 1);
        renderExpenses();
    }
}

function clearFields() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
}


renderExpenses();
