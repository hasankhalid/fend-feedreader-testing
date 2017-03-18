/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('url are defined', function(){
            allFeeds.forEach(function(feedItem){
                expect(feedItem.url).toBeDefined();
                expect(feedItem.url.length).not.toBe(0);
            });
        }); //The foreach loop iterates over each individual feed and then makes sure the url is defined and is not of length 0

        it('Names are defined', function(){
            allFeeds.forEach(function(feedItem){
                expect(feedItem.name).toBeDefined();
                expect(feedItem.name.length).not.toBe(0);
            });
        }); //The foreach loop iterates over each individual feed and then makes sure the name is defined and is not of length 0
    });

    describe('The menu', function() {

        var menuIsHIdden = $('body').hasClass('menu-hidden');

        it('Menu is Hidden', function() {
            expect(menuIsHIdden).toEqual(true);
        });

        it('Menu toggles visibility', function() {
            $('.menu-icon-link').trigger( "click" );
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').trigger( "click" );
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        }); //The trigger event opens and closes the menu, we run the expectation with the trigger event to check if the menu is opening up and closing
     });

     describe('Initial Entries', function() {

    /* TODO: Write a new test suite named "Initial Entries" */

          beforeEach(function(done){
              loadFeed(0, function(){
                  done();
              });
          }); //The beforeEach function is used for asynchronous call

          it('We have a minimum of 1 entry', function(){
              expect($('.feed .entry').length).toBeGreaterThan(0);
          }); //Check that we have a minimum of 1 entry. This is accomplished by checking the class entry's length
      });

      describe('New Feed Selection', function() {
          var feed1; //Declare two different feeds
          var feed2;

          beforeEach(function(done){
              loadFeed(1, function(){
                  feed1 = $('.feed').html();
                  done(); //LoadFeed1
              });
          });

          it('Feed 1 and Feed 2 are: ', function(){
              loadFeed(0, function(){
                  feed2 = $('.feed').html();
                  done(); //Load the feed 2
              });
          });

          it('different', function(){
               expect(feed2).not.toEqual(feed1);//Run the expectation that feed1 and feed2 are not equal
          });

         /*   The nano degree reviewer suggested this instead of the above two its.
         it('feed 1 and feed 2 are different after loading a feed', function(done) {
  loadFeed(0, function() { // load feed a second time
    feed2 = $('.feed').html(); // after loadFeed is done, populate feed2
    expect(feed2).not.toEqual(feed1); // expect it changed
    done(); // tell jasmine it can finish the test
  });
}); */
      });
}());
