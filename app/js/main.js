const burger = document.querySelector('.burger-menu')
const navMenu = document.querySelector('.menu')
const langSwitcher = document.querySelector('.header__switcher')
const animateElements = document.querySelectorAll('.skill-animate');
const skillsCoords = document.querySelector('.skills__list').getBoundingClientRect().top
const menuLinks = document.querySelectorAll('.menu__list-link');
const allLang = ['ru', 'en']
const langElements = document.querySelectorAll('.lng')

//бургер-меню

burger.addEventListener('click', () => {
  burger.classList.toggle('_active');
  navMenu.classList.toggle('_active');
  langSwitcher.classList.toggle('_active');
  document.body.classList.toggle('_lock');
})

//анимация скиллов по скроллу
window.addEventListener('scroll', () => {
  let scrollCoords = window.pageYOffset + document.documentElement.clientHeight;
  if (scrollCoords >= skillsCoords) {
    animateElements.forEach(el => el.classList.add('active-animate'))
  }

});

//плавная прокрутка
menuLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    burger.classList.remove('_active');
    navMenu.classList.remove('_active');
    langSwitcher.classList.remove('_active');
    document.body.classList.remove('_lock');
    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    })
  })
})

//переключатель языков

langSwitcher.addEventListener('change', (e) => {
  let lang = e.target.value;
  location.href = `${window.location.pathname}#${lang}`;
  location.reload();
})

const changeLanguage = () => {
  let hash = window.location.hash;
  hash = hash.substring(1);
  langSwitcher.value = hash;
  if (!allLang.includes(hash)) {
    location.href = `${window.location.pathname}#en`
  }
  const checkedRadio = langSwitcher.querySelector(`#${hash}Switch`);
  checkedRadio.checked = true;
  if (hash === 'ru') {
    langElements.forEach(el => {
      el.textContent = langRuArr[el.dataset.lng]
    })
  }
}

changeLanguage()



