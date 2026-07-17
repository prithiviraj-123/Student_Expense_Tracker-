let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    if (description === "" || amount === "") {
        alert("Please enter all details");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: Number(amount),
        type: type,
        date: new Date().toLocaleDateString()
    };

    transactions.push(transaction);

    saveTransactions();
    displayTransactions();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}


// Display Transactions
function displayTransactions() {

    const list = document.getElementById("transaction-list");

    list.innerHTML = "";

    transactions.forEach(transaction => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <br>
                <small>${transaction.date}</small>
            </div>

            <div>
                <span class="${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}
                </span>

                <button onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    updateBalance();
}


// Update Balance
function updateBalance() {

    let income = 0;
    let expense = 0;


    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        }
        else {
            expense += transaction.amount;
        }

    });


    const balance = income - expense;


    document.getElementById("balance").innerText =
        "₹" + balance;


    document.getElementById("income").innerText =
        "₹" + income;


    document.getElementById("expense").innerText =
        "₹" + expense;
}



// Delete Transaction
function deleteTransaction(id) {

    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    saveTransactions();
    displayTransactions();
}



// Search Transaction
function searchTransaction() {

    const search =
        document.getElementById("search").value.toLowerCase();


    const list =
        document.getElementById("transaction-list");


    list.innerHTML = "";


    transactions
    .filter(transaction =>
        transaction.description
        .toLowerCase()
        .includes(search)
    )
    .forEach(transaction => {


        const li = document.createElement("li");


        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <br>
                <small>${transaction.date}</small>
            </div>

            <div>
                <span class="${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}
                </span>

                <button onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </div>
        `;


        list.appendChild(li);

    });

}



// Filter Category
function filterTransactions() {

    const filter =
        document.getElementById("filter").value;


    const list =
        document.getElementById("transaction-list");


    list.innerHTML = "";


    transactions
    .filter(transaction => {

        if(filter === "all") {
            return true;
        }

        return transaction.type === filter;

    })
    .forEach(transaction => {


        const li = document.createElement("li");


        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <br>
                <small>${transaction.date}</small>
            </div>

            <div>
                <span class="${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"} ₹${transaction.amount}
                </span>

                <button onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </div>
        `;


        list.appendChild(li);

    });

}



// Save Data
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}



// Load Data When Page Opens
displayTransactions();
