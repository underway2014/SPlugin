;(function ($, window, document, undefined) {
  var Plugin = function (elem, options) {
    this.$wrapper = elem;
    this.opts = $.extend({
      selectedIndex: 0,
      activeClass: "on",
      childSelector: ".item"
    }, options);
    this.$tab_list = this.$wrapper.find(this.opts.childSelector);
  };

  Plugin.prototype = {
    inital: function () {
      var self = this;
      this.tabInital();

      this.$tab_list.click(function () {
        self.changeTab($(this).index());
      });  
    },

    tabInital: function () { // 初始化当前显示
      this.$tab_list.removeClass(this.opts.activeClass);
      this.$tab_list.eq(this.opts.selectedIndex).addClass(this.opts.activeClass);
    },

    changeTab: function (index) { // 选项卡切换
      this.$tab_list.removeClass(this.opts.activeClass);
      this.$tab_list.eq(index).addClass(this.opts.activeClass);
      if(typeof this.opts.callback === "function"){
        this.opts.callback(index);
      }
    }
  };

  $.fn.tab = function (options) {
    var plugin = new Plugin(this, options);

    return plugin.inital();
  };

})(window.jQuery, window, document);