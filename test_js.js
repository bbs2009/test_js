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
finrst();