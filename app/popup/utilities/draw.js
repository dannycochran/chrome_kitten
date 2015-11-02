// This a mithril helper for optimizing redrawing of elements.
// Mithril view functions are inexpensive, but can be even less expensive
// by returning a cached view if nothing has changed.

// There are three ways to use the render function:
// 1) with a static singleton iew (e.g. a preloader that has no unique attributes)
//    - only requires a view function (no risk of render inconsistency)
// 2) with a static non-singleton view (e.g. a list item with unique attributes that never change)
//    - requires a view function and a uniqueKey (low risk of render inconsistency if key is unique)
// 3) a dynamic non-singleton view (e.g. a list item that dynamically updates its attrs)
//    - requires a view function, a uniqueKey, and an attrs hash to see if updates should occur
//    - this requires the most configuration and is thus the most risky to use
//    - it should only be used on large subtrees (n > 500) and only if performance
//    - needs optimization.

var _ = require('underscore');

class Draw {

  constructor () {
    this.cache = {};
  }

  render (view, uniqueKey, attrs) {
    // A unique key specified by the user (use cases 2 & 3) or the stringified view (use case 1).
    var viewKey = uniqueKey ? view.toString() + uniqueKey : view.toString();

    // If the view does not exist, or it does exist but the attributes have changed,
    // instantiate it with attrs or null.
    if (!this.cache[viewKey] || (attrs && !_.isEqual(attrs, this.cache[viewKey].attrs))) {

      var renderedView = view;
      if (typeof view === 'function') renderedView = view();
      else if (typeof view === 'object') {
        // if the view is an array, assume it's a n-level deep array of mithril
        // views that need to be rendered
        function arrayLoop (arr) {
          for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'object') arrayLoop(arr[i]);
            else arr[i]();
          }
        }
        arrayLoop(renderedView);
      }

      this.cache[viewKey] = {view: renderedView, attrs: attrs || null};
    }
    return this.cache[viewKey].view;
  }
}

export default new Draw();