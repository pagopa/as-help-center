/**
 * Table of contents for articles v1.8.7
 *
 * Copyright (c) 2014-2023 Lotus Themes
 * https://www.lotusthemes.com
 */

/* eslint-disable no-redeclare */
/* eslint-disable no-constant-binary-expression */

!(function () {
  'use strict';
  var a = window.jQuery || window.$,
    h = 'lt-toc_is-fixed',
    c = 'lt-toc_is-bottom',
    o = 'lt-toc_is-desktop',
    n = 'lt-toc_is-mobile',
    r = 'is-active';
  function l(t, i) {
    for (var e = 0; e < i.length; e++) {
      var s = i[e];
      (s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        'value' in s && (s.writable = !0),
        Object.defineProperty(t, s.key, s);
    }
  }
  var d = {
      articleBody: '[data-article]',
      headers: 'h2, h3, h4, h5',
      title: 'Table of contents',
      offsetTop: 40,
      takeElHeight: null,
      animationDuration: 500,
      showEmptyBlock: !1,
      isFixed: !0,
      changeUrl: !0,
      mobileBreakpoint: 767,
      showMobile: !0,
      labels: '',
      showIfLabel: '',
      hideIfLabel: ''
    },
    f = (function () {
      function s(t, i, e) {
        !(function (t, i) {
          if (!(t instanceof i)) throw new TypeError('Cannot call a class as a function');
        })(this, s),
          (this.i = t),
          (this.options = a.extend({}, d, e)),
          (this.$document = a(document)),
          (this.$window = a(window)),
          (this.$element = i),
          (this.$article = a(this.options.articleBody)),
          (this.$takeEl = this.options.takeElHeight ? a(this.options.takeElHeight) : null),
          (this.links = []),
          (this.isMobile = !1),
          (this.destroyed = !1),
          this.$article.length &&
            (this.options.showIfLabel || this.options.hideIfLabel || this.init(),
            this.options.showIfLabel &&
              this.options.labels.includes(this.options.showIfLabel) &&
              this.init(),
            this.options.hideIfLabel &&
              !this.options.labels.includes(this.options.hideIfLabel) &&
              this.init());
      }
      var t, i, e;
      return (
        (t = s),
        (i = [
          {
            key: 'init',
            value: function () {
              (this.$headers = this.$article.find(this.options.headers)),
                (this.$headers.length || this.options.showEmptyBlock) &&
                  (this.headers(),
                  a('html').addClass('toc-enabled'),
                  (this.links.length || this.options.showEmptyBlock) &&
                    (this.createTableOfContents(), this.handlers()));
            }
          },
          {
            key: 'headers',
            value: function () {
              var s = this;
              this.$headers = this.$headers.filter(function (t, i) {
                var e = a(i),
                  i = e.attr('id') || ''.concat(s.titleToAnchor(e.text()), '-').concat(t),
                  t = e.text().trim();
                return (
                  !!t.match(/[\S]+/) &&
                  (e.attr('id', i),
                  s.links.push({ title: t, id: i, className: s.getClassName(e) }),
                  !0)
                );
              });
            }
          },
          {
            key: 'createTableOfContents',
            value: function () {
              this.$article.css('position', 'relative'),
                this.$element.html(
                  '\n      <div class="lt-toc">\n        <div class="lt-toc--container">\n          '
                    .concat(
                      this.options.title
                        ? '<h4 class="lt-toc--title">'.concat(this.options.title, '</h4>')
                        : '',
                      '\n          <div class="lt-toc--current">'
                    )
                    .concat(
                      this.links[0] ? this.links[0].title : '',
                      '</div>\n          <ul class="lt-toc--list">\n          '
                    )
                    .concat(
                      this.links
                        .map(function (t) {
                          return '\n            <li class="lt-toc--item '
                            .concat(
                              t.className ? 'lt-toc--item-' + t.className : '',
                              '">\n              <a href="#'
                            )
                            .concat(t.id, '" class="lt-toc--link"><span>')
                            .concat(t.title, '</span></a>\n            </li>\n          ');
                        })
                        .join(''),
                      '\n        </ul>\n        </div>\n      </div>\n    '
                    )
                ),
                this.options.mobileBreakpoint &&
                  this.options.showMobile &&
                  ((this.$mobileStart = a('<div class="lt-toc-mobile lt-toc-mobile_start"></div>')),
                  this.$article.prepend(this.$mobileStart[0]),
                  this.options.isFixed &&
                    ((this.$mobileEnd = a('<div class="lt-toc-mobile lt-toc-mobile_end"></div>')),
                    this.$article.append(this.$mobileEnd[0]))),
                (this.$toc = this.$element.find('.lt-toc')),
                (this.$container = this.$element.find('.lt-toc--container')),
                (this.$title = this.$element.find('.lt-toc--title')),
                (this.$current = this.$element.find('.lt-toc--current')),
                (this.$list = this.$element.find('.lt-toc--list')),
                (this.$links = this.$element.find('.lt-toc--link'));
            }
          },
          {
            key: 'handlers',
            value: function () {
              window.location.hash && this.scrollToActiveHeader(window.location.hash),
                this.handleWindowScroll(),
                this.handleWindowResize(),
                this.$links.on('click.lt.toc', this.handleClickToLink.bind(this)),
                this.$current.on('click.lt.toc', this.handleOpenMobileMenu.bind(this)),
                this.$window.on('resize.lt.toc', this.handleWindowResize.bind(this)),
                this.$window.on('scroll.lt.toc resize.lt.toc', this.handleWindowScroll.bind(this));
            }
          },
          {
            key: 'titleToAnchor',
            value: function (t) {
              return t
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, ' ')
                .replace(/[\s]+/g, '-');
            }
          },
          {
            key: 'changeListHeight',
            value: function () {
              var t = this.isMobile
                  ? this.$current.outerHeight()
                  : this.$title[0]
                    ? this.$title.outerHeight() + 12
                    : 0,
                t = this.options.offsetTop + t + 20;
              this.$list.css('max-height', window.innerHeight - t);
            }
          },
          {
            key: 'getClassName',
            value: function (t) {
              var i = this,
                e = t.attr('class'),
                e = e ? e.split(/\s+/) : [];
              e.push(t[0].localName);
              var s = '';
              return (
                e.forEach(function (t) {
                  if (-1 !== i.options.headers.indexOf(t)) return (s = t), !1;
                }),
                s
              );
            }
          },
          {
            key: 'scrollToActiveHeader',
            value: function (e) {
              var t,
                i,
                s = this.$takeEl ? this.$takeEl.innerHeight() : 0,
                o = [];
              this.$headers.each(function (t, i) {
                i.getAttribute('id') === e.replace('#', '') && (o = a(i));
              }),
                o.length &&
                  (o.parents('.accordion__item').length &&
                    ((i = o.parents('.accordion__item').find('.accordion__item-title')).hasClass(
                      'accordion__item-title--active'
                    ) ||
                      (i.trigger('click'), a(window).trigger('resize'))),
                  o.parents('.tabs').length &&
                    ((t = o.parents('.tab')),
                    (i = o
                      .parents('.tabs')
                      .find('.tabs-menu')
                      .find('.tabs-link')
                      .eq(t.index() - 1)),
                    t.hasClass('is-hidden') && (i.trigger('click'), a(window).trigger('resize'))),
                  (s =
                    o.offset().top -
                    s -
                    this.options.offsetTop -
                    (this.isMobile ? this.$mobileStart.outerHeight(!0) : 0)),
                  a('body,html').animate({ scrollTop: s }, this.options.animationDuration));
            }
          },
          {
            key: 'fixedBox',
            value: function () {
              var t, i, e, s, o, n, l;
              (this.isMobile && !this.options.showMobile) ||
                ((t = (
                  this.isMobile && this.$mobileEnd ? this.$mobileEnd : this.$toc
                ).innerWidth()),
                (i = (
                  this.isMobile && this.$mobileEnd ? this.$mobileEnd : this.$container
                ).innerHeight()),
                (e = this.$takeEl ? this.$takeEl.innerHeight() : 0),
                (s = this.$document.scrollTop()),
                (o =
                  (this.isMobile ? this.$mobileStart : this.$toc).offset().top -
                  this.options.offsetTop -
                  e),
                (n = this.$article.offset().top + this.$article.innerHeight()),
                (l = s + this.options.offsetTop + i + e),
                o <= s && l < n
                  ? (this.$toc.removeClass(c).addClass(h),
                    this.$container.css({
                      position: 'fixed',
                      top: this.options.offsetTop + e,
                      width: t
                    }))
                  : s < o
                    ? (this.$toc.removeClass(h + ' ' + c), this.$container.removeAttr('style'))
                    : n <= l &&
                      (this.$toc.removeClass(h).addClass(c),
                      this.$container.css({
                        position: 'absolute',
                        top: n - i - this.$toc.offset().top,
                        width: t
                      })));
            }
          },
          {
            key: 'changeActiveMenuItem',
            value: function () {
              if (!this.isMobile || this.options.showMobile) {
                for (
                  var t,
                    i,
                    e,
                    s = this.$takeEl ? this.$takeEl.innerHeight() : 0,
                    o = !1,
                    n = !1,
                    l = null,
                    h = 0;
                  h < this.$headers.length;
                  h++
                )
                  n ||
                    ((t = a(this.$headers[h])).offset().top <=
                    this.$document.scrollTop() +
                      parseInt(this.options.offsetTop || 0) +
                      1 +
                      s +
                      (this.isMobile ? this.$mobileStart.outerHeight(!0) : 0)
                      ? (l = t)
                      : (n = !0));
                l || ((o = !0), (l = this.$headers.eq(0))),
                  l &&
                    ((i = l.attr('id')),
                    (e = this.$links.filter('[href="#'.concat(i, '"]'))).hasClass(r) ||
                      (this.$links.removeClass(r),
                      e.addClass(r),
                      this.$current.text(e.text()),
                      !o && this.options.changeUrl && history.pushState(null, null, '#' + i)));
              }
            }
          },
          {
            key: 'switchToDesktopVersion',
            value: function () {
              this.$toc.hasClass(o) ||
                ((this.isMobile = !1),
                this.options.showMobile &&
                  (this.$mobileStart.removeClass(r),
                  this.options.isFixed && this.$mobileEnd.removeClass(r)),
                this.$toc.removeAttr('style').removeClass(n).addClass(o),
                this.options.showMobile ||
                  (this.$toc.css({ display: 'block' }), this.handleWindowScroll()));
            }
          },
          {
            key: 'switchToMobileVersion',
            value: function () {
              var t, i, e;
              this.$toc.hasClass(n) ||
                ((this.isMobile = !0),
                this.$toc.removeClass(o).addClass(n),
                this.options.showMobile &&
                  (this.$mobileStart.addClass(r),
                  this.options.isFixed && this.$mobileEnd.addClass(r))),
                this.options.showMobile
                  ? ((t = this.$mobileStart.offset().top),
                    (i = this.$mobileStart.offset().left),
                    (e = this.$mobileStart.innerWidth()),
                    this.$toc.css({ position: 'absolute', top: t, left: i, width: e }))
                  : this.$toc.css({ display: 'none' });
            }
          },
          {
            key: 'handleClickToLink',
            value: function (t) {
              t.preventDefault();
              t = a(t.currentTarget).attr('href');
              this.$container.hasClass(r) &&
                (this.$container.removeClass(r), this.$list.slideUp(300)),
                this.scrollToActiveHeader(t);
            }
          },
          {
            key: 'handleOpenMobileMenu',
            value: function (t) {
              t.preventDefault(), this.$container.toggleClass(r), this.$list.slideToggle(300);
            }
          },
          {
            key: 'handleWindowScroll',
            value: function () {
              this.options.isFixed && this.fixedBox(), this.changeActiveMenuItem();
            }
          },
          {
            key: 'handleWindowResize',
            value: function () {
              this.options.mobileBreakpoint &&
                (window.innerWidth > this.options.mobileBreakpoint
                  ? this.switchToDesktopVersion()
                  : this.switchToMobileVersion()),
                this.changeListHeight();
            }
          },
          {
            key: 'create',
            value: function (t) {
              this.destroyed || this.destroy();
              var i = this.$element.attr('id') || this.i;
              window.LS.extensions.toc[i] = new s(
                this.i,
                this.$element,
                t || this.$element.data('toc') || {}
              );
            }
          },
          {
            key: 'update',
            value: function () {
              this.handleWindowResize(), this.handleWindowScroll();
            }
          },
          {
            key: 'destroy',
            value: function () {
              this.$links && this.$links.off('click.lt.toc'),
                this.$current && this.$current.off('click.lt.toc'),
                this.$window.off('scroll.lt.toc resize.lt.toc'),
                this.$element.html(''),
                (this.destroyed = !0);
            }
          }
        ]) && l(t.prototype, i),
        e && l(t, e),
        s
      );
    })();
  function u(t, i) {
    Object.defineProperty(t, i, { value: {}, enumerable: !0 });
  }
  (window.Toc = f),
    a(window).on('load', function () {
      a('[data-toc]').each(function (t, i) {
        var e = a(i),
          s = e.data('toc') || {},
          i = e.attr('id') || t;
        ((!s.showIfLabel && !s.hideIfLabel) ||
          (s.showIfLabel && s.labels.includes(s.showIfLabel)) ||
          (s.hideIfLabel && !s.labels.includes(s.hideIfLabel))) &&
          (window.LS || u(window, 'LS'),
          window.LS.extensions || u(window.LS, 'extensions'),
          window.LS.extensions.toc || u(window.LS.extensions, 'toc'),
          (window.LS.extensions.toc[i] = new f(t, e, s)),
          a(window).trigger('resize'));
      });
    });
})();
