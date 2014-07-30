function Searcher(speciesList) {
    this.speciesList = speciesList;
}

Searcher.prototype.getSpeciesList = function() {
    return this.speciesList;
};

Searcher.prototype.findGene = function(term) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var exactPromises = [];

        for(var i=0; i < self.speciesList.length; i++) {
            var species = self.speciesList[i];
            exactPromises.push(new Promise(exactGenePromise(species, term)));
        }

        Promise.all(exactPromises).then(function(matches) {
            resolve(processExactMatches(matches));
        });
    });
};

Searcher.prototype.findProtein = function(term) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var exactPromises = [];

        for(var i=0; i < self.speciesList.length; i++) {
            var species = self.speciesList[i];
            exactPromises.push(new Promise(exactProteinPromise(species, term)));
        }

        Promise.all(exactPromises).then(function(matches) {
            resolve(processExactMatches(matches));
        });
    });
};

Searcher.prototype.findInteractions = function(term) {
    return new Promise(function(resolve, reject) {
        resolve([{source: 473, target: 235}]);
    });
};

function processExactMatches(matches) {
    return(matches.filter(isNotNull));
}

function exactGenePromise(species, term) {
    return(function(res, rej) {
        var url = '/' + species + '/gene/json';
        $.getJSON(url, {name: term}).then(exactCallback(res, rej, species));
    });
}

function exactProteinPromise(species, term) {
    return(function(res, rej) {
        var url = '/' + species + '/protein/json';
        $.getJSON(url, {name: term}).then(exactCallback(res, rej, species));
    });
}

function exactCallback(eRes, eRej, species) {
    return(function(exactJSON) {
        if(exactJSON.length == 1) {
            var exactObj = {species: species, id:exactJSON[0].id, name: exactJSON[0].name};
            eRes(exactObj);
        } else {
            eRes(null);
        }
    });
}

function isNotNull(val) {
   return(val !== null);
}
