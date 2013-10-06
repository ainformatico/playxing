if(typeof window.console === 'undefined')
{
  window.console =
  {
    log : function(){}
  };
}


/**
 * Basic selector engine
 *
 * @param {string} selector
 *
 * @param {element} context element
 *
 * @return {element}
 *
 * */
var $ = (function(dt, win)
{
  return function(selector, el)
  {
    var context = el || dt,
        item;
    if(/^#/.test(selector))
    {
      item = context.getElementById(selector.replace('#', ''));
    }
    else if(/^\w+/.test(selector))
    {
      item = context.getElementsByTagName(selector);
    }
    return item;
  };
})(document, window);

var APP = APP ||
(function(dt, win)
{
  //custom functions for DOM elements
  /*NOTE: I don't really want to mess up with the native
          objects methods like _prototype_ library,
          but I want a fast implementation for this demo.
   */

  /**
   * Add and event
   *
   * @param {string} evt event
   *
   * @param {function} cb callback
   *
   * */
  Element.prototype.on = function(evt, cb)
  {
    var _this = this;
    if(typeof dt.addEventListener === 'function')
    {
      _this.addEventListener(evt, cb, false);
    }
    else
    {
      _this.attachEvent('on' + evt, cb);
    }
  };

  /**
   * Check if a item has a class
   *
   * @param {string} cls class
   *
   * @return {boolean} true has the class
   *
   * @return {boolean} false not has the class
   *
   * */
  Element.prototype.hasClass = function(cls)
  {
    return new RegExp(cls).test(this.className);
  };

  /**
   * Remove a class from an item
   *
   * @param {string} cls class
   *
   * */
  Element.prototype.removeClass = function(cls)
  {
    var _this = this;
    _this.className = _this.className.replace(new RegExp('\\s?' + cls, 'g'), '');
  };

  /**
   * Add a clas to an item
   *
   * @param {string} cls class
   *
   * */
  Element.prototype.addClass = function(cls)
  {
    var _this = this;
    !_this.hasClass(cls) && (_this.className += cls);
  };

  /**
   * Utils
   *
   * */
  var utils =
  {
    /**
     * Ltrim a string
     *
     * @param {string} string
     *
     * @return {string}
     *
     * */
    ltrim : function(s)
    {
      return s.replace(/^\s*/, '');
    },

    /**
     * Rtrim a string
     *
     * @param {string} string
     *
     * @return {string}
     *
     * */
    rtrim: function(s)
    {
      return s.replace(/\s*$/, '');
    },

    /**
     * Trim a string
     *
     * @param {string} string
     *
     * @return {string}
     *
     * */
    trim : function(s)
    {
      var _this = this;
      return _this.ltrim(_this.rtrim(s));
    }
  },

  validations =
  {
    /**
     * Check if an item value is empty
     *
     * @param {element} item
     *
     * @return {boolean} true is empty
     *
     * @return {boolean} false not empty
     *
     * */
    empty : function(item)
    {
      //NOTE: our requirement for now is just to check for length > 2
      return item.value.replace(/\s/g, '').length > 2;
    },

    /**
     * Validates email
     *
     * @param {element} item
     *
     * @return {boolean} true is valid
     *
     * @return {boolean} false not valid
     *
     * */
    email : function(item)
    {
      //john@doe.co
      //john@doe.com
      //john.doe@john.doe.com
      return /^[^ ]+@(\w+\.)+(\w{2,})$/.test(utils.trim(item.value));
    }
  },

  methods =
  {
    /**
     * Validates a form
     *
     * @param {element} form
     *
     * @return {boolean} true is valid
     *
     * @return {boolean} false is valid
     *
     * */
    validator : function(form)
    {
      var inputs    = $('input', form),
          l_inputs  = inputs.length,
          result    = true,
          error_cls = 'error';
      while(l_inputs--)
      {
        var current  = inputs[l_inputs],
            required = current.getAttribute('data-required'); //NOTE: getAttribute has more support than dataset
        if(required)
        {
          if(!validations[current.getAttribute('data-validate')](current))
          {
            result = false;
            console.log("error: ", current);
            current.addClass(error_cls);
          }
          else
          {
            current.removeClass(error_cls);
          }
        }
      }
      return result;
    }
  };

  return methods;
})(document, window);

(function(dt, win, APP)
{
  win.onload = function()
  {
    var form = $('#signup');
    if(form)
    {
      console.log("found it");
    }

    form.on('submit', function(e)
    {
      e.preventDefault && e.preventDefault();
      console.log("form =>", APP.validator(form));
      console.log("submit");
      return false;
    }, false);

  };
})(document, window, APP);
