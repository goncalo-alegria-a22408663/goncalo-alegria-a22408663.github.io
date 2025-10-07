const yearEl   = document.getElementById("year");
const countEl  = document.getElementById("countValue");
const incBtn   = document.getElementById("incBtn");
const decBtn   = document.getElementById("decBtn");
const resetBtn = document.getElementById("resetBtn");
const colorCard  = document.getElementById("colorCard");
const playground = document.getElementById("playground");
const coordsEl = document.getElementById("coords");

let counter = 0;

function renderCount(){ countEl.textContent = counter; }

function onClickInc(){ counter++; renderCount(); }
function onClickDec(){ counter--; renderCount(); }
function onDblclickReset(){ counter = 0; renderCount(); }
function onMouseOverCard(){ colorCard.classList.add("is-hover"); }
function onMouseOutCard(){ colorCard.classList.remove("is-hover"); }
function onMouseMovePlayground(ev){
  const rect = playground.getBoundingClientRect();
  const x = Math.round(ev.clientX - rect.left);
  const y = Math.round(ev.clientY - rect.top);
  coordsEl.textContent = `x: ${x}, y: ${y}`;
}

function init(){
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  renderCount();
  incBtn.addEventListener("click", onClickInc);
  decBtn.addEventListener("click", onClickDec);
  resetBtn.addEventListener("dblclick", onDblclickReset);
  colorCard.addEventListener("mouseover", onMouseOverCard);
  colorCard.addEventListener("mouseout", onMouseOutCard);
  playground.addEventListener("mousemove", onMouseMovePlayground);
}

document.addEventListener("DOMContentLoaded", init);
