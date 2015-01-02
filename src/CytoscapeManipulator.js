/**
 * Wraps a Cytoscape.js object to easily add Interaction objects.
 * @class CytoscapeManipulator
 * @param myCy The Cytoscape.js object to wrap.
 * @constructor
 */
function CytoscapeManipulator(myCy) {
    this.cy = myCy;
}

/**
 * Add an interaction to Cytoscape.js
 * @method add
 * @param {Interaction} interaction The Interaction object to add to Cytoscape.js
 */
CytoscapeManipulator.prototype.add = function(interaction) {
    var nodes = [];
    var target = {data: {id: interaction.target.id, name: interaction.target.name}};
    nodes.push(target);
    var source = Retriever.fetchProteinGroup(interaction.source)[0];
    source = {data: {id: source.id, name: source.name}};
    nodes.push(source);
    var edgeId = interaction.source + "_" + interaction.type + "_" + interaction.target.id;
    var edge = {data: {id: edgeId, source: source.data.id, target: target.data.id}};
    this.cy.add({nodes:nodes, edges:[edge]});
};
