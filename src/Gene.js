/**
 * Represents a Gene.
 *
 * In most cases, you should use `Gene.fetchGene` to instantiate a new
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

