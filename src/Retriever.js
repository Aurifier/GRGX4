//TODO: We could use some examples of what promises resolve to
/**
 * Gets AJAX data from the REST API.
 * @class Retriever
 * @param {Array} speciesList The list of species the Retriever will search.
 * @constructor
 */
function Retriever(speciesList) {
    this.speciesList = speciesList;
}

/**
 * Gets the list of species this Retriever will search.
 * @method getSpeciesList
 * @return {Array}
 */
Retriever.prototype.getSpeciesList = function() {
    return this.speciesList;
};

/**
 * Fetches genes by name from the REST API.
 * @method searchGeneByName
 * @param name The name to search
 * @return {Promise} Resolves with a list of genes with name `name`
 */
Retriever.prototype.searchGeneByName = function(name) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var exactPromises = [];

        for(var i=0; i < self.speciesList.length; i++) {
            var species = self.speciesList[i];
            exactPromises.push(new Promise(exactGenePromise(species, name)));
        }

        Promise.all(exactPromises).then(function(matches) {
            resolve(processExactMatches(matches));
        });
    });
};

/**
 * Fetches proteins by name from the REST API.
 * @method searchProteinByName
 * @param name The name to search
 * @return {Promise} Resolves with a list of proteins with name `name`
 */
Retriever.prototype.searchProteinByName = function(name) {
    var self = this;
    return new Promise(function(resolve, reject) {
        var exactPromises = [];

        for(var i=0; i < self.speciesList.length; i++) {
            var species = self.speciesList[i];
            exactPromises.push(new Promise(exactProteinPromise(species, name)));
        }

        Promise.all(exactPromises).then(function(matches) {
            resolve(processExactMatches(matches));
        });
    });
};

/**
 * Retrieves a fully populated Gene object.
 * @method fetchGene
 * @static
 * @param gArgs
 * @param {Integer} gArgs.id
 * @param {String} gArgs.species
 * @return {Promise} Resolves with a Gene object.
 */
Retriever.fetchGene = function(gArgs) {
    return new Promise(function(resolve) {
        var url = '/' + gArgs.species + '/gene/' + gArgs.id + '/json';
        $.getJSON(url).then(function(JSON) {
            var gene = new Gene({id: gArgs.id, species: gArgs.species, name: JSON.name});
            resolve(gene);
        });
    });
};

/**
 * Fetches interactions with `term` from the REST API.
 * @beta
 * @method fetchInteractions
 * @param {Gene|Protein} term
 * @return {Promise}
 */
Retriever.prototype.fetchInteractions = function(term) {
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

/**
 * Fetches a list of Proteins in the protein group with the given species and id.
 * @method fetchProteinGroup
 * @static
 * @param args
 * @param {Integer} args.id
 * @param {String} args.species
 * @return {Promise}
 */
Retriever.fetchProteinGroup = function(args) {
    return new Promise(function(resolve, reject) {
        resolve([{id: 53, name: "shake", species: "ssndf kfj kjf"}]);
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
