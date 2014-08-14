function Retriever(speciesList) {
    this.speciesList = speciesList;
}

Retriever.prototype.getSpeciesList = function() {
    return this.speciesList;
};

Retriever.prototype.findGene = function(term) {
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

Retriever.prototype.findProtein = function(term) {
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

Retriever.prototype.findInteractions = function(term) {
    return new Promise(function(resolve, reject) {
        var url = '/'+term.species+'/gene/'+term.id+'/proteingene/json';
        $.getJSON(url).then(function(interactions) {
            var returnInteractions = [];
            for(var i = 0; i < interactions.length; i++) {
                returnInteractions.push({source: interactions[i].proteinGroup, target: interactions[i].gene});
            }
            resolve(returnInteractions);
        });
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