
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
        const hourDiff = Math.floor((dateDiff / (1000*60*60)%24));
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
    

 });