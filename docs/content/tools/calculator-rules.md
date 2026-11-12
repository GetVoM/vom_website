# Tools: calculator rules

The seven tool pages hold nine calculators. On 2026-11-12 the owner ruled that each keeps its **old WordPress widget's fields**, made to work, with no new modes (no GOSI, no Hijri/Gregorian choice). The one addition is the gold price per gram (and silver on the zakat base), typed by the visitor, so the weights and the nisab can be valued without inventing a price.

The arithmetic is in `lib/tools/calc.ts`, its constants in `lib/tools/rates.ts`, and its tests in `lib/tools/calc.test.ts` (`pnpm test`). The tests use every worked example in the pages' own copy. Results are rounded to halalas (two decimals) at the output only. Fields read Arabic-Indic and Persian digits, «٫» and «٬», commas, % and the riyal sign (`lib/tools/parse.ts`). An empty field is "no value": the answer shows a muted 0.00 and a prompt.

## Constants for sign-off

| Constant | Value | Source | Reviewed by | Date |
|---|---|---|---|---|
| VAT standard rate | 15% | ZATCA, since 1 July 2020; the VAT page's own copy | | |
| Zakat rate | 2.5% | All four zakat pages' copy | | |
| Nisab | 85 g of gold × the price the visitor types | The common reading of 20 mithqal | | |

To confirm before launch: the 85 g gold nisab (some calculators use 595 g of silver), and whether a Gregorian-year rate (2.5776%) should be offered to companies. The owner's ruling keeps both out for now.

## Calculator by calculator

| Calculator | Fields (old labels) | Formula | Old widget | Now |
|---|---|---|---|---|
| VAT (`vat`) | المبلغ (slider 100–10,000 and text), معدل ضريبة القيمة المضافة (%) (slider 1–45), هل البيع شامل لضريبة القيمة المضافة؟ | Exclusive: tax = amount × rate, total = amount + tax. Inclusive: net = amount ÷ (1 + rate), tax = amount − net | Defaulted to **20%**; its table showed the VAT-inclusive total in both «إجمالي المبيعات» and «المبلغ الإجمالي»; read "1,000,000" as 1000; Chart.js doughnut | Defaults 2,500 at **15%**; shows the pre-VAT amount, VAT, rate and total; the doughnut is dropped (it showed no figure the results don't); Reset, Copy and Save (the last five, in this browser only) kept |
| Discount (`discount`) | المبلغ، نسبة الخصم | saving = amount × % ; after = amount − saving | Worked, but refused a 100% discount and errored on empty fields | 0–100% allowed; above 100% shows a message |
| Margin (`margin`) | المبلغ المدفوع للسلعة، نسبة الزيادة % | price = cost × (1 + markup); profit = price − cost; margin = profit ÷ price | Its script had stray HTML and never ran; it labelled a riyal amount «نسبة الربح» | Works; that row reads «الربح» |
| Product pricing (`pricing`) | تكاليف المواد، العمالة، الشحن، رسوم السوق، تكاليف أخرى، نسبة الزيادة % | cost = sum of the five; then as margin | Its script was cut off mid-line | Works; adds «إجمالي التكاليف» to the results |
| Net salary (`salary-net`) | الراتب الشهري، نسبة الضرائب (%) | deduction = salary × %; net = salary − deduction | No script | Works. Saudi Arabia levies no income tax on salaries; the field is kept as the owner ruled |
| Monthly salary (`salary-annual`) | الراتب السنوي | monthly = annual ÷ 12 | No script | Works |
| Personal zakat (`zakat`) | التوفير، الاستثمارات، الذهب والفضة، القروض المعطاة، أصول أخرى، الديون المستحقة + سعر غرام الذهب اليوم (new) | net = all assets incl. loans given − debts; zakat = 2.5% of net when net ≥ nisab | Nisab hard-coded at 456.25 × 3 = **1,368.75**; tested the nisab before subtracting debts (zakat could go negative); read «القروض المعطاة» and dropped it | Nisab = 85 g × the gold price typed; debts first; loans counted; without a price, shows 2.5% and asks for the price |
| Zakat base (`zakat-base`) | النقود، وزن الذهب (بالغرام)، وزن الفضة (بالغرام)، الاستثمارات + سعر غرام الذهب، سعر غرام الفضة (new) | base = cash + gold g × price + silver g × price + investments; zakat = 2.5% | No script, no debts field | Works; a weight without its price is flagged |
| Company zakat (`zakat-company`) | أدخل المبلغ المراد حساب زكاته (ريال سعودي) | zakat = 2.5% of the amount | No script | Works |
