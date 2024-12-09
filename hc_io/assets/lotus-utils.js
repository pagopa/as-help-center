/* eslint-disable no-useless-escape */

/**
 * @namespace LotusUtils
 */
const LotusUtils = {
  /**
   * Get HC locale
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {string} locale
   */
  getLocale(pageUrl) {
    if (
      this.isContributionsPostsPage() ||
      this.isContributionsCommunityCommentsPage() ||
      this.isContributionsCommentsPage()
    ) {
      return this.getUrlParameter('locale');
    }
    const url = pageUrl || window.location.href;
    const links = url.split('/');
    const hcIndex = links.indexOf('hc');
    const links2 = links[hcIndex + 1].split('?');

    return links2[0].replace('?', '').replace('#', '');
  },

  /**
   * Get page ID
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {number | null} page ID or null
   */
  getPageId(pageUrl) {
    const url = pageUrl || window.location.href;
    const links = url.split('/');
    const result = links[links.length - 1];
    return parseInt(result, 10) || null;
  },

  /**
   * Get category ID
   * @memberof LotusUtils
   * @param {string=} url page url
   * @returns {number | null | undefined} category ID or
   */
  getCategoryId(url) {
    if (this.isCategoryPage(url)) {
      return this.getPageId(url);
    }
    if (!url) {
      const breadcrumbsEl = document.querySelector('.breadcrumbs');
      if (!breadcrumbsEl) return null;
      const links = breadcrumbsEl.querySelectorAll('a');

      if (!links.length) return null;

      const categoryLink = [...links]
        .find((link) => this.isCategoryPage(link.getAttribute('href')))
        .getAttribute('href');

      return this.getPageId(categoryLink);
    }
  },

  /**
   * Get section ID
   * @memberof LotusUtils
   * @param {string=} url page url
   * @returns {number | null} section ID or null
   */
  getSectionId(url) {
    if (this.isSectionPage(url)) {
      return this.getPageId(url);
    }
    if (!url) {
      const breadcrumbsEl = document.querySelector('.breadcrumbs');
      if (!breadcrumbsEl) return null;
      const links = breadcrumbsEl.querySelectorAll('a');
      const link = links[links.length - 1].getAttribute('href');
      if (link && this.isSectionPage(link)) {
        return this.getPageId(link);
      }
    }
  },

  /**
   * Get article ID
   * @memberof LotusUtils
   * @param {string=} url page url
   * @returns {number | null} article ID or null
   */
  getArticleId(url) {
    if (this.isArticlePage(url)) {
      return this.getPageId(url);
    }
    return null;
  },

  /**
   * Get current user info
   * @memberof LotusUtils
   * @param {function} callback
   * @async
   */
  getCurrentUser(callback) {
    const context = this;
    $.getJSON('/api/v2/users/me.json')
      .done((response) => callback.call(context, null, response.user))
      .fail((jqxhr) => callback.call(context, jqxhr, null));
  },

  /**
   * Get all article images
   * @memberof LotusUtils
   * @param {String} articleBody article body
   * @returns {Array<string | null>}
   */
  getArticleImages(articleBody) {
    const body = new DOMParser().parseFromString(articleBody, 'text/html').body;
    const images = body.querySelectorAll('img');

    return [...images].map((image) => {
      return image.getAttribute('src');
    });
  },

  /**
   * @memberof LotusUtils
   * @param {string} param
   * @returns {string | undefined}
   */
  getUrlParameter(param) {
    const pageURL = window.location.search.substring(1);
    const URLVariables = pageURL.split('&');
    let parameterName;
    let i;

    for (i = 0; i < URLVariables.length; i += 1) {
      parameterName = URLVariables[i].split('=');

      if (parameterName[0] === param) {
        return parameterName[1] === undefined ? '' : decodeURIComponent(parameterName[1]);
      }
    }
  },

  /**
   * Is home page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isHomePage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /^http(s)?:\/\/[^\/?#]+(\/hc(\/[a-z-0-9_]+)?(\/)?(signin)?([?]([^?\/]+)?)?([#]([^#\/]+)?)?)?$/.test(
      url
    );
  },

  /**
   * Is category page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isCategoryPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?categories\//i.test(url);
  },

  /**
   * Is section page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isSectionPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?sections\//i.test(url);
  },

  /**
   * Is article page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isArticlePage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?articles\//i.test(url);
  },

  /**
   * Is search results page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isSearchResultsPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?search\?*.*/i.test(url);
  },

  /**
   * Is contributions posts page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isContributionsPostsPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?contributions\/posts(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is contributions community comments page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isContributionsCommunityCommentsPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?contributions\/community_comments(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is contributions community comments page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isContributionsCommentsPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?contributions\/comments(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is following page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isFollowingPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?subscriptions(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is request list page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isRequestListPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?requests(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is request page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isRequestPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return (
      !this.isNewRequestPage(url) &&
      /\/hc\/([a-z-0-9_]+\/)?requests\/[^/?#]+(\/)?([?#].*)?$/i.test(url)
    );
  },

  /**
   * Is new request page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isNewRequestPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?requests\/new(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is community topic list page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isCommunityTopicListPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?community\/topics(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is community topic page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isCommunityTopicPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?community\/topics\/[^\/?#]+(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is community post list page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isCommunityPostListPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?community\/posts(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is community post page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isCommunityPostPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return (
      !this.isNewCommunityPostPage(url) &&
      /\/hc\/([a-z-0-9_]+\/)?community\/posts\/[^\/?#]+(\/)?([?#].*)?$/i.test(url)
    );
  },

  /**
   * Is new community post page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isNewCommunityPostPage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?community\/posts\/new(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is user profile page
   * @memberof LotusUtils
   * @param {string=} pageUrl page url
   * @returns {boolean}
   */
  isUserProfilePage(pageUrl) {
    const url = pageUrl || window.location.href;
    return /\/hc\/([a-z-0-9_]+\/)?profiles\/[^\/?#]+(\/)?([?#].*)?$/i.test(url);
  },

  /**
   * Is end user
   * @memberof LotusUtils
   * @param {object|undefined} user user info object, getting from this.getCurrentUser()
   * @returns {boolean}
   */
  isEndUser(user) {
    return !!(user && user.role && user.role === 'end-user');
  },

  /**
   * Has user tags
   * @memberof LotusUtils
   * @param {object|undefined} user user info object, getting from this.getCurrentUser()
   * @param {Array<string>} tags
   * @returns {boolean}
   */
  hasUserTags(user, tags) {
    if (user && user.tags) {
      return this.findOne(tags, user.tags);
    }
    return false;
  },

  /**
   * @memberof LotusUtils
   * @description determine if an array contains one or more items from another array.
   * @param {array} haystack the array to search.
   * @param {array} arr the array providing items to check for in the haystack.
   * @returns {boolean} true|false if haystack contains at least one item from arr.
   */
  findOne(haystack, arr) {
    return arr.some((v) => haystack.indexOf(v) >= 0);
  },

  /**
   * @memberof LotusUtils
   * @param {string} text
   * @param {number} limit
   * @param {string} clamp
   * @returns {string | null}
   */
  truncate(text, limit, clamp) {
    const currentClamp = clamp || '...';
    const content = new DOMParser().parseFromString(text, 'text/html').body.textContent;
    if (!content) return null;
    return content.length > limit ? content.slice(0, limit) + currentClamp : content;
  },

  /**
   * @memberof LotusUtils
   * @param  {Array<any>} array
   * @returns {Array<any>}
   */
  flatten(array) {
    if (!array.length) {
      return [];
    }
    return array.reduce((prev, curr) => prev.concat(curr));
  },

  /**
   * @memberof LotusUtils
   * @param {string} key - A key to identify the value.
   * @param {any} value - A value associated with the key.
   * @param {number} ttl - Time to live in seconds.
   */
  setWithExpiry(key, value, ttl) {
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value,
      ttl: Date.now() + ttl * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  /**
   * @memberof LotusUtils
   * @param {string} key - A key to identify the data.
   * @returns {any|null} returns the value associated with the key if its exists and is not expired.
   */
  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    // compare the expiry time of the item with the current time
    if (Date.now() > item.ttl) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },
  /**
   * @memberof LotusUtils
   * @param  {object} object
   * @param  {string} property
   * @returns {boolean}
   */
  hasProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  },
  sortByPosition(a, b) {
    // Sort by promoted status if the object is an article
    if (LotusUtils.hasProperty(a, 'promoted') && LotusUtils.hasProperty(b, 'promoted')) {
      if (a.promoted > b.promoted) return -1;
      if (b.promoted > a.promoted) return 1;
    }

    return a.position - b.position;
  },
  /**
   * @param  {any} object
   * @param  {Array<string>} keys
   */
  pick(object, keys) {
    return keys.reduce((obj, key) => {
      if (object && LotusUtils.hasProperty(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }
};

window.LotusUtils = LotusUtils;
