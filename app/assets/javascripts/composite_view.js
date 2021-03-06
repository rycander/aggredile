Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    if (this.notDuplicateSubview(selector, subview)){
      this.subviews(selector).push(subview);
      this.attachSubview(selector, subview.render());
    }
  },

  prependSubview: function (selector, subview) {
    if (this.notDuplicateSubview(selector, subview)){
      this.subviews(selector).unshift(subview);
      this.attachSubview(selector, subview.render(), true);
    }
  },  

  attachSubview: function (selector, subview, prepend) {
    if (prepend) {
      this.$(selector).prepend(subview.$el);
    } else {
      this.$(selector).append(subview.$el);
    }
    subview.delegateEvents();
  },

  notDuplicateSubview: function (selector, subview) {
    var id  = subview.model.get('id');
    for (var i = 0; this.subviews()[selector] && i < this.subviews()[selector].length; ++i) {
      if (this.subviews()[selector][i].model.get('id') === id) {
        return false;
      }
    }
    return true;
  },

  attachSubviews: function () {

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});