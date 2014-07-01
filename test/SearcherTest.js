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

    describe("finding one or more exact matches", function() {

        it("should promise a list of one exact match", function(done) {
            var exactGeneName = "fooGene";
            var id = 1234;
            var expectedGene = {id: id, name: exactGeneName};
            jasmine.Ajax.stubRequest('/maize/gene/json?name='+exactGeneName).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + id + ',"name":"' + exactGeneName + '","type":"","ranges":"","transcript":""}]'
            });
            jasmine.Ajax.stubRequest('/maize/protein/json?name='+exactGeneName).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[]'
            });
            var searcher = new Searcher(['maize']);

            var resultPromise = searcher.find(exactGeneName);

            resultPromise.then(
                function(response) {
                    expect(response.length).toEqual(1);
                    expect(response[0]).toEqual(expectedGene);
                    done();
                }
            );
        });

        it("should promise a list of multiple exact matches in one species", function(done) {
            var species = "ground_beef"
            var exactGeneName = "MeatMYB734";
            var exactProteinName = exactGeneName;
            var g_id = 5412;
            var p_id = 428;
            var expectedGene = {id: g_id, name: exactGeneName};
            var expectedProtein = {id: p_id, name: exactProteinName};
            jasmine.Ajax.stubRequest('/'+species+'/gene/json?name='+exactGeneName).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + g_id + ',"name":"' + exactGeneName + '","type":"","ranges":"","transcript":""}]'
            });
            jasmine.Ajax.stubRequest('/'+species+'/protein/json?name='+exactProteinName).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + p_id + ',"name":"' + exactProteinName + '","type":"","ranges":"","transcript":""}]'
            });
            var searcher = new Searcher([species]);

            var resultPromise = searcher.find(exactGeneName);

            resultPromise.then(
                function(response) {
                    expect(response.length).toEqual(2);
                    expect(response).toContain(expectedGene);
                    expect(response).toContain(expectedProtein);
                    done();
                }
            );
        });
    });
});
