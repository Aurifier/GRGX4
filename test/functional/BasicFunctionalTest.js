var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
describe("The GRGX", function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    it("should have the correct title", function(done) {
        var expectedTitle = 'GRGX';
        webdriverio
        .remote(options)
        .init()
        .url('localhost:9001')
        .getTitle()
            .then(function(title) {
                expect(title).toEqual(expectedTitle);
                done();
            })
        .end();
    });
});