describe("Searching for things with a live cytoscape object", function(){
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    xit("should add a simple one-to-one relationship with a gene", function(done) {
        //Target info
        var gId = 651;
        var geneName = 'AtWRKY53';
        //Interaction info
        var interactionType = {id: 1, regulation: "Activation", isConfirmed: true};
        //Source info
        var pId = 15;
        var pCorrGId = 153;
        var pName = 'AtWRKY42';
        //TODO: mock AJAX requests
        var cy = cytoscape();
        var searcher = new Searcher(cy);

        var donePromise = searcher.search(geneName);

        //Expect cytoscape to contain the gene, the expected protein,
        //and the relationship between them
        donePromise.then(function() {
            //check target
            var target = cy.getElementById(gId);
            expect(target.isNode()).toBe(true);
            expect(target.data('name')).toEqual(geneName);
            expect(target.degree()).toEqual(1);
            //check interaction
            var expectedInterId = [gId, interactionType.id, pCorrGId].join('_');
            var inter = cy.getElementById(expectedInterId);
            expect(inter.isEdge()).toBe(true);
            var expectedInterName = [pName, interactionType.regulation, geneName].join(' ');
            expect(inter.data('name')).toEqual(expectedInterName);
            //check source
            var source = cy.getElementById(pCorrGId);
            expect(target.isNode()).toBe(true);
            expect(target.data('name')).toEqual(pName);
            expect(target.degree()).toEqual(1);
            done();
        });
    });
});