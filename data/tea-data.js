// 茶类知识库数据
const TEA_DATA = {
  categories: [
    {
      id: "green",
      name: "绿茶",
      emoji: "\uD83C\uDF43",
      color: "#7B9E6B",
      fermentation: "不发酵茶（0%）",
      description: "绿茶是中国产量最大的茶类，以「清汤绿叶」著称。采摘后通过杀青破坏酶的活性，阻止茶多酚氧化，保留了茶叶的天然绿色和清新口感。",
      famousTeas: ["西湖龙井", "碧螺春", "黄山毛峰", "信阳毛尖", "六安瓜片", "太平猴魁"],
      brewing: {
        waterTemp: "80-85\u00B0C",
        teaAmount: "3-5g / 150ml",
        steepTime: "2-3分钟",
        rinse: false,
        infusions: "3-4泡"
      },
      teaware: ["玻璃杯", "瓷盖碗"],
      health: {
        benefits: ["清热解暑", "提神醒脑", "抗氧化", "降脂减肥", "防辐射", "保护心血管"],
        suitableBody: ["热性体质", "平和体质"],
        taboo: ["空腹不宜饮用", "胃寒者少饮", "不宜与药同服", "睡前慎饮"]
      },
      season: "春夏季最佳"
    },
    {
      id: "white",
      name: "白茶",
      emoji: "\uD83E\uDD0D",
      color: "#C4B896",
      fermentation: "微发酵茶（5-10%）",
      description: "白茶工艺最简朴，仅经萎凋和干燥两道工序。不炒不揉，自然天成。白茶有「一年茶、三年药、七年宝」之说，越陈越香。",
      famousTeas: ["白毫银针", "白牡丹", "寿眉", "贡眉"],
      brewing: {
        waterTemp: "85-90\u00B0C",
        teaAmount: "5g / 150ml",
        steepTime: "3-5分钟",
        rinse: true,
        infusions: "5-6泡"
      },
      teaware: ["瓷盖碗", "玻璃杯"],
      health: {
        benefits: ["清热降火", "消炎解毒", "保护肝脏", "降血糖", "抗衰老", "增强免疫力"],
        suitableBody: ["热性体质", "平和体质", "虚性体质"],
        taboo: ["空腹不宜", "新茶性寒宜少饮", "不宜过浓"]
      },
      season: "四季皆宜，夏季更佳"
    },
    {
      id: "yellow",
      name: "黄茶",
      emoji: "\uD83D\uDCA1",
      color: "#D4A843",
      fermentation: "轻发酵茶（10-20%）",
      description: "黄茶工艺类似绿茶，多了一道「闷黄」工序。产量较少，口感醇厚甘爽，介于绿茶和乌龙茶之间，温和不刺激。",
      famousTeas: ["君山银针", "蒙顶黄芽", "霍山黄芽", "沩山毛尖"],
      brewing: {
        waterTemp: "85-90\u00B0C",
        teaAmount: "3-4g / 150ml",
        steepTime: "2-3分钟",
        rinse: false,
        infusions: "3-4泡"
      },
      teaware: ["瓷盖碗", "玻璃杯"],
      health: {
        benefits: ["健脾养胃", "助消化", "清热解暑", "生津止渴"],
        suitableBody: ["平和体质", "脾胃虚弱者"],
        taboo: ["空腹慎饮", "不宜过量"]
      },
      season: "夏秋季最佳"
    },
    {
      id: "oolong",
      name: "乌龙茶",
      emoji: "\uD83C\uDF3F",
      color: "#8B6914",
      fermentation: "半发酵茶（15-70%）",
      description: "乌龙茶又称青茶，工艺最为复杂，兼具绿茶的清香和红茶的醇厚。香气层次丰富，有「岩韵」「音韵」等独特韵味。",
      famousTeas: ["铁观音", "大红袍", "凤凰单丛", "冻顶乌龙", "武夷水仙", "黄金桂"],
      brewing: {
        waterTemp: "95-100\u00B0C",
        teaAmount: "7-8g / 150ml",
        steepTime: "15-30秒（功夫泡法）",
        rinse: true,
        infusions: "7-10泡"
      },
      teaware: ["紫砂壶", "瓷盖碗"],
      health: {
        benefits: ["分解脂肪", "减肥健美", "抗氧化", "降血脂", "改善皮肤过敏"],
        suitableBody: ["平和体质", "痰湿体质"],
        taboo: ["空腹不宜", "睡前慎饮", "不宜过浓"]
      },
      season: "秋季最佳"
    },
    {
      id: "black",
      name: "红茶",
      emoji: "\uD83E\uDDC1",
      color: "#A0522D",
      fermentation: "全发酵茶（100%）",
      description: "红茶经过完全发酵，茶汤红亮，滋味醇厚甘甜。红茶性温，是世界上饮用范围最广的茶类，适合搭配牛奶和糖。",
      famousTeas: ["正山小种", "祁门红茶", "滇红", "金骏眉", "白琳工夫"],
      brewing: {
        waterTemp: "90-95\u00B0C",
        teaAmount: "3-5g / 150ml",
        steepTime: "3-5分钟",
        rinse: false,
        infusions: "3-4泡"
      },
      teaware: ["瓷壶", "瓷盖碗", "紫砂壶"],
      health: {
        benefits: ["暖胃驱寒", "促进消化", "增强心脏功能", "抗菌消炎", "利尿消肿"],
        suitableBody: ["寒性体质", "虚寒体质", "脾胃虚弱者"],
        taboo: ["空腹慎饮", "不宜过浓", "服药期间慎饮"]
      },
      season: "冬季最佳"
    },
    {
      id: "dark",
      name: "黑茶",
      emoji: "\u2615",
      color: "#5C3D1A",
      fermentation: "后发酵茶",
      description: "黑茶经渥堆发酵，茶性温和醇厚。普洱茶是黑茶代表，越陈越香。黑茶有助消化、降血脂的功效，是「可以喝的古董」。",
      famousTeas: ["普洱熟茶", "安化黑茶", "六堡茶", "茯砖茶", "青砖茶"],
      brewing: {
        waterTemp: "100\u00B0C",
        teaAmount: "7-10g / 150ml",
        steepTime: "15-30秒（功夫泡法）",
        rinse: true,
        infusions: "10+泡"
      },
      teaware: ["紫砂壶", "陶壶"],
      health: {
        benefits: ["降脂减肥", "助消化", "降血糖", "调节肠道菌群", "解酒护肝"],
        suitableBody: ["寒性体质", "痰湿体质", "平和体质"],
        taboo: ["孕妇慎饮", "不宜空腹", "不宜过浓"]
      },
      season: "冬季最佳"
    }
  ],

  teaware: [
    {
      id: "glass",
      name: "玻璃杯",
      material: "高硼硅玻璃",
      features: ["透明可观茶形", "不吸茶香", "易清洗", "价格亲民"],
      suitableTea: ["绿茶", "白茶", "黄茶"],
      tips: "适合观赏茶叶在水中舒展的姿态，是品饮绿茶的首选。注意避免骤冷骤热。",
      priceRange: "20-100元"
    },
    {
      id: "gaiwan",
      name: "瓷盖碗",
      material: "白瓷/青瓷",
      features: ["百搭茶具", "不吸味", "便于观察汤色", "出汤速度快"],
      suitableTea: ["绿茶", "白茶", "黄茶", "乌龙茶", "红茶"],
      tips: "万能茶具，适合大多数茶类。新手注意烫手问题，选择碗沿较宽的款式。",
      priceRange: "30-300元"
    },
    {
      id: "zisha",
      name: "紫砂壶",
      material: "宜兴紫砂",
      features: ["透气性好", "保温性强", "越养越润", "提升茶汤口感"],
      suitableTea: ["乌龙茶", "黑茶", "红茶", "普洱"],
      tips: "一壶一茶最佳，避免串味。新壶需开壶，使用后需自然晾干。选择正宗宜兴紫砂。",
      priceRange: "100-数万元"
    },
    {
      id: "ceramic",
      name: "瓷壶",
      material: "白瓷/骨瓷",
      features: ["保温适中", "造型多样", "不吸味", "易清洗"],
      suitableTea: ["红茶", "花茶", "乌龙茶"],
      tips: "适合日常待客，选择壶嘴流畅、握感舒适的款式。",
      priceRange: "50-500元"
    },
    {
      id: "clay",
      name: "陶壶",
      material: "粗陶/细陶",
      features: ["保温性好", "古朴质感", "适合煮茶", "透气性佳"],
      suitableTea: ["黑茶", "老白茶", "普洱熟茶"],
      tips: "特别适合煮饮老茶，冬季使用尤佳。注意避免干烧。",
      priceRange: "50-500元"
    }
  ],

  recommendations: {
    body: {
      cold: {
        label: "寒性体质",
        description: "手脚冰凉、怕冷、易腹泻",
        teas: ["black", "dark", "oolong"],
        advice: "宜饮温性茶，如红茶、黑茶、陈年乌龙。避免大量饮用绿茶等凉性茶。"
      },
      hot: {
        label: "热性体质",
        description: "易上火、口干舌燥、便秘",
        teas: ["green", "white", "yellow"],
        advice: "宜饮凉性茶，如绿茶、白茶、黄茶。少饮浓茶和重焙火的乌龙茶。"
      },
      weak: {
        label: "虚性体质",
        description: "容易疲劳、气短、免疫力低",
        teas: ["white", "black", "dark"],
        advice: "宜饮温和茶，如老白茶、红茶、熟普。不宜空腹饮茶，浓度宜淡。"
      }
    },
    scene: {
      office: {
        label: "办公提神",
        description: "需要集中注意力、提高工作效率",
        teas: ["green", "oolong"],
        advice: "推荐绿茶或清香型乌龙茶，咖啡因适中，提神不伤胃。"
      },
      guest: {
        label: "待客社交",
        description: "招待客人、朋友聚会",
        teas: ["oolong", "black"],
        advice: "推荐乌龙茶或红茶，香气高雅，适合功夫茶泡法，增添仪式感。"
      },
      health: {
        label: "养生保健",
        description: "日常调理、强身健体",
        teas: ["white", "dark"],
        advice: "推荐老白茶或黑茶，温和养胃，长期饮用有益健康。"
      },
      digest: {
        label: "解腻消食",
        description: "大餐后、油腻食物后",
        teas: ["dark", "oolong", "black"],
        advice: "推荐黑茶或乌龙茶，助消化、解油腻效果最佳。"
      }
    },
    time: {
      morning: {
        label: "早晨",
        description: "起床后、早餐前后",
        teas: ["black", "green"],
        advice: "早晨宜饮红茶暖胃，或淡绿茶提神。避免空腹饮浓茶。"
      },
      afternoon: {
        label: "下午",
        description: "午后、下午茶时间",
        teas: ["oolong", "green", "white"],
        advice: "下午是品茶最佳时段，各种茶类皆宜。推荐乌龙茶，提神解乏。"
      },
      evening: {
        label: "晚上",
        description: "晚餐后、睡前",
        teas: ["dark", "white"],
        advice: "晚上宜饮低咖啡因茶，如老白茶、熟普。避免饮浓茶影响睡眠。"
      }
    }
  },

  seasons: {
    spring: { label: "春季", tea: "green", advice: "春饮花茶或绿茶，疏肝解郁，驱散冬季寒气" },
    summer: { label: "夏季", tea: "green", advice: "夏饮绿茶或白茶，清热解暑，生津止渴" },
    autumn: { label: "秋季", tea: "oolong", advice: "秋饮乌龙茶，润燥生津，不寒不热" },
    winter: { label: "冬季", tea: "black", advice: "冬饮红茶或黑茶，暖胃驱寒，滋养身体" }
  }
};
