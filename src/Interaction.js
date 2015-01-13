module.exports = Interaction;
/**
 * Represents an interaction between a ProteinGroup and either another
 * ProteinGroup or a Gene. Generally speaking, you should use
 * `Interaction.fetchInteraction` to ensure a fully-populated Interaction.
 * @class Interaction
 * @param {Object} interactionLike An Interaction-like object.
 * @param {Integer} interactionLike.id The Interaction's id.
 * @param {String} interactionLike.species The Interaction's species.
 * @param {Integer} [interactionLike.type] The Interaction's type.
 * @param {Integer} [interactionLike.source] The Interaction's source.
 * A ProteinGroup id.
 * @param {Gene|ProteinGroup|Object} [interactionLike.target] The Interaction's
 * target.
 * @param {Integer} interactionLike.target.id The id of the target.
 * @param {String} [interactionLike.target.type] The type of the target. Must be
 * one of "gene" or "proteinGroup" if the target is a plain object.
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

    /**
     * The type of the Interaction.
     * @property type
     * @type {Integer}
     */
    this.type = interactionLike.type;

    /**
     * The source (ProteinGroup id) of the interaction
     * @property source
     * @type {Integer}
     */
    this.source = interactionLike.source;

    /**
     * The target of the interaction.
     * @property target
     * @type {Gene|ProteinGroup|Object}
     */
    this.target = interactionLike.target;
}