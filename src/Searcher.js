function Searcher(speciesList) {
    this.speciesList = speciesList;
}

Searcher.prototype.getSpeciesList = function() {
    return this.speciesList;
};

//TODO: Refactor to parallelize JSON queries
Searcher.prototype.find = function(term) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var url = '/' + self.speciesList + '/gene/json';
        $.getJSON(url, {name: term}).then( function(geneJSON) {
            var resolveList = [];
            if(geneJSON.length == 1) {
                var exactGene = {id:geneJSON[0].id, name: geneJSON[0].name};
                resolveList.push(exactGene);
            }

            url = '/' + self.speciesList + '/protein/json';
            $.getJSON(url, {name: term}).then( function(protJSON) {
                if(protJSON.length == 1) {
                    var exactProt = {id: protJSON[0].id, name: protJSON[0].name};
                    resolveList.push(exactProt);
                }
                resolve(resolveList);
            });
        });
    });
};
