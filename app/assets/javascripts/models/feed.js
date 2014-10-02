Aggredile.Models.Feed = Backbone.Model.extend({
  urlRoot: 'api/feeds',
  url: function () {
    if (this.id) return this.urlRoot + '/' + this.id;
    return this.urlRoot;
  },

  entries: function () {
    this._entries = this._entries ||
      new Aggredile.Collections.AllEntries([], { feed: this });
    return this._entries;
  },

  parse: function (payload) {
    if (payload.entries) {
      this.entries().set(payload.entries, { parse: true });
      delete payload.entries;
    }

    return payload;
  },

  initialize: function (options) {
    this.id = options.id;
  }
});
