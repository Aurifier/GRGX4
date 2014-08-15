/**
 * Represents a Gene.
 *
 * In most cases, you should use `Gene.getGene` to instantiate a new
 * Gene, unless you already have all of the properties and just want to collect
 * them into an object.
 * @class Gene
 * @param cArgs
 * @param {Integer} cArgs.id
 * @param {String} cArgs.species
 * @param {String} [cArgs.name]
 * @constructor
 */
function Gene(cArgs) {
    /**
     * The id of the Gene.
     * @property id
     * @type Integer
     */
    this.id = cArgs.id;

    /**
     * The species of the Gene.
     * @property species
     * @type String
     */
    this.species = cArgs.species;

    /**
     * The name of the Gene.
     * @property name
     * @type String
     */
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
