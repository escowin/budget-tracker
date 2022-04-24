let db;

const request = indexedDB.open('budget-tracker', 1);

// request | ties upgrade to database 
request.onupgradeneeded = function (event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', { autoIncrement: true });
};

// request | succesful requests save references to global db (js:1)
request.onsuccess = function (event) {
    db = event.target.result;
    if (navigator.online) {
        uploadBudget();
    }
};

// request | error c.log(...error code)
request.onerror = function (event) {
    console.log(event.target.errorCode);
};


// function | save record
function saveRecord(record) {
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const newObjectStore = transaction.objectStore('new_budget');
    newObjectStore.add(record);
};

// function | upload transaction
function uploadTransaction() {
    const transaction = db.transaction(["new_transaction"], "readwrite");
    const transactionObjectStore = transaction.objectStore("new_transaction");
    const getAll = transactionObjectStore.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
          fetch("/api/transaction", {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((serverResponse) => {
              if (serverResponse.message) {
                throw new Error(serverResponse);
              }

              const transaction = db.transaction(["new_transaction"], "readwrite");
              const transactionObjectStore = transaction.objectStore("new_transaction");
              transactionObjectStore.clear();

              alert("all transactions submitted");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };
    }

window.addEventListener('online', uploadTransaction); 