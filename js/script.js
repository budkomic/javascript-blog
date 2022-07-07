'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagsLink: Handlebars.compile(document.querySelector('#template-article-tags-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassCountPrefix = 'tag-size-'

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  
  /* [DONE] remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* [DONE] add class 'active' to the clicked link */
    
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);
  
  /* [DONE] remove class 'active' from all articles */
  
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  /* [DONE] get 'href' attribute from the clicked link */
  
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  
  /* [DONE] add class 'active' to the correct article */
  
  targetArticle.classList.add('active');
  console.log('Article is visible');
}

function generateTitleLinks(customSelector = ''){
  console.log('Title Lists are just generated');
  
  /* [DONE] remove contents of titleList */
  
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* for each article */
  
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);
   
    /* find the title element */
   
    /* get the title from the title element */
   
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
   
    /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
   
    const linkHTMLData = {id: articleId, title: articleTitle};
	const linkHTML = templates.articleLink(linkHTMLData);
	console.log('HTML of link was created!');
    
    /* insert link into titleList */
   
    html = html + linkHTML;
    console.log(html);

  }
  titleList.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');
  console.log('what is it?');
 
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    console.log(link);
  }
}
generateTitleLinks();
