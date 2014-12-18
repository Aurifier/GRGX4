function CytoscapeManipulator(myCy) {
    this.cy = myCy;
}

CytoscapeManipulator.prototype.add = function(obj) {
    this.cy.add({group: 'nodes', data: {id: 654, name: 'barfunkel'}});
};