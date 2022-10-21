// The Luhn test is used by some credit card companies to distinguish valid credit card numbers from what could be a random selection of digits.
// It was taken from: https://rosettacode.org/wiki/Luhn_test_of_credit_card_numbers

const LuhnCheck = (function () {
  const luhnArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  return function (str: string) {
    let counter = 0;
    let incNum;
    let odd = false;
    const temp = String(str).replace(/[^\d]/g, "");
    if (temp.length == 0) return false;
    for (let i = temp.length - 1; i >= 0; --i) {
      incNum = parseInt(temp.charAt(i), 10);
      counter += (odd = !odd) ? incNum : luhnArr[incNum];
    }
    return counter % 10 == 0;
  };
})();

console.log(LuhnCheck("4242424242424242"));
