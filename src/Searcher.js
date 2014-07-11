function Searcher(speciesList) {
    this.speciesList = speciesList;
}

Searcher.prototype.getSpeciesList = function() {
    return this.speciesList;
};

Searcher.prototype.find = function(term) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var pExactGenes = [];
        var pExactProteins = [];

        for(var i = 0; i < self.speciesList.length; i++) {
            var species = self.speciesList[i];

            pExactGenes.push(new Promise(function(gResolve, gReject) {
                var url = '/' + species + '/gene/json';
                $.getJSON(url, {name: term}).then( function(geneJSON) {
                    if(geneJSON.length == 1) {
                        var exactGene = {species: species, id:geneJSON[0].id, name: geneJSON[0].name};
                        gResolve(exactGene);
                    } else {
                        gResolve(null);
                    }
                });
            }));

            pExactProteins.push(new Promise(function(pResolve, pReject) {
                var url = '/' + species + '/protein/json';
                $.getJSON(url, {name: term}).then( function(protJSON) {
                    if(protJSON.length == 1) {
                        var exactProt = {species: species, id: protJSON[0].id, name: protJSON[0].name};
                        pResolve(exactProt);
                    } else {
                        pResolve(null);
                    }
                });
            }));
        }

        function isNotNull(val) {
           return(val != null);
        }

        function nonEmptyResult(result) {
            return(result.results != null && result.results.length > 0);
        }

        Promise.all(pExactGenes.concat(pExactProteins)).then(function(matches) {
            var results = [];
            var specToIdx = {};
            for(var i = 0; i < self.speciesList.length; i++) {
                results[i] = {species:null};
                results[i].species = self.speciesList[i];
                specToIdx[self.speciesList[i]] = i;
            }
            matches.filter(isNotNull).forEach(function(match) {
                var idx = specToIdx[match.species];
                results[idx].results = results[idx].results || [];
                results[idx].results.push({id: match.id, name: match.name});
            });
            resolve(results.filter(nonEmptyResult));
        });
    });
};
