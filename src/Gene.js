function Gene(cArgs) {
    this.id = cArgs.id;
    this.species = cArgs.species;
    this.name = cArgs.name;
}

Gene.prototype.getName = function() {
    return this.name;
};