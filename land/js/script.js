'use strict';


function start() {
    const promoAdv = document.querySelector('.promo__adv'),
imgPromoAdv = promoAdv.querySelectorAll('img'),
promoBg = document.querySelector('.promo__bg'),
promoGenre = promoBg.querySelector('.promo__genre'),
promoInteractiveList = document.querySelector('.promo__interactive-list'),
films = document.querySelectorAll('.promo__interactive-item');


imgPromoAdv.forEach(item => {
item.remove();
});


promoGenre.textContent = 'Драма';
promoBg.style.background = "url('img/bg.jpg')";
movieDB.movies.sort();
// console.log(promoInteractiveTitle);
films.forEach(item => {
item.remove();
});


movieDB.movies.forEach((item, ind) => {
promoInteractiveList.innerHTML += `<li class="promo__interactive-item">${ind}  ${item}
                        <div class="delete"></div>
                </li>`;
});

}

function addNewFilmHendler() {
    const formInput = document.querySelector('.adding__input'),
        formButton = document.querySelector('button'),
        formCheckBox = document.querySelector('input[type=checkbox]');



    formButton.addEventListener("click", (e) => {
        e.preventDefault();
        let films2 = document.querySelectorAll('.promo__interactive-item');
        let promoInteractiveList2 = document.querySelector('.promo__interactive-list');
        let formInputValue = String(formInput.value);

        if (formInputValue.length >= 1 && formInputValue.length < 22) {
            movieDB.movies.push(formInput.value);
            movieDB.movies.sort();

            films2.forEach((item) => {
                item.remove();
            });
            movieDB.movies.forEach((item, ind) => {

                promoInteractiveList2.innerHTML += `<li class="promo__interactive-item">${ind}  ${item}
                                            <div class="delete"></div>
                                            </li>`;
            });
            if (formCheckBox.checked == true) {
                console.log('Добавляем любимый фильм');
            }
        }

        if (formInputValue.length > 22) {
            let tunedFormInputValue = formInputValue.slice(0, 24) + '...';
            movieDB.movies.push(tunedFormInputValue);
            movieDB.movies.sort();

            films2.forEach((item) => {
                item.remove();
            });
            movieDB.movies.forEach((item, ind) => {
                promoInteractiveList2.innerHTML += `<li class="promo__interactive-item">${ind}  ${item}
                                            <div class="delete"></div>
                                    </li>`;
            });

            if (formCheckBox.checked == true) {
                console.log('Добавляем любимый фильм');
            }
        }

        deleteHendler();
    });
}


function deleteHendler() {
    let deleteFilmIcons = document.querySelectorAll('.delete');
    deleteFilmIcons.forEach(el => {
        el.addEventListener("click", e => {
            let filmNameCleaned = e.target.previousSibling.textContent.slice(3).trim();
            let filmNameRaw = e.target.previousSibling.textContent;

            movieDB.movies.forEach((el, ind) => {
                if (el === filmNameCleaned) {
                    movieDB.movies.splice(ind, 1);
                    let films2 = document.querySelectorAll('.promo__interactive-item');
                    let promoInteractiveList2 = document.querySelector('.promo__interactive-list');
                    movieDB.movies.sort();

                    films2.forEach((item) => {
                        if (item.textContent.trim() === filmNameRaw.trim()) {
                            item.remove();
                        }

                    });
                }
            });
        });

    });
}

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


document.addEventListener("DOMContentLoaded", function(ev) {
   start(); 
   addNewFilmHendler();
    deleteHendler();
});

