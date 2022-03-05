'use strict';

function first() {
    console.log(1);
}

function second() {

    setTimeout(
        function () {
            console.log(2);
        }, 1000);
}


second();
first();



//promise

const firstPromise = new Promise(function(resolve, reject) {
    setTimeout(()=>{
        console.log('Подготовка даных');
    }, 1000);
    const product = {
        name:'Название продукта',
        color:'red', 
        count:2
    };
    resolve(product);
});

firstPromise.then(prod=>{
    console.log('Обработка данных');
    console.log(prod);
    prod.update=1;
    return new Promise(function(resolve, reject){
        resolve(prod);
        // reject();
    });
}).then(pr=>{
    console.log('Данные обработаны');
    console.log(pr);
    
}).catch(()=>{
    console.log("возникла ошибка");
}).finally(()=>{
    console.log('конец');
});


const sleep = timeSleep =>{
    return new Promise ((resolve, reject)=>{
        setTimeout(()=>resolve(), timeSleep);
    });
};

// Promise.all([sleep(1000), sleep(2000)]).then(()=>console.log('все выполненно (all)'));

Promise.race([sleep(1000), sleep(2000)]).then(()=>console.log('чтото выпненно (расе)'));



fetch(' http://localhost:3000/menu', {
    method:'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
.then((data)=>data.json())
.then((data)=>console.log(data));
