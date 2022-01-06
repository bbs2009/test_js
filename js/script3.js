"use strict";

function testConsole(q) {
let x = 5;
let y = x;
y=1;
let a = [1,2,3];
let b = [1,2,3];

}
// console.log(2&&1 || 1);

// }

// testConsole(1);
const deleteElement = (e) =>{
e.target.remove();
};

const buttonNoClick = (e) =>{
    e.target.classList.add ='highlight';
};

const btn = document.querySelector('button');
console.log(btn);
btn.addEventListener('click',buttonNoClick);


