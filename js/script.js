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

if (personlMovieDB.count < 10) {
    console.log('Просмотрно мало фильмов');
} else if (personlMovieDB.count > 10 && personlMovieDB.count < 30) {
    console.log('классический зритель');
} else if (personlMovieDB.count > 30) {
    console.log('киноман');

} else {
    console.log('произошла ошибка');
}