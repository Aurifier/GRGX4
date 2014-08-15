/**
 * Represents a Gene.
 * @class Gene
 * @param cArgs
 * @param {Integer} cArgs.id
 * @param {String} cArgs.species
 * @param {String} [cArgs.name]
 * @constructor
 */
function Gene(cArgs) {
    this.id = cArgs.id;
    this.species = cArgs.species;
    this.name = cArgs.name;
}

/**
 * Retrieves a fully populated Gene object.
 * @method getGene
 * @static
 * @param gArgs
 * @param {Integer} gArgs.id
 * @param {String} gArgs.species
 * @return {Promise} Resolves with a Gene object.
 */
Gene.getGene = function(gArgs) {
    return new Promise(function(resolve) {
        var url = '/' + gArgs.species + '/gene/' + gArgs.id + '/json';
        $.getJSON(url).then(function(JSON) {
            var gene = new Gene({id: gArgs.id, species: gArgs.species, name: JSON.name});
            resolve(gene);
        });
    });
};
