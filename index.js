#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var parseUrl = require('parse-url');
var execSync = require('child_process').execSync;
var yesno = require('yesno');

var source = argv._[0];
var target = argv._[1];
var urlObj = parseUrl(target);
var symlink = urlObj.pathname+'/latest'
var version = process.env.npm_package_version;

var endpoint = urlObj.user+'@'+urlObj.resource
var path = urlObj.pathname+'/'+version

var stringifyUrl = function(obj) {
    var user = obj.user ? obj.user+'@' : '';
    return user + obj.resource + ':' + obj.pathname
}  

var deploy = function (replace) {
    if (replace) {
        execSync('ssh '+endpoint+' \'rm -R '+path+'\'')    
    }
    execSync('scp -r '+source+' '+stringifyUrl(urlObj)+'/'+version)
    execSync('ssh '+endpoint+' \'rm '+symlink+' || true\'')
    execSync('ssh '+endpoint+' \'ln -s '+path+' '+symlink+'\'')    
}

// main()
//
var existsBf = execSync('ssh '+endpoint+' \'[ ! -e '+path+' ]; echo $?\'')
var exists = parseInt(existsBf.toString().replace('\n', ''))
if (exists) {
    yesno.ask('This version ('+version+') is already deployed. Replace? [Y/n]', true, function (ok) {
        if (ok) {
            deploy(true)
        } 
        process.exit(0)
    })
}
else {
    deploy()
}
