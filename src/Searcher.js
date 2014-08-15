function Searcher(retriever, cy) {
    this.retriever = retriever;
    this.cy = cy;
}

Searcher.prototype.search = function(term) {
    this.cy.add([
        {
            group: "nodes",
            data: {
                id: 651,
                name: 'geneE'
            }
        },
        {
            group: "nodes",
            data: {
                id: 33,
                name: "lamp"
            }
        },
        {
            group: "edges",
            data: {
                id: "33_2_651",
                source: 33,
                target: 651,
                regulation: "Repression",
                isConfirmed: true
            }
        }
    ]);
};