function modal() {
    //modal

    const btnsTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');


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
    

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target === modal || target.getAttribute('data-close') == '') {
            closeElement(modal);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeElement(modal);
        }
    });
    

    function closeElement(element) {
        element.classList.remove('show');
        element.classList.add('hide');
        document.body.style.overflow = ''; //возвращаем скролл, оставляем ''
    }

    const modalTimerID = setTimeout(openModal, 25000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;