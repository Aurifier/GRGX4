describe("A Searcher object", function() {
    var cy, mockRetriever;
    beforeEach(function() {
        jasmine.Ajax.install();
        cy = {
            add: function(){}
        };
        spyOn(cy, "add");

        mockRetriever = {
            findGene: function(){},
            findInteractions: function(){}
        };
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("should find a gene and its neighbors if its exact name is given", function() {
        //target info
        var exactName = 'geneE';
        var geneId = 651;
        //interaction info
        var iType = 2;
        var iReg = 'Repression';
        var iConf = true;
        //source info
        var pGroupId = 96;
        var pId = 15;
        var pCorrGeneId = 33;
        var pName = "lamp";
        //mock data
        spyOn(mockRetriever, "findGene").and.returnValue(
            [{id: geneId, name: exactName, species: 'foopies'}]
        );
        spyOn(mockRetriever, "findInteractions").and.returnValue(
            [{source: pGroupId, target: geneId, type: iType}]
        );
        //TODO: More stuff needs mocked I'm sure
        var searcher = new Searcher(mockRetriever, cy);

        searcher.search(exactName);

        var edgeId = [pCorrGeneId, iType, geneId].join('_');
        var eleList = [
            {group: "nodes", data: {id: geneId, name: exactName}},
            {group: "nodes", data: {id: pCorrGeneId, name: pName}},
            {
                group: "edges",
                data: {
                    id: edgeId,
                    source: pCorrGeneId,
                    target: geneId,
                    regulation: iReg,
                    isConfirmed: iConf
                }
            }
        ];
        expect(cy.add).toHaveBeenCalledWith(eleList);
    });
});