/* eslint-disable no-useless-escape */

/**
 * @namespace HiddenArticles
 */
const HiddenArticles = {
  /**
   * Get ids array of hidden articles
   * @memberof HiddenArticles
   * @returns {Array} hiddenArticlesIds
   */
  getIds() {
    const hiddenIds = [35541811236113, 30850697181585];
    return hiddenIds;
  },

  /**
   * Get titles array of hidden articles
   * @memberof HiddenArticles
   * @returns {Array} hiddenTitles
   */
  getTitles() {
    const hiddenTitles = ['Cosa serve per usare IT-Wallet', 'Cosa serve per usare Documenti su IO'];
    return hiddenTitles;
  },
};

window.HiddenArticles = HiddenArticles;
