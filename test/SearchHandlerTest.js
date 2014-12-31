describe("A SearchHandler object", function() {
    var mockRetriever;
    beforeEach(function() {
        mockRetriever = {
            fetchGene: function(){},
            fetchInteractions: function(){}
        };
    });

    it("should find interactions with a gene if its exact name is given", function(done) {
        var species = "lkad";
        //target info
        var exactName = 'geneE';
        var geneId = 651;
        var mockGene = {id: geneId, name: exactName, species: 'foopies'};
        //source info
        var pGroupId = 96;
        //interaction info
        var iId = 34;
        var iType = 2;
        var mockInteraction = {
            id: iId,
            type: iType,
            species: species,
            source: pGroupId,
            target: mockGene
        };
        //mock data
        spyOn(mockRetriever, "fetchGene").and.returnValue(
            new Promise(function(res, rej) {
                res([mockGene]);
            })
        );
        spyOn(mockRetriever, "fetchInteractions").and.returnValue(
            new Promise(function(res, rej) {
                res([mockInteraction]);
            })
        );
        var searcher = new SearchHandler(mockRetriever);

        var resPromise = searcher.search(exactName);

        resPromise.then(function(result) {
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(mockInteraction);
            done();
        });
    });

    it("should find interactions with another gene if its exact name is given", function(done) {
        var species = "naklu";
        //target info
        var exactName = 'MoTHR4';
        var geneId = 667;
        var mockGene = {id: geneId, name: exactName, species: 'unknown'};
        //source info
        var pGroupId = 53;
        //interaction info
        var iId = 3;
        var iType = 5;
        var mockInteraction = {
            id: iId,
            type: iType,
            species: species,
            source: pGroupId,
            target: mockGene
        }
        //mock data
        spyOn(mockRetriever, "fetchGene").and.returnValue(
            new Promise(function(res, rej) {
                res([mockGene]);
            })
        );
        spyOn(mockRetriever, "fetchInteractions").and.returnValue(
            new Promise(function(res, rej) {
                res([mockInteraction]);
            })
        );
        var searcher = new SearchHandler(mockRetriever);

        var resPromise = searcher.search(exactName);

        resPromise.then(function(result) {
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(mockInteraction);
            done();
        });
    });

    xit("should not find interactions if a gene is not found for the search term");
});
