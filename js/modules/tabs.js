function tabs() {
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
}

module.exports = tabs;