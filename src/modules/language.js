

export function selectLanguage(lang, btns) {
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].dataset.value === lang) {
      btns[i].classList.add('selected-language');
    }
    else {
      btns[i].classList.remove('selected-language');
    }
  }
}


export function setMenuLanguage(lang, btns, obj) {
  btns.forEach((element, index) => {
    element.firstElementChild.innerHTML = obj[lang][index];
  })
};


