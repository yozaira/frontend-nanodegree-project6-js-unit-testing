/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against this application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /**
    * This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds: ', function() {
        /* This suite tests that the allFeeds variable has been
         * defined and that it is not empty.
         */
        it('array should be defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * This test loops through each feed in the allFeeds
         * object and ensures it has a URL defined  and that
         * the URL is not empty.
         */
        it('url should be defined and not empty', function() {
          var feedUrl;
          for(var index =0; index < allFeeds.length; index++) {
            feedUrl = allFeeds[index].url;
            expect(feedUrl).toBeDefined();
            expect(feedUrl =="").toBe(false);
            expect(feedUrl).toContain('http://');
            expect(feedUrl).toEqual(allFeeds[index].url);
          }

        });

        /**
        * this test loops through each feed in the allFeeds
        * object and ensures it has a name defined  and that
        * the name is not empty.
        */
        it('name should be defined and not empty', function() {
          var feedName;
          for(var i =0; i < allFeeds.length; i++) {
            feedName = allFeeds[i].name;
            expect(feedName).not.toBe('');
            expect(feedName).toBeDefined();
            expect(feedName).not.toBeNull();
           }
        });

    });


    /* this test suite ensures the correct functionality of the menu.*/
    describe("The menu", function() {

      /* make sure the menu element is hidden by default */
      var bodyElem = $("body");

      it("should be hidden by default", function() {
        expect( bodyElem.hasClass("menu-hidden") ).toBe(true);
      });

      /**
      * test that ensures the menu changes visibility when the
      * menu icon is clicked.
      */
      // trigger click event before each function call to make sure visibility toggles.
      it('changes visibility  when the menue icon clicked', function() {
        // menu displays when clicked
        $('.menu-icon-link').trigger('click');
        expect(bodyElem.hasClass('menu-hidden')).toBe(false);
        // menu hides when clicked again.
        $('.menu-icon-link').trigger('click');
        expect(bodyElem.hasClass('menu-hidden')).toBe(true);
      });

    });


    /**
    * This test ensures that when the loadFeed function is called
    * and completes its work, there is at least a single .entry
    * element within the .feed container.
    */
    describe("Initial Entries", function() {
      /**
      * The done() function is always passed to the beforeEach(),
      * afterEach(), and it() test methods as an argument.
      */
      beforeEach(function (done) {
        loadFeed(0, done);
      });

      it("should have at least a single entry element", function (done){
        expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        done();
      });

    });


    /**
     * test that the content actually changes when a new feed is
     * loaded by the loadFeed function.
    */
    describe("New Feed Selection", function() {

      beforeEach(function (done){
        /**
        * Call loadFeed() for initial entries.
        * loadFeed() function will call done() when it's done.
        * The done() call is made within the callback function to
        * instruct jasmine that beforeEach() has terminated and it
        * is now safe to continue with the it() function.
        * https://github.com/jasmine/jasmine/issues/526
        */
        // empty current feeds before testing each load
        $('.feed').empty();
        currentFeed = $('.feed').find('h2').text();
        loadFeed(1, done);

      });

      it("should change content when a new feed is loaded", function(done) {
        expect($('.feed').find('h2').text()).not.toBe(currentFeed);
        done();
      });

      // reset feeds after test
      afterEach(function(done) {
        loadFeed(0, done);
      });

    });


}());
