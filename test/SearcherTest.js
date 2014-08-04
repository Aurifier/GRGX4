function rejectFunc (failure) {
    if(failure instanceof Error) {
        console.log(failure.message + " at " + failure.fileName + " line " + failure.lineNumber);
    } else {
        console.log(failure);
    }
    expect(true).toBe(false);
}

describe("A search object", function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should have a list of species", function() {
        var species = ['maize', 'cow', 'generic_meat']
        var searcher = new Searcher(species);

        expect(searcher.getSpeciesList()).toEqual(species);
    });

    describe("finding one or more exact gene matches", function() {
        it("should promise a list containing one exact gene match", function(done) {
            var exactGeneName = "fooGene";
            var id = 1234;
            var species = 'maize';
            var expectedGene = {id: id, name: exactGeneName, species: species};
            var url = '/'+species+'/gene/json?name='+exactGeneName;
            jasmine.Ajax.stubRequest(url).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + id + ',"name":"' + exactGeneName + '","type":"","ranges":"","transcript":""}]'
            });
            var searcher = new Searcher(['maize']);

            var resultPromise = searcher.findGene(exactGeneName);

            resultPromise.then(
                function(response) {
                    expect(response.length).toEqual(1);
                    expect(response[0]).toEqual(expectedGene);
                    done();
                }
            );
        });

        it("should promise a list containing the exact gene matches in one of two species", function(done) {
            var species = ["schwein", "hund"];
            var exactTerm = "HuMYB4509";
            var g_id = 7812;
            var expectedGene = {id: g_id, name: exactTerm, species: species[1]};
            jasmine.Ajax.stubRequest('/'+species[0]+'/gene/json?name='+exactTerm).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[]'
            });
            jasmine.Ajax.stubRequest('/'+species[1]+'/gene/json?name='+exactTerm).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + g_id + ',"name":"' + exactTerm + '","type":"","ranges":"","transcript":""}]'
            });
            var searcher = new Searcher(species);

            var resultPromise = searcher.findGene(exactTerm);

            resultPromise.then(
                function(response) {
                    expect(response.length).toEqual(1);
                    expect(response[0]).toEqual(expectedGene);
                    done();
                }
            );
        });
    });

    describe("finding one or more exact protein matches", function() {
        it("should promise a list containing one exact protein match", function(done) {
            var exactProteinName = "footein";
            var id = 5812;
            var species = 'malaria'
            var expectedProtein = {id: id, name: exactProteinName, species: species};
            jasmine.Ajax.stubRequest('/'+species+'/protein/json?name='+exactProteinName).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + id + ',"name":"' + exactProteinName + '","type":"","ranges":"","transcript":""}]'
            });
            var searcher = new Searcher([species]);

            var resultPromise = searcher.findProtein(exactProteinName);

            resultPromise.then(
                function(response) {
                    expect(response.length).toEqual(1);
                    expect(response[0]).toEqual(expectedProtein);
                    done();
                }
            );
        });
    });

    describe("finding interactions with genes", function() {
        it("should find one interaction with targeting group", function(done) {
            var geneId = 235;
            var geneName = "blalalalala";
            var species = "dross-o-philia";
            var interactionId = 3486;
            var pGID = 473;
            var mockGene = {id: geneId, species: species, name: geneName};
            jasmine.Ajax.stubRequest('/'+species+'/gene/'+geneId+'/proteingene/json').andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":'+interactionId+',"gene":'+geneId+',"proteinGroup":'+pGID+'}]'
            });
            var searcher = new Searcher([species]);

            var interactionsPromise = searcher.findInteractions(mockGene);

            interactionsPromise.then(function(interactions) {
                expect(interactions.length).toEqual(1);
                expect(interactions[0].source).toEqual(pGID);
                expect(interactions[0].target).toEqual(geneId);
                done();
            });
        });

        it("should find another interaction with targeting group", function(done) {
            var geneId = 89;
            var geneName = "fooooo";
            var species = "carbon_based";
            var interactionId = 821;
            var pGID = 563;
            var mockGene = {id: geneId, species: species, name: geneName};
            jasmine.Ajax.stubRequest('/'+species+'/gene/'+geneId+'/proteingene/json').andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":'+interactionId+',"gene":'+geneId+',"proteinGroup":'+pGID+'}]'
            });
            var searcher = new Searcher([species]);

            var interactionsPromise = searcher.findInteractions(mockGene);

            interactionsPromise.then(function(interactions) {
                expect(interactions.length).toEqual(1);
                expect(interactions[0].source).toEqual(pGID);
                expect(interactions[0].target).toEqual(geneId);
                done();
            });
        });

        it("should find multiple interactions with targeting groups", function(done) {
            var geneId = 235;
            var geneName = "blalalalala";
            var species = "dross-o-philia";
            var interactionId = 3486;
            var interactionId2 = 8;
            var pGID = 473;
            var pGID2 = 456;
            var mockGene = {id: geneId, species: species, name: geneName};
            var mockInteraction = {source: pGID, target: geneId};
            var mockInteraction2 = {source: pGID2, target: geneId};
            jasmine.Ajax.stubRequest('/'+species+'/gene/'+geneId+'/proteingene/json').andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[' +
                    '{"id":'+interactionId+',"gene":'+geneId+',"proteinGroup":'+pGID+'},' +
                    '{"id":'+interactionId2+',"gene":'+geneId+',"proteinGroup":'+pGID2+'}' +
                ']'
            });
            var searcher = new Searcher([species]);

            var interactionsPromise = searcher.findInteractions(mockGene);

            interactionsPromise.then(function(interactions) {
                expect(interactions.length).toEqual(2);
                expect(interactions).toContain(mockInteraction);
                expect(interactions).toContain(mockInteraction2);
                done();
            });
        });

        xit("should find one interaction with multiple targeting groups", function(){});
    });
});
