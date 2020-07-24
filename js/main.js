
'use strict';

const scroll = document.querySelector('.scroll');
const news = document.querySelector('.news');
const sw1 = document.querySelector('.sw1');
const sw2 = document.querySelector('.sw2');

const main = document.querySelector('.main');
const menu = document.querySelector('.menu');
const button = document.querySelector('.button');
const buttons = document.querySelectorAll('.button');

const releases = document.querySelector('.releases');
const articles = document.querySelector('.articles');
const about = document.querySelector('.about');
const howto = document.querySelector('.howto');
const articleList = document.querySelector('.article-list');
const cardNum = articleList.getElementsByClassName('card').length;
const issuesCards = sw1.querySelector('.swiper-wrapper');
const articlesCards = sw2.querySelector('.swiper-wrapper');
const releaseCard = issuesCards.querySelectorAll('.img-card');
const articleCard = articlesCards.querySelectorAll('.img-card');
const articleCCdo = articleList.querySelectorAll('.img-card');
const pdfArticles = document.getElementById("pdf-articles");

const pdfArticle = document.querySelector(".pdf-articles");


let clicked = button;
var art = null;

async function getData(url){
  const response = await fetch(url);
  if(!response.ok){
    throw new Error(`Ашыбка адреса ${url},
    статус ашыбки ${response.status}`)
  }
  return await response.json();
}
async function forData(data){
  data.forEach(createIssues);
}
function createIssues(issue){
  const {pdfName, imageName, name, likes, dislikes} = issue;
  const card = `
  <section class="swiper-slide card" data-info = "${pdfName}">
    <img src="preview_img/issues/${imageName}" alt="logo" class="img-card">
    <div class="info">
      <div class="rating"> 
            <img src="img/like.png" alt="like" class="imlink" style="padding-right: 0px;">
            <div class="info-text" style="cursor: pointer; margin-right: 8px;">${likes}</div>
      </div>
      <div class="info-text">${name}</div>
      <div class="rating">
          <div class="info-text"style="cursor: pointer; margin-left: 8px;">${dislikes}</div>
          <img src="img/dislike.png" alt="like" class="imlink"style="padding-right: 0px;">
      </div>    
    </div>
  </section> 
  `;
  issuesCards.insertAdjacentHTML('beforeend', card);
}


//fuck yeaaaaaaaaaaaaaaaaaaah!
function renderPdf(url, canvasContainer, scale){
        async function renderPage(page){
            var viewport = page.getViewport(scale);
            var canvas = document.createElement('canvas');
            var child = art.appendChild(canvas);
            child.classList.add("page");
            var context = canvas.getContext("2d");

            var renderContext = {
                      canvasContext: context,
                      viewport: viewport
            };
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render(renderContext);         
          }
    pdfjsLib.disableWorker = true;
    pdfjsLib.getDocument(url).then(async function(doc){
      var div = document.createElement('div');
      art = canvasContainer.appendChild(div);
      var num = doc._pdfInfo.numPages+1;
      art.classList.add("pdf-articles");
      async function loop(doc){
        for (var i=1;i<num;i++){
              await doc.getPage(i).then( async function(page){
              await renderPage(page);
              });
              const pdfArticle = document.querySelector(".pdf-articles");
              if (!pdfArticle){
                break;
              }
          }
      }
      loop(doc);

      })
  }
function clearPdf(){
      const pdfArticle = document.querySelector(".pdf-articles");
      if (pdfArticle){
      art.parentNode.removeChild(art);
      }
  }
function hideAll(){
  news.classList.add('hide');
  releases.classList.add('hide');
  articles.classList.add('hide');
  about.classList.add('hide');
  howto.classList.add('hide');
  menu.classList.remove('vertical');
  menu.classList.add('menu');
  articleList.classList.add('hide');
  clearPdf();
}
function changePage(){
  const target = event.target;
  const butt = target.closest('.button');
  if (butt!=clicked){
    if (clicked!=null){
      clicked.style.background = '#FF0038';
      clicked.style.border = '3px solid #7C213C';
    }
    butt.style.background = '#7C213C';
    butt.style.border = '3px solid #FF0038';
    clicked = butt;
    const clas = butt.classList[1];  
    hideAll();

    switch(clas){
      case 'button-main':
        news.classList.remove('hide');
        releases.classList.remove('hide');
        articles.classList.remove('hide');
        initSwipe();
        break;
      case 'button-about':
        about.classList.remove('hide');
        break;
      case 'button-news':
        news.classList.remove('hide');
        initSwipe();
        break;  
      case 'button-archive':
        articleList.classList.remove('hide');
        menu.classList.add('vertical');
        menu.classList.remove('menu');
        break;  
      case 'button-howto':
        howto.classList.remove('hide');
        break;  
    }
  }
}
function openRelease(){
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info.split(',');
  const [pdfName] = info;
  renderPdf(`./pdfs/issues/${pdfName}`, main, 3);
  hideAll();
  menu.classList.add('vertical');
  menu.classList.remove('menu');
  clicked.style.background = '#FF0038';
  clicked.style.border = '3px solid #7C213C';
  clicked = null;

}
function openArticle(){
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info.split(',');
  const [pdfName] = info;
  renderPdf(`./pdfs/articles/${pdfName}`, main, 3);
  hideAll();
  menu.classList.add('vertical');
  menu.classList.remove('menu');
 clicked.style.background = '#FF0038';
  clicked.style.border = '3px solid #7C213C';
  clicked = null;

  
}

  if (cardNum %4 !=0){
    for(var i=0; i<4-cardNum %4; i++){
      const addcard = document.createElement('div');
      addcard.className = 'transparent';
      addcard.insertAdjacentHTML('beforeend', `
      <div class="acard ">

      </div> 
      `);
      articleList.insertAdjacentElement('beforeend', addcard);
    }
  }

function initSwipe(){
const newsSwiper = new Swiper('.news-swiper',{
  autoplay: {delay: 3000,},
  spaceBetween: 100,
  sleidesPerColumn: 1,
  disableOnInteraction: false,
});
const artSwiper1 = new Swiper('.sw1',{
  autoplay: {delay: 3000,},
  spaceBetween: 100,
  slidesPerView: 3,
  disableOnInteraction: true,
});
const artSwiper2 = new Swiper('.sw2',{
  autoplay: {delay: 3000,},
  spaceBetween: 100,
  slidesPerView: 3,
  disableOnInteraction: true,
});
news.addEventListener("mouseover",function() {
  newsSwiper.autoplay.stop();});
news.addEventListener("mouseout",function() {
  newsSwiper.autoplay.start();});
sw1.addEventListener("mouseover",function() {
  artSwiper1.autoplay.stop();});
sw1.addEventListener("mouseout",function() {
  artSwiper1.autoplay.start();});
sw2.addEventListener("mouseover",function() {
  artSwiper2.autoplay.stop();});
sw2.addEventListener("mouseout",function() {
  artSwiper2.autoplay.start();});
}

async function init(){
  const data = await getData('./db/issues.json');
  await forData(data);
  


  const releaseCard = issuesCards.querySelectorAll('.img-card');
  const articleCard = articlesCards.querySelectorAll('.img-card');
  const articleCCdo = articleList.querySelectorAll('.img-card');


  buttons.forEach(function(item){
    item.addEventListener("click", changePage);
  });
  releaseCard.forEach(function(item){
    item.addEventListener("click", openRelease);
  });
  articleCard.forEach(function(item){
    item.addEventListener("click", openArticle);
  });
  articleCCdo.forEach(function(item){
    item.addEventListener("click", openArticle);
  });


  initSwipe();
}
init();