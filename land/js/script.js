'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

function sortMovies() {
    movieDB.movies.sort();
}

function deleteAdwItems(){
    const promoHolder = document.querySelector('.promo__adv');
    promoHolder.innerHTML='';
    // console.log(promoHolder);
}

function addEventDeleteFilm(){
    const deleteButtons = document.querySelectorAll('.delete'),
    listFilmsTemplate=document.querySelector('.promo__interactive-list');
    
    deleteButtons.forEach(el=>{
        el.addEventListener('click', e=>{
            let filmName = el.previousSibling.textContent.slice(2);
            deleteFilm(filmName, listFilmsTemplate);
        });
    });
}

function initialLoadFilms() {
    const listFilms = document.querySelector('.promo__interactive-list');

    listFilms.innerHTML='';
    
    sortMovies();
    movieDB.movies.forEach((el, ind) =>{
        listFilms.innerHTML+=`<li class="promo__interactive-item">${ind} ${el}<div class="delete"></div></li>`;
    });
    
}




function addNewFilm(filmItem, listFilmsTemplate) {
    if (filmItem) {
        movieDB.movies.push(filmItem);
    }
    
    sortMovies();
    
    listFilmsTemplate.innerHTML='';
    movieDB.movies.forEach((el, ind)=>{
        listFilmsTemplate.innerHTML+=`<li class="promo__interactive-item">${ind} ${el}<div class="delete"></div></li>`;
    });
    
    addEventDeleteFilm();
    // console.log(formCheckIsLike);
}



function deleteFilm(filmItem, listFilmsTemplate) {
    // удаляем фильм
    if (filmItem) {
        movieDB.movies.forEach((item, ind)=>{
            if (filmItem===item) {
                movieDB.movies.splice(ind, 1);
            }
        });
    }
   
    listFilmsTemplate.innerHTML='';
    
    sortMovies();
    
    movieDB.movies.forEach((el, ind) =>{
        listFilmsTemplate.innerHTML+=`<li class="promo__interactive-item">${ind} ${el}<div class="delete"></div></li>`;
    });

    
    addEventDeleteFilm();
}

function main() {
    const formSite = document.querySelector('.add'),
    formInputNewFilm = formSite.querySelector('.adding__input'),
    formCheckIsLike = formSite.querySelector("input[type='checkbox']"),
    formButtonSubmit = formSite.querySelector('button'),
    listFilms = document.querySelector('.promo__interactive-list'),
    deleteButtons = document.querySelectorAll('.delete');

    formButtonSubmit.addEventListener('click',e=>{
        e.preventDefault();
        addNewFilm(formInputNewFilm.value, listFilms);    

    });
    
    addEventDeleteFilm();

}


document.addEventListener("DOMContentLoaded",()=>{
    deleteAdwItems();
    initialLoadFilms();
    sortMovies();
    main();
});


