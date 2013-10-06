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
(function()
{
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
    validator : function(form)
    {
      var inputs   = $('input', form),
          l_inputs = inputs.length,
          result   = true;
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

    form.addEventListener('submit', function(e)
    {
      e.preventDefault && e.preventDefault();
      console.log("form =>", APP.validator(form));
      console.log("submit");
    }, false);

  };
})(document, window, APP);
