
'use strict';

console.log("я здесь");

const scroll = document.querySelector('.scroll');
const news = document.querySelector('.news');
const sw1 = document.querySelector('.sw1');
const sw2 = document.querySelector('.sw2');



const main = document.querySelector('.main');
const menub = document.querySelector('.menub');
const button = document.querySelector('.button');
const buttons = document.querySelectorAll('.button');

const topp = document.querySelector('.top');

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
const podcamul = document.getElementById('podcamul');
const podca = document.getElementById('.podca');





let pdfArticle = document.querySelector(".pdf-articles");
let clicked = button;
let clickbuff = button;
var art = null;
var stat = null;


const octo = document.querySelector('.octo');




async function getTxt(url){
  const response = await fetch(url);
  if(!response.ok){
    throw new Error(`Ашыбка адреса ${url},
    статус ашыбки ${response.status}`)
  }
  return await response.text();
}

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
  
  const {name, number} = issue;


  const card = `
  <section class="swiper-slide card" data-info = "${name}" data-number = "${number}">
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
  const {type, name, number} = article;


  const card = `
  <section class="swiper-slide card forlist" data-info = "${name}" data-number = "${number}" data-type = "${type}">
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
  if(i<12){
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
  podca.classList.add('hide');
  news.classList.add('hide');
  releases.classList.add('hide');
  articles.classList.add('hide');
  about.classList.add('hide');
  howto.classList.add('hide');
  menub.classList.remove('vertical');
  menub.classList.add('menub');
  menub.classList.add('menu-center');
  articleList.classList.add('hide');
  returnButton.classList.add('hide');
  octo.classList.add('hide');
  topp.classList.remove('tophowto');
  podcamul.classList.add('hide');
  try{
    clicked.classList.remove("locked-button");}
    catch(err){}
  try{
    button.classList.remove("locked-button");}
    catch(err){}
  clearPdf();
}


function checkPage(stat){
  if(stat==null){
    var searchString = window.location.search.substring(1),
    i, val, params = searchString.split("&");
    for (i=0;i<params.length;i++) {
      val = params[i].split("=");
      if (val[0] == "e") {
        var ind =  val[1];
      }
      else{
        var ind =  null; 
      }
    }

    changePage(null, ind);
  }
  else{
    changePage(null, stat);
  }
}



function changePage(event, ind){
  var clas = null;
    if (event!=null){
      const target = event.target;
      const butt = target.closest('.button');
      if (butt!=clicked){
        if (clicked!=null){
          clicked.classList.remove("locked-button");
        }
        butt.classList.add("locked-button");
        clicked = butt;
        clas = butt.classList[1].substring(7);
    }
    }
    else{
          const ba = document.getElementById("ba");
          const bh = document.getElementById("bh");
          const br = document.getElementById("br");
          const bp = document.getElementById("bp");
          clas = ind;
          var ind = null;
    }

    switch(clas){
      case 'main':
        hideAll();
        podcamul.classList.add('hide');
        podca.classList.remove('hide');
        news.classList.remove('hide');
        releases.classList.remove('hide');
        articles.classList.remove('hide');
        button.classList.add("locked-button");
        clickbuff = button;
        initSwipe();
        window.history.pushState({urlPath: 'main'}, "", '/e/index.html');
        break;
      case 'about':
        hideAll();
        menub.classList.remove('menu-center');
        about.classList.remove('hide');
        topp.classList.add('tophowto');
        try{
          clicked.classList.remove("locked-button");}
          catch(err){}
        ba.classList.add("locked-button");
        clickbuff = ba;
        clicked = ba;
        window.history.pushState({urlPath: 'about'}, "", '/e/about.html');
        break;
      case 'news':
        news.classList.remove('hide');
        initSwipe();
        break;  
      case 'archive':
        hideAll();
        articleList.classList.remove('hide');
        menub.classList.add('vertical');
        menub.classList.remove('menub');
        try{
          clicked.classList.remove("locked-button");}
          catch(err){}
        br.classList.add("locked-button");
        window.history.pushState({urlPath: 'archive'}, "", '/e/archive.html');
        clickbuff = br;
        clicked = br;
        break;  
      case 'howto':
        hideAll();
        menub.classList.remove('menu-center');
        howto.classList.remove('hide');
        topp.classList.add('tophowto');
        try{
          clicked.classList.remove("locked-button");}
          catch(err){}
        bh.classList.add("locked-button");
        window.history.pushState({urlPath: 'howto'}, "", '/e/howto.html');
        clickbuff = bh;
        clicked = bh;
        break;  
      case 'offer':
        changePage(null, ind);
        setTimeout(function() {
          clicked.classList.remove("locked-button");
          clicked = clickbuff;
          clicked.classList.add("locked-button");  
        }, 200);
              
        break;
      case 'return-button':
        hideAll();
        news.classList.remove('hide');
        releases.classList.remove('hide');
        articles.classList.remove('hide');
        initSwipe();
        clicked.classList.remove("locked-button");
        clicked = butt;
        button.classList.add("locked-button");
        window.scrollTo(0, 0);
        window.history.pushState({urlPath: 'main'}, "", '/e/index.html');
        break;
      case 'podcasts':
        hideAll();
        menub.classList.add('vertical');
        menub.classList.remove('menub');
        podcamul.classList.remove('hide');
        try{
          clicked.classList.remove("locked-button");}
          catch(err){}
        bp.classList.add("locked-button");
        window.history.pushState({urlPath: 'podcasts'}, "", '/e/podcasts.html');
        clickbuff = bp;
        clicked = bp;
    }
  }

async function openIssueJPG(inf, num, canvasContainer, article){
  console.log(inf);  
  var div = document.createElement('div');
  var art = canvasContainer.appendChild(div);
  art.classList.add("pdf-articles");
  num++;
  window.scrollTo(0, 0);
  for (var i=1;i<num;i++){

    if(article==0){
      if(i<10){
        var b = "0" + i;
      }
      else{
        var b = i;
      }
    }
    else{
      var b = i;
    }
    const page = `
    <img src="${inf}${b}.jpg" alt="page" class="page-magazine">
    `;

    
    art.insertAdjacentHTML('beforeend', page);
    if(i==num-1){
      octo.classList.add('hide');
    }
}
}

async function openRelease(stat,num){

  hideAll();
  menub.classList.add('vertical');
  menub.classList.remove('menub');

  try{
    clicked.classList.remove("locked-button");}
  catch(err){}

  returnButton.classList.remove('hide');
  clicked = null;
  octo.classList.remove('hide'); 

  if(num==null){
  console.log('start open');  
  const target = event.target;
  const card = target.closest('.card');
  const info = card.dataset.info;
  const number = card.dataset.number;
  //renderPdfArticle(`./pdfs/issues/${info}.pdf`, main);
  openIssueJPG(`pdfs/issues/${info}/${info}-`, number,  main, 0);
  window.history.pushState({urlPath: `pdfs/issues/${info}/${info}-`, num: number, e: "issues"}, "", `?issue=${info}`);
  }
  else{
    openIssueJPG(stat, num,  main, 0);
  }
}
async function openArticle(stat,num,typ){

  hideAll();
  menub.classList.add('vertical');
  menub.classList.remove('menub');
  try{
  clicked.classList.remove("locked-button")
  }catch(error){

  }
 
  returnButton.classList.remove('hide');
  clicked = null;
  octo.classList.remove('hide');

  if(num==null){
    const target = event.target;
    const card = target.closest('.card');
    const type = card.dataset.type;
    const info = card.dataset.info;
    const number = card.dataset.number;
    console.log(type);
    if(type=="pdf"){
      console.log("pdf")
      //renderPdfArticle(`./pdfs/articles/${info}.pdf`);
      openIssueJPG(`pdfs/articles/${info}/${info}-`, number,  main, 1);
    }
    if(type=="txt"){
      console.log("txt")
      const txtArticle = await getTxt(`pdfs/articles/${info}/${info}.txt`);
      await openTxtArticle(txtArticle);
      window.scrollTo(0, 0);
      octo.classList.add('hide');
    }

    window.history.pushState({urlPath: `pdfs/articles/${info}/${info}`, num: number, e: "articles", type: type }, "", `?article=${info}`);
  }
  else{
    console.log(stat, num);
    if (typ == "pdf"){
          openIssueJPG(stat + "-", num,  main, 1);
        }
    if (typ == "txt"){
          const txtArticle = await getTxt(stat + ".txt");
          await openTxtArticle(txtArticle);
          octo.classList.add('hide');
    }   
  }
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

async function openTxtArticle(txtArticle){
  var div = document.createElement('div');
  var art = main.appendChild(div);
  art.classList.add("pdf-articles");
  art.insertAdjacentHTML('beforeend', txtArticle);
}
  

  
async function init(podcamul,podca){
  //load article if open
  var stat = history.state;
  if(stat!=null){
  checkPage(stat.urlPath);
  if (stat.e=='issues'){
    openRelease(stat.urlPath,stat.num);
  }
  if (stat.e=='articles'){
    openArticle(stat.urlPath,stat.num,stat.type)
  }
  }


  


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



  //backButton
  window.addEventListener('popstate', function() {
      var stat = history.state;
      if(stat!=null){
      checkPage(stat.urlPath);
      if (stat.e=='issues'){
        openRelease(stat.urlPath,stat.num);
      }
      if (stat.e=='articles'){
        openArticle(stat.urlPath,stat.num)
      }
      }
  });


  initSwipe();
}


  init(podcamul,podca);

