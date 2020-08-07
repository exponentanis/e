
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

const newsCards = document.querySelector('.swiper-wrapper');
const issuesCards = sw1.querySelector('.swiper-wrapper');
const articlesCards = sw2.querySelector('.swiper-wrapper');
const ListArticleCards = document.querySelector('.article-list');
const releaseCard = issuesCards.querySelectorAll('.img-card');
const articleCard = articlesCards.querySelectorAll('.img-card');
const articleCCdo = articleList.querySelectorAll('.img-card');
const pdfArticles = document.getElementById("pdf-articles");
const returnButton = document.querySelector(".return-button");
const rating = document.querySelectorAll('.rating');

const pdfArticle = document.querySelector(".pdf-articles");
let clicked = button;
var art = null;

//let login = localStorage.getItem('delka');
//localStorage.setItem('exponenta', '001')

async function getData(url){
  const response = await fetch(url);
  if(!response.ok){
    throw new Error(`Ашыбка адреса ${url},
    статус ашыбки ${response.status}`)
  }
  return await response.json();
}
async function forDataIssues(data){
  data.forEach(createIssues);
}
function createIssues(issue){
  const {pdfName, imageName, name, likes, dislikes} = issue;
  const card = `
  <section class="swiper-slide card" data-info = "${pdfName}">
   <div class="card-container">
        <img src="preview_img/issues/${imageName}" alt="logo" class="img-card">
        <div class="info">
          <div class="rating like"> 
                <img src="img/like.png" alt="like" class="img-rating" style="padding-right: 0px;">
                <div class="info-text numtxt" style="cursor: pointer;">${likes}</div>
          </div>
          <span class="info-text">${name}</span>
          <div class="rating dislike">
              <div class="info-text numtxt"style="cursor: pointer;">${dislikes}</div>
              <img src="img/dislike.png" alt="like" class="img-rating"style="padding-right: 0px;">
          </div>    
        </div>
    </div>
  </section> 
  `;
  issuesCards.insertAdjacentHTML('beforeend', card);
}
async function forDataArticles(data){
  data.forEach(function callback(value, iter){
    createArticles(value, iter);
  }
    );
}
async function createArticles(article, i){
  const {pdfName, imageName, name, likes, dislikes} = article;
  const card = `
  <section class="swiper-slide card forlist" data-info = "${pdfName}">
    <div class="card-container forcont">
        <img src="preview_img/articles/${imageName}" alt="logo" class="img-card getimg" >
        <div class="info">
          <div class="rating like"> 
                <img src="img/like.png" alt="like" class="img-rating" style="padding-right: 0px;">
                <div class="info-text numtxt" style="cursor: pointer; ">${likes}</div>
          </div>
          <div class="info-text titletxt">${name}</div>
          <div class="rating dislike">
              <div class="info-text numtxt"style="cursor: pointer;">${dislikes}</div>
              <img src="img/dislike.png" alt="like" class="img-rating"style="padding-right: 0px;">
          </div>    
        </div>
  </div>
  </section> 
  `;
  async function crlist(){
  ListArticleCards.insertAdjacentHTML('beforeend', card);
  const aca = document.querySelectorAll(".forlist");
  aca.forEach(function(item){
    item.classList.add("acard");
    item.classList.remove("swiper-slide");
  });

  const cont = document.querySelectorAll('.forcont');
  cont.forEach(function(cont){
    cont.classList.remove("card-container");
    const inText = cont.querySelector('.titletxt');
    inText.classList.add("tinner");
  });
    
  }
  await crlist();
  if(i<6){
  articlesCards.insertAdjacentHTML('beforeend', card);
  }
  const cardNum = articleList.getElementsByClassName('card').length;
  //prevent neporadok
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




}
async function forDataNews(data){
  data.forEach(function callback(value, iter){
    createNews(value, iter);
  });
}
function createNews(news){
  const {title, description, image} = news;
  const card = `
  <section class="swiper-slide new" style=" 
  cursor: pointer;
  background: url(preview_img/news/${image}) no-repeat;
  background-size: 100% 100%;
  border-radius: 50px;
  ">
    <h1 class="news-title">${title}<br/></h1>
    <p class="news-text">${description}</p>
  </section> 
  `;
  newsCards.insertAdjacentHTML('beforeend', card);
}


//fuck yeaaaaaaaaaaaaaaaaaaah!
function renderPdfArticle(url, canvasContainer){
        async function renderPage(page, width){
            console.log(width);
            var viewport = page.getViewport(2*width / page.getViewport(1.0).width);
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
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            page.render(renderContext);         
          }
    pdfjsLib.disableWorker = true;
    pdfjsLib.getDocument(url).then(async function(doc){
      var div = document.createElement('div');
      art = canvasContainer.appendChild(div);
      var num = doc._pdfInfo.numPages+1;
      art.classList.add("pdf-articles");
      var positionInfo = art.getBoundingClientRect();
      var width =  positionInfo.width;
      async function loop(doc){
        for (var i=1;i<num;i++){
              await doc.getPage(i).then( async function(page){
              await renderPage(page, width);
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
function renderPdfRelease(url, canvasContainer){
  async function renderPage(page, width){
    var viewport = page.getViewport(width / (2*page.getViewport(1.0).width));
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
  var positionInfo = art.getBoundingClientRect();
  var width =  positionInfo.width;
  async function loop(doc){
  await doc.getPage(1).then( async function(page){
    await renderPage(page, width*2);
    });
    const pdfArticle = document.querySelector(".pdf-articles");
  for (var i=2;i<num-1;i++){
        await doc.getPage(i).then( async function(page){
        await renderPage(page, width);
        });
        const pdfArticle = document.querySelector(".pdf-articles");
        if (!pdfArticle){
          break;
        }
    }
  await doc.getPage(num-1).then( async function(page){
    await renderPage(page, width*2);
    });
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
  menu.classList.add('menu-center');
  articleList.classList.add('hide');
  returnButton.classList.add('hide');
  clearPdf();
}
function changePage(){
  const target = event.target;
  const butt = target.closest('.button');
  if (butt!=clicked){
    if (clicked!=null){
      clicked.classList.remove("locked-button");
    }
    butt.classList.add("locked-button");
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
        menu.classList.remove('menu-center');
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
        menu.classList.remove('menu-center');
        howto.classList.remove('hide');
        break;  
      case 'button-offer':
        news.classList.remove('hide');
        releases.classList.remove('hide');
        articles.classList.remove('hide');
        initSwipe();
        setTimeout(function() {
          clicked.classList.remove("locked-button");
          clicked = button;
          button.classList.add("locked-button");  
        }, 200);
              
        break;
      case 'return-button':
        news.classList.remove('hide');
        releases.classList.remove('hide');
        articles.classList.remove('hide');
        initSwipe();
        clicked.classList.remove("locked-button");
        clicked = button;
        button.classList.add("locked-button");
        window.scrollTo(0, 0);
        break;
    }
  }
}
function openRelease(){
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info.split(',');
  const [pdfName] = info;
  renderPdfArticle(`./pdfs/issues/${pdfName}`, main);
  hideAll();
  menu.classList.add('vertical');
  menu.classList.remove('menu');
  clicked.classList.remove("locked-button");
  returnButton.classList.remove('hide');
  clicked = null;

}
function openArticle(){
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info.split(',');
  const [pdfName] = info;
  renderPdfArticle(`./pdfs/articles/${pdfName}`, main);
  hideAll();
  menu.classList.add('vertical');
  menu.classList.remove('menu');
 clicked.classList.remove("locked-button");
 returnButton.classList.remove('hide');
  clicked = null;

  
}
function renderRating(card, like, dislike){


  
  `like.textContent = '';
  dislike.textContent = '';
  const ike = 
    <img src="img/like.png" alt="like" class="img-rating" style="padding-right: 0px;">
    <div class="info-text numtxt" style="cursor: pointer; ">${card.likes}</div>
  
  const dike = 
    <div class="info-text numtxt"style="cursor: pointer;">${card.dislikes}</div>
    <img src="img/dislike.png" alt="like" class="img-rating"style="padding-right: 0px;">
  
  like.insertAdjacentHTML('beforeend', ike)
  dislike.insertAdjacentHTML('beforeend', dike)`




}


function setRate(){
  const target = event.target;
  const rate = target.closest('.rating');
  const inf = target.closest('.info');
  const card = target.closest('.card');
  const clas = rate.classList[1];  
  let oppos = null;
  const {pdfName, imageName, name, likes, dislikes} = card;
  
  switch(clas){
    case 'like':
        oppos = inf.querySelector('.dislike');
        if (oppos.classList[2]== "pressed-dislike"){
           oppos.classList.remove("pressed-dislike"); 
           console.log(oppos);
          // card.dislikes --;
        }
        rate.classList.add("pressed-like"); 
        //likes ++;
        
        renderRating(card, rate, oppos);
        break;
    case 'dislike':
        oppos = inf.querySelector('.like');
        if (oppos.classList[2]== "pressed-like"){
          oppos.classList.remove("pressed-like"); 
          console.log(oppos);
          //likes --;
       }
        rate.classList.add("pressed-dislike");
        //card.dislikes ++;
        renderRating(card, oppos, rate);
        break;    
  }

}

function setSwipe(name){
  var sl = 0;
  if(window.screen.width>480){
    sl = 3;}
  else{
    sl = 2;}
  return new Swiper(name,{
    autoplay: {delay: 3000,},
    spaceBetween: 0,
    slidesPerView: sl,
    disableOnInteraction: true},
  );
}

function initSwipe(){
    const newsSwiper = new Swiper('.news-swiper',{
      autoplay: {delay: 3000,},
      sleidesPerColumn: 1,
      disableOnInteraction: false,
    });
    const artSwiper1 = setSwipe('.sw1');
    const artSwiper2 = setSwipe('.sw2');


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
  const dataIssues = await getData('./db/issues.json');
  await forDataIssues(dataIssues);
  const dataArticles = await getData('./db/articles.json');
  await forDataArticles(dataArticles);
  const dataNews = await getData('./db/news.json');
  await forDataNews(dataNews);

  console.log(dataArticles);
  

  const releaseCard = issuesCards.querySelectorAll('.img-card');
  const articleCard = articlesCards.querySelectorAll('.img-card');
  const articleCCdo = articleList.querySelectorAll('.img-card');
  const rating = document.querySelectorAll('.rating');




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
  rating.forEach(function(item){
    item.addEventListener("click", setRate);
  });

  initSwipe();
}
init();