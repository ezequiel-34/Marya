// Datos de las páginas: usa exactamente estas frases
const pagesData = [
  {
    img: 'assets/images/Foto1.jpg',
    text: 'Te extraño y quiero que me perdones, sé que soy un pelotudo... pero lo que te dije era todo mentira. Me duele que lo hayas tomado en serio y de verdad te pido perdón 💔'
  },
  {
    img: 'assets/images/Foto2.jpg',
    text: 'Te conozco desde los 5 años y desde ahí nunca nos separamos. Aunque parezca que sos más grande que yo, jamás te dejé de lado por nadie... sos muy importante para mí ♥️'
  },
  {
    img: 'assets/images/Foto3.jpg',
    text: 'Perdón por todo lo que hice... pero yo te quiero mucho brother 🥺'
  },
  {
    img: 'assets/images/Foto4.jpg',
    text: 'Admiro lo fuerte que sos. Sos una persona muy trabajadora que, sin importar su situación, siempre sigue adelante. Y aunque tengas bajones, siempre te levantás... eso te hace increíble 💖'
  }
];

const book = document.getElementById('book');
const cover = document.getElementById('cover');
const pagesContainer = document.getElementById('pages');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const music = document.getElementById('music');
const playAudioBtn = document.getElementById('playAudioBtn');

let currentIndex = 0;
let pageElements = [];

// Construye páginas
function buildPages(){
  pagesContainer.innerHTML = '';
  pageElements = pagesData.map((p, idx) => {
    const div = document.createElement('article');
    div.className = 'page';
    div.setAttribute('data-index', idx);

    div.innerHTML = `
      <div class="left">
        <img class="photo" src="${p.img}" alt="Foto ${idx+1}">
      </div>
      <div class="textwrap">
        <div class="text">${escapeHtml(p.text)}</div>
      </div>
    `;
    pagesContainer.appendChild(div);
    return div;
  });
}
function escapeHtml(s){ return s.replace(/\n/g,'<br/>'); }

// Control apertura: al tocar la portada se abre el libro
cover.addEventListener('click', () => {
  if (!book.classList.contains('open')){
    book.classList.add('open');
    // dar foco a primer control
    setTimeout(()=>{ updateControls() }, 600);
  }
});

// Navegación
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);

function updateControls(){
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= pagesData.length - 1;
}

// Página siguiente: añade clase flipped a la página actual para animación
function nextPage(){
  if (currentIndex >= pagesData.length - 1) return;
  const page = pageElements[currentIndex];
  page.classList.add('flipped');
  currentIndex++;
  updateControls();
}

// Página anterior: remueve clase flipped de la anterior
function prevPage(){
  if (currentIndex <= 0) return;
  currentIndex--;
  const page = pageElements[currentIndex];
  page.classList.remove('flipped');
  updateControls();
}

// Botón reproducir/pausar audio
playAudioBtn.addEventListener('click', () => {
  if (music.paused){
    music.play().catch(()=>{ /* Autoplay puede bloquearse en móvil, usuario deberá tocar */});
    playAudioBtn.textContent = '⏸';
  } else {
    music.pause();
    playAudioBtn.textContent = '▶️';
  }
});

// Touch swipe para cambiar página
let touchStartX = null;
pagesContainer.addEventListener('touchstart', (e) => {
  if (!book.classList.contains('open')) return;
  touchStartX = e.touches[0].clientX;
});
pagesContainer.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const dx = (e.changedTouches[0].clientX - touchStartX);
  if (dx < -30) nextPage();
  if (dx > 30) prevPage();
  touchStartX = null;
});

// Inicialización
buildPages();
updateControls();

// Si quieres que la música empiece sola al abrir, descomenta la siguiente línea (puede bloquearse por políticas de navegador):
// cover.addEventListener('click', ()=> music.play().catch(()=>{}));

/* Nota: aseguramos que las imágenes y el audio estén en:
   - assets/images/Foto1.jpg ... Foto4.jpg
   - assets/images/golosinas-calle.jpg (opcional, para el fondo)
   - assets/audio/musica.mp3
*/
