
"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
    
    // Оживление табов      
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){

        tabsContent.forEach(item=>{
            // item.style.display = 'none';
            
            item.classList.add('hide', 'fade');
            item.classList.remove('show');

        });

        tabs.forEach(item=>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(el=0) {
        tabsContent.forEach((item, ind)=>{
           if (el===ind){
            //    item.style.display='block';
               item.classList.add('show', 'fade');
               item.classList.remove('hide');

               tabs[ind].classList.add('tabheader__item_active');
           }
        

        });
    }

    function handlerClick(){
        tabsParent.addEventListener('click',e=>{
            if (e.target && e.target.classList.contains('tabheader__item')){
                // console.log(e.target);
                tabs.forEach((item, ind)=>{
                    if (item===e.target){
                        // console.log(item);
                        // console.log(e.target);
                        
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
        const dayDiff = Math.floor(dateDiff / (1000*60*60*24));
        const hourDiff = Math.floor( (dateDiff/(1000*60*60)) % 24 );
        const minDiff = Math.floor( dateDiff / (1000*60) % 60);
        const secDiff = Math.floor( dateDiff / (1000) % 60);

        // console.log(day, hour, min, sec);
        return {'total':dateDiff,
                'day': dayDiff,
                'hour': hourDiff,
                'min':minDiff,
                'sec':secDiff};
    }

    function updateTimer(endDate, selectorTimer) {
        const timer = document.querySelector(selectorTimer);
        const daySelector = timer.querySelector('#days'),
              hourSelector = timer.querySelector('#hours'),
              minSelector = timer.querySelector('#minutes'),
              secSelector = timer.querySelector('#seconds'),
              timeinterv = setInterval(setTimer, 1000);
        
        setTimer();      

        function setTimer(){
            let t = calculateTimeLeft(endDate);
            
            daySelector.innerHTML = t.day;
            hourSelector.innerHTML = t.hour;
            minSelector.innerHTML = t.min;
            secSelector.innerHTML = t.sec;

            if (t.total<=0){
                clearInterval(timeinterv);
            }
        }
    }

    updateTimer(endDate, '.timer');
    

    // Модальное окно

    function modalWindow() {

        const modal = document.querySelector('.modal'),
              btnShowModal = document.querySelectorAll('[data-modal]'),
              btnCloseModal = document.querySelector('[data-close]');

        function showModalWindow () {
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

        function showModalAfterOffset(){
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

        modal.addEventListener('click', (e)=>{
            if (e.target === modal && modal.classList.contains('show')) {
                hideModalWindow();
            }

        });

        document.addEventListener('keydown', (e)=>{
            if (e.key === 'Escape') {
                hideModalWindow();
            }
        });
    }

        

    modalWindow();

    //forms 

    const allForms = document.querySelectorAll('form');

    const message = {
        loading:'Загрузка',
        succes:'Успешно',
        error:'Что то пошло не так'
    };

    function sendData(formItem){
        formItem.addEventListener('submit', (e)=>{
            e.preventDefault();
            
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            formItem.append(statusMessage);

            const request = new XMLHttpRequest();
            
            request.open('POST', 'http://test.lan/server.php' );
            request.setRequestHeader("Content-Type", "application/json");

            
            const formData = new FormData(formItem);
            const obj = {};
            formData.forEach((key, val)=>{
                obj[val]=key;
            });

            const json = JSON.stringify(obj);
            request.send(json);
            
            request.addEventListener('load', ()=>{
                if (request.status ===200){
                    console.log(request.responseType);
                    console.log(request.response);
                    statusMessage.textContent = message.succes;
                    formItem.reset();
                    
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                }
                else {
                    statusMessage.textContent = message.error;
                }    
            });
        });
    }


    allForms.forEach((el)=>{
        sendData(el);
    });

 });