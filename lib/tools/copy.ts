/**
 * The calculators' words. Field labels, placeholders, hints, button labels and
 * result sentences are the old WordPress widgets' own (getvom.com/tools/*.html);
 * the rest (result labels the old widgets lacked, errors, the gold and silver
 * price fields the owner added on 2026-11-12) is new and marked "new".
 * Imported by the client calculators, so each string ships once, in their chunk.
 */
export const common = {
  /** Spoken after an amount by screen readers; the riyal sign is drawn. */
  riyal: "ريال",
  gram: "غرام",
  /** new */
  empty: "أدخل الأرقام وستظهر النتيجة هنا مباشرة.",
  /** new */
  errors: {
    invalid: "أدخل رقمًا صحيحًا، مثل 2500 أو 2500.50.",
    negative: "أدخل رقمًا موجبًا.",
    tooLarge: "هذا الرقم أكبر مما تحسبه الأداة.",
  },
  /** new: the switch between two calculators that share a band. */
  switchLegend: "اختر الحاسبة",
} as const;

export const vatCopy = {
  amount: "المبلغ",
  rate: "معدل ضريبة القيمة المضافة (%)",
  inclusive: "هل البيع شامل لضريبة القيمة المضافة؟",
  yes: "نعم",
  no: "لا",
  net: "إجمالي المبيعات",
  tax: "مبلغ ضريبة القيمة المضافة",
  ratePart: "نسبة ضريبة القيمة المضافة",
  gross: "المبلغ الإجمالي",
  reset: "إعادة تعيين",
  copy: "نسخ النتائج",
  save: "حفظ النتائج",
  copied: "تم نسخ النتائج إلى الحافظة",
  /** new */
  saved: "حُفظت العملية في العمليات السابقة.",
  history: "العمليات السابقة",
  /** new */
  copyFailed: "تعذّر النسخ، انسخ الأرقام يدويًا.",
} as const;

export const discountCopy = {
  title: "آلة حاسبة الخصم",
  amount: "المبلغ",
  percent: "نسبة الخصم",
  button: "حساب الخصم",
  after: "المبلغ بعد الخصم",
  saving: "الخصم",
  /** new: the old widget refused a discount of 100% too; 100% is now allowed. */
  tooHigh: "نسبة الخصم لا يمكن أن تزيد على 100%.",
} as const;

export const marginCopy = {
  tab: "حاسبة هامش الربح",
  cost: "المبلغ المدفوع للسلعة",
  /** The old placeholder said «أدخل المبلغ (ر.س)»; the riyal sign is now drawn beside the field. */
  costPlaceholder: "أدخل المبلغ",
  markup: "نسبة الزيادة %",
  button: "احسب",
  results: "بناءً على هذه الأرقام:",
  margin: "هامش الربح الإجمالي",
  /** The old widget labelled this money figure «نسبة الربح» (logged in text-changes.md). */
  profit: "الربح",
  price: "سعر البيع",
} as const;

export const pricingCopy = {
  tab: "حاسبة تسعير المنتج",
  title: "حاسبة تسعير المنتج وحساب هامش الربح",
  intro: "خذ عناء تسعير منتجاتك باستخدام هذه الحاسبة المجانية لتسعير المنتجات. ستساعدك الصيغة الموثوقة للتسعير في العثور على سعر عادل لمنتجك.",
  costs: [
    { id: "materials", label: "تكاليف المواد", hint: "اجمع الإيصالات وأضف مقدار الأموال التي تم إنفاقها على صنع المنتج." },
    { id: "labour", label: "تكاليف العمالة", hint: "حدد معدل الساعة لوقتك وحدد عدد المنتجات التي يمكنك صنعها في الساعة." },
    { id: "shipping", label: "تكاليف الشحن", hint: "احسب سعر شحن المنتج إذا كنت تخطط للعمل عبر الإنترنت وتقديم الشحن المجاني." },
    { id: "fees", label: "رسوم السوق", hint: "ضع في اعتبارك جميع الرسوم المرتبطة بعملية البيع." },
    { id: "other", label: "تكاليف أخرى", hint: "أضف تكاليف الملصقات والتعبئة والإعلانات وغيرها من الأمور الأساسية." },
  ],
  markup: "نسبة الزيادة %",
  markupHint: "حدد نسبة الزيادة المطلوبة لتحقيق الربح.",
  button: "احسب",
  /** new */
  cost: "إجمالي التكاليف",
} as const;

export const salaryCopy = {
  net: {
    salary: "الراتب الشهري",
    salaryPlaceholder: "أدخل الراتب الشهري",
    tax: "نسبة الضرائب (%)",
    taxPlaceholder: "أدخل نسبة الضرائب",
    button: "حساب الصافي",
    /** new */
    result: "صافي الراتب",
    /** new */
    deduction: "الخصم",
    /** new */
    tooHigh: "النسبة لا يمكن أن تزيد على 100%.",
  },
  annual: {
    salary: "الراتب السنوي",
    salaryPlaceholder: "أدخل الراتب السنوي",
    button: "احسب الراتب الشهري",
    /** new */
    result: "الراتب الشهري",
  },
} as const;

export const zakatCopy = {
  title: "آلة حاسبة الزكاة",
  fields: [
    { id: "savings", label: "التوفير" },
    { id: "investments", label: "الاستثمارات" },
    { id: "goldSilver", label: "الذهب والفضة" },
    { id: "loansGiven", label: "القروض المعطاة" },
    { id: "otherAssets", label: "أصول أخرى" },
    { id: "debts", label: "الديون المستحقة" },
  ],
  /** new (owner, 2026-11-12) */
  goldPrice: "سعر غرام الذهب اليوم",
  /** new */
  goldPriceHint: "النصاب قيمة 85 غرامًا من الذهب.",
  button: "حساب الزكاة",
  /** The old result sentences. */
  owed: "عليك دفع الزكاة",
  below: "ليس عليك دفع الزكاة لأن إجمالي ثروتك أقل من الحد الأدنى.",
  /** new */
  net: "صافي المال بعد الديون",
  /** new */
  nisab: "النصاب",
  /** new */
  needPrice: "أدخل سعر غرام الذهب لمعرفة ما إذا بلغ مالك النصاب.",
} as const;

export const zakatBaseCopy = {
  cash: "النقود (بالريال السعودي)",
  cashPlaceholder: "أدخل مقدار النقود",
  gold: "وزن الذهب (بالغرام)",
  goldPlaceholder: "أدخل وزن الذهب",
  silver: "وزن الفضة (بالغرام)",
  silverPlaceholder: "أدخل وزن الفضة",
  investments: "الاستثمارات (بالريال السعودي)",
  investmentsPlaceholder: "أدخل مقدار الاستثمارات",
  /** new (owner, 2026-11-12) */
  goldPrice: "سعر غرام الذهب",
  /** new (owner, 2026-11-12) */
  silverPrice: "سعر غرام الفضة",
  button: "احسب الزكاة",
  /** new */
  zakat: "الزكاة المستحقة",
  /** new */
  base: "الوعاء الزكوي",
  /** new */
  goldValue: "قيمة الذهب",
  /** new */
  silverValue: "قيمة الفضة",
  /** new */
  needGoldPrice: "أدخل سعر غرام الذهب ليُحسب الذهب في الوعاء.",
  /** new */
  needSilverPrice: "أدخل سعر غرام الفضة لتُحسب الفضة في الوعاء.",
} as const;

export const zakatCompanyCopy = {
  title: "حاسبة الزكاة",
  amount: "أدخل المبلغ المراد حساب زكاته (ريال سعودي)",
  placeholder: "مثلاً: 10000",
  button: "احسب الزكاة",
  result: "إجمالي الزكاة",
} as const;
