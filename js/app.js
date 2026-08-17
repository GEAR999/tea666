// ==========================================
// 泡饮百科 - 主应用逻辑
// ==========================================

// ---- State ----
let currentTab = 'home';
let currentRecType = 'body';
let selectedRecOption = null;
let timerState = {
  running: false,
  paused: false,
  totalTime: 0,
  remaining: 0,
  interval: null,
  selectedTea: null,
  currentInfusion: 0,
  infusionTimes: []
};
let currentBrewItem = null;
let favorites = JSON.parse(localStorage.getItem('brew-favorites') || '[]');
let selectedBodyType = null;
let selectedContraindications = [];

// ---- Daily Tips ----
const DAILY_TIPS = [
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
  currentTab = tab;

  // Update pages
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  var targetPage = document.getElementById('page-' + tab);
  if (targetPage) targetPage.classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.remove('active');
  });
  var targetNav = document.querySelector('.nav-item[data-tab="' + tab + '"]');
  if (targetNav) targetNav.classList.add('active');

  // Scroll to top
  window.scrollTo(0, 0);
}

// Show a specific page (for sub-pages like custom-pairing)
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  var targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  
  // Update nav to show pairing as active
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.remove('active');
  });
  if (pageId === 'custom-pairing') {
    var pairingNav = document.querySelector('.nav-item[data-tab="pairing"]');
    if (pairingNav) pairingNav.classList.add('active');
  }
  
  window.scrollTo(0, 0);
}

// ---- HOME PAGE ----
function initHomePage() {
  // Season card
  var now = new Date();
  var month = now.getMonth() + 1;
  var seasonKey;
  if (month >= 3 && month <= 5) seasonKey = 'spring';
  else if (month >= 6 && month <= 8) seasonKey = 'summer';
  else if (month >= 9 && month <= 11) seasonKey = 'autumn';
  else seasonKey = 'winter';

  var seasonEmojis = { spring: '\uD83C\uDF38', summer: '\u2600\uFE0F', autumn: '\uD83C\uDF42', winter: '\u2744\uFE0F' };
  var season = TEA_DATA.seasons[seasonKey];
  document.getElementById('season-emoji').textContent = seasonEmojis[seasonKey];
  document.getElementById('season-title').textContent = season.label + '饮茶';
  document.getElementById('season-advice').textContent = season.advice;

  // Tea row
  var row = document.getElementById('home-tea-row');
  row.innerHTML = '';
  TEA_DATA.categories.forEach(function(cat) {
    var div = document.createElement('div');
    div.className = 'home-tea-mini';
    div.innerHTML = '<span class="mini-emoji">' + cat.emoji + '</span><span class="mini-name">' + cat.name + '</span>';
    div.onclick = function() { openTeaDetail(cat.id); };
    row.appendChild(div);
  });

  // Daily tip
  var tipIndex = now.getDate() % DAILY_TIPS.length;
  document.getElementById('daily-tip').textContent = DAILY_TIPS[tipIndex];

  // Today's recommendation
  initTodayRecommendation(seasonKey, now);
}

// ---- Today's Recommendation ----
function initTodayRecommendation(seasonKey, now) {
  var hour = now.getHours();
  var timeKey;
  var timeLabel;
  if (hour >= 6 && hour < 12) {
    timeKey = 'morning';
    timeLabel = '早晨';
  } else if (hour >= 12 && hour < 18) {
    timeKey = 'afternoon';
    timeLabel = '下午';
  } else {
    timeKey = 'evening';
    timeLabel = '晚上';
  }

  document.getElementById('rec-time-label').textContent = timeLabel;

  var timeRec = TEA_DATA.recommendations.time[timeKey];
  var seasonRec = TEA_DATA.seasons[seasonKey];

  // Combine time and season recommendations
  var recommendedTeaIds = [];
  var reasons = {};

  // Add time-based teas
  timeRec.teas.forEach(function(teaId) {
    if (recommendedTeaIds.indexOf(teaId) === -1) {
      recommendedTeaIds.push(teaId);
      reasons[teaId] = timeRec.advice;
    }
  });

  // Add season-based tea if not already included
  if (recommendedTeaIds.indexOf(seasonRec.tea) === -1) {
    recommendedTeaIds.push(seasonRec.tea);
    reasons[seasonRec.tea] = seasonRec.advice;
  }

  var contentDiv = document.getElementById('today-rec-content');
  contentDiv.innerHTML = '';

  recommendedTeaIds.forEach(function(teaId) {
    var cat = TEA_DATA.categories.find(function(c) { return c.id === teaId; });
    if (!cat) return;

    var teaDiv = document.createElement('div');
    teaDiv.className = 'today-rec-tea';
    teaDiv.innerHTML =
      '<span class="tea-emoji">' + cat.emoji + '</span>' +
      '<div class="tea-info">' +
        '<div class="tea-name">' + cat.name + '</div>' +
        '<div class="tea-reason">' + reasons[teaId] + '</div>' +
      '</div>';
    teaDiv.onclick = function() { openTeaDetail(teaId); };
    contentDiv.appendChild(teaDiv);
  });
}

// ---- Quotes Carousel ----
var quoteInterval = null;
var currentQuoteIndex = 0;

function initQuotesCarousel() {
  var quotes = TEA_DATA.teaQuotes;
  if (!quotes || quotes.length === 0) return;

  // Initialize 3 quote slots
  for (var i = 0; i < 3; i++) {
    var quoteEl = document.getElementById('quote-' + i);
    if (quoteEl) {
      var quoteText = quotes[i % quotes.length];
      var parts = quoteText.split('——');
      var content = parts[0].trim();
      var author = parts.length > 1 ? parts[1].trim() : '';
      quoteEl.innerHTML = content + (author ? '<span class="quote-author">—— ' + author + '</span>' : '');
    }
  }

  // Start carousel
  startQuotesCarousel();
}

function startQuotesCarousel() {
  var quotes = TEA_DATA.teaQuotes;
  if (!quotes || quotes.length <= 3) return;

  quoteInterval = setInterval(function() {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;

    // Fade out current
    var currentEl = document.querySelector('.quote-item.active');
    if (currentEl) currentEl.classList.remove('active');

    // Get next slot
    var nextSlotIndex = currentQuoteIndex % 3;
    var nextEl = document.getElementById('quote-' + nextSlotIndex);

    // Update content
    var quoteText = quotes[currentQuoteIndex];
    var parts = quoteText.split('——');
    var content = parts[0].trim();
    var author = parts.length > 1 ? parts[1].trim() : '';
    nextEl.innerHTML = content + (author ? '<span class="quote-author">—— ' + author + '</span>' : '');

    // Fade in
    setTimeout(function() {
      nextEl.classList.add('active');
    }, 50);
  }, 5000);
}

// ---- TEAS PAGE ----
function initTeasPage() {
  renderTeaGrid(TEA_DATA.categories);
}

function renderTeaGrid(categories) {
  var grid = document.getElementById('tea-grid');
  grid.innerHTML = '';
  categories.forEach(function(cat) {
    var div = document.createElement('div');
    div.className = 'tea-card';
    div.innerHTML =
      '<span class="tea-emoji">' + cat.emoji + '</span>' +
      '<div class="tea-name">' + cat.name + '</div>' +
      '<div class="tea-ferment">' + cat.fermentation + '</div>';
    div.onclick = function() { openTeaDetail(cat.id); };
    grid.appendChild(div);
  });
}

function filterTeas() {
  var query = document.getElementById('tea-search').value.trim().toLowerCase();
  if (!query) {
    renderTeaGrid(TEA_DATA.categories);
    return;
  }
  var filtered = TEA_DATA.categories.filter(function(cat) {
    if (cat.name.toLowerCase().includes(query)) return true;
    if (cat.fermentation.toLowerCase().includes(query)) return true;
    if (cat.famousTeas.some(function(t) { return t.toLowerCase().includes(query); })) return true;
    if (cat.description.toLowerCase().includes(query)) return true;
    return false;
  });
  renderTeaGrid(filtered);
}

// ---- TEA DETAIL ----
function openTeaDetail(teaId) {
  var cat = TEA_DATA.categories.find(function(c) { return c.id === teaId; });
  if (!cat) return;

  document.getElementById('detail-title').textContent = cat.name;
  document.getElementById('detail-emoji').textContent = cat.emoji;
  document.getElementById('detail-name').textContent = cat.name;
  document.getElementById('detail-ferment').textContent = cat.fermentation;
  document.getElementById('detail-desc').textContent = cat.description;

  // Brewing info
  var brewGrid = document.getElementById('detail-brewing');
  brewGrid.innerHTML = '';
  var brewItems = [
    { label: '水温', value: cat.brewing.waterTemp },
    { label: '投茶量', value: cat.brewing.teaAmount },
    { label: '出汤时间', value: cat.brewing.steepTime },
    { label: '是否洗茶', value: cat.brewing.rinse ? '需要洗茶' : '无需洗茶' },
    { label: '可泡次数', value: cat.brewing.infusions }
  ];
  brewItems.forEach(function(item) {
    var div = document.createElement('div');
    div.className = 'info-item';
    div.innerHTML = '<div class="info-label">' + item.label + '</div><div class="info-value">' + item.value + '</div>';
    brewGrid.appendChild(div);
  });

  // Famous teas
  var famousList = document.getElementById('detail-famous');
  famousList.innerHTML = '';
  cat.famousTeas.forEach(function(t) {
    var span = document.createElement('span');
    span.className = 'famous-tea-item';
    span.textContent = t;
    famousList.appendChild(span);
  });

  // Tea Guide - Famous Tea Details
  var teaGuideDiv = document.getElementById('detail-tea-guide');
  teaGuideDiv.innerHTML = '';
  cat.famousTeas.forEach(function(teaName) {
    var details = TEA_DATA.famousTeaDetails[teaName];
    if (!details) return;

    var card = document.createElement('div');
    card.className = 'famous-tea-detail';
    card.innerHTML =
      '<div class="tea-name-header">' + teaName + '</div>' +
      '<div class="detail-row"><span class="detail-label">干茶:</span><span class="detail-value">' + details.dryLeaf + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">汤色:</span><span class="detail-value">' + details.teaSoup + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">叶底:</span><span class="detail-value">' + details.leafBottom + '</span></div>';
    teaGuideDiv.appendChild(card);
  });

  // History Section
  var historyDiv = document.getElementById('detail-history');
  historyDiv.innerHTML = '';
  var history = TEA_DATA.history[teaId];
  if (history) {
    var originCard = document.createElement('div');
    originCard.className = 'history-card';
    originCard.innerHTML =
      '<div class="history-title">&#x1F4DC; 起源</div>' +
      '<div class="history-content">' + history.origin + '</div>';
    historyDiv.appendChild(originCard);

    var evolutionCard = document.createElement('div');
    evolutionCard.className = 'history-card';
    evolutionCard.innerHTML =
      '<div class="history-title">&#x23F3; 工艺演变</div>' +
      '<div class="history-content">' + history.evolution + '</div>';
    historyDiv.appendChild(evolutionCard);

    var storyCard = document.createElement('div');
    storyCard.className = 'history-card';
    storyCard.innerHTML =
      '<div class="history-title">&#x1F4D6; 文化典故</div>' +
      '<div class="history-content">' + history.story + '</div>';
    historyDiv.appendChild(storyCard);
  }

  // Fun Facts Section
  var funFactsDiv = document.getElementById('detail-fun-facts');
  funFactsDiv.innerHTML = '';
  var funFacts = TEA_DATA.funFacts[teaId];
  if (funFacts) {
    funFacts.forEach(function(fact) {
      var card = document.createElement('div');
      card.className = 'fun-fact-card';
      card.innerHTML =
        '<span class="fact-icon">&#x1F4A1;</span>' +
        '<span class="fact-text">' + fact + '</span>';
      funFactsDiv.appendChild(card);
    });
  }

  // Teaware
  var teawareList = document.getElementById('detail-teaware');
  teawareList.innerHTML = '';
  cat.teaware.forEach(function(t) {
    var span = document.createElement('span');
    span.className = 'famous-tea-item';
    span.textContent = t;
    teawareList.appendChild(span);
  });

  // Benefits
  var benefitsList = document.getElementById('detail-benefits');
  benefitsList.innerHTML = '';
  cat.health.benefits.forEach(function(b) {
    var li = document.createElement('li');
    li.textContent = b;
    benefitsList.appendChild(li);
  });

  // Suitable body
  var suitableList = document.getElementById('detail-suitable');
  suitableList.innerHTML = '';
  cat.health.suitableBody.forEach(function(s) {
    var span = document.createElement('span');
    span.className = 'famous-tea-item';
    span.textContent = s;
    suitableList.appendChild(span);
  });

  // Taboos
  var taboosList = document.getElementById('detail-taboos');
  taboosList.innerHTML = '';
  cat.health.taboo.forEach(function(t) {
    var li = document.createElement('li');
    li.textContent = t;
    taboosList.appendChild(li);
  });

  // Season
  document.getElementById('detail-season').textContent = cat.season;

  document.getElementById('tea-detail').classList.add('active');
}

function closeTeaDetail() {
  document.getElementById('tea-detail').classList.remove('active');
}

// ---- RECOMMEND PAGE ----
function initRecommendPage() {
  renderRecOptions('body');
}

function switchRecTab(type) {
  currentRecType = type;
  selectedRecOption = null;

  document.querySelectorAll('.rec-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  document.querySelector('.rec-tab[data-rec-type="' + type + '"]').classList.add('active');

  document.getElementById('rec-result').classList.remove('visible');
  renderRecOptions(type);
}

function renderRecOptions(type) {
  var container = document.getElementById('rec-content');
  var data = TEA_DATA.recommendations[type];
  container.innerHTML = '<div class="rec-options" id="rec-options"></div>';
  var optionsDiv = document.getElementById('rec-options');

  Object.keys(data).forEach(function(key) {
    var item = data[key];
    var div = document.createElement('div');
    div.className = 'rec-option';
    div.setAttribute('data-key', key);
    div.innerHTML =
      '<div class="option-title">' + item.label + '</div>' +
      '<div class="option-desc">' + item.description + '</div>';
    div.onclick = function() { selectRecOption(key, type); };
    optionsDiv.appendChild(div);
  });
}

function selectRecOption(key, type) {
  selectedRecOption = key;

  document.querySelectorAll('.rec-option').forEach(function(o) {
    o.classList.remove('selected');
  });
  document.querySelector('.rec-option[data-key="' + key + '"]').classList.add('selected');

  var data = TEA_DATA.recommendations[type][key];
  var resultDiv = document.getElementById('rec-result');
  document.getElementById('rec-advice-text').textContent = data.advice;

  var chipsDiv = document.getElementById('rec-tea-chips');
  chipsDiv.innerHTML = '';
  data.teas.forEach(function(teaId) {
    var cat = TEA_DATA.categories.find(function(c) { return c.id === teaId; });
    if (!cat) return;
    var chip = document.createElement('div');
    chip.className = 'rec-tea-chip';
    chip.innerHTML = '<span>' + cat.emoji + '</span><span>' + cat.name + '</span>';
    chip.onclick = function() { openTeaDetail(teaId); };
    chipsDiv.appendChild(chip);
  });

  resultDiv.classList.add('visible');
}

// ---- TIMER PAGE ----
function initTimerPage() {
  var grid = document.getElementById('timer-tea-grid');
  grid.innerHTML = '';
  TEA_DATA.categories.forEach(function(cat) {
    var btn = document.createElement('div');
    btn.className = 'timer-tea-btn';
    btn.setAttribute('data-tea', cat.id);
    btn.textContent = cat.name;
    btn.onclick = function() { selectTimerTea(cat.id); };
    grid.appendChild(btn);
  });
}

function selectTimerTea(teaId) {
  // Stop any running timer
  if (timerState.running || timerState.paused) {
    resetTimer();
  }

  timerState.selectedTea = teaId;

  document.querySelectorAll('.timer-tea-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  document.querySelector('.timer-tea-btn[data-tea="' + teaId + '"]').classList.add('active');

  var cat = TEA_DATA.categories.find(function(c) { return c.id === teaId; });
  if (!cat) return;

  // Parse steep time to seconds
  var seconds = parseSteepTime(cat.brewing.steepTime);
  timerState.totalTime = seconds;
  timerState.remaining = seconds;
  timerState.currentInfusion = 0;

  // Generate infusion times
  timerState.infusionTimes = [];
  var maxInfusions = parseInt(cat.brewing.infusions) || 4;
  for (var i = 0; i < maxInfusions; i++) {
    var t = seconds + (i * Math.round(seconds * 0.3));
    timerState.infusionTimes.push(t);
  }

  updateTimerDisplay();
  renderInfusionList();
  document.getElementById('infusion-info').style.display = 'block';
  document.getElementById('timer-status').textContent = '第' + (timerState.currentInfusion + 1) + '泡';
}

function parseSteepTime(timeStr) {
  // Handle formats like "2-3分钟", "15-30秒", "3-5分钟"
  var match = timeStr.match(/(\d+)-?(\d+)?\s*分钟/);
  if (match) {
    var avg = match[2] ? (parseInt(match[1]) + parseInt(match[2])) / 2 : parseInt(match[1]);
    return Math.round(avg * 60);
  }
  match = timeStr.match(/(\d+)-?(\d+)?\s*秒/);
  if (match) {
    var avgSec = match[2] ? (parseInt(match[1]) + parseInt(match[2])) / 2 : parseInt(match[1]);
    return avgSec;
  }
  return 120; // default 2 minutes
}

function updateTimerDisplay() {
  var minutes = Math.floor(timerState.remaining / 60);
  var seconds = timerState.remaining % 60;
  document.getElementById('timer-time').textContent =
    String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

  // Update ring
  var circumference = 2 * Math.PI * 100; // 628.32
  var progress = timerState.totalTime > 0 ? (timerState.totalTime - timerState.remaining) / timerState.totalTime : 0;
  var offset = circumference * (1 - progress);
  document.getElementById('timer-progress').setAttribute('stroke-dashoffset', offset);
}

function toggleTimer() {
  if (!timerState.selectedTea) {
    document.getElementById('timer-status').textContent = '请先选择茶类';
    return;
  }

  var btn = document.getElementById('timer-start-btn');

  if (timerState.running) {
    // Pause
    clearInterval(timerState.interval);
    timerState.running = false;
    timerState.paused = true;
    btn.textContent = '继续';
    document.getElementById('timer-status').textContent = '已暂停';
  } else if (timerState.paused) {
    // Resume
    timerState.running = true;
    timerState.paused = false;
    btn.textContent = '暂停';
    document.getElementById('timer-status').textContent = '第' + (timerState.currentInfusion + 1) + '泡';
    startCountdown();
  } else {
    // Start fresh
    timerState.running = true;
    timerState.paused = false;
    timerState.remaining = timerState.infusionTimes[timerState.currentInfusion] || timerState.totalTime;
    timerState.totalTime = timerState.remaining;
    btn.textContent = '暂停';
    document.getElementById('timer-status').textContent = '第' + (timerState.currentInfusion + 1) + '泡';
    document.getElementById('timer-display').classList.remove('finished');
    startCountdown();
  }
}

function startCountdown() {
  timerState.interval = setInterval(function() {
    if (timerState.remaining <= 0) {
      clearInterval(timerState.interval);
      timerState.running = false;
      onTimerComplete();
      return;
    }
    timerState.remaining--;
    updateTimerDisplay();
  }, 1000);
}

function onTimerComplete() {
  var display = document.getElementById('timer-display');
  display.classList.add('finished');
  document.getElementById('timer-status').textContent = '出汤！';
  document.getElementById('timer-start-btn').textContent = '下一泡';

  // Mark current infusion as done
  var items = document.querySelectorAll('.infusion-item');
  if (items[timerState.currentInfusion]) {
    items[timerState.currentInfusion].classList.add('done');
    items[timerState.currentInfusion].classList.remove('current');
  }

  // Vibrate if supported
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }
}

function resetTimer() {
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.paused = false;
  timerState.remaining = 0;
  timerState.totalTime = 0;
  timerState.currentInfusion = 0;

  document.getElementById('timer-time').textContent = '00:00';
  document.getElementById('timer-start-btn').textContent = '开始';
  document.getElementById('timer-status').textContent = timerState.selectedTea ? '选择茶类开始' : '选择茶类开始';
  document.getElementById('timer-progress').setAttribute('stroke-dashoffset', '0');
  document.getElementById('timer-display').classList.remove('finished');
  document.getElementById('infusion-info').style.display = 'none';
}

function nextInfusion() {
  timerState.currentInfusion++;
  if (timerState.currentInfusion >= timerState.infusionTimes.length) {
    document.getElementById('timer-status').textContent = '已泡完所有泡次';
    document.getElementById('timer-start-btn').textContent = '开始';
    return;
  }

  timerState.totalTime = timerState.infusionTimes[timerState.currentInfusion];
  timerState.remaining = timerState.totalTime;
  timerState.running = false;
  timerState.paused = false;

  document.getElementById('timer-start-btn').textContent = '开始';
  document.getElementById('timer-display').classList.remove('finished');
  document.getElementById('timer-status').textContent = '第' + (timerState.currentInfusion + 1) + '泡';

  updateTimerDisplay();
  renderInfusionList();
}

function renderInfusionList() {
  var list = document.getElementById('infusion-list');
  list.innerHTML = '';
  timerState.infusionTimes.forEach(function(time, i) {
    var div = document.createElement('div');
    div.className = 'infusion-item';
    if (i === timerState.currentInfusion) div.classList.add('current');
    if (i < timerState.currentInfusion) div.classList.add('done');

    var min = Math.floor(time / 60);
    var sec = time % 60;
    var timeStr = min > 0 ? min + '分' + (sec > 0 ? sec + '秒' : '') : sec + '秒';

    div.innerHTML = '<span>第' + (i + 1) + '泡</span><span>' + timeStr + '</span>';
    list.appendChild(div);
  });
}

// Override toggleTimer to handle "next infusion" state
var originalToggleTimer = toggleTimer;
toggleTimer = function() {
  var btn = document.getElementById('timer-start-btn');
  if (btn.textContent === '下一泡') {
    nextInfusion();
    return;
  }
  originalToggleTimer();
};

// ---- PROFILE PAGE ----
function initProfilePage() {
  // Teaware list
  var teawareDiv = document.getElementById('teaware-list');
  teawareDiv.innerHTML = '';
  var teawareIcons = { glass: '\uD83E\uDD43', gaiwan: '\uD83C\uDF75', zisha: '\uD83C\uDFBA', ceramic: '\uD83C\uDF76', clay: '\u2615' };

  TEA_DATA.teaware.forEach(function(tw) {
    var card = document.createElement('div');
    card.className = 'teaware-card';

    var featuresHtml = '';
    tw.features.forEach(function(f) {
      featuresHtml += '<span class="teaware-feature">' + f + '</span>';
    });

    card.innerHTML =
      '<h3>' + (teawareIcons[tw.id] || '\uD83C\uDF75') + ' ' + tw.name + '</h3>' +
      '<div class="material">' + tw.material + ' | 参考价: ' + tw.priceRange + '</div>' +
      '<div class="teaware-features">' + featuresHtml + '</div>' +
      '<div class="teaware-suitable">适配茶类: ' + tw.suitableTea.join('、') + '</div>' +
      '<div class="teaware-tips">' + tw.tips + '</div>';

    teawareDiv.appendChild(card);
  });

  // Season list
  var seasonDiv = document.getElementById('season-list');
  seasonDiv.innerHTML = '';
  var seasonEmojis = { spring: '\uD83C\uDF38', summer: '\u2600\uFE0F', autumn: '\uD83C\uDF42', winter: '\u2744\uFE0F' };

  Object.keys(TEA_DATA.seasons).forEach(function(key) {
    var s = TEA_DATA.seasons[key];
    var cat = TEA_DATA.categories.find(function(c) { return c.id === s.tea; });
    var card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = '10px';
    card.style.cursor = 'default';
    card.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">' +
      '<span style="font-size:1.3rem;">' + seasonEmojis[key] + '</span>' +
      '<span style="font-family:var(--font-serif);font-weight:600;">' + s.label + '</span>' +
      (cat ? '<span class="tag" style="margin-left:auto;">' + cat.emoji + ' ' + cat.name + '</span>' : '') +
      '</div>' +
      '<p style="font-size:0.85rem;color:var(--color-text-secondary);line-height:1.6;">' + s.advice + '</p>';
    seasonDiv.appendChild(card);
  });
}

function showAbout() {
  alert('泡饮百科 v2.0\n\n一款专注于泡饮文化的知识应用。\n涵盖六大茶类、花草茶、中药材、\n养生茶饮、果茶类百科，\n智能搭配推荐、体质查询等功能。\n\n愿每一杯茶，都泡得恰到好处。');
}

// ---- CATEGORY PAGES ----
function initCategoryPages() {
  renderCategoryGrid('flower', BREW_DATA.flowerTeas);
  renderCategoryGrid('herb', BREW_DATA.herbs);
  renderCategoryGrid('wellness', BREW_DATA.wellnessTeas);
  renderCategoryGrid('fruit', BREW_DATA.fruitTeas);
}

function renderCategoryGrid(category, items) {
  var grid = document.getElementById(category + '-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  items.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'tea-card';
    card.innerHTML =
      '<div class="tea-emoji">' + item.emoji + '</div>' +
      '<div class="tea-info">' +
        '<div class="tea-name">' + item.name + '</div>' +
        '<div class="tea-desc">' + item.nature + '</div>' +
      '</div>';
    card.onclick = function() { openBrewDetail(item); };
    grid.appendChild(card);
  });
}

function filterBrewItems(category) {
  var searchInput = document.getElementById(category + '-search');
  var keyword = searchInput.value.toLowerCase().trim();
  var grid = document.getElementById(category + '-grid');
  
  var itemsMap = {
    flower: BREW_DATA.flowerTeas,
    herb: BREW_DATA.herbs,
    wellness: BREW_DATA.wellnessTeas,
    fruit: BREW_DATA.fruitTeas
  };
  
  var items = itemsMap[category] || [];
  var filtered = items.filter(function(item) {
    return item.name.toLowerCase().includes(keyword) ||
           item.description.toLowerCase().includes(keyword) ||
           item.benefits.some(function(b) { return b.toLowerCase().includes(keyword); });
  });
  
  grid.innerHTML = '';
  filtered.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'tea-card';
    card.innerHTML =
      '<div class="tea-emoji">' + item.emoji + '</div>' +
      '<div class="tea-info">' +
        '<div class="tea-name">' + item.name + '</div>' +
        '<div class="tea-desc">' + item.nature + '</div>' +
      '</div>';
    card.onclick = function() { openBrewDetail(item); };
    grid.appendChild(card);
  });
}

function switchToCategory(category) {
  switchTab(category);
}

// ---- BREW DETAIL ----
function openBrewDetail(item) {
  currentBrewItem = item;
  document.getElementById('brew-detail-title').textContent = item.name;
  document.getElementById('brew-detail-emoji').textContent = item.emoji;
  document.getElementById('brew-detail-name').textContent = item.name;
  document.getElementById('brew-detail-nature').textContent = item.nature;
  document.getElementById('brew-detail-desc').textContent = item.description;
  document.getElementById('brew-detail-meridians').textContent = item.nature + '，' + item.meridians;
  
  // Brewing info
  var brewingDiv = document.getElementById('brew-detail-brewing');
  brewingDiv.innerHTML =
    '<div class="info-item"><span class="info-label">水温</span><span class="info-value">' + item.brewing.waterTemp + '</span></div>' +
    '<div class="info-item"><span class="info-label">用量</span><span class="info-value">' + item.brewing.amount + '</span></div>' +
    '<div class="info-item"><span class="info-label">时间</span><span class="info-value">' + item.brewing.time + '</span></div>' +
    '<div class="info-item"><span class="info-label">冲泡次数</span><span class="info-value">' + item.brewing.infusions + '</span></div>';
  
  // Benefits
  var benefitsDiv = document.getElementById('brew-detail-benefits');
  benefitsDiv.innerHTML = '';
  item.benefits.forEach(function(b) {
    benefitsDiv.innerHTML += '<span class="tag">' + b + '</span>';
  });
  
  // Suitable people
  var suitableDiv = document.getElementById('brew-detail-suitable');
  suitableDiv.innerHTML = '';
  item.suitablePeople.forEach(function(s) {
    suitableDiv.innerHTML += '<span class="tag">' + s + '</span>';
  });
  
  // Taboos
  var taboosDiv = document.getElementById('brew-detail-taboos');
  taboosDiv.innerHTML =
    '<div class="taboo-item"><span class="taboo-icon">&#x26D4;</span><span>不适宜人群：' + item.taboos.unsuitable.join('、') + '</span></div>' +
    '<div class="taboo-item"><span class="taboo-icon">&#x26A0;</span><span>注意事项：' + item.taboos.precautions + '</span></div>' +
    '<div class="taboo-item"><span class="taboo-icon">&#x1F48A;</span><span>药物相互作用：' + item.taboos.drugInteractions + '</span></div>';
  
  // Pairings
  var pairingsDiv = document.getElementById('brew-detail-pairings');
  pairingsDiv.innerHTML = '';
  if (item.pairings && item.pairings.length > 0) {
    item.pairings.forEach(function(p) {
      pairingsDiv.innerHTML +=
        '<div class="pairing-item">' +
          '<span class="pairing-name">' + p.name + '</span>' +
          '<span class="pairing-effect">' + p.effect + '</span>' +
        '</div>';
    });
  } else {
    pairingsDiv.innerHTML = '<p style="color:var(--color-text-secondary);font-size:0.85rem;">暂无搭配推荐</p>';
  }
  
  // Update favorite button
  updateFavoriteButton();
  
  document.getElementById('brew-detail').classList.add('active');
}

function closeBrewDetail() {
  document.getElementById('brew-detail').classList.remove('active');
  currentBrewItem = null;
}

// ---- FAVORITES ----
function toggleFavorite() {
  if (!currentBrewItem) return;
  
  var itemId = currentBrewItem.id;
  var index = favorites.indexOf(itemId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(itemId);
  }
  
  localStorage.setItem('brew-favorites', JSON.stringify(favorites));
  updateFavoriteButton();
  renderFavoritesGrid();
}

function updateFavoriteButton() {
  if (!currentBrewItem) return;
  
  var btn = document.getElementById('brew-favorite-btn');
  var icon = document.getElementById('favorite-icon');
  var text = document.getElementById('favorite-text');
  
  var isFavorited = favorites.indexOf(currentBrewItem.id) > -1;
  
  if (isFavorited) {
    btn.classList.add('favorited');
    icon.innerHTML = '&#x2605;';
    text.textContent = '已收藏';
  } else {
    btn.classList.remove('favorited');
    icon.innerHTML = '&#x2606;';
    text.textContent = '收藏';
  }
}

function initFavoritesPage() {
  renderFavoritesGrid();
}

function renderFavoritesGrid() {
  var grid = document.getElementById('favorites-grid');
  var emptyState = document.getElementById('favorites-empty');
  
  if (!grid) return;
  
  if (favorites.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  grid.style.display = 'grid';
  emptyState.style.display = 'none';
  grid.innerHTML = '';
  
  // Find all favorited items
  var allItems = [].concat(
    BREW_DATA.flowerTeas,
    BREW_DATA.herbs,
    BREW_DATA.wellnessTeas,
    BREW_DATA.fruitTeas
  );
  
  favorites.forEach(function(itemId) {
    var item = allItems.find(function(i) { return i.id === itemId; });
    if (!item) return;
    
    var card = document.createElement('div');
    card.className = 'tea-card';
    card.innerHTML =
      '<div class="tea-emoji">' + item.emoji + '</div>' +
      '<div class="tea-info">' +
        '<div class="tea-name">' + item.name + '</div>' +
        '<div class="tea-desc">' + item.nature + '</div>' +
      '</div>';
    card.onclick = function() { openBrewDetail(item); };
    grid.appendChild(card);
  });
}

// ---- PAIRING QUERY ----
function initPairingPage() {
  var tagsDiv = document.getElementById('effect-tags');
  if (!tagsDiv) return;
  
  tagsDiv.innerHTML = '';
  Object.keys(BREW_DATA.effects).forEach(function(effect) {
    var tag = document.createElement('div');
    tag.className = 'effect-tag';
    tag.textContent = effect;
    tag.onclick = function() {
      document.getElementById('pairing-search').value = effect;
      searchPairing();
    };
    tagsDiv.appendChild(tag);
  });
}

function searchPairing() {
  var keyword = document.getElementById('pairing-search').value.toLowerCase().trim();
  var resultsDiv = document.getElementById('pairing-results');
  
  if (!keyword) {
    resultsDiv.innerHTML = '';
    return;
  }
  
  // Find matching effects
  var matchingEffects = Object.keys(BREW_DATA.effects).filter(function(effect) {
    return effect.toLowerCase().includes(keyword);
  });
  
  if (matchingEffects.length === 0) {
    resultsDiv.innerHTML = '<div class="empty-state"><p>未找到相关搭配</p></div>';
    return;
  }
  
  // Get all items for these effects
  var itemIds = [];
  matchingEffects.forEach(function(effect) {
    itemIds = itemIds.concat(BREW_DATA.effects[effect]);
  });
  
  // Remove duplicates
  itemIds = itemIds.filter(function(id, index) {
    return itemIds.indexOf(id) === index;
  });
  
  // Find items
  var allItems = [].concat(
    BREW_DATA.flowerTeas,
    BREW_DATA.herbs,
    BREW_DATA.wellnessTeas,
    BREW_DATA.fruitTeas
  );
  
  var items = allItems.filter(function(item) {
    return itemIds.indexOf(item.id) > -1;
  });
  
  resultsDiv.innerHTML = '';
  items.forEach(function(item) {
    var card = document.createElement('div');
    card.className = 'pairing-card';
    
    var benefitsHtml = '';
    item.benefits.slice(0, 4).forEach(function(b) {
      benefitsHtml += '<span class="benefit-tag">' + b + '</span>';
    });
    
    card.innerHTML =
      '<div class="pairing-header">' +
        '<span class="pairing-emoji">' + item.emoji + '</span>' +
        '<span class="pairing-name">' + item.name + '</span>' +
      '</div>' +
      '<div class="pairing-effect">' + item.nature + '</div>' +
      '<div class="pairing-benefits">' + benefitsHtml + '</div>';
    
    card.onclick = function() { openBrewDetail(item); };
    resultsDiv.appendChild(card);
  });
}

// ---- BODY TYPE QUERY ----
function initBodyTypePage() {
  var grid = document.getElementById('body-type-grid');
  if (!grid) return;
  
  var bodyTypeEmojis = {
    cold: '\u2744\uFE0F',
    hot: '\uD83D\uDD25',
    damp: '\uD83D\uDCA7',
    qi_deficiency: '\uD83D\uDCA8',
    blood_deficiency: '\uD83D\uDCA7'
  };
  
  grid.innerHTML = '';
  Object.keys(BREW_DATA.bodyTypes).forEach(function(key) {
    var type = BREW_DATA.bodyTypes[key];
    var card = document.createElement('div');
    card.className = 'body-type-card';
    card.innerHTML =
      '<div class="type-emoji">' + bodyTypeEmojis[key] + '</div>' +
      '<div class="type-name">' + type.label + '</div>' +
      '<div class="type-desc">' + type.description + '</div>';
    card.onclick = function() {
      selectedBodyType = key;
      document.querySelectorAll('.body-type-card').forEach(function(c) {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
      renderBodyTypeResults();
    };
    grid.appendChild(card);
  });
}

function renderBodyTypeResults() {
  var resultsDiv = document.getElementById('body-type-results');
  if (!selectedBodyType) {
    resultsDiv.innerHTML = '';
    return;
  }
  
  var bodyType = BREW_DATA.bodyTypes[selectedBodyType];
  
  // Find suitable items
  var allItems = [].concat(
    BREW_DATA.flowerTeas,
    BREW_DATA.herbs,
    BREW_DATA.wellnessTeas,
    BREW_DATA.fruitTeas
  );
  
  var suitableItems = allItems.filter(function(item) {
    return bodyType.suitable.indexOf(item.id) > -1;
  });
  
  var avoidItems = allItems.filter(function(item) {
    return bodyType.avoid.indexOf(item.id) > -1;
  });
  
  var html = '<div class="section-title">推荐泡饮</div>';
  suitableItems.forEach(function(item) {
    html +=
      '<div class="pairing-card" onclick="openBrewDetail(window.BREW_DATA_ALL[\'' + item.id + '\'])">' +
        '<div class="pairing-header">' +
          '<span class="pairing-emoji">' + item.emoji + '</span>' +
          '<span class="pairing-name">' + item.name + '</span>' +
        '</div>' +
        '<div class="pairing-effect">' + item.nature + '</div>' +
      '</div>';
  });
  
  html += '<div class="section-title" style="margin-top:20px;">建议避免</div>';
  avoidItems.forEach(function(item) {
    html +=
      '<div class="pairing-card" onclick="openBrewDetail(window.BREW_DATA_ALL[\'' + item.id + '\'])" style="opacity:0.7;">' +
        '<div class="pairing-header">' +
          '<span class="pairing-emoji">' + item.emoji + '</span>' +
          '<span class="pairing-name">' + item.name + '</span>' +
        '</div>' +
        '<div class="pairing-effect">' + item.nature + '</div>' +
      '</div>';
  });
  
  resultsDiv.innerHTML = html;
  
  // Store all items for click handler
  window.BREW_DATA_ALL = {};
  allItems.forEach(function(item) {
    window.BREW_DATA_ALL[item.id] = item;
  });
}

// ---- CUSTOM PAIRING ----
var selectedMaterials = [];
var currentPairingFilter = 'all';

function initCustomPairing() {
  renderMaterialSelectGrid();
  renderClassicRecipes();
}

function renderMaterialSelectGrid() {
  var grid = document.getElementById('material-select-grid');
  if (!grid) return;
  
  var allItems = [].concat(
    TEA_DATA.categories.map(function(c) {
      return { id: c.id, name: c.name, emoji: c.emoji, category: 'tea' };
    }),
    BREW_DATA.flowerTeas.map(function(t) { return { id: t.id, name: t.name, emoji: t.emoji, category: 'flower' }; }),
    BREW_DATA.herbs.map(function(t) { return { id: t.id, name: t.name, emoji: t.emoji, category: 'herb' }; }),
    BREW_DATA.wellnessTeas.map(function(t) { return { id: t.id, name: t.name, emoji: t.emoji, category: 'wellness' }; }),
    BREW_DATA.fruitTeas.map(function(t) { return { id: t.id, name: t.name, emoji: t.emoji, category: 'fruit' }; })
  );
  
  var filtered = currentPairingFilter === 'all' ? allItems : allItems.filter(function(item) {
    return item.category === currentPairingFilter;
  });
  
  grid.innerHTML = '';
  filtered.forEach(function(item) {
    var isSelected = selectedMaterials.indexOf(item.id) > -1;
    var isDisabled = !isSelected && selectedMaterials.length >= 5;
    
    var div = document.createElement('div');
    div.className = 'material-select-item' + (isSelected ? ' selected' : '') + (isDisabled ? ' disabled' : '');
    div.innerHTML =
      '<div class="item-emoji">' + item.emoji + '</div>' +
      '<div class="item-name">' + item.name + '</div>';
    
    if (!isDisabled) {
      div.onclick = function() { toggleMaterialSelection(item.id); };
    }
    
    grid.appendChild(div);
  });
}

function filterCustomPairing(category) {
  currentPairingFilter = category;
  
  // Update active button
  var buttons = document.querySelectorAll('#custom-pairing-filter .filter-btn');
  buttons.forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-category') === category);
  });
  
  renderMaterialSelectGrid();
}

function toggleMaterialSelection(itemId) {
  var index = selectedMaterials.indexOf(itemId);
  if (index > -1) {
    selectedMaterials.splice(index, 1);
  } else if (selectedMaterials.length < 5) {
    selectedMaterials.push(itemId);
  }
  
  updateSelectedMaterialsDisplay();
  renderMaterialSelectGrid();
  
  if (selectedMaterials.length >= 1) {
    analyzePairing();
  } else {
    document.getElementById('pairing-analysis').style.display = 'none';
  }
}

function updateSelectedMaterialsDisplay() {
  var list = document.getElementById('selected-materials-list');
  var count = document.getElementById('selected-count');
  
  count.textContent = selectedMaterials.length;
  
  if (selectedMaterials.length === 0) {
    list.innerHTML = '<div class="selected-empty">点击下方材料添加</div>';
    return;
  }
  
  var allItems = getAllBrewItems();
  var html = '';
  
  selectedMaterials.forEach(function(id) {
    var item = allItems.find(function(i) { return i.id === id; });
    if (item) {
      html +=
        '<div class="selected-tag">' +
          '<span>' + item.emoji + ' ' + item.name + '</span>' +
          '<span class="remove-tag" onclick="toggleMaterialSelection(\'' + id + '\')">&times;</span>' +
        '</div>';
    }
  });
  
  list.innerHTML = html;
}

function getAllBrewItems() {
  return [].concat(
    TEA_DATA.categories.map(function(c) {
      return { id: c.id, name: c.name, emoji: c.emoji, category: 'tea', nature: c.nature || '' };
    }),
    BREW_DATA.flowerTeas,
    BREW_DATA.herbs,
    BREW_DATA.wellnessTeas,
    BREW_DATA.fruitTeas
  );
}

function analyzePairing() {
  var analysisDiv = document.getElementById('pairing-analysis');
  var scoreDiv = document.getElementById('analysis-score');
  var contentDiv = document.getElementById('analysis-content');
  
  analysisDiv.style.display = 'block';
  
  // Find matching compatibility
  var allItems = getAllBrewItems();
  var selectedItems = selectedMaterials.map(function(id) {
    return allItems.find(function(i) { return i.id === id; });
  }).filter(Boolean);
  
  // Handle single material case
  if (selectedMaterials.length === 1) {
    renderSingleMaterialAnalysis(selectedItems[0], scoreDiv, contentDiv);
    return;
  }
  
  // Handle multiple materials case
  renderMultipleMaterialsAnalysis(selectedItems, scoreDiv, contentDiv);
}

function renderSingleMaterialAnalysis(item, scoreDiv, contentDiv) {
  if (!item) return;
  
  // Single material gets a default good score
  var score = 4;
  var scoreClass = 'score-good';
  
  // Render score
  var stars = '';
  for (var i = 0; i < 5; i++) {
    stars += i < score ? '★' : '☆';
  }
  scoreDiv.className = 'analysis-score ' + scoreClass;
  scoreDiv.innerHTML = stars;
  
  var html = '';
  
  // Material info header
  html +=
    '<div class="analysis-section">' +
      '<div class="analysis-section-title"><span class="icon">🌿</span> 单品分析：' + item.name + '</div>' +
      '<div class="analysis-section-content">';
  
  // Basic info
  if (item.nature || item.flavor) {
    html += '<p><strong>性味：</strong>' + (item.nature || '') + ' ' + (item.flavor || '') + '</p>';
  }
  
  // Effects
  if (item.effects && item.effects.length > 0) {
    html += '<p><strong>主要功效：</strong>' + item.effects.join('、') + '</p>';
  }
  
  // Suitable for
  if (item.suitableFor && item.suitableFor.length > 0) {
    html += '<p><strong>适合人群：</strong>' + item.suitableFor.join('、') + '</p>';
  }
  
  // Contraindications
  if (item.contraindications && item.contraindications.length > 0) {
    html += '<p style="color:#c4755b;"><strong>禁忌：</strong>' + item.contraindications.join('、') + '</p>';
  }
  
  html += '</div></div>';
  
  // Brewing method
  if (item.brewing) {
    html +=
      '<div class="analysis-section">' +
        '<div class="analysis-section-title"><span class="icon">🫖</span> 冲泡方法</div>' +
        '<div class="analysis-section-content">';
    
    if (item.brewing.temperature) {
      html += '<p><strong>水温：</strong>' + item.brewing.temperature + '</p>';
    }
    if (item.brewing.amount) {
      html += '<p><strong>用量：</strong>' + item.brewing.amount + '</p>';
    }
    if (item.brewing.time) {
      html += '<p><strong>冲泡时间：</strong>' + item.brewing.time + '</p>';
    }
    if (item.brewing.infusions) {
      html += '<p><strong>可冲泡次数：</strong>' + item.brewing.infusions + '</p>';
    }
    
    html += '</div></div>';
  }
  
  // Pairing suggestions
  if (item.pairings && item.pairings.length > 0) {
    html +=
      '<div class="analysis-section">' +
        '<div class="analysis-section-title"><span class="icon">✨</span> 推荐搭配</div>' +
        '<div class="analysis-section-content">' +
          '<p>' + item.pairings.join('、') + '</p>' +
        '</div>' +
      '</div>';
  }
  
  contentDiv.innerHTML = html;
}

function renderMultipleMaterialsAnalysis(selectedItems, scoreDiv, contentDiv) {
  var compatibility = BREW_DATA.compatibility || [];
  
  // Check for exact match or partial match
  var match = null;
  var partialMatches = [];
  
  compatibility.forEach(function(comp) {
    var compMaterials = comp.materials;
    var allMatched = compMaterials.every(function(m) { return selectedMaterials.indexOf(m) > -1; });
    var someMatched = compMaterials.some(function(m) { return selectedMaterials.indexOf(m) > -1; });
    
    if (allMatched && compMaterials.length === selectedMaterials.length) {
      match = comp;
    } else if (someMatched && compMaterials.length <= selectedMaterials.length) {
      partialMatches.push(comp);
    }
  });
  
  // Determine score and type
  var score, scoreClass, typeLabel, typeIcon;
  
  if (match) {
    score = match.score;
    if (match.type === 'synergy') {
      typeLabel = '协同增效';
      typeIcon = '✨';
      scoreClass = score >= 4 ? 'score-excellent' : 'score-good';
    } else if (match.type === 'neutralize') {
      typeLabel = '性味中和';
      typeIcon = '☯';
      scoreClass = score >= 4 ? 'score-excellent' : 'score-good';
    } else if (match.type === 'conflict') {
      typeLabel = '功效冲突';
      typeIcon = '⚠';
      scoreClass = 'score-bad';
    } else if (match.type === 'caution') {
      typeLabel = '需谨慎';
      typeIcon = '⚡';
      scoreClass = 'score-caution';
    }
  } else if (partialMatches.length > 0) {
    // Use the best partial match
    var bestMatch = partialMatches.sort(function(a, b) { return b.score - a.score; })[0];
    score = Math.max(2, bestMatch.score - 1);
    typeLabel = '自定义搭配';
    typeIcon = '🍵';
    scoreClass = score >= 4 ? 'score-good' : 'score-caution';
    match = bestMatch;
  } else {
    // No match found, calculate based on nature
    score = calculateNatureCompatibility(selectedItems);
    typeLabel = '自定义搭配';
    typeIcon = '🍵';
    scoreClass = score >= 4 ? 'score-good' : score >= 3 ? 'score-caution' : 'score-bad';
  }
  
  // Render score
  var stars = '';
  for (var i = 0; i < 5; i++) {
    stars += i < score ? '★' : '☆';
  }
  scoreDiv.className = 'analysis-score ' + scoreClass;
  scoreDiv.innerHTML = stars;
  
  // Render content
  var html = '';
  
  // Warning for conflicts
  if (match && match.type === 'conflict') {
    html +=
      '<div class="analysis-warning">' +
        '<div class="warning-title">⚠ 功效冲突</div>' +
        '<div class="warning-content">' + (match.warning || match.description) + '</div>' +
      '</div>';
  }
  
  // Effect analysis
  html +=
    '<div class="analysis-section">' +
      '<div class="analysis-section-title"><span class="icon">' + typeIcon + '</span> ' + typeLabel + '</div>' +
      '<div class="analysis-section-content">' + (match ? match.description : generateDefaultDescription(selectedItems)) + '</div>' +
    '</div>';
  
  // For 3+ materials, show pairwise analysis
  if (selectedItems.length >= 3) {
    html += renderPairwiseAnalysis(selectedItems, compatibility);
  }
  
  // Brewing advice
  if (match && match.brewing) {
    html +=
      '<div class="analysis-section">' +
        '<div class="analysis-section-title"><span class="icon">🫖</span> 冲泡建议</div>' +
        '<div class="analysis-section-content">' + match.brewing + '</div>' +
      '</div>';
  } else {
    // Generate brewing advice for custom pairing
    html +=
      '<div class="analysis-section">' +
        '<div class="analysis-section-title"><span class="icon">🫖</span> 冲泡建议</div>' +
        '<div class="analysis-section-content">' + generateBrewingAdvice(selectedItems) + '</div>' +
      '</div>';
  }
  
  // Suitable for
  if (match && match.suitableFor && match.suitableFor.length > 0) {
    html +=
      '<div class="analysis-section">' +
        '<div class="analysis-section-title"><span class="icon">👥</span> 适合人群</div>' +
        '<div class="analysis-suitable">';
    match.suitableFor.forEach(function(s) {
      html += '<span>' + s + '</span>';
    });
    html += '</div></div>';
  } else {
    // Generate suitable for based on materials
    html +=
      '<div class="analysis-section">' +
        '<div class="analysis-section-title"><span class="icon">👥</span> 适合人群</div>' +
        '<div class="analysis-suitable">' + generateSuitableFor(selectedItems) + '</div>' +
      '</div>';
  }
  
  // Caution warning
  if (match && match.type === 'caution' && match.warning) {
    html +=
      '<div class="analysis-warning" style="background:rgba(255,152,0,0.1);border-color:rgba(255,152,0,0.3);">' +
        '<div class="warning-title" style="color:#ff9800;">⚡ 用量提示</div>' +
        '<div class="warning-content" style="color:#f57c00;">' + match.warning + '</div>' +
      '</div>';
  }
  
  contentDiv.innerHTML = html;
}

function renderPairwiseAnalysis(selectedItems, compatibility) {
  var html = '<div class="analysis-section">' +
    '<div class="analysis-section-title"><span class="icon">🔗</span> 材料间相互作用</div>' +
    '<div class="analysis-section-content">';
  
  // Analyze each pair
  for (var i = 0; i < selectedItems.length; i++) {
    for (var j = i + 1; j < selectedItems.length; j++) {
      var item1 = selectedItems[i];
      var item2 = selectedItems[j];
      
      // Find compatibility for this pair
      var pairMatch = null;
      compatibility.forEach(function(comp) {
        if (comp.materials.length === 2) {
          var has1 = comp.materials.indexOf(item1.id) > -1;
          var has2 = comp.materials.indexOf(item2.id) > -1;
          if (has1 && has2) {
            pairMatch = comp;
          }
        }
      });
      
      var pairIcon = '🍵';
      var pairType = '可搭配';
      var pairDesc = '无明显相互作用，可正常搭配饮用';
      
      if (pairMatch) {
        if (pairMatch.type === 'synergy') {
          pairIcon = '✨';
          pairType = '协同增效';
          pairDesc = pairMatch.description;
        } else if (pairMatch.type === 'neutralize') {
          pairIcon = '☯';
          pairType = '性味中和';
          pairDesc = pairMatch.description;
        } else if (pairMatch.type === 'conflict') {
          pairIcon = '⚠';
          pairType = '功效冲突';
          pairDesc = pairMatch.description;
        } else if (pairMatch.type === 'caution') {
          pairIcon = '⚡';
          pairType = '需谨慎';
          pairDesc = pairMatch.description;
        }
      }
      
      html += '<div style="margin-bottom:8px;padding:8px;background:rgba(123,158,107,0.05);border-radius:8px;">' +
        '<div style="font-weight:500;margin-bottom:4px;">' + pairIcon + ' ' + item1.name + ' + ' + item2.name + '：' + pairType + '</div>' +
        '<div style="font-size:12px;color:#6b6b6b;">' + pairDesc + '</div>' +
      '</div>';
    }
  }
  
  html += '</div></div>';
  return html;
}

function generateBrewingAdvice(items) {
  // Find the highest temperature needed
  var maxTemp = 80;
  items.forEach(function(item) {
    if (item.brewing && item.brewing.temperature) {
      var temp = parseInt(item.brewing.temperature);
      if (temp > maxTemp) maxTemp = temp;
    }
  });
  
  // Find the longest brewing time
  var maxTime = 3;
  items.forEach(function(item) {
    if (item.brewing && item.brewing.time) {
      var time = parseInt(item.brewing.time);
      if (time > maxTime) maxTime = time;
    }
  });
  
  var advice = '建议水温 ' + maxTemp + '-' + (maxTemp + 5) + '℃，';
  advice += '冲泡 ' + maxTime + '-' + (maxTime + 2) + '分钟后饮用。';
  advice += '可反复冲泡 2-3 次。';
  
  return advice;
}

function generateSuitableFor(items) {
  var suitable = [];
  
  // Check nature of all items
  var hasCold = false;
  var hasWarm = false;
  
  items.forEach(function(item) {
    if (item.nature) {
      if (item.nature.indexOf('寒') > -1 || item.nature.indexOf('凉') > -1) {
        hasCold = true;
      }
      if (item.nature.indexOf('温') > -1 || item.nature.indexOf('热') > -1) {
        hasWarm = true;
      }
    }
  });
  
  if (hasCold && !hasWarm) {
    suitable.push('热性体质');
    suitable.push('上火人群');
  } else if (hasWarm && !hasCold) {
    suitable.push('寒性体质');
    suitable.push('手脚冰凉');
  } else {
    suitable.push('一般人群');
  }
  
  var html = '';
  suitable.forEach(function(s) {
    html += '<span>' + s + '</span>';
  });
  
  return html;
}

function calculateNatureCompatibility(items) {
  // Simple nature compatibility check
  var natureCount = { hot: 0, warm: 0, neutral: 0, cool: 0, cold: 0 };
  
  items.forEach(function(item) {
    var nature = item.nature || '';
    if (nature.indexOf('热') > -1) natureCount.hot++;
    else if (nature.indexOf('温') > -1) natureCount.warm++;
    else if (nature.indexOf('平') > -1 || nature.indexOf('甘') > -1) natureCount.neutral++;
    else if (nature.indexOf('凉') > -1) natureCount.cool++;
    else if (nature.indexOf('寒') > -1 || nature.indexOf('冷') > -1) natureCount.cold++;
  });
  
  // Check for extreme imbalance
  var hotTotal = natureCount.hot + natureCount.warm;
  var coldTotal = natureCount.cool + natureCount.cold;
  
  if (hotTotal >= 3 || coldTotal >= 3) {
    return 2; // Too extreme
  } else if (hotTotal >= 2 && coldTotal >= 2) {
    return 3; // Conflicting
  } else if (natureCount.neutral >= 2) {
    return 4; // Balanced
  } else {
    return 3; // Acceptable
  }
}

function generateDefaultDescription(items) {
  var names = items.map(function(i) { return i.name; }).join('、');
  return names + '的搭配，建议根据个人体质适量饮用。如有不适，请停止饮用。';
}

function clearSelectedMaterials() {
  selectedMaterials = [];
  updateSelectedMaterialsDisplay();
  renderMaterialSelectGrid();
  document.getElementById('pairing-analysis').style.display = 'none';
}

function savePairingRecipe() {
  if (selectedMaterials.length < 1) {
    alert('请至少选择1种材料');
    return;
  }
  
  var allItems = getAllBrewItems();
  var names = selectedMaterials.map(function(id) {
    var item = allItems.find(function(i) { return i.id === id; });
    return item ? item.name : '';
  }).filter(Boolean);
  
  var defaultName = names.length === 1 ? names[0] + '茶' : names.join('+') + '茶';
  var recipeName = prompt('为这个搭配方案命名：', defaultName);
  if (!recipeName) return;
  
  var favorites = JSON.parse(localStorage.getItem('teaFavorites') || '[]');
  var recipe = {
    id: 'custom_' + Date.now(),
    name: recipeName,
    materials: selectedMaterials.slice(),
    isCustomRecipe: true,
    createdAt: new Date().toISOString()
  };
  
  favorites.push(recipe);
  localStorage.setItem('teaFavorites', JSON.stringify(favorites));
  
  alert('搭配方案已保存到收藏！');
}

function renderClassicRecipes() {
  var container = document.getElementById('classic-recipes');
  if (!container) return;
  
  var recipes = BREW_DATA.classicRecipes || [];
  var allItems = getAllBrewItems();
  
  container.innerHTML = '';
  
  recipes.forEach(function(recipe) {
    var materialsHtml = '';
    recipe.materials.forEach(function(id) {
      var item = allItems.find(function(i) { return i.id === id; });
      if (item) {
        materialsHtml += '<span>' + item.emoji + ' ' + item.name + '</span>';
      }
    });
    
    var card = document.createElement('div');
    card.className = 'classic-recipe-card';
    card.innerHTML =
      '<div class="classic-recipe-header">' +
        '<div class="classic-recipe-name">' + recipe.name + '</div>' +
        '<div class="classic-recipe-effect">' + recipe.effect + '</div>' +
      '</div>' +
      '<div class="classic-recipe-materials">' + materialsHtml + '</div>' +
      '<div class="classic-recipe-desc">' + recipe.description + '</div>';
    
    card.onclick = function() {
      selectedMaterials = recipe.materials.slice();
      showPage('custom-pairing');
      setTimeout(function() {
        updateSelectedMaterialsDisplay();
        renderMaterialSelectGrid();
        analyzePairing();
      }, 100);
    };
    
    container.appendChild(card);
  });
}

// ---- CONTRAINDICATION ----
function initContraindicationPage() {
  var list = document.getElementById('contraindication-list');
  if (!list) return;
  
  var contraindicationIcons = {
    pregnancy: '\uD83E\uDD30',
    menstruation: '\uD83D\uDC69',
    taking_medication: '\uD83D\uDC8A',
    cold_flu: '\uD83E\uDD27',
    diabetes: '\uD83D\uDC89',
    stomach_acid: '\uD83D\uDD25'
  };
  
  list.innerHTML = '';
  Object.keys(BREW_DATA.contraindications).forEach(function(key) {
    var item = BREW_DATA.contraindications[key];
    var div = document.createElement('div');
    div.className = 'contraindication-item';
    div.innerHTML =
      '<span class="item-icon">' + contraindicationIcons[key] + '</span>' +
      '<span class="item-label">' + item.label + '</span>' +
      '<span class="item-check"></span>';
    div.onclick = function() {
      var index = selectedContraindications.indexOf(key);
      if (index > -1) {
        selectedContraindications.splice(index, 1);
        div.classList.remove('selected');
      } else {
        selectedContraindications.push(key);
        div.classList.add('selected');
      }
      renderContraindicationResults();
    };
    list.appendChild(div);
  });
}

function renderContraindicationResults() {
  var resultsDiv = document.getElementById('contraindication-results');
  
  if (selectedContraindications.length === 0) {
    resultsDiv.innerHTML = '';
    return;
  }
  
  // Get all items to avoid
  var avoidIds = [];
  selectedContraindications.forEach(function(key) {
    avoidIds = avoidIds.concat(BREW_DATA.contraindications[key].avoid);
  });
  
  // Remove duplicates
  avoidIds = avoidIds.filter(function(id, index) {
    return avoidIds.indexOf(id) === index;
  });
  
  // Find all items
  var allItems = [].concat(
    BREW_DATA.flowerTeas,
    BREW_DATA.herbs,
    BREW_DATA.wellnessTeas,
    BREW_DATA.fruitTeas
  );
  
  var avoidItems = allItems.filter(function(item) {
    return avoidIds.indexOf(item.id) > -1;
  });
  
  var safeItems = allItems.filter(function(item) {
    return avoidIds.indexOf(item.id) === -1;
  });
  
  var html = '<div class="section-title">建议避免</div>';
  avoidItems.forEach(function(item) {
    html +=
      '<div class="pairing-card" onclick="openBrewDetail(window.BREW_DATA_ALL[\'' + item.id + '\'])" style="opacity:0.7;">' +
        '<div class="pairing-header">' +
          '<span class="pairing-emoji">' + item.emoji + '</span>' +
          '<span class="pairing-name">' + item.name + '</span>' +
        '</div>' +
        '<div class="pairing-effect">' + item.nature + '</div>' +
      '</div>';
  });
  
  html += '<div class="section-title" style="margin-top:20px;">可以饮用</div>';
  safeItems.forEach(function(item) {
    html +=
      '<div class="pairing-card" onclick="openBrewDetail(window.BREW_DATA_ALL[\'' + item.id + '\'])">' +
        '<div class="pairing-header">' +
          '<span class="pairing-emoji">' + item.emoji + '</span>' +
          '<span class="pairing-name">' + item.name + '</span>' +
        '</div>' +
        '<div class="pairing-effect">' + item.nature + '</div>' +
      '</div>';
  });
  
  resultsDiv.innerHTML = html;
  
  // Store all items for click handler
  window.BREW_DATA_ALL = {};
  allItems.forEach(function(item) {
    window.BREW_DATA_ALL[item.id] = item;
  });
}
