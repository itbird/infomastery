// Brand geometry follows the three slanted bars in the Infomastery identity.
const heroObject = document.createElement('div');
heroObject.className = 'hero-object';
heroObject.setAttribute('aria-hidden', 'true');
heroObject.innerHTML = '<div class="object-orbit"></div><div class="object-orbit second"></div><div class="brand-object"><i></i><i></i><i></i></div><div class="object-caption"><span data-zh="连接业务与智能">BUSINESS × INTELLIGENCE</span><span>INFOMASTERY / 01</span></div>';
document.querySelector('.hero-grid').appendChild(heroObject);
// Decorative illustrations are custom vectors, not fictitious product screens.
const illustrations = [
  '<circle class="wire" cx="150" cy="80" r="62"/><circle class="wire" cx="150" cy="80" r="42"/><path class="wire" d="M40 80h220M150 9v142"/><g><path class="solid" d="m125 100 25-64 25 64-25-15z"/><circle class="accent" cx="150" cy="80" r="8"/></g>',
  '<path class="wire" d="M48 80h204M150 80v45h85"/><g><rect class="surface" x="30" y="55" width="52" height="50" rx="5"/><rect class="solid" x="124" y="55" width="52" height="50" rx="5"/><rect class="surface" x="220" y="55" width="52" height="50" rx="5"/><path d="m143 80 6 6 10-13" fill="none" stroke="white" stroke-width="2"/><circle class="accent" cx="235" cy="125" r="10"/></g>',
  '<g><path class="surface" d="M46 24h146v65H83l-22 20V89H46z"/><path class="solid" d="M112 70h145v63h-20v20l-23-20H112z"/><path d="M134 94h98m-98 15h67" stroke="#c4e6ef" stroke-width="3"/><circle class="accent" cx="74" cy="54" r="6"/><path class="wire" d="M92 54h71"/></g>',
  '<g><path class="surface" d="M62 29h108v114H62z"/><path class="wire" d="M80 51h70M80 66h54M80 81h65M80 97h36"/><circle class="solid" cx="195" cy="81" r="38"/><circle cx="195" cy="81" r="21" fill="none" stroke="#c3e4ef" stroke-width="2"/><path d="m210 98 23 24" stroke="#c3e4ef" stroke-width="5"/><circle class="accent" cx="110" cy="116" r="8"/></g>',
  '<g><path class="wire" d="M78 45h144v85H78zM150 45v85M78 87h144"/><rect class="surface" x="42" y="20" width="72" height="50" rx="4"/><rect class="solid" x="116" y="62" width="72" height="50" rx="4"/><rect class="surface" x="188" y="104" width="72" height="50" rx="4"/><path d="m139 80-7 7 7 7m21-14 7 7-7 7" fill="none" stroke="white" stroke-width="2"/><circle class="accent" cx="222" cy="45" r="9"/></g>',
  '<g><path class="surface" d="M46 132V99h49v33M107 132V68h49v64M168 132V35h49v97"/><path class="wire" d="M30 133h235"/><circle class="solid" cx="235" cy="37" r="23"/><path d="m225 37 7 7 13-15" stroke="white" stroke-width="2" fill="none"/><circle class="accent" cx="71" cy="74" r="9"/></g>'
];
document.querySelectorAll('.service').forEach((card, index) => {
  const art = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  art.setAttribute('viewBox', '0 0 300 170');
  art.setAttribute('class', 'service-art');
  art.setAttribute('aria-hidden', 'true');
  art.innerHTML = illustrations[index];
  card.querySelector('.service-top').after(art);
});
// Present capabilities before the supporting case example.
const servicesSection = document.getElementById('solutions');
document.getElementById('experience').before(servicesSection);
const workflow = document.querySelector('.workspace');
const story = document.createElement('div');
story.className = 'brand-story';
story.innerHTML = '<div><p class="eyebrow" data-zh="应用场景示意">WHAT THIS COULD LOOK LIKE</p><h3 data-zh="从客户咨询，到人工审核。">A customer has a question.<br>What happens next?</h3><p data-zh="AI 根据企业服务资料生成回复草稿，由员工审核、调整后发送。通过具体业务场景的小范围试用，评估方案对团队工作效率的实际影响。">AI uses your service information to prepare a draft reply. A staff member checks and edits it before sending. Start with a task like this and see whether it saves your team time.</p></div>';
story.appendChild(workflow);
document.querySelector('#solutions .wrap').appendChild(story);
const elements = [...document.querySelectorAll('[data-zh]')];
const english = new Map(elements.map(element => [element, element.innerHTML]));
const language = document.getElementById('language');
const menu = document.getElementById('menu');
const nav = document.getElementById('navigation');
const motion = document.getElementById('motion');
document.querySelector('.hero .micro').after(motion);
let isChinese = false;
function updateMotionLabel() {
  const paused = document.body.classList.contains('paused');
  motion.textContent = isChinese ? (paused ? '播放动画' : '暂停动画') : (paused ? 'Play motion' : 'Pause motion');
}
function setLanguage(selectedLanguage) {
  const nextIsChinese = selectedLanguage === 'zh-CN';
  if (nextIsChinese === isChinese) return;
  isChinese = nextIsChinese;
  elements.forEach(element => {
    if (isChinese) element.textContent = element.dataset.zh;
    else element.innerHTML = english.get(element);
  });
  document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  if (isChinese) document.querySelector('.hero h1 em').innerHTML = '<span>以业务需求</span><span>为核心。</span>';
  document.title = isChinese ? 'Infomastery Technology | 澳洲中小企业 AI 与 IT 解决方案' : 'Infomastery Technology | AI & IT Solutions for Australian SMEs';
  language.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === selectedLanguage));
  });
  menu.setAttribute('aria-label', isChinese ? '打开导航' : 'Open menu');
  updateMotionLabel();
}
language.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
motion.addEventListener('click', () => {
  const paused = document.body.classList.toggle('paused');
  motion.setAttribute('aria-pressed', String(paused));
  updateMotionLabel();
});
document.getElementById('year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.section-head, .service, .project-panel, .industry-list article, .steps li, .expertise-grid, .questions-grid, .contact');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); }
    });
  }, {threshold: .06});
  revealTargets.forEach(target => {target.classList.add('reveal'); reveals.observe(target);});
  document.body.classList.add('motion-ready');
  reducedMotion.addEventListener('change', event => {
    if (event.matches) document.body.classList.remove('motion-ready');
  });
}
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.appendChild(progress);
let scrollScheduled = false;
function updateScroll() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  let current = links[0];
  let closestTop = -Infinity;
  links.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    const top = section?.getBoundingClientRect().top;
    if (top <= 150 && top > closestTop) { current = link; closestTop = top; }
    link.removeAttribute('aria-current');
  });
  current?.setAttribute('aria-current', 'location');
  scrollScheduled = false;
}
addEventListener('scroll', () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScroll); }
}, {passive:true});
addEventListener('resize', updateScroll);
updateScroll();
