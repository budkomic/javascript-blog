
'use strict';

//HANDLERBARS implementation 
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post .post-author',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tagsize-'
};


function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = this.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('clickedElement:', targetArticle);
}
function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  let html = '';
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element *//* get the title from the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML; /* o co chodzi z inner */
    console.log(articleTitle);

    /* create HTML of the link */
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* HANDLEBARS implimintation (instead of const linkHTML) */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: '0',
    min: '999999'
  };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times ');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    return params;
  }
}
function calculateAuthorsParams(authors) {
  const params = {
    max: '0',
    min: '999999'
  };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times ');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
  const classValue = opt.cloudClassPrefix + classNumber;
  return classValue;

}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
  const classValue = opt.cloudClassPrefix + classNumber;
  return classValue;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opt.articleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* HANDLEBARS implimintation (instead of const linkHTML) */
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }


      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);


    /* END LOOP: for every article: */

  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

  /*[NEW] create variable for all links HTML code */
  // let allTagsHTML = '';

  /* HANDLEBARS implimintation (instead of const allTagsHTML) */
  const allTagsData = { tags: [] };

  /*[NEW] Start loop: for each tag in allTags: */
  for (let tag in allTags) {

    // const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';

    // /*[NEW] generate code of a link and add it to allTagsHTML */
    // allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    /*[NEW] End loop */
  }
  /* [NEW] add html from allTagsHTML to tagList */
  // tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element  */
  const href = this.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('.a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {

    /* add class active */
    hrefTagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a, .list.tags a');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }

}
addClickListenersToTags();
