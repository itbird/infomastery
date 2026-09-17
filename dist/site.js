const workflow = document.querySelector('.workspace');
const story = document.createElement('div');
story.className = 'brand-story';
story.innerHTML = '<div><p class="eyebrow" data-zh="让可能性变得具体">INTELLIGENCE, PUT TO WORK</p><h3 data-zh="连接你的知识。支持每一次服务。">Connect your knowledge.<br>Support every conversation.</h3><p data-zh="从客户的一条咨询，到有依据的回复草稿。AI 连接企业知识，团队保留审核与决定权。">From a customer enquiry to an informed draft response. AI connects your business knowledge while your team keeps control of the final decision.</p></div>';
story.appendChild(workflow);
document.querySelector('#solutions .wrap').appendChild(story);
const elements = [...document.querySelectorAll('[data-zh]')];
const english = new Map(elements.map(element => [element, element.innerHTML]));
const language = document.getElementById('language');
const menu = document.getElementById('menu');
const nav = document.getElementById('navigation');
const motion = document.getElementById('motion');
let isChinese = false;
function updateMotionLabel() {
  const paused = document.body.classList.contains('paused');
  motion.textContent = isChinese ? (paused ? '播放动画' : '暂停动画') : (paused ? 'Play motion' : 'Pause motion');
}
language.addEventListener('click', () => {
  isChinese = !isChinese;
  elements.forEach(element => {
    if (isChinese) element.textContent = element.dataset.zh;
    else element.innerHTML = english.get(element);
  });
  document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  document.title = isChinese ? 'Infomastery Technology | 澳洲企业 AI 解决方案' : 'Infomastery Technology | AI for Australian businesses';
  language.textContent = isChinese ? 'EN' : '中文';
  language.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换至中文');
  menu.setAttribute('aria-label', isChinese ? '打开导航' : 'Open menu');
  updateMotionLabel();
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

