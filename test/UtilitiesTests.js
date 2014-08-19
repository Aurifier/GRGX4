describe("getGene", function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    //TODO: Move this test into GeneTest.js, rename getGene to fetchGene
    it("should return a promise to a gene, given a species and id", function(done) {
        var id = 45;
        var species = "kooloolimpah";
        var expectedName = "KllAch45";
        jasmine.Ajax.stubRequest('/'+species+'/gene/'+id+'/json').andReturn({
            "status": 200,
            "contentType": "application/json",
            "responseText": '{"id":' + id + ',"name":"' + expectedName + '","type":"","ranges":"","transcript":""}'
        });

        var illBeAGene = Gene.getGene({id: id, species: species});

        illBeAGene.then(function(imaGene) {
            expect(imaGene.id).toEqual(id);
            expect(imaGene.species).toEqual(species);
            expect(imaGene.name).toEqual(expectedName);
            done();
        });
    });
});
