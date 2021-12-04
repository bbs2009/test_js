
const numberOfFilms = prompt('Сколько фильмов Вы просмотрели?');

const personlMovieDB = {
    count : numberOfFilms,
    movies: {},
    actors: {},
    genres:[],
    privat: false 
};

const lastSeeFilms1 = prompt('Один из просмотренных фильмов');
const lastSeeFilmsMark1 = +prompt('НА сколько оцените');

const lastSeeFilms2 = prompt('Один из просмотренных фильмов');
const lastSeeFilmsMark2 = prompt('НА сколько оцените');

personlMovieDB.movies[lastSeeFilms1] = lastSeeFilms1;
personlMovieDB.movies = lastSeeFilmsMark1;
personlMovieDB.movies[lastSeeFilms2] = lastSeeFilms2;
personlMovieDB.movies = lastSeeFilmsMark2;



console.log(personlMovieDB);