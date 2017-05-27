;(function($) {
    var Roll = function($this, opt) {
        var defaultOpt = {
            duration: 1000,
            lineHeight: 20,
            installNumber: 10000,
            finish: null
        };
        this.$el = $this;
        this.opt = $.extend({}, defaultOpt, opt);
        this.opt.installNumber = this.opt.installNumber.toString();

        var html = "";
        for (var i = 0, len = this.opt.installNumber.length; i < len; i++) {
            html += '<div><span>' + this.opt.installNumber[i] + '</span></div>';
        }
        $this.append(html);
    }

    Roll.prototype = {
        changeNumber: function(num, dur) {
            var oldnum = this.opt.installNumber.toString();
            var newnum = num.toString();
            this.opt.installNumber = newnum;
            var self = this;

            var disLen =  newnum.length - oldnum.length;
            if (disLen) {
                var bw = "0".repeat(Math.abs(disLen));
                if(disLen > 0){
                    oldnum = bw + oldnum;
                    var html = "";
                    for (var i = 0, len = bw.toString().length; i < len; i++) {
                        html += '<div><span class="hide">' + bw[i] + '</span></div>';
                    }
                    self.$el.prepend(html);
                }else{
                    oldnum = oldnum.slice(Math.abs(disLen));
                    self.$el.find("div").slice(0, Math.abs(disLen)).remove();
                }
            }

            for (var i = 0, len = oldnum.length; i < len; i++) {
                if (oldnum[i] === newnum[i]) continue;
                var $el = $(self.$el.children()[i]);
                var d = function() {
                    var realDis = +newnum[i] - oldnum[i];
                    var redrict = realDis > 0 ? 1 : -1;
                    var dis = Math.abs(realDis) + 1;
                    while (dis) {
                        dis--;
                        $el.append('<div class="animation" style="top: ' + self.opt.lineHeight * dis * redrict + 'px;">' + (+oldnum[i] + dis * redrict) + '</div>');
                    }
                    return realDis;
                }();
                $el.find("span").addClass("hide");
                self.animation($el, d, dur);
            }
        },
        animation: function($el, dis, dur) {
            var self = this;
            var count = 0;
            $.each($el.find(".animation"), function(i, el) {
                var top = parseInt($(el).css("top"));
                $(el).animate({ top: top - self.opt.lineHeight * dis }, dur || self.opt.duration, function() {
                    count++;
                    if (count >= $el.find(".animation").length) {
                        $el.find("span").text(+$el.find("span").text() + dis);
                        $el.find("span").removeClass("hide");
                        $el.find("div").remove();
                        typeof self.finish === "function" && self.finish();
                    }
                });
            });
        },
        findEl: function(num) {
            var $el = null;
            var self = this;
            $.each(self.$el.children(), function(n, el) {
                if ($(el).find("span").text().toString() === num) {
                    $el = $(el);
                }
            });
            return $el;
        }
    }

    $.fn.roll = function(opt) {
        var roll = new Roll(this, opt);
        return roll;
    }
})($);
