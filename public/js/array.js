"use strict";

// Demo Account for Practice
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %;
  pin: 1111,
  movementsDate: [
    "2024-11-18T21:31:17.178Z",
    "2025-02-15T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-07-26T17:01:17.194Z",
    "2024-07-28T23:36:17.929Z",
    "2024-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDate: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

// const accounts = [account1, account2];
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDate: [
    "2024-11-18T21:31:17.178Z",
    "2025-02-15T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-07-26T17:01:17.194Z",
    "2024-07-28T23:36:17.929Z",
    "2024-08-01T10:51:36.790Z",
  ],
  currency: 'BDT',
  locale: 'bn-BD',
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// All necessary Elemnt select

const labelWelcome = document.getElementById("welcome-msg");
const app = document.getElementById("app");
const containerMovements = document.getElementById("movements");
const date = document.getElementById("date");
const currentBalace = document.getElementById("Current-balance");

const LabelSummaryIn = document.getElementById("summary-in");
const LabelSummaryOut = document.getElementById("summary-out");
const LabelSummaryInterest = document.getElementById("summary-inrest");

const inputLoginUsername = document.getElementById("login-username");
const inputLoginPIN = document.getElementById("login-pin");
const inputTransferTo = document.getElementById("transfer-to");
const inputTransferAmount = document.getElementById("transfer-amount");
const inputLoanAmount = document.getElementById("loan-amount");
const inputCloseUsername = document.getElementById("input-close-username");
const inputClosePIN = document.getElementById("input-close-pin");

const loginBtn = document.getElementById("login-btn");
const transferBtn = document.getElementById("transfer-btn");
const loanBtn = document.getElementById("loan-btn");
const closeBtn = document.getElementById("close-btn");
const sortBtn = document.getElementById("sort-btn");

const loggedOut = document.querySelector('#logout-timer');

//* format movements date funciton
const movementsDateFormat = (date, locale) => {
  const calcDaysPast = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));
  const dayPast = calcDaysPast(new Date(), date);

  if (dayPast === 0) return "Today";
  if (dayPast === 1) return "Yesterday";
  if (dayPast <= 7) return `${dayPast} days ago`;

  // const year = date.getFullYear();
  // const month = `${date.getMonth()}`.padStart(2, 0);
  // const days = `${date.getDate()}`.padStart(2, 0);
  // const displayDate = `${year}/${month}/${days}`;
  // return displayDate;
  return new Intl.DateTimeFormat(locale).format(date);
};
// * Format currency function ==========
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// movment show function;
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "bg-greenBg" : "bg-redBg";
    const movType = mov > 0 ? "DEPOSIT" : "WITHDRAWAL";

    //* common tecnics to loop over 2 arrays at the same time ;
    const displayDate = movementsDateFormat(
      new Date(acc.movementsDate[i]),
      acc.locale
    );

    // const formateMov = new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(mov)

    const html = `
         <div class="flex py-5 px-10 items-center border-b ">
                <p class="text-xs py-[5px] px-2 ${type}  text-white rounded-lg mr-5">${
      i + 1
    } ${movType}</p>
                <P class="text-xs text-[#666666]">${displayDate}</P>
                <p class="mov-balance ml-auto text-base text-primaryTextClr">${formatCur(
                  mov,
                  acc.locale,
                  acc.currency
                )}</p>
         </div>
         `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// show current balnce ;
const displayBalance = function (acc) {
  acc.totalBalance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  currentBalace.textContent = formatCur(
    acc.totalBalance,
    acc.locale,
    acc.currency
  );
};

// * Create username function=========
const createUserName = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUserName(accounts);

// *======= Calc Display summary =============
const calcDisplaySummary = function (acc) {
  const summaryIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  const summaryOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  LabelSummaryIn.textContent = formatCur(summaryIn, acc.locale, acc.currency);
  LabelSummaryOut.textContent = formatCur(summaryOut, acc.locale, acc.currency);
  LabelSummaryInterest.textContent = formatCur(
    interest,
    acc.locale,
    acc.currency
  );
};

const updateUI = function (acc) {
  displayMovements(acc);
  displayBalance(acc);
  calcDisplaySummary(acc);
};

//* Logged out timer ============
const loggedOutTimer = function(){
  const tick = ()=>{
    const min = String(Math.floor(time / 60)).padStart(2,0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaing time to UI
    loggedOut.textContent = `${min}:${sec}`;
    //decrese 1 second; 
    
    if(time < 0){
      app.classList.remove("!grid")
      clearInterval(timer);
    }
    // when seconds 0, stop timer and log out user;
    time--;
  }

  // set time to 5 minute;
  let time = 300;

  // call the timer every second
const timer = setInterval(tick, 1000)
  return timer;
}
// loggedOutTimer() 
// *= Implementing Login=============
let currentAccount, timer;
// currentAccount = account1;
// updateUI(currentAccount);
// app.classList.add("!grid")

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // * Find the current user based on username
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPIN.value) {
    //* Welcome message
    const welcomeMsg = currentAccount?.owner.split(" ")[0];
    labelWelcome.textContent = `Wlcome back ${welcomeMsg}`;
    // add current date
    // Internationalizing dates ;
    const now = new Date();
    // date.textContent = Intl.DateTimeFormat('bn-BD').format(now)
    // date.textContent = Intl.DateTimeFormat('ar-SY').format(now)
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long",
    };
    // const locale = navigator.language;
    date.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Timer
    clearInterval(timer);
    timer =  loggedOutTimer();
    // update ui
    updateUI(currentAccount);

    app.classList.add("!grid");
  }
  inputLoginUsername.value = "";
  inputLoginPIN.value = "";
});

// * Transfer function =============
transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  const amount = +inputTransferAmount.value;

  if (
    receiverAcc &&
    amount > 0 &&
    currentAccount.totalBalance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // transection date;
    currentAccount.movementsDate.push(new Date().toISOString());
    // add nagative to current account
    currentAccount.movements.push(-amount);
    // add positive to transfer account
    receiverAcc.movements.push(amount);

    clearInterval(timer);
    timer = loggedOutTimer();

    // update the ui
    updateUI(currentAccount);
  }
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
});

// * Clsoe account
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount?.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePIN.value
  ) {
    // Delete accounts
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);

    app.classList.remove("!grid");
  }
  inputCloseUsername.value = "";
  inputClosePIN.value = "";
});

// Loan functionality ===================
loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((depsoit) => depsoit >= loanAmount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movementsDate.push(new Date().toISOString());
      currentAccount.movements.push(loanAmount);
      updateUI(currentAccount);
    }, 5000);

    clearInterval(timer);
    timer = loggedOutTimer();
  }

  inputLoanAmount.value = "";
});

// sort function;
let sorted = false;
sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//*==============Uses of Array from method===========
currentBalace.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".mov-balance"),
    (el) => +el.textContent.replace("€", "")
  );
  console.log(movementsUI);
  const movementsUI2 = [...document.querySelectorAll(".mov-balance")].map(
    (el) => +el.textContent.replace("€", "")
  );
  console.log(movementsUI2);
});

//*=================================================
("use strict");
//Bankist app

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// ✔ In JavaScript, all numbers are stored as 64-bit floating-point numbers (IEEE 754 format).
// ✔ 23 and 23.0 are both stored in the same way (23.0 has no extra decimal precision).
// console.log(23 === 23.0); // ✅ true (Both are stored as 23 in memory

// console.log(23 === 23.0);

// JavaScript uses binary floating-point arithmetic (IEEE 754).
// ✔ Some decimal fractions cannot be represented exactly in binary.
// ✔ 0.1 and 0.2 are repeating binary fractions, causing small rounding errors.
// console.log(0.1 + 0.2);

//  Base 10 - 0 to 9;
// binary base 2 - 0 1;

// // convert string to number
// console.log(Number('23'))
// // another way to convert string to number
// // when javascript see a plus operator it will do type coertion
// console.log(+'23');
// console.log(+"st");
// // we can use the plus operator for convert string to number like Number(user.value) instead +user.value;

// parsing
// javascript automaticly try to figure out the number that in this string /note\ But must string start with a number not any symbol
// Ignores non-numeric characters after the number.
// only take integer part of number like 10.9 to just 10;
// console.log(Number.parseInt('30px', 10))
// // wrong
// console.log(Number.parseInt('n23'))

// ✔ Converts strings into floating-point numbers.
// ✔ Works like parseInt() but keeps decimals.
// console.log(Number.parseFloat('2.5rem'));
// console.log(Number.parseFloat('2.5rem'));

// console.log(Number.isInteger(20))
// console.log(Number.isInteger(20.2)) // false

// //* Important for Interview====================
// console.log(Number('')); // 0
// console.log(Number(null)); // 0
// console.log(Number(undefined)) // NaN
// console.log(+true);    // ✅ 1
// console.log(+false);   // ✅ 0

// isNaN() (Not Recommended Alone)
// ✔ Checks if a value is NaN (Not a Number).
// ❌ Problem: isNaN() converts non-numeric values to numbers before checking.
// console.log(isNaN("hello"));  // ✅ true (not a number)
// console.log(isNaN("100"));    // ❌ false (because "100" is converted to 100)
// console.log(isNaN("10px"));   // ✅ true (invalid number)
// console.log(isNaN(10));       // ❌ false (valid number)

// 🔹 Number.isNaN() (Recommended)
// ✔ Does not convert values before checking.
// ✔ Returns true only if the value is exactly NaN.
// console.log(Number.isNaN("hello"));  // ✅ false (not NaN, just a string)
// console.log(Number.isNaN(NaN));      // ✅ true (only NaN returns true)
// console.log(Number.isNaN(100));      // ✅ false (valid number)
// console.log(Number.isNaN("10px"));   // ✅ false

// isFinite() (Check for Real Numbers)
// ✔ Checks if a value is a real number (not Infinity or NaN).
// ✔ Converts values before checking.
// console.log(isFinite(100));        // ✅ true
// console.log(isFinite("100"));      // ✅ true (converted to number)
// console.log(isFinite("hello"));    // ❌ false (NaN)
// console.log(isFinite(Infinity));   // ❌ false
// console.log(isFinite(-Infinity));  // ❌ false

// 🔹 Number.isFinite() (Stricter, No Type Conversion)
// ✔ Does not convert values before checking.

// Number.isInteger(value) (Best Method)
// ✔ Checks if a value is an integer.
// ✔ Returns true only for actual integers.
// ✔ Does not convert values before checking.
// console.log(Number.isInteger(10));     // ✅ true
// console.log(Number.isInteger(10.5));   // ❌ false
// console.log(Number.isInteger("10"));   // ❌ false (string)
// console.log(Number.isInteger(NaN));    // ❌ false
// console.log(Number.isInteger(Infinity)); // ❌ false
// console.log(Number.isInteger(0));      // ✅ true

// * =================== Math and rounding ==============
// console.log(Math.sqrt(36));
// console.log(25 ** (1/ 2));

// console.log(Math.max(5, 12, 10, 20, 30));
// console.log(Math.max(5, 18, '23', 11, 2)); // 23
// console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

// console.log(Math.min(4, 1, 5, 10, 15));
// console.log(Math.PI * 4);

// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//  0...1 --> 0...(max - min) -> min...(max - min + min);
// console.log(randomInt(10, 20));

//*Rounding integers

// Removes the decimal part and keeps only the integer part.
// console.log(Math.trunc(23.6)); // 23
// Round to the Nearest Integer
// console.log(Math.round(23.6)) //
// Rounds a number up to the nearest integer.
// console.log(Math.ceil(4.3))
// Rounds a number down to the nearest integer.
// console.log(Math.floor(2.3))
// Returns the positive value of a number.
// console.log(Math.abs(-10));
// Raises a number to power of another
// console.log(Math.pow(2, 3));/
// Returns the square root of a number.
// console.log(Math.sqrt(25));

// Rounded decimals
// toFixed alawys return string
// console.log((2.7).toFixed(3))
// console.log(+(2.23545 ).toFixed(2))

//*=============Numeric separator ========;
// const diameter = 287_460_000000;
// console.log(diameter)
//
// const priceInCents = 345_99;
// console.log(priceInCents)

// If we try to convert a string number to number which contains the underscore _ It will give us NaN;
// console.log(Number('23000000'))
// console.log(Number('2300_0000'));
// here we do no get NaN
// console.log(parseInt('230_00'))

//*====================== Bigint =============
// console.log(Number.MAX_SAFE_INTEGER)
// console.log(2 ** 52 -1);
// console.log(2 ** 52 +1);

// // bigint stands for BigIntegers;
// console.log(5646546548646546541564954898654156464n);
// console.log(BigInt(46465431564145614654651n));

// // operation
// console.log(100000n + 100000n);

// console.log(4564651348951465452616546513241594n * 564516534651n);

// const huge = 556465466321654654665n;
// const num = 23n;
// console.log(huge * num);
// console.log(typeof huge);

// console.log(20n > 15); // true;
// console.log(20n === 20); // false
// console.log(20n == 20) // true;

// console.log(11n / 3n); // 3 becuse it cut the decimal part

//*======= Create a date =================
// const now = new Date();
// console.log(now);

// console.log(new Date('Feb 17 2025 11:06:01'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date(account1.movementsDate[0]))

// // Month in javascript is 0 based;
// console.log(new Date(2025, 10, 19, 15, 23, 5))

// console.log(new Date(2037, 9, 10));

// console.log(new Date(0));

// console.log(new Date(3 * 24 * 60 * 60 * 1000))

//* working with dates
// const future = new Date(2025, 10, 19, 15, 23);
// console.log(future.getFullYear());
// // month is 0 based
// console.log(future.getMonth());
// console.log(future.getDate());
// // get day of the week
// console.log(future.getDay());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());

// console.log(future.getTime());

// console.log(Date.now());
// future.setFullYear(2040);
// console.log(future);

// lecuture summary date time adn padstart;

//* some operation with date ;

const future = new Date(2025, 10, 19, 15, 23);
console.log(+future);

// const calcDaysPast = (date1, date2) => Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

// const days1 = calcDaysPast(new Date(2037, 3, 14), new Date(2037, 3, 4));
// console.log(days1)

//* Timers SetTimeout and setInterval============
console.log("Hello");

// setTimeout((ing1, ing2)=> console.log(ing1, ing2,"Here is your pizza"), 5000, 'olives', 'spinach')
console.log("wating...");

// how can we pass the argument in the settimeout function
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(ing1, ing2, "Here is your pizza"),
  5000,
  ...ingredients
);

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

// setInterVal=========

// setInterval(()=>{
//   const now = new Date();
//   loggedOut.textContent = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: '2-digit', second: '2-digit'}).format(now);
// }, 1000);

console.log(400 * 2.5 / 100)