  const nav = document.getElementById('nav');
  const toggler = document.querySelector('.custom-toggler');

  nav.addEventListener('show.bs.collapse',()=>{
    document.body.classList.add('menu-open');
  });
  nav.addEventListener('hidden.bs.collapse',()=>{
    document.body.classList.remove('menu-open');
  });

  document.querySelectorAll('.navbar-nav .nav-link').forEach(link=>{
    link.addEventListener('click',()=>{
      if(window.innerWidth < 992){
        bootstrap.Collapse.getInstance(nav).hide();
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
  
  // Функция для правильного склонения слов
  function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
  }

  const eventDate = new Date('2026-04-25T10:00:00').getTime();
  
  const updateTimer = () => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
      document.getElementById('timer').innerHTML = '<h4 class="text-primary">Форум начался!</h4>';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    // Обновляем числа
    document.getElementById('days').textContent = d.toString().padStart(2, '0');
    document.getElementById('hours').textContent = h.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = s.toString().padStart(2, '0');

    // Обновляем текст (подписи) с правильным склонением
    document.getElementById('days-label').textContent = getNoun(d, 'день', 'дня', 'дней');
    document.getElementById('hours-label').textContent = getNoun(h, 'час', 'часа', 'часов');
    document.getElementById('minutes-label').textContent = getNoun(m, 'минута', 'минуты', 'минут');
    document.getElementById('seconds-label').textContent = getNoun(s, 'секунда', 'секунды', 'секунд');
  };

  setInterval(updateTimer, 1000);
  updateTimer();

  // Логика цен и модалки остается прежней...
  const prices = document.querySelectorAll('.price-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  prices.forEach(p => observer.observe(p));
  
  const modalElement = document.getElementById('subscribeModal');
  if (modalElement) {
    setTimeout(() => {
      const myModal = new bootstrap.Modal(modalElement);
      myModal.show();
    }, 3000);
  }
});




  document.addEventListener("DOMContentLoaded", function() {
        const container = document.getElementById('carouselContainer');
        const totalPhotos = 39;
        const folderName = 'gallery'; // Твоя папка

        for (let i = 1; i <= totalPhotos; i++) {
            const item = document.createElement('div');
            // Делаем первое фото активным
            item.className = `carousel-item ${i === 1 ? 'active' : ''}`;
            
            // Генерируем структуру слайда
            item.innerHTML = `
                <div class="photo-counter">Фото ${i} / ${totalPhotos}</div>
                <img src="${folderName}/${i}.jpg" 
                     class="d-block w-100" 
                     alt="Фото ${i}"
                     loading="lazy">
            `;
            
            container.appendChild(item);
        }
    });




    document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let form = this;
    let responseDiv = document.getElementById('formResponse');
    let formData = new FormData(form);

    fetch('send.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === 'success') {
            responseDiv.innerHTML = '<span class="text-success">Сообщение отправлено!</span>';
            form.reset();
        } else {
            responseDiv.innerHTML = '<span class="text-danger">Ошибка при отправке.</span>';
        }
    })
    .catch(error => {
        responseDiv.innerHTML = '<span class="text-danger">Произошла ошибка соединения.</span>';
    });
});



const swiper = new Swiper('.speaker-slider', {
  slidesPerView: 1, // По умолчанию 1 карточка
  spaceBetween: 20, // Расстояние между карточками
  loop: true,       // Зацикливание
  
  // Настройка адаптивности
  breakpoints: {
    576: { slidesPerView: 2 }, // Планшеты
    992: { slidesPerView: 4 }  // Десктоп (как в вашем col-md-3)
  },

  // Навигация
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Пагинация
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});