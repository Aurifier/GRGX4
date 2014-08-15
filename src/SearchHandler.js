function SearchHandler(retriever) {
    this.retriever = retriever;
}

SearchHandler.prototype.search = function(term) {
    return new Promise(function(res, rej) {
        res([{source: 96, target: {type: 'gene', id: 651}}]);
    });
};