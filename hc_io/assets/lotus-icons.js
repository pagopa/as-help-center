/**
 * LotusIcons v1.2.3 - A simple lib to insert icons for categories, sections, etc.
 * Copyright (c) 2015-2019 Lotus Themes <hello@lotusthemes.com>
 */

// eslint-disable-next-line no-unused-vars
(function ($, window, document) {
  ('use strict');

  /**
   * Recursively finds a value by key in window.LotusConfig.icons
   * @param  {String} key
   */
  function getValueByKey(key) {
    var value;
    Object.keys(window.LotusConfig.icons).some(function (k) {
      if (k === key) {
        value = window.LotusConfig.icons[k];
        return true;
      }
      if (window.LotusConfig.icons[k] && typeof window.LotusConfig.icons[k] === 'object') {
        value = window.LotusConfig.icons.getValueByKey(window.LotusConfig.icons[k], key);
        return value !== undefined;
      }
    });
    return value;
  }

  var LotusIcons = {
    // Insert all icons specified in LotusConfig.icons object
    insertIcons: function () {
      $('[data-lotus-icon]').each(function (index, el) {
        var $el = $(el);
        var id = $el.attr('data-lotus-icon');
        var defaultIconUrl = getValueByKey('default');
        var imgUrl = getValueByKey(id);
        var iconToDisplay = imgUrl === undefined ? defaultIconUrl : imgUrl;
        if (iconToDisplay) {
          $el.attr('src', iconToDisplay).removeClass('is-hidden').addClass('is-active');
        }
      });
    }
  };

  window.LotusIcons = LotusIcons;

  $(function () {
    LotusIcons.insertIcons();
  });
})(jQuery, window, document);
