(function ($) {

  $.widget( "main.cursorSpy", {

    options: {
      isActive: true,
      head: 0,//°
      min: null,//°
      max: null,//°
      rotationCenterX: 50,//%
      rotationCenterY: 50,//%
      step: function(me, deg, distance) {
        //me = widget
        //deg = angle for this step (real CSS value for rotation)
        //distance = distance of the cursor from the transform origin in pixels
        //deg + me.options.head = angle for this step (computed angle related to the head -if defined-)
        //return false to prevent rotation for this step
        return deg;
      },
      centerX: null,//transform origin X related to the screen
      centerY: null,//transform origin Y related to the screen
    },

    _create: function() {
      var me = this;

      me.element
        .css("display", "block");

      //set transform origin
      var torigin = me.options.rotationCenterX + "% " + me.options.rotationCenterY + "%";
      me.element
        .css("-ms-transform-origin", torigin)
        .css("-webkit-transform-origin", torigin)
        .css("transform-origin", torigin);

      //converts transform origin from % to px
      var width = me.element.width();
      var height = me.element.height();
      var rotationCenterX_px = width * me.options.rotationCenterX / 100;
      var rotationCenterY_px = height * me.options.rotationCenterY / 100;

      //computes rotation angle
      var offset = me.element.offset();
      me.options.centerX = offset.left + rotationCenterX_px;
      me.options.centerY = offset.top + rotationCenterY_px;


      $(document).on("mousemove", function(event) {
        if(me.options.isActive) {
          var dx = event.pageX-me.options.centerX;
          var dy = event.pageY-me.options.centerY;
          var rad = Math.atan((dy)/(dx)) - Math.PI;
          if(dx < 0) {
            rad += Math.PI;
          }

          var deg = rad / Math.PI * 180 - 90;
          deg = (deg + 360) % 360;

          if(me.options.min != null && me.options.max != null && (deg < me.options.min || deg > me.options.max)) {
            return false;
          }

          if(me.options.step) {
            var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            deg = me.options.step(me, deg, distance);

            if(deg == false) {
              return false;
            }
          }

          deg = deg - me.options.head;

          me.element
            .css("-ms-transform", "rotate(" + deg + "deg)")
            .css("-webkit-transform", "rotate(" + deg + "deg)")
            .css("transform", "rotate(" + deg + "deg)");
        }
      });

      this._update();
    },

    _setOption: function(key, value) {
      this.options[key] = value;
      this._update();
    },

    _update: function() {},

    _destroy: function() {},

    start: function() {
      this.options.isActive = true;
    },

    stop: function() {
      this.options.isActive = false;
    },

  });

})(jQuery);
