const testFunc = function () {
    const str = 'test';
    const fruit = 'some fruit';
    const logg = 'hello world';
    // console.log(str.toUpperCase());
    // console.log(fruit.indexOf('q'));
    // console.log( logg.slice(-2, -1));
    // console.log(logg.substring(6,11));
    // console.log(logg.substr(6,2));
    const num = 12.522;
    const test = '12.12x';
    console.log(Math.round(num, 3));
    console.log(parseFloat(test));
};


testFunc();


function first(str, callb) {
    console.log(`пример строки ${str}`);
    setTimeout(() => {
        console.log('пауза');
    }, 1000);
    callb();

}

function done() {
    console.log('call back funct');
}

first('куку', done);

const testDB = {
    first: 'firstvalue',
    last: 'lastvalue',
    mylist: {
        firstliDst: 'firstlistvalue',
        lastlist: 'lastlistvalue'
    },
    second: 'secondvalue',
    makeTest: function () {
        console.log('make test');
    }

};

// for (let key in testDB) {
//     if (typeof(testDB[key])!='object') {
//         console.log(`ключ - ${key} значение ${testDB[key]}`);
//     }
//     else if (typeof(testDB[key]==='object')){
//         for (let i in testDB[key]) {
//             console.log(`ключ обьекта - ${i} значение обьекта - ${testDB[key][i]} `)
//         }
//     }
// }

const {
    firstliDst,
    lastlist
} = testDB.mylist;

console.log(lastlist);


let arr = ['a', 'b', 'c', 'd', 'e'];

// arr.forEach(function(item,num, arr) {
//     console.log(`номер - ${num} значение - ${item} масив ${arr}`);
// });

arr.map(function (val, ind, arra) {
    val = val + '1';
    console.log(`val - ${val} ind -${ind}`);
});


const newStr = 'іі, aa, bb, cc';
const newArr = newStr.split(',');
// console.log(newArr, newArr.length);
newArr.sort();
console.log(newArr);


const newStr2 = '1,4,2,3,8,5';
const constNewArr2 = newStr2.split(',');
constNewArr2.sort(function (a, b) {
    return a - b;
});

console.log(constNewArr2);

const ob = ['a', 'b'];

const newOb = [...ob];
console.log(newOb);