describe("A SearchHandler object", function() {
    var mockRetriever;
    beforeEach(function() {
        mockRetriever = {
            fetchGene: function(){},
            fetchInteractions: function(){}
        };
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    //TODO: Uh, I think we've lost track of species info.
    it("should find interactions with a gene if its exact name is given", function(done) {
        //target info
        var exactName = 'geneE';
        var geneId = 651;
        //interaction info
        var iType = 2;
        //source info
        var pGroupId = 96;
        //mock data
        spyOn(mockRetriever, "fetchGene").and.returnValue(
            new Promise(function(res, rej) {
                res([{id: geneId, name: exactName, species: 'foopies'}]);
            })
        );
        spyOn(mockRetriever, "fetchInteractions").and.returnValue(
            new Promise(function(res, rej) {
                res([{source: pGroupId, target: {type: "gene", id: geneId}, type: iType}]);
            })
        );
        var searcher = new SearchHandler(mockRetriever);

        var resPromise = searcher.search(exactName);

        resPromise.then(function(result) {
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(
                {source: pGroupId, target: {type: "gene", id: geneId}, type: iType}
            );
            done();
        });
    });

    it("should find interactions with another gene if its exact name is given", function(done) {
        //target info
        var exactName = 'MoTHR4';
        var geneId = 667;
        //interaction info
        var iType = 5;
        //source info
        var pGroupId = 53;
        //mock data
        spyOn(mockRetriever, "fetchGene").and.returnValue(
            new Promise(function(res, rej) {
                res([{id: geneId, name: exactName, species: 'unknown'}]);
            })
        );
        spyOn(mockRetriever, "fetchInteractions").and.returnValue(
            new Promise(function(res, rej) {
                res([{source: pGroupId, target: {type: "gene", id: geneId}, type: iType}]);
            })
        );
        //TODO: More stuff needs mocked I'm sure
        var searcher = new SearchHandler(mockRetriever);

        var resPromise = searcher.search(exactName);

        resPromise.then(function(result) {
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(
                {source: pGroupId, target: {type: "gene", id: geneId}, type: iType}
            );
            done();
        });
    });
});
