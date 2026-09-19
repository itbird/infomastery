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
