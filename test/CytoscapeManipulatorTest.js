describe("The CytoscapeManipulator", function() {
    var mockCy;

    beforeEach(function() {
        mockCy = {
            add: function() {}
        };
    });

    //Doesn't need to do this.
    xit("should add a single Gene object to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 654;
        var name = "barfunkel";
        var mockGene = {id: geneId, name: name, species: spec};

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockGene);

        expect(mockCy.add).toHaveBeenCalledWith({group: 'nodes', data: {id: geneId, name: name}});
    });

    //Doesn't need to do this.
    xit("should add a second Gene object to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 18;
        var name = 'Rumpelstiltskin';
        var mockGene = {id: geneId, name: name, species: spec};

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockGene);

        expect(mockCy.add).toHaveBeenCalledWith({group: 'nodes', data: {id: geneId, name: name}});
    });

    xit("should add a simple interaction to the network", function() {});
});
