describe("A SearchHandler object", function() {
    var mockRetriever;
    beforeEach(function() {
        mockRetriever = {
            findGene: function(){},
            findInteractions: function(){}
        };
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should find interactions with a gene if its exact name is given", function(done) {
        //target info
        var exactName = 'geneE';
        var geneId = 651;
        //interaction info
        var iType = 2;
        //source info
        var pGroupId = 96;
        //mock data
        spyOn(mockRetriever, "findGene").and.returnValue(
            [{id: geneId, name: exactName, species: 'foopies'}]
        );
        spyOn(mockRetriever, "findInteractions").and.returnValue(
            [{source: pGroupId, target: geneId, type: iType}]
        );
        //TODO: More stuff needs mocked I'm sure
        var searcher = new SearchHandler(mockRetriever);

        var resPromise = searcher.search(exactName);

        resPromise.then(function(result) {
            expect(result.length).toBe(1);
            expect(result[0]).toEqual(
                {source: pGroupId, target: {type: "gene", id: geneId}}
            );
            done();
        });
    });
});
