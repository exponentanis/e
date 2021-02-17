
'use strict';

console.log("я здесь");

const scroll = document.querySelector('.scroll');
const news = document.querySelector('.news');
const sw1 = document.querySelector('.sw1');
const sw2 = document.querySelector('.sw2');



const main = document.querySelector('.main');
const menub = document.querySelector('.menu-center');
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
const inputSearch = document.querySelector('.input-search');

const searc = document.querySelector('.search');
const cacti = document.querySelector('.cacti');
var podcamul = document.getElementById('podcamul');
var podca = document.getElementById('podca');
const me = document.querySelector(".me");

const bb = document.querySelector('.button-offer');


let pdfArticle = document.querySelector(".pdf-articles");
let clicked = document.querySelector('.locked-button');
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

async function forSearch(data){
  var div = document.createElement('div');
  var art = main.appendChild(div);
  art.classList.add("searchRes");
  data.forEach(function callback(value, iter){
    createSearch(value, art);
  });
}

async function createSearch(article, art){
  const {type, name, number} = article;


  const card = `
  <section class="swiper-slide card forsearch" data-info = "${name}" data-number = "${number}" data-type = "${type}">
    <div class="card-container forcon">
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
    art.insertAdjacentHTML('beforeend', card);    
    const aca = document.querySelectorAll(".forsearch");
    aca.forEach(function(item){
      item.classList.add("acard");
      item.classList.remove("swiper-slide");
    });

    const cont = document.querySelectorAll('.forcon');
    cont.forEach(function(cont){
      cont.classList.remove("card-container");
      const inText = cont.querySelector('.titletxt');
      inText.classList.add("tinner");
    });
  }
  await crlist();
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


function clearSearchRes(){
  let Search = document.querySelector(".searchRes");
  if (Search){
    Search.parentNode.removeChild(Search);
  }
}

function clearPdf(){
      let pdfArticle = document.querySelector(".pdf-articles");
      if (pdfArticle){
        pdfArticle.parentNode.removeChild(pdfArticle);
      }
  }
function hideAll(){

   podcamul = document.getElementById('podcamul');
   podca = document.getElementById('podca');
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
  searc.classList.add('hide');
  cacti.classList.add('hide');
  me.classList.add('hide');

  button.classList.add('longbut');
  b.classList.add('longbut');
  bp.classList.add('longbut');
  br.classList.add('longbut');
  ba.classList.add('longbut');
  bp.classList.add('longbut');
  bb.classList.add('longbut');
  bh.classList.add('longbut');

  inputSearch.value = '';
  try{
    clicked.classList.remove("locked-button");}
    catch(err){}
  try{
    button.classList.remove("locked-button");}
    catch(err){}
  clearPdf();
  clearSearchRes();
}


function checkPage(stat){
  if(stat==null){

    var alrt = 0;
    var ind = null;
    var searchString = window.location.search.substring(1),
    i, val, params = searchString.split("&");
    for (i=0;i<params.length;i++) {
      val = params[i].split("=");
      if (val[0] == "e") {
        var ind =  val[1];
      }    
      if (val[0] == "issue") {
        var ind =  val[1];
        alrt = 1;
      }
      if (val[0] == "article") {
        var ind =  val[1];
        alrt = 2;
      }
      if (val[0] == "num") {
        var num =  val[1];  
      }  
      if (val[0] == "typ") {     
        var typ =  val[1]; 
      }   


    }
    switch(alrt){
      case 1:
        openRelease(`pdfs/issues/${ind}/${ind}-`,num);
        break;
      case 2:
        openArticle(`pdfs/articles/${ind}/${ind}`,num,typ);
        break;
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
          const b = document.getElementById("b");
          clas = ind;
          var ind = null;
    }

    switch(clas){
      case 'main':
        hideAll();
         podcamul = document.getElementById('podcamul');
         podca = document.getElementById('podca');
        podcamul.classList.add('hide');
        podca.classList.remove('hide');
        news.classList.remove('hide');
        releases.classList.remove('hide');
        articles.classList.remove('hide');
        searc.classList.remove('hide');
        button.classList.add("locked-button");
        clickbuff = button;
        initSwipe();
        window.history.pushState({urlPath: 'main'}, "", '/e/index.html');
        break;
     case 'me':
          hideAll();
          me.classList.remove('hide');
          try{
            clicked.classList.remove("locked-button");}
            catch(err){}
          b.classList.add("locked-button");
          window.history.pushState({urlPath: 'me'}, "", '/e/me.html');
          clickbuff = b;
          clicked = b;
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
      case 'archive':
        hideAll();

        button.classList.remove('longbut');
        b.classList.remove('longbut');
        bp.classList.remove('longbut');
        br.classList.remove('longbut');
        ba.classList.remove('longbut');
        bp.classList.remove('longbut');
        bb.classList.remove('longbut');
        bh.classList.remove('longbut');

        articleList.classList.remove('hide');
        searc.classList.remove('hide');
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
        location.href = "mailto:exponenta.magazine@gmail.com?subject=Публикация статьи (укажите название статьи)&body= Уважаемая редакция журнала “Exponenta”,%0A Прошу рассмотреть к публикации статью (укажите название статьи) (укажите имена авторов статьи).";
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

        button.classList.remove('longbut');
        b.classList.remove('longbut');
        bp.classList.remove('longbut');
        br.classList.remove('longbut');
        ba.classList.remove('longbut');
        bp.classList.remove('longbut');
        bb.classList.remove('longbut');
        bh.classList.remove('longbut');

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
    window.scrollTo(0,0);
  }
    

async function openIssueJPG(inf, num, canvasContainer, article){
   
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
    clicked.classList.remove("locked-button");
  } catch(err){}

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
  window.history.pushState({urlPath: `pdfs/issues/${info}/${info}-`, num: number, e: "issues"}, "", `?issue=${info}&num=${number}`);
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

    window.history.pushState({urlPath: `pdfs/articles/${info}/${info}`, num: number, e: "articles", type: type }, "", `?article=${info}&num=${number}&typ=${type}`);
  }
  else{
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
  

function search(val){
  const articles = [];
  var st = null;
  var value = null;
  if (val){
    st = val;
    value = val.toLowerCase().trim();
  }
  else{
    st = inputSearch.value;
    value = inputSearch.value.toLowerCase().trim();
  }

  if (!value){
    return;
  }

  getData('./db/articles.json')
  .then(function(data){
    //теееееееема
    articles.push(...data);
    const searchArticles = articles.filter(function(item){
      return item.name.toLowerCase().includes(value)
    });

    //hide
    hideAll();
    inputSearch.value = st;
    menub.classList.remove('menub');
    menub.classList.add('vertical');
    inputSearch.classList.remove('hide');
    button.classList.remove("locked-button");
    clicked = null;
    window.history.pushState({urlPath: `search/${value}`, search: value }, "", `?search=${value}`);
            return searchArticles
  })
  .then(async function(data){
    console.log(data);
    if (data.length==0){
      cacti.classList.remove('hide');
    }
    else{
      await forSearch(data);

      const card = document.querySelectorAll('.img-card');
      card.forEach(function(item){
        loadData(item);
        item.addEventListener("click", openArticle);
      });
      const rati = document.querySelectorAll('.rating');
      rati.forEach(function(item){
        item.addEventListener("click", setRate);
      });


      const artic = document.querySelectorAll('.forsearch');  
      const cardNum = artic.length;
      if (cardNum%4!=0){
      for(var i=0; i<4-cardNum%4; i++){
        const addcard = document.createElement('div');
        addcard.className = 'transparent';
        addcard.insertAdjacentHTML('beforeend', `
        <div class="acard ">
    
        </div> 
        `);
        const search = document.querySelector('.searchRes');
        search.insertAdjacentElement('beforeend', addcard);
      }
      }
  }
  })
}
  
async function init(){
  //load article if open
  var searchString = window.location.search.substring(1),
    i, val, params = searchString.split("&");


  var stat = history.state;
  if(searchString!=""){
    checkPage(stat);
  }
  if(stat!=null){
  checkPage(stat.urlPath);
  if (stat.e=='issues'){
    openRelease(stat.urlPath,stat.num);
  }
  if (stat.e=='articles'){
    openArticle(stat.urlPath,stat.num,stat.type)
  }
  if (stat.search){
    search(stat.search);
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
  if (cardNum %4!=0){
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
        location.reload();
      }
      if (stat.search){
        location.reload();
      }
      }
  });

// поооиск
  inputSearch.addEventListener('keydown', function(event){
    if (event.keyCode === 13){
      //inputSearch.value  OR
      search();
    }
    
  });


  initSwipe();
}


init();


