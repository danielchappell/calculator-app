'use strict';

/**
Curried verions of simple math operations
 **/

export function add(num1) {
    return (num2) => num1 + num2;
}

export function subtract(num1) {
    return (num2) => num1 - num2;
}

export function multiply(num1) {
    return (num2) => num1 * num2;
}

export function divide(num1) {
    return (num2) => num1 / num2;
}

export function factorial(num, acc = 1) {
    if (num <= 1) {
        return acc;
    }
    return factorial(num - 1, num * acc);
}

export function toPower(num1) {
    return (num2) => Math.pow(num1, num2);
}
