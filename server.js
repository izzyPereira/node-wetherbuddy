/////////////////////////////////////////
/////WETHER BUDDY - web-app de meteorologia
/////////////////////////////////////////
// antes de ligar o servidor, acrescentar as chaves necessárias!

const express = require('express'); // Express - routing  
const hbs = require('hbs'); // Handlebars - templating

const app = express();

app.get ('/',
    (req, res) =>
    {
        res.render('main.hbs',
        {
            title: "O que procuras?",
        });
    }
);


app.get ('/weather',
    (req, res) => {

        //////////////////////

        var address = req.query.texto;
        var encodedAddress = encodeURIComponent(address);
        var temp;
        var apparentTemp;

        var GoogleAPI = ""; //preencher
        var DarkSkyAPI = ""; //preencher
    
        request (
            {url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GoogleAPI}`
            , json: true
        }, (error, response, body) => {
            var lat = body.results[0].geometry.location.lat;
            var lng = body.results[0].geometry.location.lng;
    
            request (
                {url: `https://api.darksky.net/forecast/${DarkSkyAPI}/${lat},${lng}?units=si`,
                json: true
            }, (DSerror, DSresponse, DSbody) => {
                var temp = DSbody.currently.temperature;
                var apparentTemp = DSbody.currently.apparentTemperature;
                console.log(`Temperatura: ${temp}; Temperatura aparente: ${apparentTemp}`);

                //////////////////////
                res.render('results.hbs',
                {
                    title: "Aqui tens!",
                    tempCurrent: temp, 
                    tempFeel: apparentTemp
                });
            }
            )
        });
    }
);

////////////////////////////////////////////////////
app.listen(2600); // porta a usar
////////////////////////////////////////////////////

///////////////////////
//Weather Request

const request = require('request');