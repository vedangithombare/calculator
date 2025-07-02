let presentVal = [];
let currentNum = "";
let ans;
let justCalculated = false;
// TODO Remove button and multiple operators should not be there
document.addEventListener("DOMContentLoaded", function () {
  const zero = document.getElementById("0");
  const one = document.getElementById("1");
  const two = document.getElementById("2");
  const three = document.getElementById("3");
  const four = document.getElementById("4");
  const five = document.getElementById("5");
  const six = document.getElementById("6");
  const seven = document.getElementById("7");
  const eight = document.getElementById("8");
  const nine = document.getElementById("9");

  const add = document.getElementById("plusBtn");
  const minus = document.getElementById("minusBtn");
  const mul = document.getElementById("mulBtn");
  const divide = document.getElementById("divideBtn");
  const equalTo = document.getElementById("equalToBtn");
  const percentBtn = document.getElementById("percentBtn");

  const acBtn = document.getElementById("acBtn");
  const removeBtn = document.getElementById("removeBtn");
  const calulateView = document.getElementById("calulateView");

  const btnArr = [zero, one, two, three, four, five, six, seven, eight, nine];
  const operatorArr = [add, minus, mul, divide];

  btnArr.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.textContent;
      if (justCalculated) {
        calulateView.innerText = "";
        justCalculated = false;
      }
      currentNum += value;
      calulateView.innerText += value;
      console.log("currentNum in btn for loop", value);
    });
  });

  operatorArr.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentNum !== "") {
        // Only push if not empty
        presentVal.push(currentNum);
      }
      currentNum = "";
      presentVal.push(btn.textContent);
      console.log("pushing values ", presentVal);

      calulateView.textContent += btn.textContent;
    });
  });

  function solve(array) {
    const arr = [...array];
    const operators = ["/", "*", "+", "-"];

    //   for each operator we are passing the whole array to check for multiple occurance of the operator
    for (let operator of operators) {
      let i = 0;

      // using while loop cause the array is dynamically changing and in for loop we use i++ which will lead to skipping of operators
      while (i < arr.length) {
        // checking the operator

        if (arr[i] === operator) {
          // getting the before and after elements
          let before = Number(arr[i - 1]);
          let after = Number(arr[i + 1]);
          let ans;

          // what kind of manipulation to perform
          switch (operator) {
            case "/":
              ans = (before / after).toFixed(4);
              break;
            case "*":
              ans = before * after;
              break;
            case "+":
              ans = before + after;
              break;
            case "-":
              ans = before - after;
              break;
          }

          // replacing the before,operator and after element with the ans thus changing array size
          arr.splice(i - 1, 3, ans);
          // restarting the iteration
          i = 0;
        } else {
          i++;
        }
      }
    }

    console.log("present value array ", presentVal);
    ans = arr[0];
    console.log("ans", ans);
  }

  function clickEqual() {
    if (currentNum !== "") {
      // pushing the last value
      presentVal.push(currentNum);
      currentNum = "";
      console.log("clickequal", presentVal);
    }
    solve(presentVal);
    calulateView.innerText = ans;
    currentNum = "";

    // resetting the array
    presentVal.length = 0;
    ans = "";
    justCalculated = true;
    console.log("currentNum in clickequal: ", currentNum);
  }

  function handleAcBtn() {
    presentVal.length = 0;
    currentNum = "";
    ans = "";
    justCalculated = false;
    calulateView.innerText = "";
  }

  function handlePercentBtn() {}

  function removeValue() {

    if (currentNum.length > 0) {
      currentNum = currentNum.slice(0, -1);
    } else if (presentVal.length > 0) {
      presentVal.pop();
    }

    calulateView.innerText = calulateView.innerText.slice(0, -1);
  }

  equalTo.addEventListener("click", () => clickEqual());
  acBtn.addEventListener("click", () => handleAcBtn());
  removeBtn.addEventListener("click", () => removeValue());
});

