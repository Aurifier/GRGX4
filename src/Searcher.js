function Searcher(speciesList) {
    this.speciesList = speciesList;
}

Searcher.prototype.getSpeciesList = function() {
    return this.speciesList;
};

Searcher.prototype.find = function(term) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var exactGenePromise = new Promise(function(gResolve, gReject) {
            var url = '/' + self.speciesList + '/gene/json';
            $.getJSON(url, {name: term}).then( function(geneJSON) {
                if(geneJSON.length == 1) {
                    var exactGene = {id:geneJSON[0].id, name: geneJSON[0].name};
                    gResolve(exactGene);
                } else {
                    gResolve(null);
                }
            });
        });

        var exactProteinPromise = new Promise(function(pResolve, pReject) {
            var url = '/' + self.speciesList + '/protein/json';
            $.getJSON(url, {name: term}).then( function(protJSON) {
                if(protJSON.length == 1) {
                    var exactProt = {id: protJSON[0].id, name: protJSON[0].name};
                    pResolve(exactProt);
                } else {
                    pResolve(null);
                }
            });
        });

        function isNotNull(val) {
           return(val != null);
        }

        Promise.all([exactGenePromise, exactProteinPromise]).then(function(matches) {
            resolve(matches.filter(isNotNull));
        });
    });
};
