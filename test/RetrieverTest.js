describe("A Retriever object", function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should have a list of species", function() {
        var species = ['maize', 'cow', 'generic_meat']
        var retriever = new Retriever(species);

        expect(retriever.getSpeciesList()).toEqual(species);
    });

    it("should be able to fetch a promise to a gene, given a species and id", function(done) {
        var id = 45;
        var species = "kooloolimpah";
        var expectedName = "KllAch45";
        jasmine.Ajax.stubRequest('/'+species+'/gene/'+id+'/json').andReturn({
            "status": 200,
            "contentType": "application/json",
            "responseText": '{"id":' + id + ',"name":"' + expectedName + '","type":"","ranges":"","transcript":""}'
        });

        var illBeAGene = Retriever.fetchGene({id: id, species: species});

        illBeAGene.then(function(imaGene) {
            expect(imaGene.id).toEqual(id);
            expect(imaGene.species).toEqual(species);
            expect(imaGene.name).toEqual(expectedName);
            done();
        });
    });

    it("should be able to fetch a promise for a list of a single protein, given a species and protein group id", function(done) {
        var id = 987;
        var species = "ssndfkfjkjf";
        var proteinName = "shake";
        var proteinId = 53;
        var expectedProtein = {id: proteinId, name: proteinName, species: species};
        var url = '/'+species+'/proteingroup/'+id+'/json';
        jasmine.Ajax.stubRequest(url).andReturn({
            "status": 200,
            "contentType": "application/json",
            "responseText": '[{"id":' + proteinId + ',"name":"' + proteinName + '"}]'
        });

        var illBeAProteinList = Retriever.fetchProteinGroup({id: id, species: species});

        illBeAProteinList.then(function(imaList) {
            expect(imaList.length).toEqual(1);
            expect(imaList[0]).toEqual(expectedProtein);
            done();
        })
    });

    it("should be able to fetch a promise for a list of multiple proteins, given a species and protein group id", function(done) {
        var id = 89;
        var species = "kaiu";
        var protein1Name = "bar";
        var protein1Id = 5;
        var protein2Name = "pills";
        var protein2Id = 13;
        var expectedProtein1 = {id: protein1Id, name: protein1Name, species: species};
        var expectedProtein2 = {id: protein2Id, name: protein2Name, species: species};
        var url = '/'+species+'/proteingroup/'+id+'/json';
        jasmine.Ajax.stubRequest(url).andReturn({
            "status": 200,
            "contentType": "application/json",
            "responseText": '[{"id":'+protein1Id+',"name":"'+protein1Name+'"},'
                           + '{"id":'+protein2Id+',"name":"'+protein2Name+'"}]'
        });

        var illBeAProteinList = Retriever.fetchProteinGroup({id: id, species: species});

        illBeAProteinList.then(function(imaList) {
            expect(imaList.length).toEqual(2);
            expect(imaList).toContain(expectedProtein1);
            expect(imaList).toContain(expectedProtein2);
            done();
        });
    });

    //TODO: Wildcard matches too
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
            var retriever = new Retriever(['maize']);

            var resultPromise = retriever.searchGeneByName(exactGeneName);

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
            var retriever = new Retriever(species);

            var resultPromise = retriever.searchGeneByName(exactTerm);

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
            var retriever = new Retriever([species]);

            var resultPromise = retriever.searchProteinByName(exactProteinName);

            resultPromise.then(
                function(response) {
                    expect(response.length).toEqual(1);
                    expect(response[0]).toEqual(expectedProtein);
                    done();
                }
            );
        });
    });

    //TODO: Use mock Interactions instead of weird ad-hoc objects
    //TODO: Interaction finding when passed a Protein instead of a gene
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
            var retriever = new Retriever([species]);

            var interactionsPromise = retriever.fetchInteractions(mockGene);

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
            var retriever = new Retriever([species]);

            var interactionsPromise = retriever.fetchInteractions(mockGene);

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
            var retriever = new Retriever([species]);

            var interactionsPromise = retriever.fetchInteractions(mockGene);

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
