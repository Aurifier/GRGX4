//TODO: Documentation
function CytoscapeManipulator(myCy) {
    this.cy = myCy;
}

CytoscapeManipulator.prototype.add = function(obj) {
    this.cy.add({
            nodes:[
                {data: {id: 789, name: 'foofarchu'}},
                {data: {id: 54, name: 'Display This Text'}}
            ],
            edges:[
                {data: {id: '213_2_54', source: 789, target: 54}}
            ]
        });
};