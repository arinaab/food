'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from'./modules/slider';
import modal, { openModal } from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
document.addEventListener('DOMContentLoaded', () => {

    const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 25000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2022-05-20');
    modal('[data-modal]', '.modal', modalTimerID);
    forms('form', modalTimerID);
    cards();
    calc();
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});