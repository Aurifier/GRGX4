function CytoscapeManipulator(myCy) {
    this.cy = myCy;
}

CytoscapeManipulator.prototype.add = function(obj) {
    this.cy.add({group: 'nodes', data: {id: obj.id, name: obj.name}});
};