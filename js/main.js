
'use strict';

console.log("я здесь");

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

let pdfArticle = document.querySelector(".pdf-articles");
let clicked = button;
var art = null;



const octo = document.querySelector('.octo');


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
  
  const {name} = issue;


  const card = `
  <section class="swiper-slide card" data-info = "${name}">
   <div class="card-container">
        <img src="preview_img/issues/${name}-1.jpg" alt="logo" class="img-card">
        <div class="info">
          <div class="rating like"> 
                <img src="img/like.png" alt="like" class="img-rating" style="padding-right: 0px;">
          </div>
          <span class="info-text">${name}</span>
          <div class="rating dislike">
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
  const {name} = article;


  const card = `
  <section class="swiper-slide card forlist" data-info = "${name}">
    <div class="card-container forcont">
        <img src="preview_img/articles/${name}-1.jpg" alt="logo" class="img-card getimg" >
        <div class="info">
          <div class="rating like"> 
                <img src="img/like.png" alt="like" class="img-rating" style="padding-right: 0px;">
          </div>
          <div class="info-text titletxt">${name}</div>
          <div class="rating dislike">
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
}
async function forDataNews(data){
  data.forEach(function callback(value, iter){
    createNews(value, iter);
  });
}
function createNews(news){
  const {title, description, image, link} = news;
  const card = `
  <a href="${link}" target="_blank" class="swiper-slide new" style=" 
  cursor: pointer;
  background: url(preview_img/news/${image}) no-repeat;
  background-size: 100% auto ;
  border-radius: 50px;
  text-decoration: none;
  ">
    <h1 class="news-title">${title}<br/></h1>
    <p class="news-text">${description}</p>
  </a> 
  `;
  newsCards.insertAdjacentHTML('beforeend', card);
}
//fuck yeaaaaaaaaaaaaaaaaaaah!
function renderPdfArticle(url, canvasContainer){
    console.log('strart render');
    async function renderPage(page, width){
            console.log(width);
            if(width<500){
              	var viewport = page.getViewport(4*width / (page.getViewport(1.0).width));
            }
            else{
                 var viewport = page.getViewport(width / (page.getViewport(1.0).width));
            }
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
            if(width<500){
              canvas.style.width = Math.floor(viewport.width/5) + 'pt';
            }
            else{
              if(width<900){
                canvas.style.width = Math.floor(viewport.width) + 'pt';
             }
             else{
              canvas.style.width = Math.floor(4*viewport.width/5) + 'pt';
             }
            }
            page.render(renderContext);         
    }
    pdfjsLib.disableWorker = true;

    var div = document.createElement('div');
    art = canvasContainer.appendChild(div);
    art.classList.add("pdf-articles");
    console.log('set page');
    pdfjsLib.getDocument(url).then(async function(doc){  
          console.log('continue render');  
          var num = doc._pdfInfo.numPages+1;          
          var positionInfo = art.getBoundingClientRect();
          var width =  positionInfo.width;
          async function loop(doc){
            for (var i=1;i<num;i++){
                  await doc.getPage(i).then( async function(page){
                  await renderPage(page, width);
                  });
                  if(i<=2){
                    window.scrollTo(0, 0);
                  }
                  if(i==num-1){
                    octo.classList.add('hide');
                  }
                  let pdfArticle = document.querySelector(".pdf-articles");
                  if (!pdfArticle){
                    octo.classList.add('hide');
                    break;
                  }
              }
          }
          loop(doc);

           
      })
  }

function clearPdf(){
      let pdfArticle = document.querySelector(".pdf-articles");
      if (pdfArticle){
        pdfArticle.parentNode.removeChild(pdfArticle);
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
  octo.classList.add('hide');
  
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



async function openRelease(){
  console.log('start open');  
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info;
  hideAll();
  menu.classList.add('vertical');
  menu.classList.remove('menu');
  clicked.classList.remove("locked-button");
  
  returnButton.classList.remove('hide');
  clicked = null;

  octo.classList.remove('hide');
  console.log('start func');  
  renderPdfArticle(`./pdfs/issues/${info}.pdf`, main);
  
}
async function openArticle(){
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info;
  hideAll();
  menu.classList.add('vertical');
  menu.classList.remove('menu');
 clicked.classList.remove("locked-button");
 
 returnButton.classList.remove('hide');
 clicked = null;

 octo.classList.remove('hide');

 renderPdfArticle(`./pdfs/articles/${info}.pdf`, main);
}
function loadData(name){
  
  let item = localStorage.getItem(name.dataset.info);
  if(item){
    if(item=='like'){
      let like = name.querySelector('.like');
      like.classList.add("pressed-like");
      let dislike = name.querySelector('.dislike');
      dislike.classList.remove("pressed-dislike");
    }
    if(item=='dislike'){
      let dislike = name.querySelector('.dislike');
      dislike.classList.add("pressed-dislike");
      let like = name.querySelector('.like');
      like.classList.remove("pressed-like");
    }
  }
}
function setRate(){
  const target = event.target;
  const rate = target.closest('.rating');
  const inf = target.closest('.info');
  const card = target.closest('.card');
  const clas = rate.classList[1];  
  let oppos = null;
  
  switch(clas){
    case 'like':
        oppos = inf.querySelector('.dislike');
        if (oppos.classList[2]== "pressed-dislike"){
           oppos.classList.remove("pressed-dislike"); 
        }
        if (rate.classList[2]== "pressed-like"){
          rate.classList.remove("pressed-like"); 
          localStorage.removeItem(card.dataset.info)
       }
       else{
        rate.classList.add("pressed-like"); 
        localStorage.setItem(card.dataset.info, 'like');
       }
        break;
    case 'dislike':
        oppos = inf.querySelector('.like');
        if (oppos.classList[2]== "pressed-like"){
          oppos.classList.remove("pressed-like"); 
       }
       if (rate.classList[2]== "pressed-dislike"){
        rate.classList.remove("pressed-dislike"); 
        localStorage.removeItem(card.dataset.info)
       }
       else{
        rate.classList.add("pressed-dislike");
        localStorage.setItem(card.dataset.info, 'dislike');
       }
        break;    
  }
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(item){
    loadData(item);
 });
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

  
  const cards = document.querySelectorAll('.card');
  cards.forEach(function(item){
     loadData(item);
  });
  


  //prevent neporadok
  const articleCCdo = articleList.querySelectorAll('.img-card');  
  const cardNum = articleCCdo.length;
  if (cardNum %4 !=0){
  for(var i=0; i<4-cardNum%4; i++){
    const addcard = document.createElement('div');
    addcard.className = 'transparent';
    addcard.insertAdjacentHTML('beforeend', `
    <div class="acard ">

    </div> 
    `);
    articleList.insertAdjacentElement('beforeend', addcard);
  }
  }





 
  
  const releaseCard = issuesCards.querySelectorAll('.img-card');
  const articleCard = articlesCards.querySelectorAll('.img-card');

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

