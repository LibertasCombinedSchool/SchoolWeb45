// Mobile nav toggle
const toggleBtn = document.querySelector('.mobile-toggle');
const nav = document.querySelector('nav');
if (toggleBtn){
  toggleBtn.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}
// High-contrast toggle
const hcBtn = document.querySelector('[data-action="hc-toggle"]');
if(hcBtn){
  const apply = v=> document.body.classList.toggle('hc', v);
  const saved = localStorage.getItem('hc')==='1';
  apply(saved);
  hcBtn.setAttribute('aria-pressed', saved);
  hcBtn.addEventListener('click', ()=>{
    const nv = !(localStorage.getItem('hc')==='1');
    localStorage.setItem('hc', nv?'1':'0');
    apply(nv); hcBtn.setAttribute('aria-pressed', nv);
  });
}
// Mock forms
for (const f of document.querySelectorAll('form[data-mock]')){
  f.addEventListener('submit', e=>{
    e.preventDefault();
    const box = f.querySelector('.status');
    box.textContent = 'Thanks! Your submission has been received.';
    box.classList.add('alert');
    f.reset();
  });
}
// Teachers filters
(function(){
  const container = document.querySelector('.teacher-grid');
  const buttons = document.querySelectorAll('.filter [data-filter]');
  if(!container || !buttons.length) return;
  const cards = [...container.querySelectorAll('.t-card')];
  function applyFilter(key){
    cards.forEach(card=>{
      const show = key==='all' || card.dataset.dept===key;
      card.style.display = show? '' : 'none';
    });
    buttons.forEach(b=> b.setAttribute('aria-pressed', b.dataset.filter===key?'true':'false'));
  }
  buttons.forEach(btn=> btn.addEventListener('click', ()=> applyFilter(btn.dataset.filter)));
})();
