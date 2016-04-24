#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var parseUrl = require('parse-url');
var execSync = require('child_process').execSync;

var source = argv._[0];
var target = argv._[1];
var urlObj = parseUrl(target);
var symlink = urlObj.pathname+'/latest'
var version = process.env.npm_package_version;

var stringifyUrl = function(obj) {
    var user = obj.user ? obj.user+'@' : '';
    return user + obj.resource + ':' + obj.pathname
}  

execSync('scp -r '+source+' '+stringifyUrl(urlObj)+'/'+version)
execSync('ssh '+urlObj.user+'@'+urlObj.resource+' \'rm '+symlink+' || true\'')
execSync('ssh '+urlObj.user+'@'+urlObj.resource+' \'ln -s '+urlObj.pathname+'/'+version+' '+symlink+'\'')
