module.exports = SearchHandler;
/**
 * Handles searching logic.
 * @class SearchHandler
 * @param {Retriever} retriever The Retriever this SearchHandler will use to fetch data.
 * @constructor
 */
function SearchHandler(retriever) {
    /**
     * The Retriever this SearchHandler will use to fetch data.
     * @property retriever
     * @type {Retriever}
     */
    this.retriever = retriever;
}

/**
 * The main SearchHandler method. Given a search term, it will return a promise
 * with a list of interactions which match the term.
 * @method search
 * @param {String} term The term to search for.
 * @return {Promise} Resolves with a list of matching interactions.
 */
SearchHandler.prototype.search = function(term) {
    var self = this;
    return new Promise(function(res, rej) {
        var goldenRetriever = self.retriever;
        //First, check if we have a gene that matches term exactly.
        var genePromise = goldenRetriever.fetchGene(term);
        genePromise.then(
            //If we do, get matching interactions
            function(gene) {
                var interactionsPromise = goldenRetriever.fetchInteractions(gene);
                res(interactionsPromise);
            }
        );
    });
};