'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { //скрываем весь конетент табов
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => { //убираем класс активности у каждого элемента
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { //установили значение i по умолчанию
        tabsContent[i].classList.add('show', 'fade'); //показываем контент первого элемента
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active'); //добавляем класс активности
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // timer
    const deadline = '2022-05-20';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { //функция-помощник для добавления 0 перед числом
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock(); //чтобы функция запускалась сразу, а не через 1 секунду

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                timer.style.display = 'none';
                document.querySelector('.promotion__timer .title').textContent = 'Акция закончилась';
            }
        }
    }
    setClock('.timer', deadline);

    //modal

    const btnsTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; //убираем скролл
        clearInterval(modalTimerID);
    }

    function showModal(trigger) {
        trigger.forEach(item => { //на каждую кнопку навешали событие
            item.addEventListener('click', () => { 
                openModal();
            });
        });
    }
    showModal(btnsTrigger);
    
    function hideModal(trigger) {
        trigger.addEventListener('click', () => {
            closeElement(modal);
        });

        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target === modal) {
                closeElement(modal);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.code === 'Escape' && modal.classList.contains('show')) {
                closeElement(modal);
            }
        });
    }
    hideModal(modalClose);

    function closeElement(element) {
        element.classList.remove('show');
        element.classList.add('hide');
        document.body.style.overflow = ''; //возвращаем скролл, оставляем ''
    }

    const modalTimerID = setTimeout(openModal, 15000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    //classes
    const menu = document.querySelectorAll('.menu__item');

    class MenuItem {
        constructor(src, alt, subtitle, descr, total, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
                </div>
            </div>
            `;
            this.parent.append(element);
        }
    }
    new MenuItem(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        229, 
        '.menu .container'
        ).render();
    
    new MenuItem(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        550, 
        '.menu .container'
        ).render();

    new MenuItem(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 
        430, 
        '.menu .container'
        ).render();
});