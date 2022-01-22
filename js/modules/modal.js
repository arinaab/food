function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = ''; //возвращаем скролл, оставляем ''
}

function openModal(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //убираем скролл

    console.log(modalTimerID);
    if (modalTimerID) {
        clearInterval(modalTimerID);
    }
}

function modal(triggerSelector, modalSelector, modalTimerID) {
    //modal

    const btnsTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);


    function showModal(trigger) {
        trigger.forEach(item => { //на каждую кнопку навешали событие
            item.addEventListener('click', () => { 
                openModal(modalSelector, modalTimerID);
            });
        });
    }
    showModal(btnsTrigger);
    

    modal.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target === modal || target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};