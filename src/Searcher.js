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

        var exactCallback = function(eRes, eRej, species) {
            return(function(exactJSON) {
                if(exactJSON.length == 1) {
                    var exactObj = {species: species, id:exactJSON[0].id, name: exactJSON[0].name};
                    eRes(exactObj);
                } else {
                    eRes(null);
                }
            });
        };

        //TODO: There is even more room for refactoring between these two functions.
        var exactGenePromise = function(species) {
            return(function(res, rej) {
                var url = '/' + species + '/gene/json';
                $.getJSON(url, {name: term}).then(exactCallback(res, rej, species));
            });
        };

        var exactProteinPromise = function(species) {
            return(function(res, rej) {
                var url = '/' + species + '/protein/json';
                $.getJSON(url, {name: term}).then(exactCallback(res, rej, species));
            });
        };

        for(var i = 0; i < self.speciesList.length; i++) {
            var species = self.speciesList[i];

            pExactGenes.push(new Promise(exactGenePromise(species)));
            pExactProteins.push(new Promise(exactProteinPromise(species)));
        }

        function isNotNull(val) {
           return(val !== null);
        }

        function nonEmptyResult(result) {
            return(Boolean(result.results));
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
