"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // Оживление табов      
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            // item.style.display = 'none';

            item.classList.add('hide', 'fade');
            item.classList.remove('show');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(el = 0) {
        tabsContent.forEach((item, ind) => {
            if (el === ind) {
                //    item.style.display='block';
                item.classList.add('show', 'fade');
                item.classList.remove('hide');

                tabs[ind].classList.add('tabheader__item_active');
            }


        });
    }

    function handlerClick() {
        tabsParent.addEventListener('click', e => {
            if (e.target && e.target.classList.contains('tabheader__item')) {
                // console.log(e.target);
                tabs.forEach((item, ind) => {
                    if (item === e.target) {
                        hideTabContent();
                        showTabContent(ind);
                    }

                });
            }
        });
    }

    hideTabContent();
    showTabContent();
    handlerClick();

    // Таймер

    const endDate = '2022-01-26';

    function calculateTimeLeft(fromDate) {
        const now = new Date();
        const dateDiff = Date.parse(fromDate) - Date.parse(now);
        const dayDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
        const hourDiff = Math.floor((dateDiff / (1000 * 60 * 60)) % 24);
        const minDiff = Math.floor(dateDiff / (1000 * 60) % 60);
        const secDiff = Math.floor(dateDiff / (1000) % 60);

        // console.log(day, hour, min, sec);
        return {
            'total': dateDiff,
            'day': dayDiff,
            'hour': hourDiff,
            'min': minDiff,
            'sec': secDiff
        };
    }

    function updateTimer(endDate, selectorTimer) {
        const timer = document.querySelector(selectorTimer);
        const daySelector = timer.querySelector('#days'),
            hourSelector = timer.querySelector('#hours'),
            minSelector = timer.querySelector('#minutes'),
            secSelector = timer.querySelector('#seconds'),
            timeinterv = setInterval(setTimer, 1000);

        setTimer();

        function setTimer() {
            let t = calculateTimeLeft(endDate);

            daySelector.innerHTML = t.day;
            hourSelector.innerHTML = t.hour;
            minSelector.innerHTML = t.min;
            secSelector.innerHTML = t.sec;

            if (t.total <= 0) {
                clearInterval(timeinterv);
            }
        }
    }

    updateTimer(endDate, '.timer');


    // Модальное окно



    const modal = document.querySelector('.modal'),
        btnShowModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[data-close]');

    function showModalWindow() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function hideModalWindow() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
        clearInterval(showPopUpId);
    }

    function showModalAfterOffset() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModalWindow();
            window.removeEventListener('scrol', showModalAfterOffset);
        }
    }

    document.addEventListener('scrol', showModalAfterOffset);

    const showPopUpId = setTimeout(showModalWindow, 5000);

    btnShowModal.forEach(element => {
        element.addEventListener('click', showModalWindow);
    });

    btnCloseModal.addEventListener('click', hideModalWindow);

    modal.addEventListener('click', (e) => {
        if (e.target === modal && modal.classList.contains('show')) {
            hideModalWindow();
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModalWindow();
        }
    });


    //forms 

    const allForms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        loadingImg: 'img/icon/spinner.gif',
        succes: 'Успешно',
        error: 'Что то пошло не так'
    };

    // function sendData(formItem) {
    //     formItem.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('div');
    //         statusMessage.classList.add('status');
    //         const request = new XMLHttpRequest();

    //         request.open('POST', 'http://test.lan/server.php');
    //         request.setRequestHeader("Content-Type", "application/json");

    //         const formData = new FormData(formItem);
    //         const obj = {};

    //         formData.forEach((key, val) => {
    //             obj[val] = key;
    //         });

    //         const json = JSON.stringify(obj);
    //         request.send(json);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.responseType);
    //                 console.log(request.response);

    //                 modalMessage(message.succes, message.loadingImg);
    //                 formItem.reset();

    //             } else {
    //                 modalMessage(message.error, message.loadingImg);
    //             }
    //         });
    //     });
    // }

    // отправка на сервер старым способом
    // allForms.forEach((el) => {
    //     sendData(el);
    // });

    //отправка fetch

    const postData = async (url, data)=>{
        const res = await fetch (url, {
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:data, 
        });

        return await res.json();
    };


    const getDataMenu = async (url) =>{
        const res = await fetch (url, {
            headers: {
                'Content-Type': 'application/json'
              },
        });
        
        if (!res.ok) {
            throw new Error (`При получении списка меню возникла ошибка ${res.status}` );
        }

        return await res.json();
    };

    getDataMenu('http://localhost:3000/menu')
    .then(obj=>{
        obj.forEach((el)=>{
            new CreateMenu(el.img, 
                el.altimg, 
                el.title, 
                el.descr, 
                el.price, 
                '.menu .container').render();
        });
    });


    function renderMenu(obj){
        obj.forEach((el)=>{
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
            <img src=${el.img} alt=${el.altimg}>
                    <h3 class="menu__item-subtitle">${el.title}</h3>
                    <div class="menu__item-descr">${el.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${el.price}</span> грн/день</div>
                    </div>
            `;
        document.querySelector('.menu .container').append(element);

        });
    }

    class CreateMenu{
        constructor (img, altimg, title, descr, price, parentSelector) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = parentSelector;
            this.transfer = 27;
            this.changeToUAH();

        }
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        
        render () {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `<img src=${this.img} alt=${this.altimg}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            
            document.querySelector(this.parentSelector).append(element);
        }
    }


    function sendDataFetch(formItem) {
        formItem.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');

            const formData = new FormData(formItem);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    modalMessage(message.succes, message.loadingImg);
                })
                .catch(() => {
                    modalMessage(message.error, message.loadingImg);
                    
                })
                .finally(() => {
                    formItem.reset();
                });
        });
    }

    allForms.forEach((el) => {
        sendDataFetch(el);
    });

    class Slider{
        constructor(placeholderSlider) {
            this.placeholderSlider = placeholderSlider;
            //this.placeholder = placeholderSlide;
            this.slideList= [
                {
                    slideUrl:'img/slider/pepper.jpg',
                    slideAlt:'pepper'
                },
                {
                    slideUrl:'img/slider/food-12.jpg',
                    slideAlt:'food'
                },
                {
                    slideUrl:'img/slider/olive-oil.jpg',
                    slideAlt:'oil'
                },
                {
                    slideUrl:'img/slider/paprika.jpg',
                    slideAlt:'paprika'
                },
            ];
            this.totalCountSlide=0;
            this.currentSlide=0;
            this.currentSlidePretty='';
            this.totalCountSlidePretty='';
            this.calculateSlide();
            this.renderSlideHeader();
            this.renderSlide();
            // this.nextSlideHendler();
            // this.prevSlideHendler();
        } 

        calculateSlide() {
            this.slideList.forEach((el)=>{
                this.totalCountSlide+=1;
            });
        }
        
        nextSlide(){
            if (this.currentSlide>=0 && this.currentSlide<this.totalCountSlide-1) {
                this.currentSlide+=1;
            }
            
            if(this.currentSlide>this.totalCountSlide){
                this.currentSlide=0;
            }
        }

        prevSlide() {
            if (this.currentSlide>0 && this.currentSlide<=this.totalCountSlide-1) {
                this.currentSlide-=1;
            }
            else if(this.currentSlide<0){
                this.currentSlide=this.totalCountSlide;
            }
        }

        prevSlideHendler(){
            document.querySelector('.offer__slider-prev').addEventListener('click', ()=>{
                console.log(`текщий слайд ${this.currentSlide}`);
                    this.prevSlide();
                    this.renderSlideHeader();
                    this.renderSlide();
                });
        }

        nextSlideHendler () {
                document.querySelector('.offer__slider-next').addEventListener('click', ()=>{
                    console.log(`текщий слайд ${this.currentSlide}`);
                    this.nextSlide();
                    this.renderSlideHeader();
                    this.renderSlide();
                    });
        }


        renderSlideHeader(){
            document.querySelector(this.placeholderSlider).innerHTML= '';

            const element = document.createElement('div');
            
            if (this.currentSlide >=0 && this.currentSlide<10) {
                this.currentSlidePretty = `0${this.currentSlide+1}`;
            }
            else if(this.currentSlide>9){
                this.currentSlidePretty = this.currentSlide+1;
            }


            if (this.totalCountSlide >=0 && this.totalCountSlide<10) {
                this.totalCountSlidePretty = `0${this.totalCountSlide}`;
            }
            else if(this.totalCountSlide>9){
                this.totalCountSlidePretty = this.totalCountSlide;
            }

            element.classList.add('offer__slider-counter');
            element.innerHTML=`
            <div class="offer__slider-prev">
            <img src="icons/left.svg" alt="prev">
            </div>
            <span id="current">${this.currentSlidePretty}</span>
            /
            <span id="total">${this.totalCountSlidePretty}</span>
            <div class="offer__slider-next">
            <img src="icons/right.svg" alt="next">
            </div>
            `;
            document.querySelector(this.placeholderSlider).append(element);
            this.nextSlideHendler();
            this.prevSlideHendler();
        }

        renderSlide(){
            const element = document.createElement('div');
            element.classList.add('offer__slider-wrapper');
            element.innerHTML=`
            <div class="offer__slide">
            <img src=${this.slideList[this.currentSlide].slideUrl} alt=${this.slideList[this.currentSlide].slideAlt}>
            </div>`;
            document.querySelector(this.placeholderSlider).append(element);
        }

        
    }
    

    // <div class="offer__slider-wrapper">
                    
    // </div>

    // <div class="offer__slider-counter">
                   
    // </div>

    //  <div class="offer__slider-prev">
    //                     <img src="icons/left.svg" alt="prev">
    //                 </div>
    //                 <span id="current">03</span>
    //                 /
    //                 <span id="total">04</span>
    //                 <div class="offer__slider-next">
    //                     <img src="icons/right.svg" alt="next">
    //                 </div>

    // <div class="offer__slide">
    //                     <img src="img/slider/pepper.jpg" alt="pepper">
    //                 </div>
    //                 <div class="offer__slide">
    //                     <img src="img/slider/food-12.jpg" alt="food">
    //                 </div>
    //                 <div class="offer__slide">
    //                     <img src="img/slider/olive-oil.jpg" alt="oil">
    //                 </div>
    //                 <div class="offer__slide">
    //                     <img src="img/slider/paprika.jpg" alt="paprika">
    //                 </div> 



   const mySlider = new Slider('.offer__slider');
    
//    document.querySelector('.offer__slider-next').addEventListener('click', (e)=>{
//         console.log("клик вне класса вперед");
//         mySlider.nextSlideHendler();
//     });

//     document.querySelector('.offer__slider-prev').addEventListener('click', (e)=>{
//         console.log("клик вне класса назад");
//         mySlider.prevSlideHendler();
//     });

    //оповещение о отправке

    function modalMessage(message, messageImg) {
        const prevModalMesage = document.querySelector('.modal__dialog');
        prevModalMesage.classList.add('hide');
        showModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        <div class='containe r'><img src = ${messageImg}></img></div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalMesage.classList.add('show');
            prevModalMesage.classList.remove('hide');
            hideModalWindow();
        }, 4000);

    }


    
});