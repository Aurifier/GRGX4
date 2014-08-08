function Gene(cArgs) {
    this.id = cArgs.id;
    this.species = cArgs.species;
    this.name = cArgs.name;
}

Gene.getGene = function(gArgs) {
    return new Promise(function(resolve) {
        var url = '/' + gArgs.species + '/gene/' + gArgs.id + '/json';
        $.getJSON(url).then(function(JSON) {
            var gene = new Gene({id: gArgs.id, species: gArgs.species, name: JSON.name});
            resolve(gene);
        });
    });
}
