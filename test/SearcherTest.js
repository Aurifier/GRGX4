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

        expect(searcher.getSpeciesList()).toEqual(['maize', 'cow', 'generic_meat']);
    });

    xdescribe("finding one or more exact matches", function() {
        it("should return a list of one exact match", function() {
            var exactGeneName = "fooGene";
            var id = 1234;
            jasmine.Ajax.stubRequest('/maize/gene/json?name='+exactGeneName).andReturn({
                "status": 200,
                "contentType": "application/json",
                "responseText": '[{"id":' + id + ',"name":"' + exactGeneName + '","type":"","ranges":"","transcript":""}]'
            });
            var searcher = new Searcher(['maize']);

            var geneList = searcher.find(exactGeneName);

            var expectedGene = {id: 1234, name: exactGeneName};

            expect(geneList.length).toEqual(1);
            expect(geneList[0]).toEqual(expectedGene);

        });
    });

    xit("should be able to use mock AJAX", function() {
        var doneFn = jasmine.createSpy("success");

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(args) {
            if(this.readyState == this.DONE) {
                doneFn(this.responseText);
            }
        };

        xhr.open("GET", "/some/cool/url");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().response({
            "status": 200,
            "contentType": "text/plain",
            "responseText": 'awesome response'
        });

        expect(doneFn).toHaveBeenCalledWith('awesome response');
    });
});