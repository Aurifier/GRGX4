describe("The CytoscapeManipulator", function() {
    var mockCy;

    beforeEach(function() {
        mockCy = {
            add: function() {}
        };
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    //Doesn't need to do this.
    xit("should add a single Gene object to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 654;
        var name = "barfunkel";
        var mockGene = {id: geneId, name: name};

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockGene);

        expect(mockCy.add).toHaveBeenCalledWith({group: 'nodes', data: {id: geneId, name: name}});
    });

    //Doesn't need to do this.
    xit("should add a second Gene object to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 18;
        var name = 'Rumpelstiltskin';
        var mockGene = {id: geneId, name: name};

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockGene);

        expect(mockCy.add).toHaveBeenCalledWith({group: 'nodes', data: {id: geneId, name: name}});
    });

    xit("should add a simple interaction to the network", function() {
        spyOn(mockCy, 'add');
        var geneId = 54;
        var geneName = 'Display This Text';
        var mockGene = {id: geneId, name: geneName};
        var species = 'homoplantus';
        var pGid = 213;
        var type = 2;
        var mockInteraction = {id: 'nobodycares', source: pGid, species: species, target: mockGene, type: type};
        var expectedId = pGid + "_" + type + "+" + geneId;

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockInteraction);

        //TODO:
        expect(mockCy.add).toHaveBeenCalledWith({nodes:[], edges:[]});
    });
});
