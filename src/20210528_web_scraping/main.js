const puppeteer = require("puppeteer");

(async () => {
  const _puppeteer = await puppeteer.launch();
  const page = await _puppeteer.newPage();
  const url = "https://techlib.circlearound.co.jp/";
  await page.goto(url);

  const articleTitles = await page.evaluate(() => {
    const articleListElm = document.querySelector('.article-list').querySelectorAll('h3');
    return Array.from(articleListElm).map(e => {
      return e.children[0].innerText;
    });
  });

	console.log(articleTitles);

  await _puppeteer.close();
})();
