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

    it("should add a simple interaction to the network", function() {
        var geneId = 54;
        var geneName = 'Display This Text';
        var mockGene = {id: geneId, name: geneName};
        var species = 'homoplantus';
        var pGid = 213;
        var type = 2;
        var mockInteraction = {id: 'nobodycares', source: pGid, species: species, target: mockGene, type: type};
        var protId = 789;
        var protName = 'foofarchu';
        var mockProtein = {id: protId, name: protName, species: species};
        var expectedId = pGid + "_" + type + "_" + geneId;
        spyOn(Retriever, 'fetchProteinGroup').and.returnValue([mockProtein]);
        spyOn(mockCy, 'add');

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockInteraction);

        expect(mockCy.add).toHaveBeenCalledWith(
        {
            nodes:[
                {data: {id: protId, name: protName}},
                {data: {id: geneId, name: geneName}}
            ],
            edges:[
                {data: {id: expectedId, source: protId, target: geneId}}
            ]
        });
    });

    //TODO: Test adding a parent node after the child has been added (use ele.move)
});
