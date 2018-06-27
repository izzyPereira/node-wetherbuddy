/////////////////////////////////////////
/////WETHER BUDDY - web-app de meteorologia
/////////////////////////////////////////
// antes de ligar o servidor, acrescentar as chaves necessárias!

const express = require('express'); // Express - routing  
const hbs = require('hbs'); // Handlebars - templating
const request = require('request'); //Request

const app = express();

app.use(express.static(__dirname + '/public'));

app.get ('/',
    (req, res) =>
    {
        res.render('main1.hbs',{
            title: "Que local quer procurar?"
        });
    }
);

app.get ('/weather',
    (req, res) => {
        var address = req.query.texto;
        var encodedAddress = encodeURIComponent(address);

        /*var GoogleAPI = ""; //preencher
        var DarkSkyAPI = ""; //preencher*/

        var GoogleAPI = "AIzaSyBOkN6hmcd3tIaEWSKhjVya8ue2ly9K9DA";
        var DarkSkyAPI = "5ccdf811c08bb36ab440a87a4fe6c4d4";
    
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
                var nowTemp = DSbody.currently.temperature;
                var maxTemp = DSbody.daily.data[0].temperatureMax;
                var minTemp = DSbody.daily.data[0].temperatureMin;
                var apparentTemp = DSbody.currently.apparentTemperature; 
                var humid = DSbody.currently.humidity;
                var UV = DSbody.currently.uvIndex;

                //////////////////////
                res.render('results1.hbs',
                {
                    title: "Procurar outro local?",
                    tempCurrent: nowTemp, 
                    tempFeel: apparentTemp,
                    tempMax: maxTemp,
                    tempMin: minTemp,
                    humidity: humid,
                    uvLevel: UV,
                    clientAddress: address
                });
            }
            );
        });
    }
);

////////////////////////////////////////////////////
app.listen(2600); // porta a usar
////////////////////////////////////////////////////