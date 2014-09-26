Aggredile.Collections.AllEntries = Backbone.Collection.extend ({
  model: Aggredile.Models.Entry,

  url: "api/entries",

  initialize: function () {

  }

});
Aggredile.Collections.entries = new Aggredile.Collections.AllEntries();
