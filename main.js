'use strict'
const userText = document.querySelector('.user-text');
const translateText = document.querySelector('.translate-text');
const btn = document.querySelector('.btn');
const firstLangsList = Array.from( document.querySelectorAll('[data-option-first]') );
const secondLangsList = Array.from( document.querySelectorAll('[data-option-second]') );

const getSelectedLang = arr => arr.filter(el => el.selected === true)[0]['value'];

async function getTranslate() {
  const firstLang = getSelectedLang(firstLangsList);
  const secondLang = getSelectedLang(secondLangsList);
  const key = 'trnsl.1.1.20200514T204951Z.23620eb9b26c9f0a.f8f0cbe2a82ede17a37632a689bd33b4c4452690';
  const URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${userText.value}&lang=${firstLang}-${secondLang}&format=plain&options=1`;
  
  const response = await fetch(URL);
  const respToJson = await response.json();
  const errorCode = respToJson.code;

  if (errorCode >= 300) {
    translateText.textContent = respToJson.code;
  }

  translateText.textContent = respToJson.text;
  userText.value = '';   
}

btn.addEventListener('click', getTranslate);