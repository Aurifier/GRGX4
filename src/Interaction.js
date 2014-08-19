/**
 * Represents an interaction between a ProteinGroup and either another
 * ProteinGroup or a Gene.
 * @class Interaction
 * @param {Object} interactionLike An Interaction-like object
 * @param {Integer} interactionLike.id The Interaction's id
 * @param {String} interactionLike.species The Interaction's species
 * @constructor
 */
function Interaction(interactionLike) {
    /**
     * The id of the Interaction.
     * @property id
     * @type {Integer}
     */
    this.id = interactionLike.id;
    /**
     * The species of the Interaction.
     * @property species
     * @type {String}
     */
    this.species = interactionLike.species;
}