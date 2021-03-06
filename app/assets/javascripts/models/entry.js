Aggredile.Models.Entry = Backbone.Model.extend({
  url: 'api/entries',

  visit: function () {
    this.set({entry_visit_id: 'local'});
    var visit = new Aggredile.Models.EntryVisit({
      entry_id: this.id
    });
    visit.save();
  }
});
