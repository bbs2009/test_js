"use strict";

let numberOfFilms;
let continueQuestion = true;
let lastSeeFilm;
let lastSeeFilmsMark;





// console.log(numberOfFilms);

function start() {
    numberOfFilms = +prompt('Сколько фильмов просмотрено?', '');
    while (numberOfFilms === null || numberOfFilms =='' || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('ВВедите сколько фильмові Ві просмотрели');
    }
}

start();

const personlMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function rememberMyFilms() {
    for (let i = 0; i < numberOfFilms; i++) {

        lastSeeFilm = prompt('Один из просмотренных фильмов');
        lastSeeFilmsMark = +prompt('На сколько оцените');
    
        if (lastSeeFilm != null && lastSeeFilm.length > 1 && lastSeeFilm.length < 50) {
            personlMovieDB.movies[lastSeeFilm] = lastSeeFilmsMark;
            console.log(personlMovieDB);
        } else {
            i--;
            console.log(personlMovieDB);
        }
    }
    
}


rememberMyFilms();

function  detectPersonlaLevel() {
    if (personlMovieDB.count < 10) {
        console.log('Просмотрно мало фильмов');
    } else if (personlMovieDB.count > 10 && personlMovieDB.count < 30) {
        console.log('классический зритель');
    } else if (personlMovieDB.count > 30) {
        console.log('киноман');
    
    } else {
        console.log('произошла ошибка');
    }
}

detectPersonlaLevel();

function showMyDB () {
    if (personlMovieDB.privat ===false) {
        console.log(personlMovieDB);
    }
}

function writeYourGenres () {
    let qw = '';
    for (let i=0;i<3;i++) {
        qw = +prompt ('Ваш любимый жанр под номером ${номер по порядку}');
        while(qw===null || qw ==='' || isNaN(qw)) {
            qw = +prompt ('Ваш любимый жанр под номером ${номер по порядку}');
        }
        personlMovieDB.genres.push(qw);
    } 
}


showMyDB();
writeYourGenres();

console.log(personlMovieDB);