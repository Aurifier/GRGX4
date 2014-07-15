describe("A gene", function() {
    it("should have an id and species when provided", function() {
        var id = 153;
        var species = "urksbar";

        var imaGene = new Gene({id: id, species: species});

        expect(imaGene.id).toEqual(id);
        expect(imaGene.species).toEqual(species);
    });
});