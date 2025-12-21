---
title: "Getting Comfortable with JavaScript Promises"
author: "Hafi"
publish_date: 2025-11-19
category: "JavaScript"
tags: ["javascript", "promise"]
description: "A personal walkthrough of how JavaScript Promises work—covering states, handling patterns, combinators, and async/await—as part of my ongoing learning journey."
image: "/images/promise-js.webp"
imageAlt: "JavaScript Promise with Resolve and Reject State"
draft: false
featured: false
---

This article is part of my personal learning journey. I’m writing it to help solidify my own understanding of JavaScript Promises—not to present myself as an expert or to provide an authoritative guide. If you find it helpful, that’s a bonus, but the main purpose is simply to document what I’ve learned.

---

## Why Promises Matter in Modern JavaScript
JavaScript—especially in the browser—runs on **a single thread**. This means it processes code one line at a time, waiting for each line to finish before moving on to the next. While this synchronous behavior is simple to reason about, it becomes a problem when a task takes too long. A long-running synchronous function can completely freeze the page: the UI stops responding, inputs don’t register, and the user is essentially locked out until the operation completes. Because the browser only has one main thread, it cannot do anything else while it’s stuck waiting.

Before Promises existed, JavaScript developers relied heavily on callbacks to manage asynchronous behavior. Callbacks worked, but they came with their own set of problems. When an operation required multiple async steps, each step needed its own callback—and each callback often contained another callback. This created a deeply nested structure commonly known as **callback hell** or the **pyramid of doom**. Besides being difficult to read and reason about, nested callbacks made error handling messy, requiring you to deal with failures at multiple levels rather than in one central place.

Promises were introduced to solve these challenges. They provide a cleaner, more structured way to handle asynchronous operations, avoid deeply nested code, and centralize error handling. Modern JavaScript APIs are built around Promises for exactly these reasons, making them a fundamental part of writing responsive and maintainable JavaScript today.

---

## How Promises Work: Understanding the States
**Promises are the foundation of modern asynchronous programming in JavaScript**. When you call an asynchronous function, it doesn’t return the final value right away. Instead, it returns a *Promise*—an object that acts as a placeholder for a value that will be available in the future. This promise gives you a structured way to react when the operation eventually succeeds or fails.

A Promise can exist in one of three distinct states:
- ### **Pending**
This is the initial state. The asynchronous operation has started, but it hasn’t completed yet. For example, when making an AJAX request, the Promise remains pending while the browser waits for a response from the server.

- ### **Fulfilled**
The operation completed successfully, and the Promise now holds the resulting value. When this happens, any function attached through `.then()` will be executed.

- ### **Rejected**
The operation failed—perhaps due to a network error, a 404 response, or any other issue. In this state, the Promise triggers any `.catch()` handlers attached to it.

A key idea is that once a Promise moves from pending to either fulfilled or rejected, its state becomes final and cannot change again. This predictable lifecycle is what makes Promises easier to reason about compared to traditional callbacks.

---

## Handling Promises: `.then`, `.catch`, `.finally`
Once a Promise moves out of the pending state, we can react to its result using three essential methods: `.then()`, `.catch()`, and `.finally()`. These methods allow us to compose asynchronous operations in a readable, structured way.

- ### `.then()`

The `.then()` method is used to handle the fulfilled state of a Promise. It accepts up to two arguments:

1. a function that runs when the Promise is fulfilled, and
2. an optional function that runs if the Promise is rejected.
Importantly, `.then()` always returns a new Promise, which makes method chaining possible and helps avoid nested callback structures.

- ### `.catch()`

The `.catch()` method handles the rejected state. It's essentially a shortcut for `.then(undefined, onRejected)`, making error-handling cleaner and more expressive. Like `.then()`, it also returns a new Promise, allowing the chain to continue even after an error occurs.

- ### `.finally()`

The `.finally()` method runs once the Promise is settled—regardless of whether it was fulfilled or rejected. This is useful for cleanup tasks such as stopping a loading indicator or closing a modal. The value returned by the Promise remains unchanged after `.finally()` runs.

Below is a simple example that demonstrates how these methods work together in a Promise chain:

```javascript
function checkMail() {
  return new Promise((resolve, reject) => {
    // The Promise executor function runs synchronously
    // This runs immediately when checkMail() is called, before the setTimeout
    console.log("I am running synchronously");

    // Simulate async operation (network request, file read, etc.) with 1 second delay
    setTimeout(() => {
      if (Math.random() > 0.5) {
         // The promise enters the fulfilled state with this value
        resolve("Mail has arrived");
      } else {
        // The promise enters the rejected state with this error
        reject(new Error("Failed to arrive"));
      }
    }, 1000)
  });
}

checkMail()
  // Handle the fulfilled value
  .then((mail) => {
    return `Process ${mail}`;
  })
  // Handle the returned value from the previous .then()
  .then((step1) => {
    console.log(`Complete ${step1}`);
    return step1; // Allow further chaining if needed
  })
  // Handle any error that occurs in the chain
  .catch((err) => {
    console.error(err);
  })
  // Runs regardless of fulfilled or rejected
  .finally(() => {
    console.log("Experiment completed");
  });
```

---

## Promise Combinators: `all`, `race`, `allSettled`, `any`

In many real-world scenarios, we need to work with more than one asynchronous operation at the same time. JavaScript provides a set of Promise combinators that help coordinate multiple Promises and determine how the final result should be produced. These combinators offer different behaviors depending on whether you want to wait for *all* tasks, the *first* task, or just want to inspect every outcome.

Here are the four primary combinators you’ll use in modern JavaScript:

---

1. `Promise.all()` — **Wait for everything**

`Promise.all()` takes multiple Promises and returns a new Promise that fulfills **only when all** input Promises are fulfilled. If any one of them rejects, the whole operation fails immediately with that rejection reason.

This is useful when **every async operation must succeed** before you can move on—for example, loading multiple resources or performing batch database calls.

---

2. `Promise.race()` — **Settle as soon as one settles**

`Promise.race()` returns a Promise that settles (fulfilled or rejected) as soon as **the first** input Promise settles. It doesn’t wait for the rest.

This is helpful when you care about the **fastest response**—for example, implementing request timeouts or choosing the quickest server endpoint.

---

3. `Promise.allSettled()` — **Wait for everything, regardless of success**

`Promise.allSettled()` waits until **all** Promises have settled, but unlike `Promise.all()`, it *never rejects*.
Instead, it resolves with an array describing each Promise’s outcome (`fulfilled` or `rejected`).

Use this when you want **complete results** from multiple operations without failing the entire batch—for example, logging all outcomes or gathering partial data.

---

4. `Promise.any()` — **Succeed as soon as one succeeds**

`Promise.any()` fulfills when **the first Promise fulfills**, ignoring rejections. It only rejects if every input Promise rejects, in which case it throws an AggregateError.

This is great for scenarios where **any successful result is acceptable**, such as attempting multiple fallback API calls and using whichever succeeds first.

---

## Async / Await (The Modern Way)
While Promises provide a cleaner alternative to callback-based asynchronous code, JavaScript offers an even more intuitive way to work with Promises: **async/await**. By adding the `async` keyword in front of a function, JavaScript automatically wraps its return value in a Promise. Inside an `async` function, you can use the `await` keyword to pause execution until a Promise settles. If the Promise is fulfilled, `await` returns its value; if it’s rejected, the error is thrown and can be caught using `try...catch`.

The biggest advantage of async/await is readability. It allows you to write asynchronous code that looks and behaves much more like synchronous code, without long chains of `.then()` calls. This makes logic flow clearer and debugging easier.

However, it's important to remember that `await` pauses execution inside the async function, meaning each awaited operation runs **in series**. When operations are independent of each other, using `Promise.all()` is often faster because it runs them in parallel.

Below is an example comparing async/await usage with the Promise-based version shown earlier:

```javascript
function checkMail() {
  return new Promise((resolve, reject) => {
    // The Promise executor function runs synchronously
    // This runs immediately when checkMail() is called, before the setTimeout
    console.log("I am synchronously")
    
    // Simulate async operation (network request, file read, etc.) with 1 second delay
    setTimeout(() => {
      if (Math.random() > 0.5) {
        // The promise enters the fulfilled state with this value
        resolve("Mail has arrived");
      } else {
        // The promise enters the rejected state with this error
        reject(new Error("Failed to arrive"));
      }  
    }, 1000)    
  });
}

async function processMail() {
  try {
    // Handle the fulfilled value
    const mail = await checkMail();
    console.log(`Complete Process ${mail}`);    
  } catch (err) {
    // Handle any error that occurs in the chain
    console.error(err);
  } finally {
    // Runs regardless of fulfilled or rejected
    console.log("Experiment completed");
  }
}

processMail();
```

---

## Final Thought
As a beginner, I believe it’s important to deepen our understanding of Promises because they form the foundation of asynchronous programming. And since modern JavaScript frameworks rely heavily on async patterns, getting comfortable with Promises early makes the learning journey much smoother.