// Получаем элементы карусели
const carouselContainer = document.querySelector('.carousel-container');
const strategiesList = document.querySelector('.strategies-list');
const strategiesItems = Array.from(document.querySelectorAll('.strategies-item'));
const carouselDots = Array.from(document.querySelectorAll('.carousel-dot'));

// Устанавливаем активную карточку по центру
const setActiveItem = (index) => {
    strategiesItems.forEach((item) => {
      item.querySelector('.strategies-wrap-title').classList.remove('active');
    });
    strategiesItems[index].querySelector('.strategies-wrap-title').classList.add('active');  
};

const setActiveDotAndCards = (index) => {
    carouselDots.forEach((dot) => {
      dot.classList.remove('active');
    });
    carouselDots[index].classList.add('active');


     // Вычисляем индексы видимых карточек
  let startIdx, endIdx;
  if (index === 0) {
    startIdx = 0;
    endIdx = 2;
  } else if (index === 1) {
    startIdx = 1;
    endIdx = 3;
  } else if (index === 2) {
    startIdx = 2;
    endIdx = 4;
  }

  // Скрываем все карточки
  strategiesItems.forEach((item) => {
    item.style.display = 'none';
  });

  // Отображаем видимые карточки
  strategiesItems.slice(startIdx, endIdx + 1).forEach((item) => {
    item.style.display = 'block';
  });
};
// Переключение карточек
const switchCarousel = (direction) => {
  const itemWidth = strategiesItems[0].offsetWidth + 30; // Ширина карточки + отступ

  if (direction === 'next') {
    strategiesList.style.transform = `translateX(-${itemWidth}px)`;
    strategiesList.appendChild(strategiesItems.shift());
    strategiesItems.push(strategiesItems[0]);
  } else if (direction === 'prev') {
    strategiesList.style.transform = `translateX(${itemWidth}px)`;
    strategiesList.insertBefore(strategiesItems[strategiesItems.length - 1], strategiesItems[0]);
    strategiesItems.unshift(strategiesItems.pop());
  }

  strategiesList.style.transition = 'none';
  setTimeout(() => {
    strategiesList.style.transform = 'translateX(0)';
    strategiesList.style.transition = '';
  }, 0);

  const activeIndex = strategiesItems.findIndex((item) => item.querySelector('.strategies-wrap-title').classList.contains('active'));
  setActiveItem(activeIndex);
};

// Обработчики событий для переключения карточек
carouselContainer.addEventListener('click', (event) => {
    const target = event.target;
  
    if (target.classList.contains('carousel-dot')) {
      const dotIndex = carouselDots.indexOf(target);
  
      setActiveDotAndCards(dotIndex);
    }
  });
  

// Устанавливаем активную карточку по центру при загрузке страницы
window.addEventListener('load', () => {
    const initialIndex = Math.floor(strategiesItems.length / 2);
    setActiveItem(initialIndex);
    setActiveDotAndCards(initialIndex);
  });
