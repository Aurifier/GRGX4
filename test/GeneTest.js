describe("A gene", function() {
    it("should have an id, name, and species when provided", function() {
        var id = 54;
        var species = "urknawa";
        var name = "UnPudu823";

        var imaGene = new Gene({id: id, species: species, name: name});

        expect(imaGene.id).toEqual(id);
        expect(imaGene.name).toEqual(name);
        expect(imaGene.species).toEqual(species);
    });

    xit("should fetch its name when not provided", function() {
        var id = 45;
        var species = "kooloolimpah";
        var expectedName = "KllAch45";
        jasmine.Ajax.stubRequest('/'+species+'/gene/'+id+'/json').andReturn({
            "status": 200,
            "contentType": "application/json",
            "responseText": '[{"id":' + id + ',"name":"' + expectedName + '","type":"","ranges":"","transcript":""}]'
        });

        var imaGene = new Gene({id: id, species: species});
        console.log(imaGene.ready);

        expect(imaGene.name).toEqual(expectedName);
    });
});