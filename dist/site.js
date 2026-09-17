const workflow = document.querySelector('.workspace');
const story = document.createElement('div');
story.className = 'brand-story';
story.innerHTML = '<div><p class="eyebrow" data-zh="看看实际会怎么用">WHAT THIS COULD LOOK LIKE</p><h3 data-zh="客户问了一个问题，接下来呢？">A customer has a question.<br>What happens next?</h3><p data-zh="AI 参考你的服务介绍，准备一份回复草稿。员工检查、修改后再发出。先从这样一件小事开始，看看能否帮团队省下时间。">AI uses your service information to prepare a draft reply. A staff member checks and edits it before sending. Start with a task like this and see whether it saves your team time.</p></div>';
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

