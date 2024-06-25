document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("transaction-form");
  const transactionsList = document.getElementById("transactions-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;

    const transaction = {
      type,
      amount,
      description,
    };

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const newTransaction = await res.json();
      addTransactionToList(newTransaction);
      form.reset();
    } catch (err) {
      console.error("Error:", err);
    }
  });

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();
      transactions.forEach(addTransactionToList);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  function addTransactionToList(transaction) {
    const li = document.createElement("li");
    li.classList.add(transaction.type);
    li.innerHTML = `
      ${transaction.description || "No description"} - $${transaction.amount}
      <button data-id="${transaction._id}">Delete</button>
    `;
    transactionsList.appendChild(li);

    li.querySelector("button").addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      try {
        await fetch(`/api/transactions/${id}`, {
          method: "DELETE",
        });
        li.remove();
      } catch (err) {
        console.error("Error:", err);
      }
    });
  }

  fetchTransactions();
});
