'use strict';
''
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/superheroes');

// mongoose.connection.on('connected', function(){
//     acl = new nodeAcl(new nodeAcl.mongodbBackend(mongoose.connection.db));
//     acl.allow([
//         {
//             roles: 'admin',
//             allows: [
//                 {resources: ['users', 'powers', 'heroes', 'auth'], permissions: '*'}
//             ]
//         },
//         {
//             roles: 'standard',
//             allows: [
//                 {resources: ['heroes', 'powers'], permissions: 'get'},
//                 {resources: ['auth'], permissions: ['get', 'post']}
//             ]
//         },
//     ]);

//     acl.addUserRoles('5a70fb8d35ba1f12e06a880f', 'standard', function(error){
//         if (error)
//             console.log('Cannot assing role');
//         console.log('Role assigned');
//     });
// });

// module.exports = acl;
