
"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
    
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
                        console.log(item);
                        console.log(e.target);
                        
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




    

});