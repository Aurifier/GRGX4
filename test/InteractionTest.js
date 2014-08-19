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

    xit("should probably throw an error if the species is missing");
    xit("should probably throw an error if the id is missing");

    it("should also be able to have a type", function() {
        var species = "ladksnlkj";
        var id = 351;
        var type = 4;

        var inter = new Interaction({species: species, id: id, type: type});

        expect(inter.type).toEqual(type);
    });

    it("should also be able to have a source", function() {
        var species = "radnomstrng";
        var id = 9382;
        var source = 8;

        var inter = new Interaction({species: species, id: id, source: source});

        expect(inter.source).toEqual(source);
    });

    it("should also be able to have a target", function() {
        var species = "mrglglglgl";
        var id = 56;
        var target = {id: 89, type: "gene"};

        var inter = new Interaction({species: species, id:id, target: target});

        expect(inter.target).toEqual(target);
    });

    //TODO: What does "reject" mean in this case? Fail to initialize? Throw an error?
    //Additionally, this will be split into several tests. Good luck with test naming.
    xit("should reject plain Object targets whose type property is not 'gene' or 'protein'");

    xit("should also take an actual Gene object as a target");
    xit("should also take an actual Protein object as a target");
});