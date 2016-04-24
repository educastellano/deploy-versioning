# deploy-versioning

Deploy your code keeping older versions.

# Install

    npm install deploy-versioning --save-dev

# Usage

Just add a script in your package.json:

    {
        ...
        "scripts": {
            "deploy": "deploy-versioning dist user@host:/srv/myapp"
        }
        ...
    }

And run it:
    
    npm run deploy
    
It will create the following file structure in your production server: 

    /srv/myapp
    +-- 1.0.0
    +-- 1.0.1
    +-- 1.0.2
    +-- latest -> /srv/myapp/1.0.2

## Changelog

* 1.0.0 
    * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)

