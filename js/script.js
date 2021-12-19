"use strict";

let numberOfFilms;
let continueQuestion = true;
let lastSeeFilm;
let lastSeeFilmsMark;





// console.log(numberOfFilms);



// start();
const personlMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function () {
        numberOfFilms = +prompt('Сколько фильмов просмотрено?', '');
        while (numberOfFilms === null || numberOfFilms == '' || isNaN(numberOfFilms)) {
            numberOfFilms = +prompt('ВВедите сколько фильмові Ві просмотрели');
        }
    personlMovieDB.count = numberOfFilms;    
        
    },

    rememberMyFilms: function () {
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
        
         
    },

    writeYourGenres:function() {
        let genres = prompt('Перечислите любимые жанры', '');
        while (genres === null || genres == '') {
            genres = prompt('Перечислите любимые жанры');
        }
        const arrGenres = genres.split(','); 

        personlMovieDB.genres.push(...arrGenres);
    
        personlMovieDB.genres.forEach(function(val, ind, arr){
            console.log(`Любимый жанр ${ind} это ${val}`);
            });
    },
    detectPersonlaLevel: function () {
            if (personlMovieDB.count < 10) {
                console.log('Просмотрно мало фильмов');
            } else if (personlMovieDB.count > 10 && personlMovieDB.count < 30) {
                console.log('классический зритель');
            } else if (personlMovieDB.count > 30) {
                console.log('киноман');

            } else {
                console.log('произошла ошибка');
            }
        },
    toggleVisibleMyDB(){
        if (personlMovieDB.privat) {
            personlMovieDB.privat=false;
        }
        else {
            personlMovieDB.privat=true;
        }
    }
};

// rememberMyFilms();


// detectPersonlaLevel();



// showMyDB();
// writeYourGenres();

personlMovieDB.start();
personlMovieDB.rememberMyFilms();
personlMovieDB.writeYourGenres();
personlMovieDB.detectPersonlaLevel();
// ob.detectPersonlaLevel();




// console.log(personlMovieDB);