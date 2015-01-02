//TODO: Documentation
function CytoscapeManipulator(myCy) {
    this.cy = myCy;
}

CytoscapeManipulator.prototype.add = function(obj) {
    var nodes = [];
    var target = {data: {id: obj.target.id, name: obj.target.name}};
    nodes.push(target);
    var source = Retriever.fetchProteinGroup(obj.source)[0];
    source = {data: {id: source.id, name: source.name}};
    nodes.push(source);
    var edgeId = obj.source + "_" + obj.type + "_" + obj.target.id;
    var edge = {data: {id: edgeId, source: source.data.id, target: target.data.id}};
    this.cy.add({nodes:nodes, edges:[edge]});
};