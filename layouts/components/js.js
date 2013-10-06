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

(function(dt, win)
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
      console.log("submit");
    }, false);

  };
})(document, window);
