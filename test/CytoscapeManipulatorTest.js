describe("The CytoscapeManipulator", function() {
    var mockCy;

    beforeEach(function() {
        mockCy = {
            add: function() {}
        };
    });

    it("should add a single Gene object to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 654;
        var name = "barfunkel";
        var spec = "spec";
        var mockGene = {id: geneId, name: name, species: spec};

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockGene);

        expect(mockCy.add).toHaveBeenCalledWith({group: 'nodes', data: {id: geneId, name: name}});
    });

    it("should add a second Gene object to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 18;
        var name = 'Rumpelstiltskin';
        var spec = 'nobody cares';
        var mockGene = {id: geneId, name: name, species: spec};

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockGene);

        expect(mockCy.add).toHaveBeenCalledWith({group: 'nodes', data: {id: geneId, name: name}});
    })
});
