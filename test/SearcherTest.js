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

    xdescribe("finding interactions with genes", function() {
        it("should find one interaction with one targeting protein", function(done) {
            var geneId = 235;
            done();

        });
    });
});
