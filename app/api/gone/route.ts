/**
 * The answer for every address the site has retired for good: the `retire`
 * rows of docs/content/url-map.csv, which next.config.ts rewrites here. 410
 * tells a crawler the page is gone on purpose, so it drops the address sooner
 * than it would after a 404. The body is for the rare person who follows an
 * old link.
 */
const body = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>410 | ڤوم</title>
</head>
<body style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 15vh auto; padding: 0 16px; line-height: 1.7">
<h1>هذه الصفحة أُزيلت نهائياً.</h1>
<p><a href="/">العودة إلى الصفحة الرئيسية</a></p>
<div lang="en" dir="ltr">
<h2>This page has been removed for good.</h2>
<p><a href="/en/">Back to the homepage</a></p>
</div>
</body>
</html>`;

const gone = () =>
  new Response(body, {
    status: 410,
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex", "Cache-Control": "public, max-age=3600" },
  });

export const GET = gone;
export const HEAD = gone;
