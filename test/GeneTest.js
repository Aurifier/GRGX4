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
});
