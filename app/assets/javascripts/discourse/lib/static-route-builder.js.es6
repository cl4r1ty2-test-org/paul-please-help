const configs = {
  "faq": "faq_url",
  "tos": "tos_url",
  "privacy": "privacy_policy_url"
};

export default (page) => {
  return Discourse.Route.extend({
    renderTemplate() {
      this.render("static");
    },

    beforeModel(transition) {
      const configKey = configs[page];
      if (configKey && Discourse.SiteSettings[configKey].length > 0) {
        transition.abort();
        Discourse.URL.redirectTo(Discourse.SiteSettings[configKey]);
      }
    },

    activate() {
      this._super();
      // Scroll to an element if exists
      Discourse.URL.scrollToId(document.location.hash);
    },

    model() {
      return Discourse.StaticPage.find(page);
    },

    setupController(controller, model) {
      this.controllerFor("static").set("model", model);
    },

    actions: {
      didTransition() {
        this.controllerFor("application").set("showFooter", true);
        return true;
      }
    }
  });
};
