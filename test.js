import "util";

// below function is synchrous
// This process is synchronous because:
// The Array constructor, fill, and map functions are all synchronous JavaScript functions.
// Each iteration of the map function occurs sequentially and does not involve any asynchronous operations like Promises, callbacks, or async/await.
// Therefore, the function executes synchronously, logging each index to the console one by one.

new Array(1000 * 20).fill(0).map((_, i) => {
  console.log(i);
});

// Below 3 things may indicate it's asynchronous operation
// 1. interacting with the network
// 2. timing function, e.g. set timeOut, set interval
// 3. interacting with storage, e.g: file system, database

/**
 * Callbacks
 * Callbacks are a traditional way of handling asynchronous code in Node.js. A callback function is passed as an argument to a function that performs an asynchronous operation. When the operation is complete, the callback function is executed.
 */
fs.readFile("file.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

/**
 * Promises
 * Promises provide a cleaner way of handling asynchronous code in Node.js. Promises represent a value that may not be available yet and allow you to chain multiple asynchronous operations together.
 */
const fs = require("fs/promises");

fs.readFile("file.txt").then((data) => {
  console.log(data);
});
then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err);
});

/**
 * ## Async/Await

Async/await is a newer way of handling asynchronous code in Node.js. It provides a more readable and concise way of writing asynchronous code by using the `async` and `await` keywords.
 */
const fs = require("fs/promises");

async function readFile() {
  try {
    const data = await fs.readFile("file.txt");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
