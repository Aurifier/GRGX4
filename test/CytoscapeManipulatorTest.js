var Retriever = require('../src/Retriever');
var CytoscapeManipulator = require('../src/CytoscapeManipulator');

describe("The CytoscapeManipulator", function() {
    var mockCy;

    beforeEach(function() {
        mockCy = {
            add: function() {}
        };
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

        expect(mockCy.add.calls.mostRecent().args[0].nodes.length).toEqual(2);
        expect(mockCy.add.calls.mostRecent().args[0].nodes).toContain({data: {id: protId, name: protName}});
        expect(mockCy.add.calls.mostRecent().args[0].nodes).toContain({data: {id: geneId, name: geneName}});
        expect(mockCy.add.calls.mostRecent().args[0].edges.length).toEqual(1);
        expect(mockCy.add.calls.mostRecent().args[0].edges).toContain({data: {id: expectedId, source: protId, target: geneId}});
    });

    it("should add another simple interaction to the network", function() {
        var geneId = 4;
        var geneName = 'Display This Other Text';
        var mockGene = {id: geneId, name: geneName};
        var species = 'mario';
        var pGid = 5;
        var type = 9;
        var mockInteraction = {id: 'nobodycares', source: pGid, species: species, target: mockGene, type: type};
        var protId = 2423;
        var protName = 'lugia';
        var mockProtein = {id: protId, name: protName, species: species};
        var expectedId = pGid + "_" + type + "_" + geneId;
        spyOn(Retriever, 'fetchProteinGroup').and.returnValue([mockProtein]);
        spyOn(mockCy, 'add');

        var manipulator = new CytoscapeManipulator(mockCy);
        manipulator.add(mockInteraction);

        expect(mockCy.add.calls.mostRecent().args[0].nodes.length).toEqual(2);
        expect(mockCy.add.calls.mostRecent().args[0].nodes).toContain({data: {id: protId, name: protName}});
        expect(mockCy.add.calls.mostRecent().args[0].nodes).toContain({data: {id: geneId, name: geneName}});
        expect(mockCy.add.calls.mostRecent().args[0].edges.length).toEqual(1);
        expect(mockCy.add.calls.mostRecent().args[0].edges).toContain({data: {id: expectedId, source: protId, target: geneId}});
    });
    //TODO: Test adding a parent node after the child has been added (use ele.move)
});
