var Hapi = require('hapi');
var recipes = require('./recipes');

var server = new Hapi.Server();
server.connection({port: 4000});

server.method('search', function(query, next) {

    var results = [];

    if (query.cuisine) {
        for(var i in recipes) {
            var recipe = recipes[i];

            if (recipe.cuisine === query.cuisine) {
                results.push(recipe);
            }
        }
    } else {
        results = recipes;
    }

    next(null, results);

}, {});

server.method('retrieve', function(params, next) {

    var recipe;
    var id = params.id;
    
    if (recipes.hasOwnProperty(id)) {
        recipe = recipes[id];
    }

    next(null, recipe);

}, {});

server.route([{
    method: 'GET',
    path: '/recipes',
    handler: function(request, reply) {
        server.methods.search(request.query, function(err, recipes){
            reply(recipes);
        });
    }
}, {
    method: 'GET',
    path: '/recipes/{id}',
    handler: function(request, reply) {
        server.methods.retrieve(request.params, function(err, recipe){
            
            if (recipe) {
                reply(recipe);
            } else {
                reply('Recipe not found').code(404);
            }
        });
    }
}]);

server.start(function(){
    console.log('Server listening at:', server.info.uri);
});