const form = document.querySelector("#athlete-form");
const fatigueInput = form.elements.fatigue;
const fatigueOutput = document.querySelector("#fatigue-output");
const printButton = document.querySelector("#print-button");
const mealPhotoInput = document.querySelector("#meal-photo");
const mealTimingInput = document.querySelector("#meal-timing");
const carbPortionInput = document.querySelector("#carb-portion");
const foodChecks = document.querySelector("#food-checks");
const athleteButtons = document.querySelector("#athlete-buttons");

const athletes = {
  momoko: "ももこ",
  emi: "えみ",
  mao: "まお",
  kokomi: "ここみ",
};

let activeAthlete = localStorage.getItem("strideFuel.activeAthlete") || "momoko";
let isRestoringAthlete = false;

const els = {
  activeAthlete: document.querySelector("#active-athlete"),
  riskPill: document.querySelector("#risk-pill"),
  bmi: document.querySelector("#bmi"),
  fatMass: document.querySelector("#fat-mass"),
  ffm: document.querySelector("#ffm"),
  muscleRatio: document.querySelector("#muscle-ratio"),
  trainingLoad: document.querySelector("#training-load"),
  caloriesPerMin: document.querySelector("#calories-per-min"),
  scoreRing: document.querySelector("#score-ring"),
  readinessScore: document.querySelector("#readiness-score"),
  mainMessage: document.querySelector("#main-message"),
  subMessage: document.querySelector("#sub-message"),
  fatBar: document.querySelector("#fat-bar"),
  muscleBar: document.querySelector("#muscle-bar"),
  recoveryBar: document.querySelector("#recovery-bar"),
  fatLabel: document.querySelector("#fat-label"),
  muscleLabel: document.querySelector("#muscle-label"),
  recoveryLabel: document.querySelector("#recovery-label"),
  conditionScore: document.querySelector("#condition-score"),
  conditionTitle: document.querySelector("#condition-title"),
  conditionMessage: document.querySelector("#condition-message"),
  conditionBadge: document.querySelector("#condition-badge"),
  conditionFlags: document.querySelector("#condition-flags"),
  labTitle: document.querySelector("#lab-title"),
  labBadge: document.querySelector("#lab-badge"),
  labGrid: document.querySelector("#lab-grid"),
  trainingNote: document.querySelector("#training-note"),
  planList: document.querySelector("#plan-list"),
  mealTitle: document.querySelector("#meal-title"),
  mealBadge: document.querySelector("#meal-badge"),
  mealGrid: document.querySelector("#meal-grid"),
  mealNote: document.querySelector("#meal-note"),
  nutritionTitle: document.querySelector("#nutrition-title"),
  nutritionBadge: document.querySelector("#nutrition-badge"),
  nutritionGrid: document.querySelector("#nutrition-grid"),
  cheerMessage: document.querySelector("#cheer-message"),
  photoBadge: document.querySelector("#photo-badge"),
  photoPreview: document.querySelector("#photo-preview"),
  photoResult: document.querySelector("#photo-result"),
  recipeTitle: document.querySelector("#recipe-title"),
  recipeBadge: document.querySelector("#recipe-badge"),
  recipeGrid: document.querySelector("#recipe-grid"),
};

const planLibrary = {
  fuel: {
    title: "食事: まず不足を埋める",
    text: "朝食、練習前の糖質、練習後30分以内の糖質+たんぱく質を固定化。体脂肪調整は食事を抜かず、間食の質と夕食のバランスで行う。",
  },
  strength: {
    title: "筋力: 下肢と体幹を週2回",
    text: "スクワット、ヒップヒンジ、カーフ、片脚支持、体幹を20-30分。走行距離を増やすより、筋量を戻す刺激を優先する。",
  },
  recovery: {
    title: "回復: 高強度を詰めない",
    text: "疲労が高い週はポイント練習を1本軽くし、睡眠と補食を先に整える。朝のだるさや安静時心拍の上昇も記録する。",
  },
  medical: {
    title: "安全: RED-Sサインを確認",
    text: "月経停止、不規則、骨ストレス既往、急な体重減少がある場合は、医療者・管理栄養士・指導者で方針を共有する。",
  },
  bodyComp: {
    title: "体組成: 4週単位で見る",
    text: "InBodyは水分・食事・月経周期・前日の練習で揺れる。毎回同じ条件で測り、単回値より4週間の変化を見る。",
  },
  racing: {
    title: "競技: 軽さより出力",
    text: "目標は体重ではなく、筋量を保ったままジョグの余裕度、坂・流しの出力、翌日の回復を改善することに置く。",
  },
};

const mealLibrary = {
  interval: {
    title: "インターバル向け補給メニュー",
    badge: "高強度",
    note: "高強度日は軽さより出力を優先します。開始2-3時間前に主食を入れ、直前は消化の軽い糖質にします。",
    meals: [
      {
        name: "練習前",
        items: ["2-3時間前にごはん・うどん・パン", "30-60分前にバナナまたはゼリー", "水分と少量の塩分"],
      },
      {
        name: "練習中",
        items: ["60分以内なら水分中心", "暑い日はスポーツドリンク", "集中が落ちる時は糖質を少量"],
      },
      {
        name: "練習後",
        items: ["おにぎりまたはパン", "牛乳・ヨーグルト・プロテイン飲料", "夕食まで空くなら補食を追加"],
      },
      {
        name: "夕食",
        items: ["ごはん", "肉・魚・卵・大豆製品", "野菜と汁物"],
      },
    ],
  },
  tempo: {
    title: "ペース走向け補給メニュー",
    badge: "持続走",
    note: "ペース走は糖質を使いやすい練習です。前後の主食を削らず、鉄を含む主菜も合わせます。",
    meals: [
      {
        name: "練習前",
        items: ["おにぎりまたは食パン", "バナナ", "胃が重い時はゼリー"],
      },
      {
        name: "練習中",
        items: ["水分", "45分超ならスポーツドリンク", "発汗が多い日は塩分"],
      },
      {
        name: "練習後",
        items: ["鮭おにぎり", "飲むヨーグルト", "果物"],
      },
      {
        name: "夕食",
        items: ["ごはん", "赤身肉・魚・豆腐", "小松菜・ひじき・海藻"],
      },
    ],
  },
  long: {
    title: "ロング走向け補給メニュー",
    badge: "持久力",
    note: "75分以上の練習は途中補給も練習の一部です。終わってから食べるだけでなく、前日夜から主食を確保します。",
    meals: [
      {
        name: "前日・朝",
        items: ["夕食と朝食に主食", "脂っこいものは控えめ", "起床後に水分"],
      },
      {
        name: "練習中",
        items: ["45-60分ごとに糖質", "スポーツドリンクまたはジェル", "暑い日は塩分"],
      },
      {
        name: "練習後",
        items: ["おにぎり2個まで調整", "牛乳・豆乳・ヨーグルト", "なるべく早く昼食/夕食"],
      },
      {
        name: "夕食",
        items: ["ごはん多め", "魚・鶏肉・豚肉", "汁物で水分と塩分"],
      },
    ],
  },
  easy: {
    title: "ジョグ向け整えるメニュー",
    badge: "回復走",
    note: "軽い日も欠食は避けます。体脂肪調整は練習前後の補給を削らず、間食の質と夕食の整え方で行います。",
    meals: [
      {
        name: "練習前",
        items: ["空腹ならバナナ", "小さめおにぎり", "水分"],
      },
      {
        name: "練習中",
        items: ["水分中心", "暑い日は塩分", "長引く時は糖質を追加"],
      },
      {
        name: "練習後",
        items: ["牛乳またはヨーグルト", "次の食事を抜かない", "疲労が強ければ主食を追加"],
      },
      {
        name: "夕食",
        items: ["ごはん適量", "魚・豆腐・卵", "野菜ときのこ"],
      },
    ],
  },
  strengthWorkout: {
    title: "補強・ウエイト向けメニュー",
    badge: "筋量",
    note: "筋量を増やしたい日は、練習後のたんぱく質だけでなく主食も必要です。筋肉を作る材料とエネルギーを同時に入れます。",
    meals: [
      {
        name: "練習前",
        items: ["おにぎりまたはパン", "空腹なら果物", "水分"],
      },
      {
        name: "練習中",
        items: ["水分", "長い補強ならスポーツドリンク", "無理な空腹トレは避ける"],
      },
      {
        name: "練習後",
        items: ["牛乳・豆乳・プロテイン飲料", "おにぎりまたはパン", "30-60分以内を目安"],
      },
      {
        name: "夕食",
        items: ["ごはん", "鶏肉・魚・卵・大豆製品", "カルシウム源を追加"],
      },
    ],
  },
  restDay: {
    title: "休養日向け回復メニュー",
    badge: "休養",
    note: "休養日は食事を大きく削る日ではなく、回復と次の練習準備の日です。主食は適量、たんぱく質と鉄・カルシウムを確保します。",
    meals: [
      {
        name: "朝食",
        items: ["ごはんまたはパン", "卵・納豆・ヨーグルト", "果物"],
      },
      {
        name: "昼食",
        items: ["麺や丼なら具を増やす", "肉・魚・豆腐", "野菜"],
      },
      {
        name: "補食",
        items: ["乳製品", "ナッツ少量", "空腹ならおにぎり"],
      },
      {
        name: "夕食",
        items: ["ごはん", "魚・赤身肉・大豆製品", "小松菜・海藻・汁物"],
      },
    ],
  },
  steady: {
    title: "練習日ベースメニュー",
    badge: "練習日",
    note: "主食を抜かず、毎食にたんぱく質を入れます。体脂肪調整は量を極端に削らず、揚げ物・菓子・夜遅い間食の頻度で調整します。",
    meals: [
      {
        name: "朝食",
        items: ["ごはんまたは食パン", "卵・納豆・ヨーグルトのいずれか", "果物または100%ジュース"],
      },
      {
        name: "練習前",
        items: ["おにぎり1個", "バナナ", "水分と少量の塩分"],
      },
      {
        name: "練習後",
        items: ["牛乳または飲むヨーグルト", "鮭おにぎり", "補食後に通常の食事"],
      },
      {
        name: "夕食",
        items: ["ごはん", "魚・鶏肉・豆腐の主菜", "野菜と汁物"],
      },
    ],
  },
  recovery: {
    title: "疲労回復を優先するメニュー",
    badge: "回復重視",
    note: "疲労が強い日は糖質不足で回復が遅れやすくなります。練習後の糖質+たんぱく質を先に固定しましょう。",
    meals: [
      {
        name: "朝食",
        items: ["ごはん", "具だくさん味噌汁", "卵焼きまたは焼き魚"],
      },
      {
        name: "練習前",
        items: ["カステラまたは小さめパン", "バナナ", "スポーツドリンク"],
      },
      {
        name: "練習後",
        items: ["おにぎり2個まで調整", "牛乳・豆乳・プロテイン飲料のいずれか", "果物"],
      },
      {
        name: "夕食",
        items: ["麺類ならごはん小盛りを追加", "豚肉・鶏肉・魚", "緑黄色野菜"],
      },
    ],
  },
  lowFuel: {
    title: "補食を習慣化するメニュー",
    badge: "補食強化",
    note: "食事を抜く日が多い場合は、まず1日1回の補食を固定します。体脂肪を下げたい時でも練習前後の補給は削らない設計にします。",
    meals: [
      {
        name: "朝食",
        items: ["食べやすいおにぎり", "ヨーグルト", "果物"],
      },
      {
        name: "持ち歩き",
        items: ["鮭・ツナのおにぎり", "チーズまたはゆで卵", "ドライフルーツ"],
      },
      {
        name: "練習後",
        items: ["飲むヨーグルト", "あんぱんまたはおにぎり", "水分"],
      },
      {
        name: "夕食",
        items: ["ごはん", "肉・魚・大豆製品", "海藻・小松菜・きのこ"],
      },
    ],
  },
  redFlag: {
    title: "専門家と確認したい補給メニュー",
    badge: "安全確認",
    note: "月経停止や骨ストレス既往がある場合は、自己判断の減量を避け、医療者やスポーツ栄養の専門家と摂取量を確認してください。",
    meals: [
      {
        name: "朝食",
        items: ["ごはんまたはパン", "卵・魚・大豆製品", "乳製品または小魚"],
      },
      {
        name: "練習前",
        items: ["おにぎり", "バナナ", "水分"],
      },
      {
        name: "練習後",
        items: ["糖質を含む補食", "牛乳・豆乳・ヨーグルト", "次の食事を抜かない"],
      },
      {
        name: "夕食",
        items: ["主食", "赤身肉・魚・豆腐", "小松菜・ひじき・野菜"],
      },
    ],
  },
};

const recipeLibrary = {
  highCarb: [
    {
      title: "鮭おにぎり + 味噌汁",
      tag: "練習後",
      ingredients: ["ごはん", "鮭フレークまたは焼き鮭", "のり", "豆腐とわかめの味噌汁"],
      steps: ["ごはんに鮭を混ぜて握る", "味噌汁に豆腐とわかめを入れる", "練習後30分以内に食べる"],
      purpose: "糖質で回復を始め、鮭と豆腐でたんぱく質を足します。",
    },
    {
      title: "バナナヨーグルトトースト",
      tag: "朝練前",
      ingredients: ["食パン", "バナナ", "ヨーグルト", "はちみつ少量"],
      steps: ["食パンを焼く", "バナナをのせる", "ヨーグルトとはちみつを添える"],
      purpose: "消化しやすい糖質を入れて、朝のエネルギー切れを防ぎます。",
    },
  ],
  longRun: [
    {
      title: "ツナ卵うどん",
      tag: "ロング走後",
      ingredients: ["うどん", "ツナ", "卵", "ねぎ", "めんつゆ"],
      steps: ["うどんを温める", "ツナと卵を加える", "ねぎをのせる"],
      purpose: "糖質、水分、塩分、たんぱく質をまとめて補えます。",
    },
    {
      title: "鶏そぼろ丼",
      tag: "前日夜",
      ingredients: ["ごはん", "鶏ひき肉", "卵", "小松菜", "しょうゆ・みりん"],
      steps: ["鶏ひき肉を甘辛く炒める", "炒り卵を作る", "小松菜と一緒にごはんへ盛る"],
      purpose: "ロング走前の主食とたんぱく質を確保します。",
    },
  ],
  iron: [
    {
      title: "赤身肉と小松菜の丼",
      tag: "鉄",
      ingredients: ["ごはん", "牛赤身または豚赤身", "小松菜", "卵", "オレンジまたはキウイ"],
      steps: ["肉と小松菜を炒める", "ごはんにのせて卵を添える", "食後に果物を食べる"],
      purpose: "鉄源とビタミンCを組み合わせ、鉄を意識した食事にします。",
    },
    {
      title: "あさりと豆腐の味噌汁定食",
      tag: "鉄・回復",
      ingredients: ["ごはん", "あさり", "豆腐", "小松菜", "味噌"],
      steps: ["あさりを煮る", "豆腐と小松菜を加える", "ごはんと一緒に食べる"],
      purpose: "鉄、たんぱく質、汁物の水分を一緒に補えます。",
    },
  ],
  bone: [
    {
      title: "しらす納豆ごはん",
      tag: "骨・朝食",
      ingredients: ["ごはん", "納豆", "しらす", "小ねぎ", "ヨーグルト"],
      steps: ["納豆としらすを混ぜる", "ごはんにのせる", "ヨーグルトを添える"],
      purpose: "カルシウムとたんぱく質を朝から入れやすい組み合わせです。",
    },
    {
      title: "鮭ときのこのミルクスープ",
      tag: "骨・夕食",
      ingredients: ["鮭", "牛乳または豆乳", "きのこ", "玉ねぎ", "ごはん"],
      steps: ["鮭と野菜を煮る", "牛乳または豆乳を加える", "ごはんと一緒に食べる"],
      purpose: "たんぱく質、カルシウム、ビタミンDを意識できます。",
    },
  ],
  muscle: [
    {
      title: "鶏むね親子丼",
      tag: "筋量",
      ingredients: ["ごはん", "鶏むね肉", "卵", "玉ねぎ", "めんつゆ"],
      steps: ["鶏肉と玉ねぎを煮る", "卵でとじる", "ごはんにのせる"],
      purpose: "主食とたんぱく質を同時に入れて、補強やポイント練習後に使えます。",
    },
    {
      title: "豆腐ツナサラダごはん",
      tag: "軽め夕食",
      ingredients: ["ごはん", "豆腐", "ツナ", "レタス", "トマト"],
      steps: ["豆腐とツナをのせる", "野菜を添える", "ごはんと一緒に食べる"],
      purpose: "食欲が弱い日でも、たんぱく質と主食を外しにくい形です。",
    },
  ],
  snack: [
    {
      title: "補食セット",
      tag: "持ち歩き",
      ingredients: ["おにぎり", "飲むヨーグルト", "バナナ"],
      steps: ["練習後にすぐ食べられる場所へ入れる", "食べられない日は半量から始める", "夕食は抜かない"],
      purpose: "作る余裕がない日でも、回復のスタートを切れます。",
    },
  ],
};

function numberValue(name) {
  return Number.parseFloat(form.elements[name].value || "0");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pct(value) {
  return `${Math.round(clamp(value, 0, 100))}%`;
}

function kg(value) {
  return `${value.toFixed(1)}kg`;
}

function scoreAthlete(data) {
  let risk = 0;
  let notes = [];

  if (data.bodyFat >= 28) {
    risk += 18;
    notes.push("体脂肪率が高め");
  } else if (data.bodyFat >= 24) {
    risk += 10;
  }

  if (data.muscleRatio < 40) {
    risk += 18;
    notes.push("筋量比が低め");
  } else if (data.muscleRatio < 43) {
    risk += 10;
  }

  if (data.period === "missing") {
    risk += 28;
    notes.push("月経停止サイン");
  } else if (data.period === "irregular") {
    risk += 16;
    notes.push("月経不規則");
  }

  if (data.bone === "recent") {
    risk += 22;
    notes.push("骨ストレス既往");
  } else if (data.bone === "past") {
    risk += 10;
  }

  if (data.fatigue >= 8) {
    risk += 16;
    notes.push("疲労が高い");
  } else if (data.fatigue >= 6) {
    risk += 8;
  }

  if (data.fueling === "low") {
    risk += 20;
    notes.push("補食不足");
  } else if (data.fueling === "mixed") {
    risk += 10;
  }

  if (data.weeklyKm > 80 && data.fueling !== "steady") {
    risk += 10;
    notes.push("走行距離に対して補給不足");
  }

  if (data.labs.level === "red") {
    risk += 18;
    notes.push("血液検査の要確認項目");
  } else if (data.labs.level === "yellow") {
    risk += 8;
  }

  return {
    readiness: clamp(100 - risk, 0, 100),
    notes,
    risk,
  };
}

function buildPlan(data, score) {
  const keys = ["fuel", "strength", "bodyComp"];

  if (data.fatigue >= 6 || data.weeklyKm > 70 || data.condition.level !== "green") keys.push("recovery");
  if (data.period !== "regular" || data.bone !== "none" || data.labs.level !== "green") keys.unshift("medical");
  keys.push("racing");

  return [...new Set(keys)].slice(0, 6).map((key) => planLibrary[key]);
}

function scoreLabs(data) {
  const markers = [
    {
      key: "hemoglobin",
      label: "Hb",
      unit: "g/dL",
      value: data.hemoglobin,
      status: data.hemoglobin < 12 ? "red" : data.hemoglobin < 12.5 ? "yellow" : "green",
      message: data.hemoglobin < 12 ? "貧血の可能性を医療者に確認" : data.hemoglobin < 12.5 ? "低め。疲労や息切れと合わせて確認" : "大きな低下なし",
    },
    {
      key: "ferritin",
      label: "フェリチン",
      unit: "ng/mL",
      value: data.ferritin,
      status: data.ferritin < 20 ? "red" : data.ferritin < 35 ? "yellow" : "green",
      message: data.ferritin < 20 ? "鉄貯蔵が低い可能性" : data.ferritin < 35 ? "女子長距離では注意して追跡" : "鉄貯蔵は比較的安定",
    },
    {
      key: "vitaminD",
      label: "ビタミンD",
      unit: "ng/mL",
      value: data.vitaminD,
      status: data.vitaminD < 20 ? "red" : data.vitaminD < 30 ? "yellow" : "green",
      message: data.vitaminD < 20 ? "骨・免疫面で要確認" : data.vitaminD < 30 ? "不足気味。食事・日光・専門家相談" : "目安範囲",
    },
    {
      key: "ck",
      label: "CK",
      unit: "U/L",
      value: data.ck,
      status: data.ck > 800 ? "red" : data.ck > 350 ? "yellow" : "green",
      message: data.ck > 800 ? "強い筋損傷・回復不足の可能性" : data.ck > 350 ? "高負荷後なら回復を確認" : "過度な上昇なし",
    },
  ];

  const red = markers.some((marker) => marker.status === "red");
  const yellow = markers.some((marker) => marker.status === "yellow");

  return {
    level: red ? "red" : yellow ? "yellow" : "green",
    markers,
  };
}

function scoreCondition(data) {
  let risk = 0;
  const flags = [];

  const addFlag = (label, points) => {
    risk += points;
    flags.push(label);
  };

  if (data.sleep === "poor") addFlag("睡眠不足", 18);
  else if (data.sleep === "short") addFlag("睡眠短め", 8);

  if (data.appetite === "poor") addFlag("食欲低下", 16);
  else if (data.appetite === "low") addFlag("食欲やや低下", 8);

  if (data.pain === "sharp") addFlag("痛み悪化", 28);
  else if (data.pain === "mild") addFlag("違和感あり", 10);

  if (data.mood === "low") addFlag("気分の落ち込み", 18);
  else if (data.mood === "flat") addFlag("集中しにくい", 8);

  if (data.restingHr === "high") addFlag("心拍上昇", 18);
  else if (data.restingHr === "up") addFlag("心拍やや上昇", 8);

  if (data.fatigue >= 8) addFlag("疲労が強い", 14);
  else if (data.fatigue >= 6) addFlag("疲労蓄積", 7);

  const conditionScore = clamp(100 - risk, 0, 100);
  let level = "green";
  if (conditionScore < 55 || data.pain === "sharp") level = "red";
  else if (conditionScore < 75 || flags.length >= 2) level = "yellow";

  return {
    flags,
    level,
    score: conditionScore,
  };
}

function renderCondition(condition) {
  els.conditionScore.textContent = Math.round(condition.score);
  els.conditionBadge.className = "condition-badge";

  if (condition.level === "red") {
    els.conditionBadge.textContent = "休養・相談";
    els.conditionBadge.classList.add("danger");
    els.conditionTitle.textContent = "今日は練習を軽くする判断";
    els.conditionMessage.textContent = "痛みの悪化、強い疲労、睡眠不足などが重なっています。ポイント練習は避け、必要なら医療者や指導者に相談してください。";
  } else if (condition.level === "yellow") {
    els.conditionBadge.textContent = "調整";
    els.conditionBadge.classList.add("warn");
    els.conditionTitle.textContent = "負荷を一段下げる日";
    els.conditionMessage.textContent = "ジョグの距離短縮、補強の軽量化、補食と睡眠の優先が合いそうです。翌朝の変化も確認しましょう。";
  } else {
    els.conditionBadge.textContent = "通常";
    els.conditionTitle.textContent = "予定通り進めやすい状態";
    els.conditionMessage.textContent = "ただし体組成改善期は、練習後補食と睡眠を外さないことを優先してください。";
  }

  els.conditionFlags.innerHTML = condition.flags.length
    ? condition.flags.map((flag) => `<span>${flag}</span>`).join("")
    : "<span>大きな赤信号なし</span>";
}

function renderLabAndTraining(data) {
  els.labBadge.className = "lab-badge";
  if (data.labs.level === "red") {
    els.labBadge.textContent = "専門家確認";
    els.labBadge.classList.add("danger");
    els.labTitle.textContent = "血液検査に赤信号があります";
  } else if (data.labs.level === "yellow") {
    els.labBadge.textContent = "追跡";
    els.labBadge.classList.add("warn");
    els.labTitle.textContent = "経過を見たい項目があります";
  } else {
    els.labBadge.textContent = "安定";
    els.labTitle.textContent = "大きな赤信号なし";
  }

  els.labGrid.innerHTML = data.labs.markers
    .map(
      (marker) => `
        <article class="${marker.status}">
          <span>${marker.label}</span>
          <strong>${marker.value.toFixed(marker.key === "ck" ? 0 : 1)}${marker.unit}</strong>
          <p>${marker.message}</p>
        </article>
      `,
    )
    .join("");

  const heartRateLabel = data.avgHr >= 170 ? "高強度寄り" : data.avgHr >= 145 ? "中強度から高め" : "低中強度";
  const workoutLabel = workoutLabels[data.workoutType] || "練習";
  const intensityLabel = intensityLabels[data.workoutIntensity] || "中くらい";
  const fuelNote = data.exerciseCalories >= 600 || data.duration >= 75
    ? "練習後の糖質+たんぱく質補給を必ず入れたい負荷です。"
    : "通常の補食で回復をつなげやすい負荷です。";
  els.trainingNote.textContent = `${workoutLabel}(${intensityLabel})、平均心拍${data.avgHr}bpm、${data.duration}分、${data.exerciseCalories}kcal。今日は${heartRateLabel}です。${fuelNote}`;
}

const workoutLabels = {
  interval: "インターバル・レペ",
  tempo: "ペース走・閾値走",
  long: "ロング走",
  easy: "ジョグ・回復走",
  strength: "補強・ウエイト",
  rest: "休養・オフ",
};

const intensityLabels = {
  hard: "高強度",
  moderate: "中強度",
  easy: "低強度",
};

function chooseMealPlan(data, score) {
  if (data.period !== "regular" || data.bone !== "none" || score.readiness < 50) {
    return mealLibrary.redFlag;
  }

  if (data.workoutType === "interval") return mealLibrary.interval;
  if (data.workoutType === "tempo") return mealLibrary.tempo;
  if (data.workoutType === "long") return mealLibrary.long;
  if (data.workoutType === "easy") return mealLibrary.easy;
  if (data.workoutType === "strength") return mealLibrary.strengthWorkout;
  if (data.workoutType === "rest") return mealLibrary.restDay;

  if (data.fueling !== "steady") {
    return mealLibrary.lowFuel;
  }

  if (data.fatigue >= 7 || data.weeklyKm >= 80) {
    return mealLibrary.recovery;
  }

  return mealLibrary.steady;
}

function renderMealPlan(data, score) {
  const mealPlan = chooseMealPlan(data, score);
  els.mealTitle.textContent = mealPlan.title;
  els.mealBadge.textContent = mealPlan.badge;
  els.mealGrid.innerHTML = mealPlan.meals
    .map(
      (meal) => `
        <article>
          <h3>${meal.name}</h3>
          <ul>${meal.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `,
    )
    .join("");
  els.mealNote.textContent = `${mealPlan.note} ${timingAdvice(data)}`;
}

function timingAdvice(data) {
  const lowFuelAdvice = data.fueling !== "steady"
    ? "補食が安定していない日は、まず練習前後のどちらか一方ではなく両方に小さく入れる設計にしましょう。"
    : "";

  if (data.workoutType === "rest") {
    return `翌日にポイント練習がある場合は、夕食の主食を抜かないでください。${lowFuelAdvice}`;
  }

  if (data.workoutTime === "morning") {
    return `朝練は起床後に水分と消化の軽い糖質を入れ、練習後の朝食を回復食として扱います。${lowFuelAdvice}`;
  }

  if (data.workoutTime === "evening") {
    return `夕方以降の練習は、昼食と15-17時の補食でエネルギー切れを防ぎ、夕食を抜かないことが大切です。${lowFuelAdvice}`;
  }

  return `午後練習は、昼食を軽くしすぎず、開始60-90分前に小さな補食を入れると安定します。${lowFuelAdvice}`;
}

function chooseRecipes(data) {
  const selected = [];
  const addRecipes = (recipes) => {
    recipes.forEach((recipe) => {
      if (!selected.some((item) => item.title === recipe.title)) selected.push(recipe);
    });
  };

  if (data.ferritin < 35 || data.hemoglobin < 12.5) addRecipes(recipeLibrary.iron);
  if (data.vitaminD < 30 || data.bone !== "none" || data.period !== "regular") addRecipes(recipeLibrary.bone);

  if (data.workoutType === "long") addRecipes(recipeLibrary.longRun);
  else if (data.workoutType === "interval" || data.workoutType === "tempo") addRecipes(recipeLibrary.highCarb);
  else if (data.workoutType === "strength" || data.muscleRatio < 43) addRecipes(recipeLibrary.muscle);
  else addRecipes(recipeLibrary.highCarb);

  if (data.fueling !== "steady") addRecipes(recipeLibrary.snack);
  if (selected.length < 3) addRecipes(recipeLibrary.muscle);
  if (selected.length < 3) addRecipes(recipeLibrary.bone);

  return selected.slice(0, 3);
}

function renderRecipes(data) {
  const recipes = chooseRecipes(data);
  const hasSafetyFocus = data.ferritin < 35 || data.hemoglobin < 12.5 || data.vitaminD < 30 || data.period !== "regular" || data.bone !== "none";

  els.recipeBadge.className = "recipe-badge";
  if (hasSafetyFocus) {
    els.recipeBadge.textContent = "重点";
    els.recipeBadge.classList.add("warn");
    els.recipeTitle.textContent = "今の状態に合わせた3品";
  } else {
    els.recipeBadge.textContent = workoutLabels[data.workoutType] || "提案";
    els.recipeTitle.textContent = "今日作りやすい3品";
  }

  els.recipeGrid.innerHTML = recipes
    .map(
      (recipe) => `
        <article>
          <div class="recipe-topline">
            <h3>${recipe.title}</h3>
            <span>${recipe.tag}</span>
          </div>
          <p>${recipe.purpose}</p>
          <div>
            <strong>材料</strong>
            <ul>${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}</ul>
          </div>
          <div>
            <strong>作り方</strong>
            <ol>${recipe.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
          </div>
        </article>
      `,
    )
    .join("");
}

function buildNutritionApproach(data, score) {
  const highLoad = data.workoutType === "interval" || data.workoutType === "tempo" || data.workoutType === "long" || data.exerciseCalories >= 600;
  const needsIron = data.ferritin < 35 || data.hemoglobin < 12.5;
  const needsBone = data.vitaminD < 30 || data.bone !== "none" || data.period !== "regular";
  const needsRecovery = data.condition.level !== "green" || data.fatigue >= 6 || data.ck > 350;
  const bodyCompFocus = data.bodyFat >= 24 || data.muscleRatio < 43;

  const cards = [
    {
      title: "エネルギー",
      text: highLoad
        ? "ポイント練習・ロング走の日は、主食を削ると出力と回復が落ちやすくなります。練習前は糖質、練習後は糖質+たんぱく質を固定します。"
        : "軽い日も欠食は避けます。主食は量を調整しつつ、朝食と練習後の補食を残すと、過食と疲労の波を抑えやすくなります。",
      action: highLoad ? "練習前におにぎり/バナナ、練習後におにぎり+乳製品" : "毎食に主食を小さく入れ、間食は乳製品や果物へ",
    },
    {
      title: "たんぱく質",
      text: "筋量を増やしたい時は、1回でまとめて食べるより、朝・昼・夕・練習後に分けるほうが続けやすいです。",
      action: "毎食に卵・魚・肉・大豆製品・乳製品のどれかを入れる",
    },
    {
      title: "鉄",
      text: needsIron
        ? "フェリチンやHbが低めです。疲労、息切れ、集中低下がある場合は、食事だけで抱え込まず専門家に確認しましょう。"
        : "女子長距離では鉄の貯蔵を落とさないことが大切です。赤身肉、魚、大豆、小松菜などをビタミンCと合わせます。",
      action: needsIron ? "赤身肉/魚/大豆+果物。サプリは医師・栄養士と確認" : "鉄源+果物を週の定番にする",
    },
    {
      title: "骨・月経",
      text: needsBone
        ? "月経不規則、骨ストレス既往、ビタミンD低めは、エネルギー不足のサインと一緒に見たい項目です。減量より安全確認を優先します。"
        : "骨を守るには、カルシウム・ビタミンD・十分なエネルギーが土台です。軽くなることより、継続して走れることを優先します。",
      action: "乳製品/小魚/大豆製品、日光、主食を抜かない",
    },
    {
      title: "回復",
      text: needsRecovery
        ? "疲労やCK、睡眠のサインが出ています。今日は食事制限より、回復食と睡眠で明日の練習品質を守ります。"
        : "回復が安定している時ほど、同じ補給リズムを続けると体組成の変化も見やすくなります。",
      action: needsRecovery ? "練習後30分以内の補食、夕食、睡眠を最優先" : "補食と睡眠の達成率を記録",
    },
    {
      title: "体組成",
      text: bodyCompFocus
        ? "体脂肪を下げたい時も、練習前後の補給は削らない設計にします。筋量を増やす刺激と、間食・夕食の整え方で変えていきます。"
        : "体組成が安定している時は、測定条件をそろえて4週間単位で見ます。1回の数値に振り回されないことが大切です。",
      action: bodyCompFocus ? "補強週2回、甘い飲料・菓子・夜食の頻度を調整" : "同じ条件で測定し、練習の出力と一緒に見る",
    },
  ];

  let level = "実行";
  if (score.readiness < 50 || data.labs.level === "red" || data.condition.level === "red") level = "安全優先";
  else if (needsRecovery || needsIron || needsBone) level = "重点あり";

  return { cards, level };
}

function renderNutritionApproach(data, score) {
  const approach = buildNutritionApproach(data, score);
  els.nutritionBadge.className = "nutrition-badge";
  els.nutritionBadge.textContent = approach.level;

  if (approach.level === "安全優先") {
    els.nutritionBadge.classList.add("danger");
    els.nutritionTitle.textContent = "削る前に、回復と安全を整える";
  } else if (approach.level === "重点あり") {
    els.nutritionBadge.classList.add("warn");
    els.nutritionTitle.textContent = "今週の栄養重点を絞る";
  } else {
    els.nutritionTitle.textContent = "体組成改善期の食べ方";
  }

  els.nutritionGrid.innerHTML = approach.cards
    .map(
      (card) => `
        <article>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
          <strong>${card.action}</strong>
        </article>
      `,
    )
    .join("");
}

function renderCheerMessage(data, score) {
  const messages = [];

  if (score.readiness < 50 || data.condition.level === "red") {
    messages.push("休む判断も、強くなるための大事な練習です。今日は身体の声を味方にして、次に走れる準備をしよう。");
  } else if (data.workoutType === "interval" || data.workoutType === "tempo") {
    messages.push("今日のポイント練習は、軽さではなく出力で勝負。食べて、走って、回復するところまでが一本の練習です。");
  } else if (data.workoutType === "long") {
    messages.push("長く走れる身体は、毎日の補給で作られます。最後まで粘る力を、今日の一食から育てよう。");
  } else if (data.workoutType === "strength") {
    messages.push("筋量はすぐには増えないけれど、積み上げた刺激はちゃんと残ります。焦らず、強い脚を作っていこう。");
  } else {
    messages.push("小さく整える日も、競技力の一部です。今日できる一つを丁寧に積み上げよう。");
  }

  if (data.fueling !== "steady") {
    messages.push("完璧な食事でなくて大丈夫。まずは練習後の一口を入れるところから、流れは変えられます。");
  }

  if (data.bodyFat >= 24 && data.muscleRatio < 43) {
    messages.push("目標はただ細くなることではなく、最後まで動く身体を作ること。あなたの身体は、整えればちゃんと応えてくれます。");
  }

  els.cheerMessage.textContent = messages.join(" ");
}

function selectedFoods() {
  return Array.from(foodChecks.querySelectorAll("input[type='checkbox']"))
    .filter((input) => input.checked)
    .map((input) => input.dataset.food);
}

function renderPhotoNutrition(data) {
  const foods = selectedFoods();
  const timing = mealTimingInput.value;
  const carbPortion = carbPortionInput.value;
  const missing = [];
  const advice = [];

  if (!foods.includes("carb")) missing.push("主食");
  if (!foods.includes("protein")) missing.push("たんぱく質");
  if (!foods.includes("veg")) missing.push("野菜");
  if (!foods.includes("dairy")) missing.push("カルシウム源");
  if ((data.ferritin < 35 || data.hemoglobin < 12.5) && !foods.includes("iron")) missing.push("鉄源");
  if ((timing === "pre" || timing === "post") && carbPortion === "none") missing.push("練習前後の糖質");

  if (timing === "pre") {
    advice.push(data.workoutIntensity === "hard" || data.workoutType === "interval"
      ? "高強度前は、消化の軽い糖質を入れると出力を守りやすいです。"
      : "練習前は空腹を避け、水分と小さな糖質を入れると安定します。");
  } else if (timing === "post") {
    advice.push("練習後は糖質+たんぱく質をセットにして、夕食まで空く場合は補食を追加しましょう。");
  } else if (timing === "snack") {
    advice.push("補食は、おにぎり・果物・乳製品など、練習に使えるエネルギーに寄せると回復につながります。");
  } else {
    advice.push("食事全体では、主食・主菜・野菜をそろえ、体組成改善期でも練習前後の補給を削らないことが軸です。");
  }

  if (data.period !== "regular" || data.bone !== "none" || data.vitaminD < 30) {
    advice.push("月経・骨・ビタミンDのサインがある時は、乳製品や小魚、大豆製品、主食を抜かない食事を優先してください。");
  }

  if (data.fueling !== "steady") {
    advice.push("補食が安定しない時は、写真記録を使って「練習後に一口入れたか」から見ていきましょう。");
  }

  const score = clamp(100 - missing.length * 14 - (carbPortion === "none" ? 10 : 0), 0, 100);
  els.photoBadge.className = "photo-badge";

  if (score < 65) {
    els.photoBadge.textContent = "要追加";
    els.photoBadge.classList.add("warn");
  } else if (mealPhotoInput.files.length) {
    els.photoBadge.textContent = "記録済み";
  } else {
    els.photoBadge.textContent = "未記録";
  }

  els.photoResult.innerHTML = `
    <article>
      <span>写真チェック</span>
      <strong>${Math.round(score)}点</strong>
      <p>${missing.length ? `追加候補: ${missing.join("・")}` : "主な要素はそろっています。"}</p>
    </article>
    <article>
      <span>アドバイス</span>
      <p>${advice.join(" ")}</p>
    </article>
  `;
}

function handleMealPhotoChange() {
  const file = mealPhotoInput.files[0];
  if (!file) {
    els.photoPreview.innerHTML = "<span>写真プレビュー</span>";
    return;
  }

  const imageUrl = URL.createObjectURL(file);
  els.photoPreview.innerHTML = `<img src="${imageUrl}" alt="撮影した食事">`;
}

function athleteStorageKey(athleteId = activeAthlete) {
  return `strideFuel.athlete.${athleteId}`;
}

function collectAthleteState() {
  return {
    form: Object.fromEntries(new FormData(form).entries()),
    mealTiming: mealTimingInput.value,
    carbPortion: carbPortionInput.value,
    foods: selectedFoods(),
    updatedAt: new Date().toISOString(),
  };
}

function saveActiveAthlete() {
  if (isRestoringAthlete) return;
  localStorage.setItem(athleteStorageKey(), JSON.stringify(collectAthleteState()));
  localStorage.setItem("strideFuel.activeAthlete", activeAthlete);
}

function restoreAthlete(athleteId) {
  isRestoringAthlete = true;
  activeAthlete = athletes[athleteId] ? athleteId : "momoko";
  localStorage.setItem("strideFuel.activeAthlete", activeAthlete);

  els.activeAthlete.textContent = athletes[activeAthlete];
  athleteButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.athlete === activeAthlete);
  });

  const saved = JSON.parse(localStorage.getItem(athleteStorageKey(activeAthlete)) || "null");
  if (saved?.form) {
    Object.entries(saved.form).forEach(([name, value]) => {
      const field = form.elements[name];
      if (field) field.value = value;
    });
  }

  mealTimingInput.value = saved?.mealTiming || "pre";
  carbPortionInput.value = saved?.carbPortion || "ok";
  const foods = saved?.foods || ["carb", "protein"];
  foodChecks.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = foods.includes(input.dataset.food);
  });

  mealPhotoInput.value = "";
  els.photoPreview.innerHTML = "<span>写真プレビュー</span>";
  isRestoringAthlete = false;
  render();
}

function render() {
  const weight = numberValue("weight");
  const heightM = numberValue("height") / 100;
  const bodyFat = numberValue("bodyFat");
  const muscle = numberValue("muscle");
  const data = {
    age: numberValue("age"),
    heightM,
    weight,
    bodyFat,
    muscle,
    inbodyScore: numberValue("inbodyScore"),
    visceralFat: numberValue("visceralFat"),
    bmr: numberValue("bmr"),
    weeklyKm: numberValue("weeklyKm"),
    workoutType: form.elements.workoutType.value,
    workoutTime: form.elements.workoutTime.value,
    workoutIntensity: form.elements.workoutIntensity.value,
    avgHr: numberValue("avgHr"),
    duration: numberValue("duration"),
    exerciseCalories: numberValue("exerciseCalories"),
    fatigue: numberValue("fatigue"),
    period: form.elements.period.value,
    bone: form.elements.bone.value,
    fueling: form.elements.fueling.value,
    sleep: form.elements.sleep.value,
    appetite: form.elements.appetite.value,
    pain: form.elements.pain.value,
    mood: form.elements.mood.value,
    restingHr: form.elements.restingHr.value,
    hemoglobin: numberValue("hemoglobin"),
    ferritin: numberValue("ferritin"),
    vitaminD: numberValue("vitaminD"),
    ck: numberValue("ck"),
    muscleRatio: weight > 0 ? (muscle / weight) * 100 : 0,
  };
  data.labs = scoreLabs(data);
  data.condition = scoreCondition(data);

  const bmi = weight / (heightM * heightM);
  const fatMass = weight * (bodyFat / 100);
  const ffm = weight - fatMass;
  const score = scoreAthlete(data);
  const recovery = clamp(100 - data.fatigue * 8 - (data.weeklyKm > 80 ? 8 : 0), 5, 100);

  els.bmi.textContent = bmi.toFixed(1);
  els.fatMass.textContent = kg(fatMass);
  els.ffm.textContent = kg(ffm);
  els.muscleRatio.textContent = `${data.muscleRatio.toFixed(1)}%`;
  const trainingLoad = Math.round((data.avgHr * data.duration) / 100);
  const caloriesPerMin = data.duration > 0 ? data.exerciseCalories / data.duration : 0;
  els.trainingLoad.textContent = String(trainingLoad);
  els.caloriesPerMin.textContent = `${caloriesPerMin.toFixed(1)}`;

  els.fatBar.style.width = pct((bodyFat / 35) * 100);
  els.muscleBar.style.width = pct((data.muscleRatio / 50) * 100);
  els.recoveryBar.style.width = pct(recovery);
  els.fatLabel.textContent = `${bodyFat.toFixed(1)}%`;
  els.muscleLabel.textContent = `${data.muscleRatio.toFixed(0)}%`;
  els.recoveryLabel.textContent = pct(recovery);

  els.readinessScore.textContent = Math.round(score.readiness);
  els.scoreRing.style.background = `conic-gradient(${ringColor(score.readiness)} 0deg, ${ringColor(score.readiness)} ${score.readiness * 3.6}deg, #e2e8e4 ${score.readiness * 3.6}deg)`;

  els.riskPill.className = "status-pill";
  if (score.readiness < 50) {
    els.riskPill.textContent = "専門家相談";
    els.riskPill.classList.add("danger");
    els.mainMessage.textContent = "体組成より先に健康信号を確認";
    els.subMessage.textContent = score.notes.length
      ? `${score.notes.join("・")}があります。練習量と食事を同時に見直しましょう。`
      : "回復と食事の確認を優先してください。";
  } else if (score.readiness < 72) {
    els.riskPill.textContent = "要調整";
    els.riskPill.classList.add("warn");
    els.mainMessage.textContent = "燃料補給と筋力刺激を増やす週";
    els.subMessage.textContent = "急な減量ではなく、練習に耐える筋量と回復を作りながら体脂肪を整えます。";
  } else {
    els.riskPill.textContent = "順調";
    els.mainMessage.textContent = "4週単位で小さく改善";
    els.subMessage.textContent = "測定条件をそろえ、筋量維持・補食・睡眠の達成率を追いましょう。";
  }

  els.planList.innerHTML = buildPlan(data, score)
    .map((item) => `<article><h3>${item.title}</h3><p>${item.text}</p></article>`)
    .join("");
  renderCondition(data.condition);
  renderLabAndTraining(data);
  renderMealPlan(data, score);
  renderRecipes(data);
  renderNutritionApproach(data, score);
  renderCheerMessage(data, score);
  renderPhotoNutrition(data);

  fatigueOutput.textContent = String(data.fatigue);
}

function ringColor(readiness) {
  if (readiness < 50) return "#c24a3a";
  if (readiness < 72) return "#c98220";
  return "#2f8f5b";
}

form.addEventListener("input", () => {
  render();
  saveActiveAthlete();
});
form.addEventListener("change", () => {
  render();
  saveActiveAthlete();
});
printButton.addEventListener("click", () => window.print());
mealPhotoInput.addEventListener("change", () => {
  handleMealPhotoChange();
  render();
  saveActiveAthlete();
});
mealTimingInput.addEventListener("change", () => {
  render();
  saveActiveAthlete();
});
carbPortionInput.addEventListener("change", () => {
  render();
  saveActiveAthlete();
});
foodChecks.addEventListener("change", () => {
  render();
  saveActiveAthlete();
});
athleteButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-athlete]");
  if (!button || button.dataset.athlete === activeAthlete) return;

  saveActiveAthlete();
  restoreAthlete(button.dataset.athlete);
});

restoreAthlete(activeAthlete);
saveActiveAthlete();
