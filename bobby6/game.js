const MONTHS = [
  { en: 'November', es: 'Noviembre', desc: 'Celebramos tu cumpleaños!' },
  { en: 'December', es: 'Diciembre', desc: 'Tu primer concierto del coro' },
  { en: 'January',  es: 'Enero',     desc: 'Fuimos a la fiesta de mi trabajo y luego tomamos de más XD' },
  { en: 'February', es: 'Febrero',   desc: 'Esquiamos un día hasta 8 horas seguidas!' },
  { en: 'March',    es: 'Marzo',     desc: 'Wooooodwaaaarddddd' },
  { en: 'April',    es: 'Abril',     desc: 'Fuimos a San Diego a visitar muchos skateparks' },
  { en: 'May',      es: 'Mayo',      desc: 'Me llevaste a comer a Sagus y encontramos una tienda de ropa chidita' },
  { en: 'June',     es: 'Junio',     desc: 'Seguimos patinando y nos vamos a mudar de casa!' },
];

let selectedTag = null;
let matchedCount = 0;

const preview = document.createElement('div');
preview.id = 'photo-preview';
const previewImg = document.createElement('img');
preview.appendChild(previewImg);
document.body.appendChild(preview);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initGame() {
  selectedTag = null;
  matchedCount = 0;

  const tagsEl = document.getElementById('month-tags');
  const gridEl = document.getElementById('photo-grid');
  const progressEl = document.getElementById('progress');

  tagsEl.innerHTML = '';
  gridEl.innerHTML = '';
  progressEl.textContent = `0 / ${MONTHS.length} matched`;

  MONTHS.forEach(({ en, es }) => {
    const tag = document.createElement('div');
    tag.className = 'month-tag';
    tag.textContent = es;
    tag.dataset.month = en;
    tag.addEventListener('click', () => onTagClick(tag));
    tagsEl.appendChild(tag);
  });

  shuffle(MONTHS).forEach(({ en, es, desc }) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.dataset.month = en;

    const img = document.createElement('img');
    img.src = `img/${en.toLowerCase()}.jpg`;
    img.alt = es;
    img.draggable = false;

    const label = document.createElement('div');
    label.className = 'photo-label';
    label.textContent = '✓ ' + es;

    const description = document.createElement('div');
    description.className = 'photo-description';
    description.textContent = desc;

    card.appendChild(img);
    card.appendChild(label);
    card.appendChild(description);
    card.addEventListener('click', () => onCardClick(card));
    card.addEventListener('mouseenter', () => { if (!selectedTag) { previewImg.src = img.src; preview.classList.add('visible'); } });
    card.addEventListener('mouseleave', () => preview.classList.remove('visible'));
    gridEl.appendChild(card);
  });
}

function onTagClick(tag) {
  if (tag.classList.contains('matched')) return;

  if (selectedTag === tag) {
    deselect();
    return;
  }

  deselect();
  selectedTag = tag;
  tag.classList.add('selected');
  preview.classList.remove('visible');
}

function deselect() {
  if (selectedTag) {
    selectedTag.classList.remove('selected');
    selectedTag = null;
  }
}

function onCardClick(card) {
  if (!selectedTag || card.classList.contains('correct')) return;

  if (selectedTag.dataset.month === card.dataset.month) {
    card.classList.add('correct');
    selectedTag.classList.add('matched');
    selectedTag.classList.remove('selected');
    selectedTag = null;
    matchedCount++;
    document.getElementById('progress').textContent = `${matchedCount} / 7 matched`;

    if (matchedCount === MONTHS.length) {
      setTimeout(showCelebration, 700);
    }
  } else {
    card.classList.add('wrong');
    card.addEventListener('animationend', () => card.classList.remove('wrong'), { once: true });
  }
}

function showCelebration() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('celebration').classList.remove('hidden');
  launchConfetti();
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#d63060', '#ff80ab', '#ffffff', '#ffc2d4', '#b5294a', '#ffecf1', '#ff6090'];

  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = Math.random() * 10 + 6;
    piece.style.cssText = `
      left: ${Math.random() * 100}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${Math.random() * 2 + 2.5}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(piece);
  }
}

document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  initGame();
});

document.getElementById('playAgainBtn').addEventListener('click', () => {
  document.getElementById('celebration').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  initGame();
});
