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
  
generateTitleLinks();
