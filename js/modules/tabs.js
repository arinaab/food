function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // tabs
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() { //скрываем весь конетент табов
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => { //убираем класс активности у каждого элемента
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { //установили значение i по умолчанию
        tabsContent[i].classList.add('show', 'fade'); //показываем контент первого элемента
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass); //добавляем класс активности
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;