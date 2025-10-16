// ex1
const hoverEl = document.getElementById('passa-por-aqui');
const originalText = hoverEl.textContent;
const thanksText = '1. Obrigado por passares!';
hoverEl.addEventListener('mouseenter', () => hoverEl.textContent = thanksText);
hoverEl.addEventListener('mouseleave', () => hoverEl.textContent = originalText);
hoverEl.addEventListener('focus',      () => hoverEl.textContent = thanksText);
hoverEl.addEventListener('blur',       () => hoverEl.textContent = originalText);

// ex2
const paintTarget = document.getElementById('pinta-me');
document.querySelectorAll('#pinta-me-section .paint').forEach(btn => {
  btn.addEventListener('click', () => {
    paintTarget.style.color = btn.dataset.color;
  });
});

// ex3
const echoInput = document.getElementById('echo');
const palette = ['white', 'red', 'green', 'purple', 'blue', 'yellow'];
function updateEchoInputBg() {
  const n = echoInput.value.length;
  echoInput.style.backgroundColor = palette[n % palette.length]; // pinta DENTRO do input
}
echoInput.addEventListener('input', updateEchoInputBg);
updateEchoInputBg();

// ex4
document.getElementById('corSelect').onchange = function () {
  document.querySelector('body').style.backgroundColor = this.value; // usa THIS
};


// ex5
const COUNT_KEY = 'lab_counter_value';
const countBtn = document.getElementById('countBtn');
const counterEl = document.getElementById('counter');

let count = 0;
try {
  const saved = localStorage.getItem(COUNT_KEY);
  count = saved !== null ? Number(saved) : 0;
} catch { count = 0; }
counterEl.textContent = count;

countBtn.addEventListener('click', () => {
  count += 1;
  counterEl.textContent = count;
  try { localStorage.setItem(COUNT_KEY, String(count)); } catch {}
});

// ex6
document.querySelector('#infoForm').onsubmit = function (e) {
  e.preventDefault(); // não recarregar a página

  const nome  = document.getElementById('nome').value.trim();
  const idade = document.getElementById('idade').value.trim();
  const out   = document.getElementById('saudacao');

  if (!nome || idade === '') {
    out.textContent = 'Preenche o nome e a idade.';
    return;
  }

  out.textContent = `Olá, o ${nome} tem ${idade}!`;
};


// ex7
const autoCounterEl = document.getElementById('autoCounter');
let autoCount = 0;
function tick() {
  autoCount += 1;
  autoCounterEl.textContent = autoCount;
}

tick();              
setInterval(tick, 1000);
