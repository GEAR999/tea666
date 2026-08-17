// 泡饮百科 - 配伍禁忌与体质数据
// 数据来源：《神农本草经》《儒门事亲》《医经小学》《中国药典》2025版
// 体质分类依据：GB/T 46939—2025《中医体质分类与判定》国家标准

const COMPATIBILITY_DATA = {
  // 数据来源说明
  sources: {
    shennong: "《神农本草经》- 东汉·神农氏",
    rume: "《儒门事亲》- 金·张从正",
    yijing: "《医经小学》- 明·李梴",
    pharmacopoeia: "《中国药典》2025年版",
    bodyTypeStandard: "GB/T 46939—2025《中医体质分类与判定》"
  },

  // ========== 中药七情配伍理论 ==========
  sevenEmotions: {
    title: "中药七情配伍",
    source: "《神农本草经》",
    description: "七情配伍是中药配伍的基本理论，指单行、相须、相使、相畏、相杀、相恶、相反七种配伍关系。",
    types: [
      {
        name: "单行",
        description: "单用一味药治病，不需其他药物辅助",
        example: "独参汤（单用人参补气）"
      },
      {
        name: "相须",
        description: "性能功效相类似的药物配合使用，可以增强原有疗效",
        example: "石膏配知母（增强清热泻火功效）"
      },
      {
        name: "相使",
        description: "性能功效有某种共性的药物配合使用，一药为主，一药为辅，辅药能提高主药疗效",
        example: "黄芪配茯苓（茯苓助黄芪补气利水）"
      },
      {
        name: "相畏",
        description: "一种药物的毒性反应或副作用，能被另一种药物减轻或消除",
        example: "半夏畏生姜（生姜能减轻半夏的毒性）"
      },
      {
        name: "相杀",
        description: "一种药物能减轻或消除另一种药物的毒性或副作用",
        example: "生姜杀半夏（生姜能消除半夏的毒性）"
      },
      {
        name: "相恶",
        description: "两药合用，一种药物能使另一种药物原有功效降低，甚至丧失",
        example: "人参恶莱菔子（莱菔子能削弱人参的补气作用）"
      },
      {
        name: "相反",
        description: "两药合用，能产生或增强毒性反应或副作用",
        example: "甘草反甘遂、大戟、海藻、芫花"
      }
    ]
  },

  // ========== 十八反歌诀及详解 ==========
  eighteenIncompatibilities: {
    title: "十八反歌诀",
    source: "《儒门事亲》- 金·张从正",
    verse: "本草明言十八反，半蒌贝蔹及攻乌，藻戟遂芫俱战草，诸参辛芍叛藜芦。",
    explanation: [
      {
        category: "乌头反半夏、瓜蒌、贝母、白蔹、白及",
        detail: "乌头（附子、川乌、草乌）不宜与半夏、瓜蒌、贝母（川贝、浙贝）、白蔹、白及同用"
      },
      {
        category: "甘草反甘遂、大戟、海藻、芫花",
        detail: "甘草不宜与甘遂、大戟、海藻、芫花同用，合用会产生毒性"
      },
      {
        category: "藜芦反人参、沙参、丹参、玄参、细辛、芍药",
        detail: "藜芦不宜与人参、沙参、丹参、玄参、细辛、芍药（白芍、赤芍）同用"
      }
    ],
    teaRelevance: "泡饮中需注意：含甘草的茶饮不宜与海藻、昆布等海产品搭配"
  },

  // ========== 十九畏歌诀及详解 ==========
  nineteenFears: {
    title: "十九畏歌诀",
    source: "《医经小学》- 明·李梴",
    verse: "硫黄原是火中精，朴硝一见便相争。水银莫与砒霜见，狼毒最怕密陀僧。巴豆性烈最为上，偏与牵牛不顺情。丁香莫与郁金见，牙硝难合京三棱。川乌草乌不顺犀，人参最怕五灵脂。官桂善能调冷气，若逢石脂便相欺。大凡修合看顺逆，炮爁炙煿莫相违。",
    explanation: [
      { item1: "硫黄", item2: "朴硝（芒硝）", effect: "相畏" },
      { item1: "水银", item2: "砒霜", effect: "相畏" },
      { item1: "狼毒", item2: "密陀僧", effect: "相畏" },
      { item1: "巴豆", item2: "牵牛子", effect: "相畏" },
      { item1: "丁香", item2: "郁金", effect: "相畏" },
      { item1: "川乌/草乌", item2: "犀角", effect: "相畏" },
      { item1: "人参", item2: "五灵脂", effect: "相畏" },
      { item1: "官桂（肉桂）", item2: "赤石脂", effect: "相畏" },
      { item1: "牙硝", item2: "三棱", effect: "相畏" }
    ],
    teaRelevance: "泡饮中需注意：含人参的茶饮不宜与五灵脂（灵芝类）搭配"
  },

  // ========== 茶性体质搭配原则表 ==========
  teaBodyPairing: {
    title: "茶性体质搭配原则",
    source: "《中国茶经》+ 中医体质学说",
    principles: [
      {
        bodyType: "平和体质",
        characteristics: "体态适中，面色润泽，精力充沛",
        suitableTeas: "各类茶均可，以绿茶、白茶为佳",
        avoidTeas: "无特殊禁忌",
        pairingAdvice: "可根据季节和个人喜好选择"
      },
      {
        bodyType: "气虚体质",
        characteristics: "气短懒言，易疲乏，自汗",
        suitableTeas: "红茶、黑茶、老白茶（温性茶）",
        avoidTeas: "绿茶、新白茶（寒凉）",
        pairingAdvice: "宜加黄芪、党参补气"
      },
      {
        bodyType: "阳虚体质",
        characteristics: "畏寒怕冷，手足不温",
        suitableTeas: "红茶、黑茶、陈年乌龙（温热）",
        avoidTeas: "绿茶、黄茶、新白茶（寒凉）",
        pairingAdvice: "宜加生姜、桂圆温阳"
      },
      {
        bodyType: "阴虚体质",
        characteristics: "手足心热，口燥咽干",
        suitableTeas: "绿茶、白茶、黄茶（凉润）",
        avoidTeas: "红茶、黑茶（温热伤阴）",
        pairingAdvice: "宜加枸杞、麦冬养阴"
      },
      {
        bodyType: "痰湿体质",
        characteristics: "体胖腹软，口黏苔腻",
        suitableTeas: "乌龙茶、黑茶、普洱茶（祛湿）",
        avoidTeas: "甜腻茶饮",
        pairingAdvice: "宜加陈皮、荷叶化湿"
      },
      {
        bodyType: "湿热体质",
        characteristics: "面垢油光，口苦口干",
        suitableTeas: "绿茶、白茶、菊花茶（清热）",
        avoidTeas: "红茶、黑茶（温热助火）",
        pairingAdvice: "宜加金银花、茵陈清热"
      },
      {
        bodyType: "血瘀体质",
        characteristics: "肤色晦暗，易生斑点",
        suitableTeas: "红茶、玫瑰花茶、山楂茶（活血）",
        avoidTeas: "寒凉茶饮",
        pairingAdvice: "宜加玫瑰花、山楂活血"
      },
      {
        bodyType: "气郁体质",
        characteristics: "情绪低落，胸胁胀满",
        suitableTeas: "玫瑰花茶、佛手茶、乌龙茶（疏肝）",
        avoidTeas: "浓茶（加重焦虑）",
        pairingAdvice: "宜加玫瑰花、合欢花解郁"
      },
      {
        bodyType: "特禀体质",
        characteristics: "过敏体质，易发荨麻疹",
        suitableTeas: "淡茶为主，避免浓茶",
        avoidTeas: "含花粉类花草茶",
        pairingAdvice: "慎用药食同源材料，先少量试饮"
      }
    ]
  },

  // ========== 9种体质详细数据（GB/T 46939—2025） ==========
  bodyTypes: {
   平和: {
      id: "balanced",
      name: "平和质",
      code: "01",
      characteristics: "体态适中，面色润泽，精力充沛，睡眠良好",
      diet: {
        suitable: "饮食规律，营养均衡",
        avoid: "无特殊禁忌"
      },
      teas: ["green", "white", "oolong", "black", "dark"],
      teaAdvice: "各类茶均可，以绿茶、白茶为佳，可根据季节选择",
      taboos: "无特殊禁忌",
      flowers: ["chrysanthemum", "rose", "osmanthus"],
      herbs: ["goji", "jujube", "longan"]
    },
    气虚: {
      id: "qi_deficiency",
      name: "气虚质",
      code: "02",
      characteristics: "气短懒言，语声低微，易疲乏，自汗，易感冒",
      diet: {
        suitable: "宜食益气健脾食物：黄芪、党参、山药、大枣、小米",
        avoid: "少食生冷寒凉、油腻难化之物"
      },
      teas: ["black", "dark", "white"],
      teaAdvice: "宜饮温性茶，如红茶、黑茶、老白茶。避免大量饮用绿茶等凉性茶",
      taboos: "不宜空腹饮茶，浓度宜淡",
      flowers: ["rose", "osmanthus"],
      herbs: ["astragalus", "codonopsis", "goji", "jujube"]
    },
    阳虚: {
      id: "yang_deficiency",
      name: "阳虚质",
      code: "03",
      characteristics: "畏寒怕冷，手足不温，喜热饮食，精神不振",
      diet: {
        suitable: "宜食温阳食物：生姜、桂圆、核桃、羊肉、韭菜",
        avoid: "忌食生冷寒凉，如西瓜、苦瓜、绿豆"
      },
      teas: ["black", "dark", "oolong"],
      teaAdvice: "宜饮温热性茶，如红茶、黑茶、陈年乌龙。忌饮绿茶、黄茶等寒凉茶",
      taboos: "冬季宜热饮，夏季也不宜冷泡",
      flowers: ["osmanthus", "rose"],
      herbs: ["ginger", "longan", "jujube", "cinnamon"]
    },
    阴虚: {
      id: "yin_deficiency",
      name: "阴虚质",
      code: "04",
      characteristics: "手足心热，口燥咽干，鼻微干，喜冷饮，大便干燥",
      diet: {
        suitable: "宜食滋阴润燥食物：百合、银耳、梨、蜂蜜、枸杞",
        avoid: "少食辛辣燥热，如辣椒、羊肉、韭菜"
      },
      teas: ["green", "white", "yellow"],
      teaAdvice: "宜饮凉润性茶，如绿茶、白茶、黄茶。少饮红茶、黑茶等温热茶",
      taboos: "不宜饮浓茶，以免伤阴",
      flowers: ["chrysanthemum", "honeysuckle", "jasmine"],
      herbs: ["goji", "ophiopogon", "dendrobium"]
    },
    痰湿: {
      id: "phlegm_dampness",
      name: "痰湿质",
      code: "05",
      characteristics: "体胖腹软，面部皮肤油脂多，口黏苔腻，身重不爽",
      diet: {
        suitable: "宜食健脾化湿食物：薏苡仁、赤小豆、冬瓜、陈皮、荷叶",
        avoid: "少食肥甘厚味、甜食、油腻"
      },
      teas: ["oolong", "dark", "green"],
      teaAdvice: "宜饮祛湿茶，如乌龙茶、黑茶、普洱茶。可加陈皮、荷叶",
      taboos: "不宜饮甜腻茶饮",
      flowers: ["chrysanthemum", "jasmine"],
      herbs: ["tangerine_peel", "poria", "coix_seed"]
    },
    湿热: {
      id: "damp_heat",
      name: "湿热质",
      code: "06",
      characteristics: "面垢油光，易生痤疮，口苦口干，身重困倦",
      diet: {
        suitable: "宜食清热利湿食物：绿豆、苦瓜、冬瓜、薏苡仁、芹菜",
        avoid: "忌食辛辣燥热、油腻甜食"
      },
      teas: ["green", "white", "flower"],
      teaAdvice: "宜饮清热茶，如绿茶、白茶、菊花茶。忌饮红茶、黑茶等温热茶",
      taboos: "不宜饮浓茶，以免助湿生热",
      flowers: ["chrysanthemum", "honeysuckle", "jasmine"],
      herbs: ["honeysuckle", "chrysanthemum", "coix_seed"]
    },
    血瘀: {
      id: "blood_stasis",
      name: "血瘀质",
      code: "07",
      characteristics: "肤色晦暗，色素沉着，易生斑点，口唇暗淡",
      diet: {
        suitable: "宜食活血化瘀食物：山楂、黑木耳、醋、玫瑰花、桃仁",
        avoid: "少食寒凉收涩之物"
      },
      teas: ["black", "flower", "dark"],
      teaAdvice: "宜饮活血茶，如红茶、玫瑰花茶、山楂茶。可加山楂、玫瑰",
      taboos: "不宜饮寒凉茶饮",
      flowers: ["rose", "safflower"],
      herbs: ["hawthorn", "rose", "safflower"]
    },
    气郁: {
      id: "qi_stagnation",
      name: "气郁质",
      code: "08",
      characteristics: "情绪低落，忧虑脆弱，胸胁胀满，善太息",
      diet: {
        suitable: "宜食疏肝理气食物：玫瑰花、佛手、柑橘、黄花菜",
        avoid: "少食收敛酸涩之物"
      },
      teas: ["oolong", "flower", "green"],
      teaAdvice: "宜饮疏肝茶，如玫瑰花茶、佛手茶、乌龙茶。忌饮浓茶加重焦虑",
      taboos: "不宜饮浓茶，以免加重焦虑",
      flowers: ["rose", "jasmine", "lavender"],
      herbs: ["rose", "citron", "chamomile"]
    },
    特禀: {
      id: "special",
      name: "特禀质",
      code: "09",
      characteristics: "过敏体质，易发荨麻疹、哮喘，对药物食物过敏",
      diet: {
        suitable: "饮食清淡均衡，避免已知过敏原",
        avoid: "慎食易致敏食物：海鲜、花粉、坚果等"
      },
      teas: ["green", "white"],
      teaAdvice: "宜饮淡茶，避免浓茶。慎用药食同源材料，先少量试饮",
      taboos: "慎用含花粉类花草茶，如菊花、金银花等",
      flowers: [],
      herbs: ["goji", "jujube"]
    }
  },

  // ========== 免责声明 ==========
  disclaimer: {
    title: "免责声明",
    items: [
      "本应用提供的所有内容仅供参考，不构成医疗建议或诊断依据。",
      "如有健康问题，请咨询专业医师或中医师，切勿自行诊断或治疗。",
      "泡饮材料虽为药食同源，但仍可能引起过敏反应，首次使用请少量试饮。",
      "孕妇、哺乳期妇女、儿童及慢性病患者在使用前请咨询医师。",
      "本应用中的配伍禁忌信息基于传统中医理论，现代研究可能有不同观点。",
      "茶叶及泡饮材料不能替代药物治疗疾病，仅作为日常保健辅助。",
      "因个人体质差异，使用效果可能不同，请根据自身情况调整。"
    ]
  },

  // ========== 参考资料 ==========
  references: [
    { id: 1, title: "《中国茶经》", author: "陈宗懋 主编", year: "2012修订版", publisher: "上海文化出版社" },
    { id: 2, title: "《本草纲目》", author: "李时珍", year: "明·1578年", publisher: "中医古籍出版社" },
    { id: 3, title: "《中国药典》2025年版", author: "国家药典委员会", year: "2025", publisher: "中国医药科技出版社" },
    { id: 4, title: "《神农本草经》", author: "神农氏（传）", year: "东汉", publisher: "中医古籍出版社" },
    { id: 5, title: "《儒门事亲》", author: "张从正", year: "金·1228年", publisher: "人民卫生出版社" },
    { id: 6, title: "《医经小学》", author: "李梴", year: "明·1575年", publisher: "中医古籍出版社" },
    { id: 7, title: "GB/T 46939—2025《中医体质分类与判定》", author: "国家标准", year: "2025", publisher: "国家市场监督管理总局" },
    { id: 8, title: "GB/T 23776-2018《茶叶感官审评术语》", author: "国家标准", year: "2018", publisher: "国家市场监督管理总局" },
    { id: 9, title: "GB/T 30375-2013《茶叶贮存》", author: "国家标准", year: "2013", publisher: "国家市场监督管理总局" },
    { id: 10, title: "《人民日报》茶专题报道", author: "人民日报社", year: "2025", publisher: "人民日报" },
    { id: 11, title: "北京市中医药管理局养生指南", author: "北京市中医药管理局", year: "2024", publisher: "北京市政府" },
    { id: 12, title: "卫健委药食同源目录", author: "国家卫生健康委员会", year: "2023更新", publisher: "国家卫健委" },
    { id: 13, title: "《陆羽茶经》", author: "陆羽", year: "唐·760年", publisher: "中华书局" },
    { id: 14, title: "《大观茶论》", author: "赵佶（宋徽宗）", year: "宋·1107年", publisher: "中华书局" }
  ]
};
