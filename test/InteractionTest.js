//TODO: tests for SearchHandler and Retriever (at least) need to use Interactions
//(or mocks) instead of ad-hoc objects
describe("An Interaction object", function() {
    it("should minimally have a species and id", function() {
        var species = "human_animal";
        var id = 684;

        var inter = new Interaction({species: species, id: id});

        expect(inter.species).toEqual(species);
        expect(inter.id).toEqual(id);
    });
});