// 泡饮百科 - 扩展数据
// 花草茶、中药材、养生茶饮、果茶类

const BREW_DATA = {
  // ========== 花草茶 ==========
  flowerTeas: [
    {
      id: "chrysanthemum",
      name: "菊花",
      emoji: "\uD83C\uDF3C",
      category: "flower",
      nature: "性微寒，味甘苦",
      meridians: "归肺、肝经",
      description: "菊花是中国传统名花，具有清肝明目、清热解毒的功效。常见的有杭白菊、胎菊、野菊花等品种。",
      benefits: ["清肝明目", "清热解毒", "降血压", "缓解眼疲劳", "疏散风热"],
      suitablePeople: ["肝火旺盛者", "用眼过度者", "高血压人群", "风热感冒初期"],
      taboos: {
        unsuitable: ["脾胃虚寒者", "孕妇慎用", "低血压患者"],
        precautions: "不宜长期大量饮用，体虚者宜加枸杞中和寒性",
        drugInteractions: "不宜与降压药同服，可能增强药效"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "3-5朵 / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "枸杞", effect: "清肝明目，滋补肝肾" },
        { name: "金银花", effect: "清热解毒，疏散风热" },
        { name: "决明子", effect: "清肝明目，润肠通便" }
      ]
    },
    {
      id: "honeysuckle",
      name: "金银花",
      emoji: "\uD83C\uDF3F",
      category: "flower",
      nature: "性寒，味甘",
      meridians: "归肺、心、胃经",
      description: "金银花又名忍冬花，是常用的清热解毒药材。一蒂二花，新旧相参，黄白相映，故称金银花。",
      benefits: ["清热解毒", "疏散风热", "凉血止痢", "抗炎抗菌", "增强免疫"],
      suitablePeople: ["风热感冒者", "咽喉肿痛者", "热毒疮痈者", "夏季防暑"],
      taboos: {
        unsuitable: ["脾胃虚寒者", "经期女性", "阴虚发热者慎用"],
        precautions: "不宜长期饮用，症状缓解即停",
        drugInteractions: "不宜与温补类中药同服"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "3-5g / 杯",
        time: "5-8分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "菊花", effect: "清热解毒，疏散风热" },
        { name: "薄荷", effect: "清凉解暑，利咽透疹" },
        { name: "甘草", effect: "清热解毒，调和药性" }
      ]
    },
    {
      id: "rose",
      name: "玫瑰花",
      emoji: "\uD83C\uDF39",
      category: "flower",
      nature: "性温，味甘微苦",
      meridians: "归肝、脾经",
      description: "玫瑰花不仅是爱情象征，更是女性养生佳品。具有疏肝解郁、活血调经的功效，香气怡人。",
      benefits: ["疏肝解郁", "活血调经", "美容养颜", "理气解瘀", "缓解情绪"],
      suitablePeople: ["情绪抑郁者", "经前综合征女性", "皮肤暗沉者", "肝气郁结者"],
      taboos: {
        unsuitable: ["孕妇", "月经过多者", "便秘者慎用"],
        precautions: "经期量多者暂停饮用",
        drugInteractions: "无明显药物相互作用"
      },
      brewing: {
        waterTemp: "80-85\u00B0C",
        amount: "5-8朵 / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "红枣", effect: "补气养血，美容养颜" },
        { name: "枸杞", effect: "滋补肝肾，明目安神" },
        { name: "桂圆", effect: "补心安神，养血益脾" }
      ]
    },
    {
      id: "osmanthus",
      name: "桂花",
      emoji: "\uD83C\uDF3C",
      category: "flower",
      nature: "性温，味辛",
      meridians: "归肺、脾、肾经",
      description: "桂花香气浓郁，是中国传统名花。具有温中散寒、暖胃止痛、化痰散瘀的功效。",
      benefits: ["温中散寒", "暖胃止痛", "化痰散瘀", "清新口气", "舒缓情绪"],
      suitablePeople: ["胃寒疼痛者", "口臭者", "痰多咳嗽者", "情绪紧张者"],
      taboos: {
        unsuitable: ["上火者", "孕妇慎用"],
        precautions: "不宜过量饮用，温热体质者少饮",
        drugInteractions: "无明显药物相互作用"
      },
      brewing: {
        waterTemp: "85-90\u00B0C",
        amount: "3-5g / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "红茶", effect: "暖胃驱寒，香气怡人" },
        { name: "蜂蜜", effect: "润肺止咳，美容养颜" },
        { name: "乌龙茶", effect: "消食解腻，香气融合" }
      ]
    },
    {
      id: "jasmine",
      name: "茉莉花",
      emoji: "\u26AA",
      category: "flower",
      nature: "性温，味辛甘",
      meridians: "归肝、脾、胃经",
      description: "茉莉花香气清幽，有「人间第一香」之美誉。具有理气开郁、辟秽和中、清肝明目的功效。",
      benefits: ["理气开郁", "辟秽和中", "清肝明目", "抗菌消炎", "舒缓神经"],
      suitablePeople: ["情绪低落者", "消化不良者", "目赤肿痛者", "失眠焦虑者"],
      taboos: {
        unsuitable: ["孕妇", "体质燥热者"],
        precautions: "不宜空腹饮用",
        drugInteractions: "不宜与安神类药物同服"
      },
      brewing: {
        waterTemp: "85-90\u00B0C",
        amount: "3-5g / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "绿茶", effect: "清新提神，香气融合" },
        { name: "蜂蜜", effect: "润肺养颜，口感更佳" },
        { name: "柠檬", effect: "理气化痰，美白肌肤" }
      ]
    },
    {
      id: "lavender",
      name: "薰衣草",
      emoji: "\uD83D\uDC9C",
      category: "flower",
      nature: "性凉，味辛",
      meridians: "归心、肝经",
      description: "薰衣草原产于地中海地区，具有安神助眠、舒缓压力的功效。香气独特，是著名的芳香植物。",
      benefits: ["安神助眠", "舒缓压力", "抗菌消炎", "缓解头痛", "调节情绪"],
      suitablePeople: ["失眠多梦者", "焦虑紧张者", "头痛患者", "皮肤敏感者"],
      taboos: {
        unsuitable: ["孕妇", "低血压患者", "癫痫患者"],
        precautions: "用量不宜过多，以免引起头晕",
        drugInteractions: "不宜与镇静类药物同服"
      },
      brewing: {
        waterTemp: "85-90\u00B0C",
        amount: "1-2g / 杯",
        time: "3-5分钟",
        infusions: "1-2泡"
      },
      pairings: [
        { name: "洋甘菊", effect: "安神助眠，舒缓神经" },
        { name: "蜂蜜", effect: "润燥安神，口感调和" },
        { name: "柠檬", effect: "清新口气，提神醒脑" }
      ]
    }
  ],

  // ========== 中药材 ==========
  herbs: [
    {
      id: "goji",
      name: "枸杞",
      emoji: "\uD83D\uDD34",
      category: "herb",
      nature: "性平，味甘",
      meridians: "归肝、肾经",
      description: "枸杞是传统名贵中药材，有「红宝」之称。具有滋补肝肾、益精明目的功效，是药食同源的典范。",
      benefits: ["滋补肝肾", "益精明目", "抗衰老", "增强免疫", "抗疲劳"],
      suitablePeople: ["肝肾不足者", "视力模糊者", "腰膝酸软者", "免疫力低下者"],
      taboos: {
        unsuitable: ["脾胃虚寒泄泻者", "感冒发烧者", "炎症患者"],
        precautions: "不宜过量，每日10-15g为宜",
        drugInteractions: "不宜与抗凝药物同服"
      },
      brewing: {
        waterTemp: "80-85\u00B0C",
        amount: "10-15g / 杯",
        time: "5-10分钟",
        infusions: "2-3泡，最后可嚼食"
      },
      pairings: [
        { name: "菊花", effect: "清肝明目，滋补肝肾" },
        { name: "红枣", effect: "补气养血，美容养颜" },
        { name: "黄芪", effect: "补气固表，增强免疫" }
      ]
    },
    {
      id: "astragalus",
      name: "黄芪",
      emoji: "\uD83E\uDDC9",
      category: "herb",
      nature: "性微温，味甘",
      meridians: "归脾、肺经",
      description: "黄芪是补气要药，有「补气诸药之最」的美誉。具有补气固表、利尿托毒、排脓敛疮的功效。",
      benefits: ["补气固表", "利尿消肿", "托毒排脓", "增强免疫", "抗疲劳"],
      suitablePeople: ["气虚乏力者", "易感冒者", "自汗盗汗者", "内脏下垂者"],
      taboos: {
        unsuitable: ["阴虚阳亢者", "感冒发热者", "食积停滞者"],
        precautions: "不宜过量，以免上火",
        drugInteractions: "不宜与清热解毒类中药同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "10-15g / 杯",
        time: "10-15分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "枸杞", effect: "补气养血，增强免疫" },
        { name: "红枣", effect: "补气养血，健脾和胃" },
        { name: "党参", effect: "补中益气，健脾益肺" }
      ]
    },
    {
      id: "codonopsis",
      name: "党参",
      emoji: "\uD83E\uDDCA",
      category: "herb",
      nature: "性平，味甘",
      meridians: "归脾、肺经",
      description: "党参是常用的补气药材，功效类似人参但作用缓和。具有补中益气、健脾益肺的功效。",
      benefits: ["补中益气", "健脾益肺", "生津养血", "增强免疫", "改善记忆"],
      suitablePeople: ["脾肺气虚者", "食欲不振者", "气血两虚者", "体倦乏力者"],
      taboos: {
        unsuitable: ["实证患者", "热证患者", "气滞火盛者"],
        precautions: "不宜与藜芦同用",
        drugInteractions: "不宜与抗凝药物同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "10-15g / 杯",
        time: "10-15分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "黄芪", effect: "补中益气，健脾益肺" },
        { name: "红枣", effect: "补气养血，健脾和胃" },
        { name: "枸杞", effect: "补气养血，滋补肝肾" }
      ]
    },
    {
      id: "tangerine_peel",
      name: "陈皮",
      emoji: "\uD83C\uDF4A",
      category: "herb",
      nature: "性温，味辛苦",
      meridians: "归脾、肺经",
      description: "陈皮是橘子的干燥成熟果皮，以广东新会所产为佳。具有理气健脾、燥湿化痰的功效，越陈越佳。",
      benefits: ["理气健脾", "燥湿化痰", "降逆止呕", "消食解腻", "止咳平喘"],
      suitablePeople: ["脾胃气滞者", "消化不良者", "痰多咳嗽者", "腹胀呕吐者"],
      taboos: {
        unsuitable: ["阴虚燥咳者", "吐血者", "舌赤少苔者"],
        precautions: "气虚体燥者不宜多用",
        drugInteractions: "不宜与某些酶制剂同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "5-10g / 杯",
        time: "5-10分钟",
        infusions: "3-5泡"
      },
      pairings: [
        { name: "普洱", effect: "消食解腻，理气健脾" },
        { name: "生姜", effect: "温中散寒，止呕化痰" },
        { name: "山楂", effect: "消食化积，行气散瘀" }
      ]
    },
    {
      id: "longan",
      name: "桂圆",
      emoji: "\uD83D\uDFE4",
      category: "herb",
      nature: "性温，味甘",
      meridians: "归心、脾经",
      description: "桂圆又名龙眼，是补益心脾的佳品。具有补益心脾、养血安神的功效，是传统的滋补佳品。",
      benefits: ["补益心脾", "养血安神", "益气补血", "增强记忆", "改善睡眠"],
      suitablePeople: ["心脾两虚者", "失眠健忘者", "气血不足者", "产后体虚者"],
      taboos: {
        unsuitable: ["阴虚火旺者", "糖尿病患者", "感冒发热者"],
        precautions: "不宜过量，以免上火",
        drugInteractions: "不宜与降糖药物同服"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "10-15g / 杯",
        time: "5-10分钟",
        infusions: "2-3泡，可嚼食"
      },
      pairings: [
        { name: "红枣", effect: "补气养血，安神益智" },
        { name: "枸杞", effect: "滋补肝肾，养血安神" },
        { name: "玫瑰花", effect: "疏肝解郁，养血安神" }
      ]
    },
    {
      id: "red_date",
      name: "红枣",
      emoji: "\uD83D\uDD34",
      category: "herb",
      nature: "性温，味甘",
      meridians: "归脾、胃、心经",
      description: "红枣是传统的补气养血佳品，有「天然维生素丸」之美誉。具有补中益气、养血安神的功效。",
      benefits: ["补中益气", "养血安神", "缓和药性", "增强免疫", "保护肝脏"],
      suitablePeople: ["气血不足者", "脾胃虚弱者", "失眠多梦者", "女性经期后"],
      taboos: {
        unsuitable: ["糖尿病患者", "湿热内盛者", "齿病疼痛者"],
        precautions: "不宜过量，以免生湿积滞",
        drugInteractions: "不宜与退热药同服"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "5-10枚 / 杯",
        time: "5-10分钟",
        infusions: "2-3泡，可嚼食"
      },
      pairings: [
        { name: "枸杞", effect: "补气养血，滋补肝肾" },
        { name: "桂圆", effect: "补气养血，安神益智" },
        { name: "生姜", effect: "温中散寒，补气养血" }
      ]
    },
    {
      id: "ginger",
      name: "生姜",
      emoji: "\uD83E\uDDC4",
      category: "herb",
      nature: "性微温，味辛",
      meridians: "归肺、脾、胃经",
      description: "生姜是药食同源的典型代表，具有解表散寒、温中止呕、化痰止咳的功效。",
      benefits: ["解表散寒", "温中止呕", "化痰止咳", "促进消化", "驱寒暖身"],
      suitablePeople: ["风寒感冒者", "胃寒呕吐者", "手脚冰凉者", "寒痰咳嗽者"],
      taboos: {
        unsuitable: ["阴虚内热者", "目疾患者", "疮疡患者"],
        precautions: "不宜晚上食用，以免上火",
        drugInteractions: "不宜与抗凝药物同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "3-5片 / 杯",
        time: "5-10分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "红枣", effect: "温中散寒，补气养血" },
        { name: "红糖", effect: "温中散寒，活血化瘀" },
        { name: "陈皮", effect: "温中散寒，理气化痰" }
      ]
    }
  ],

  // ========== 养生茶饮 ==========
  wellnessTeas: [
    {
      id: "red_date_goji",
      name: "红枣枸杞茶",
      emoji: "\uD83D\uDD34",
      category: "wellness",
      nature: "性平偏温，味甘",
      meridians: "归脾、肝、肾经",
      description: "红枣枸杞茶是最经典的养生茶饮，补气养血、滋补肝肾，适合日常饮用。",
      benefits: ["补气养血", "滋补肝肾", "美容养颜", "增强免疫", "改善睡眠"],
      suitablePeople: ["气血不足者", "面色苍白者", "眼睛干涩者", "免疫力低下者"],
      taboos: {
        unsuitable: ["感冒发热者", "腹泻患者", "糖尿病患者"],
        precautions: "不宜过量，以免上火",
        drugInteractions: "不宜与抗凝药物同服"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "红枣5枚+枸杞10g",
        time: "10-15分钟",
        infusions: "2-3泡"
      },
      ingredients: ["红枣", "枸杞"],
      pairings: [
        { name: "桂圆", effect: "补气养血，安神益智" },
        { name: "黄芪", effect: "补气固表，增强免疫" }
      ]
    },
    {
      id: "rose_tea",
      name: "玫瑰花茶",
      emoji: "\uD83C\uDF39",
      category: "wellness",
      nature: "性温，味甘微苦",
      meridians: "归肝、脾经",
      description: "玫瑰花茶是女性养生佳品，疏肝解郁、美容养颜，香气怡人。",
      benefits: ["疏肝解郁", "美容养颜", "活血调经", "缓解情绪", "清新口气"],
      suitablePeople: ["情绪抑郁者", "经前不适者", "皮肤暗沉者", "压力大者"],
      taboos: {
        unsuitable: ["孕妇", "月经过多者", "便秘者"],
        precautions: "经期量多者暂停",
        drugInteractions: "无明显药物相互作用"
      },
      brewing: {
        waterTemp: "80-85\u00B0C",
        amount: "5-8朵 / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      ingredients: ["玫瑰花"],
      pairings: [
        { name: "红枣", effect: "补气养血，美容养颜" },
        { name: "枸杞", effect: "滋补肝肾，明目安神" }
      ]
    },
    {
      id: "chenpi_puer",
      name: "陈皮普洱",
      emoji: "\uD83C\uDF4A",
      category: "wellness",
      nature: "性温，味甘苦",
      meridians: "归脾、肺、胃经",
      description: "陈皮普洱是广东特产，将陈皮与普洱茶完美结合，理气健脾、消食解腻。",
      benefits: ["理气健脾", "消食解腻", "降脂减肥", "化痰止咳", "暖胃驱寒"],
      suitablePeople: ["消化不良者", "腹胀者", "痰多者", "油腻饮食后"],
      taboos: {
        unsuitable: ["阴虚燥咳者", "空腹者", "孕妇"],
        precautions: "不宜空腹饮用",
        drugInteractions: "不宜与某些酶制剂同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "普洱5g+陈皮3g",
        time: "15-30秒（功夫泡法）",
        infusions: "8-10泡"
      },
      ingredients: ["普洱茶", "陈皮"],
      pairings: [
        { name: "山楂", effect: "消食化积，降脂减肥" },
        { name: "菊花", effect: "清肝明目，消食解腻" }
      ]
    },
    {
      id: "ginger_tea",
      name: "姜茶",
      emoji: "\uD83E\uDDC4",
      category: "wellness",
      nature: "性温，味辛",
      meridians: "归肺、脾、胃经",
      description: "姜茶是传统的驱寒暖身饮品，具有解表散寒、温中止呕的功效。",
      benefits: ["驱寒暖身", "温中止呕", "预防感冒", "促进循环", "缓解痛经"],
      suitablePeople: ["风寒感冒者", "手脚冰凉者", "胃寒者", "痛经女性"],
      taboos: {
        unsuitable: ["阴虚火旺者", "风热感冒者", "胃溃疡患者"],
        precautions: "不宜晚上饮用",
        drugInteractions: "不宜与抗凝药物同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "生姜5片+红糖适量",
        time: "5-10分钟",
        infusions: "2-3泡"
      },
      ingredients: ["生姜", "红糖"],
      pairings: [
        { name: "红枣", effect: "温中散寒，补气养血" },
        { name: "桂圆", effect: "温中散寒，补气养血" }
      ]
    },
    {
      id: "sour_plum",
      name: "酸梅汤",
      emoji: "\uD83E\uDD64",
      category: "wellness",
      nature: "性平，味酸甘",
      meridians: "归肝、脾、肺经",
      description: "酸梅汤是传统的消暑饮品，生津止渴、敛肺止咳，是夏日解暑佳品。",
      benefits: ["生津止渴", "敛肺止咳", "消暑解烦", "促进消化", "缓解疲劳"],
      suitablePeople: ["暑热烦渴者", "口干舌燥者", "食欲不振者", "夏季防暑"],
      taboos: {
        unsuitable: ["胃酸过多者", "糖尿病患者", "感冒发热者"],
        precautions: "不宜过量饮用",
        drugInteractions: "不宜与碱性药物同服"
      },
      brewing: {
        waterTemp: "95-100\u00B0C",
        amount: "乌梅10g+山楂10g+陈皮5g",
        time: "煮15-20分钟",
        infusions: "可煮2次"
      },
      ingredients: ["乌梅", "山楂", "陈皮", "甘草", "冰糖"],
      pairings: [
        { name: "桂花", effect: "生津止渴，香气怡人" },
        { name: "薄荷", effect: "清凉解暑，生津止渴" }
      ]
    }
  ],

  // ========== 果茶类 ==========
  fruitTeas: [
    {
      id: "lemon",
      name: "柠檬片",
      emoji: "\uD83C\uDF4B",
      category: "fruit",
      nature: "性凉，味酸甘",
      meridians: "归肺、胃经",
      description: "柠檬富含维生素C，具有生津止渴、化痰止咳、美白养颜的功效。",
      benefits: ["生津止渴", "美白养颜", "促进消化", "增强免疫", "抗氧化"],
      suitablePeople: ["口渴咽干者", "皮肤暗沉者", "消化不良者", "免疫力低下者"],
      taboos: {
        unsuitable: ["胃酸过多者", "胃溃疡患者", "龋齿患者"],
        precautions: "不宜空腹饮用，饮后漱口",
        drugInteractions: "不宜与某些抗生素同服"
      },
      brewing: {
        waterTemp: "60-70\u00B0C",
        amount: "2-3片 / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "蜂蜜", effect: "润燥养颜，口感更佳" },
        { name: "绿茶", effect: "清新提神，美白抗氧化" },
        { name: "百香果", effect: "生津止渴，美白养颜" }
      ]
    },
    {
      id: "passion_fruit",
      name: "百香果",
      emoji: "\uD83E\uDD5D",
      category: "fruit",
      nature: "性平，味酸甜",
      meridians: "归心、大肠经",
      description: "百香果又名鸡蛋果，富含多种维生素和氨基酸，具有安神助眠、美容养颜的功效。",
      benefits: ["安神助眠", "美容养颜", "润肠通便", "增强免疫", "缓解焦虑"],
      suitablePeople: ["失眠焦虑者", "便秘者", "皮肤干燥者", "免疫力低下者"],
      taboos: {
        unsuitable: ["胃酸过多者", "糖尿病患者"],
        precautions: "不宜过量食用",
        drugInteractions: "不宜与镇静类药物同服"
      },
      brewing: {
        waterTemp: "60-70\u00B0C",
        amount: "1个 / 杯",
        time: "即冲即饮",
        infusions: "1泡"
      },
      pairings: [
        { name: "蜂蜜", effect: "安神助眠，润燥养颜" },
        { name: "柠檬", effect: "美白养颜，生津止渴" },
        { name: "绿茶", effect: "清新提神，抗氧化" }
      ]
    },
    {
      id: "hawthorn",
      name: "山楂干",
      emoji: "\uD83D\uDD34",
      category: "fruit",
      nature: "性微温，味酸甘",
      meridians: "归脾、胃、肝经",
      description: "山楂具有消食健胃、行气散瘀的功效，是传统的消食佳品。",
      benefits: ["消食健胃", "行气散瘀", "降脂减肥", "活血化瘀", "促进消化"],
      suitablePeople: ["消化不良者", "肉食积滞者", "高血脂者", "血瘀经闭者"],
      taboos: {
        unsuitable: ["胃酸过多者", "孕妇", "脾胃虚弱无积滞者"],
        precautions: "不宜空腹食用",
        drugInteractions: "不宜与某些降脂药物同服"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "10-15g / 杯",
        time: "5-10分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "陈皮", effect: "消食化积，理气健脾" },
        { name: "决明子", effect: "降脂减肥，润肠通便" },
        { name: "荷叶", effect: "降脂减肥，清热解暑" }
      ]
    },
    {
      id: "dried_longan",
      name: "桂圆干",
      emoji: "\uD83D\uDFE4",
      category: "fruit",
      nature: "性温，味甘",
      meridians: "归心、脾经",
      description: "桂圆干是新鲜龙眼的干制品，具有补益心脾、养血安神的功效。",
      benefits: ["补益心脾", "养血安神", "益气补血", "改善睡眠", "增强记忆"],
      suitablePeople: ["心脾两虚者", "失眠健忘者", "气血不足者", "产后体虚者"],
      taboos: {
        unsuitable: ["阴虚火旺者", "糖尿病患者", "感冒发热者"],
        precautions: "不宜过量，以免上火",
        drugInteractions: "不宜与降糖药物同服"
      },
      brewing: {
        waterTemp: "90-95\u00B0C",
        amount: "10-15g / 杯",
        time: "5-10分钟",
        infusions: "2-3泡，可嚼食"
      },
      pairings: [
        { name: "红枣", effect: "补气养血，安神益智" },
        { name: "枸杞", effect: "滋补肝肾，养血安神" }
      ]
    },
    {
      id: "apple_chips",
      name: "苹果干",
      emoji: "\uD83C\uDF4E",
      category: "fruit",
      nature: "性凉，味甘酸",
      meridians: "归脾、肺经",
      description: "苹果干保留了苹果的营养成分，具有健脾养胃、生津止渴的功效。",
      benefits: ["健脾养胃", "生津止渴", "润肠通便", "降血压", "抗氧化"],
      suitablePeople: ["脾胃虚弱者", "口渴咽干者", "便秘者", "高血压者"],
      taboos: {
        unsuitable: ["糖尿病患者", "溃疡性结肠炎者"],
        precautions: "不宜过量食用",
        drugInteractions: "无明显药物相互作用"
      },
      brewing: {
        waterTemp: "85-90\u00B0C",
        amount: "5-10g / 杯",
        time: "5-10分钟",
        infusions: "2-3泡，可嚼食"
      },
      pairings: [
        { name: "红枣", effect: "健脾养胃，补气养血" },
        { name: "枸杞", effect: "滋补肝肾，明目安神" }
      ]
    },
    {
      id: "orange_slice",
      name: "橙子片",
      emoji: "\uD83C\uDF4A",
      category: "fruit",
      nature: "性凉，味甘酸",
      meridians: "归肺、胃经",
      description: "橙子片富含维生素C和类黄酮，具有生津止渴、理气化痰的功效。",
      benefits: ["生津止渴", "理气化痰", "增强免疫", "美白养颜", "促进消化"],
      suitablePeople: ["口渴咽干者", "咳嗽痰多者", "免疫力低下者", "皮肤暗沉者"],
      taboos: {
        unsuitable: ["胃酸过多者", "糖尿病患者"],
        precautions: "不宜空腹饮用",
        drugInteractions: "不宜与某些降脂药物同服"
      },
      brewing: {
        waterTemp: "70-80\u00B0C",
        amount: "3-5片 / 杯",
        time: "3-5分钟",
        infusions: "2-3泡"
      },
      pairings: [
        { name: "蜂蜜", effect: "润燥养颜，口感更佳" },
        { name: "红茶", effect: "理气化痰，暖胃驱寒" }
      ]
    }
  ],

  // ========== 功效分类（用于搭配查询） ==========
  effects: {
    "清肝明目": ["chrysanthemum", "goji", "lavender"],
    "清热解毒": ["honeysuckle", "chrysanthemum"],
    "补气养血": ["red_date", "longan", "astragalus", "codonopsis", "red_date_goji"],
    "疏肝解郁": ["rose", "jasmine", "rose_tea"],
    "安神助眠": ["lavender", "longan", "passion_fruit"],
    "消食解腻": ["tangerine_peel", "hawthorn", "chenpi_puer"],
    "美容养颜": ["rose", "goji", "lemon", "passion_fruit"],
    "温中散寒": ["ginger", "osmanthus", "ginger_tea"],
    "增强免疫": ["goji", "astragalus", "red_date", "lemon"],
    "降脂减肥": ["hawthorn", "chenpi_puer"],
    "生津止渴": ["sour_plum", "lemon", "passion_fruit", "orange_slice"],
    "理气健脾": ["tangerine_peel", "chenpi_puer", "hawthorn"]
  },

  // ========== 体质分类（用于体质查询） ==========
  bodyTypes: {
    cold: {
      label: "寒性体质",
      description: "手脚冰凉、怕冷、易腹泻",
      suitable: ["ginger", "red_date", "longan", "osmanthus", "rose", "astragalus", "ginger_tea", "red_date_goji"],
      avoid: ["chrysanthemum", "honeysuckle", "lavender", "lemon", "hawthorn"]
    },
    hot: {
      label: "热性体质",
      description: "易上火、口干舌燥、便秘",
      suitable: ["chrysanthemum", "honeysuckle", "lemon", "passion_fruit", "sour_plum", "apple_chips"],
      avoid: ["ginger", "longan", "red_date", "osmanthus", "ginger_tea"]
    },
    damp: {
      label: "痰湿体质",
      description: "体胖、痰多、易困倦",
      suitable: ["tangerine_peel", "hawthorn", "chenpi_puer", "sour_plum"],
      avoid: ["longan", "red_date", "passion_fruit"]
    },
    qi_deficiency: {
      label: "气虚体质",
      description: "气短乏力、易疲劳、易感冒",
      suitable: ["astragalus", "codonopsis", "red_date", "goji", "red_date_gozi"],
      avoid: ["honeysuckle", "lemon", "sour_plum"]
    },
    blood_deficiency: {
      label: "血虚体质",
      description: "面色苍白、头晕眼花、心悸失眠",
      suitable: ["red_date", "longan", "goji", "rose", "red_date_gozi"],
      avoid: ["honeysuckle", "hawthorn", "sour_plum"]
    }
  },

  // ========== 禁忌状态（用于禁忌提醒） ==========
  contraindications: {
    pregnancy: {
      label: "孕期",
      avoid: ["rose", "lavender", "hawthorn", "jasmine", "osmanthus"]
    },
    menstruation: {
      label: "经期",
      avoid: ["rose", "honeysuckle"]
    },
    taking_medication: {
      label: "服药中",
      avoid: ["goji", "astragalus", "codonopsis", "ginger", "longan"]
    },
    cold_flu: {
      label: "感冒发热",
      avoid: ["red_date", "longan", "goji", "astragalus"]
    },
    diabetes: {
      label: "糖尿病",
      avoid: ["longan", "red_date", "passion_fruit", "orange_slice", "sour_plum"]
    },
    stomach_acid: {
      label: "胃酸过多",
      avoid: ["lemon", "passion_fruit", "hawthorn", "orange_slice"]
    }
  }
};
