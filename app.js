const express = require('express');
const app = express();

const httpntlm = require('httpntlm');   // for NTLM sign-in
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(compression());
app.use(bodyParser.json());

// my own statics
app.use(express.static('./public'));
app.use(express.static('./view'));

app.get('/', function(req, res)
{
    res.sendFile('index.html');
});

app.get('/JSONreport', function(req, res, next)
{
    // i read user information from query string. but it's up to yourself how you like access APIs
    let config = {
        url: "http://your-shpweb/_api/web/lists/getByTitle('departeman')/items?$top=10000",
        username: req.query.user,   // username: '[active directory user]',
        password: req.query.pass,   // password: '[password]',
        domain: req.query.domain,   // domain: '[domain name (active directory)',
        workstation: '',
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose;"
        }
    };

    httpntlm.get(config, function success(error, response)
    {
        console.log(`remote ip address: ${req.ip}`);    // i used this for my own purposes and for creating a simple log system (for security reasons)
        res.status(200).send(response); // this is the actual response (i prefer client parse response as json)
    });
});

app.listen(80, function()
{
    console.log(`server is working`);
});