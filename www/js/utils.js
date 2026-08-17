// ==========================================
// 泡饮百科 - 工具函数与全局状态
// ==========================================

// ---- Utility Functions ----
function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

function vibrateFeedback() {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
}

function showToast(message, duration) {
  duration = duration || 2000;
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(function() {
    toast.classList.add('show');
  });
  
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, duration);
}

// ---- State ----
var currentTab = 'home';
var currentRecType = 'body';
var selectedRecOption = null;
var timerState = {
  running: false,
  paused: false,
  totalTime: 0,
  remaining: 0,
  interval: null,
  selectedTea: null,
  currentInfusion: 0,
  infusionTimes: []
};
var currentBrewItem = null;
var favoritesData = { materialIds: [], recipes: [] };
var selectedBodyType = null;
var selectedContraindications = [];
var scrollPositions = {};

// ---- Daily Tips ----
var DAILY_TIPS = [
  "绿茶用80\u00B0C水冲泡最佳，水温过高会破坏茶叶中的维生素C，使茶汤变苦。",
  "紫砂壶讲究「一壶一茶」，避免不同茶香互相串味，影响品饮体验。",
  "空腹不宜饮茶，茶中的咖啡碱会刺激胃黏膜，容易引起不适。",
  "白茶有「一年茶、三年药、七年宝」之说，存放越久，口感越醇厚。",
  "功夫茶泡法讲究「高冲低斟」，高冲激发茶香，低斟避免泡沫。",
  "普洱茶分为生茶和熟茶，生茶性寒，熟茶性温，选择时需根据体质。",
  "泡茶用水以山泉水为佳，其次是纯净水，自来水需静置去氯后再用。",
  "饭后不宜立即饮茶，茶中的鞣酸会影响蛋白质和铁质的吸收。",
  "乌龙茶最适合用功夫泡法，小壶小杯，能充分品味其香气层次。",
  "茶叶保存需避光、防潮、防异味，绿茶宜冷藏，普洱宜常温通风存放。",
  "黄茶产量稀少，仅占中国茶叶总产量的不到1%，是难得的茶中珍品。",
  "红茶是世界上饮用范围最广的茶类，在英国、印度、斯里兰卡广受欢迎。"
];

// ---- Theme Toggle (Dark Mode) ----
function initTheme() {
  var savedTheme = localStorage.getItem('tea-app-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleTheme() {
  var currentTheme = document.documentElement.getAttribute('data-theme');
  var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('tea-app-theme', newTheme);
}

// ---- Tab Navigation ----
function switchTab(tab) {
  if (currentTab) {
    scrollPositions[currentTab] = window.scrollY;
  }
  
  currentTab = tab;

  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  var targetPage = document.getElementById('page-' + tab);
  if (targetPage) targetPage.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.remove('active');
  });
  var targetNav = document.querySelector('.nav-item[data-tab="' + tab + '"]');
  if (targetNav) targetNav.classList.add('active');

  var savedPos = scrollPositions[tab];
  window.scrollTo(0, savedPos || 0);
  
  vibrateFeedback();
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  var targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.remove('active');
  });
  if (pageId === 'custom-pairing') {
    var pairingNav = document.querySelector('.nav-item[data-tab="pairing"]');
    if (pairingNav) pairingNav.classList.add('active');
  }
  
  window.scrollTo(0, 0);
}

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initHomePage();
  initTeasPage();
  initRecommendPage();
  initTimerPage();
  initProfilePage();
  initQuotesCarousel();
  initCategoryPages();
  initPairingPage();
  initBodyTypePage();
  initContraindicationPage();
  initFavoritesPage();
  initCustomPairing();
});
