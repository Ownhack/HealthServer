var express = require('express');
var router = express.Router();

let http = require('http');

// разрешаем междоменные запросы
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
});

router.post('/step', function (req, res) {
    res.send();
    console.log('********');
    console.log('steps');
    console.log(req.body['start']);
    console.log(req.body['value']);
});

router.post('/pulse', function (req, res) {
    res.send();
    console.log('********');
    console.log('pulse');
    console.log(req.body['startTime']);
    console.log(req.body['endTime']);
    console.log(req.body['bpm']);
    console.log(req.body['average_bpm']);
    console.log(req.body['max_bpm']);
    console.log(req.body['min_bpm']);

    if(req.body['average_bpm'] > 60) {
        console.log('May be you need a doctor?');

        var post_options = {
            host: '195.19.40.201',
            port: '31168',
            path: '/set_health_alert',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        var post_request = http.request(post_options, function(res) {
            console.log('health alert is set');
        });

        post_request.on('error', function(e) {
            console.log('can\'t set health alert: ' + e.message);
        });

        post_request.write(JSON.stringify({}));
        post_request.end();
    }

});

router.post('/activity', function (req, res) {
    res.send();
    console.log('********');
    console.log('activity');
    console.log(req.body['start']);
    console.log(req.body['activity']);
    console.log(req.body['duration']);
    console.log(req.body['segments']);
});

router.post('/nutrition', function (req, res) {
    res.send();
    console.log('********');
    console.log('nutrition');
    console.log(req.body['start']);
    console.log(req.body['mealType']);
    console.log(req.body['calcium']);
    console.log(req.body['calories']);
    console.log(req.body['carbsTotal']);
    console.log(req.body['cholesterol']);
    console.log(req.body['dietaryFiber']);
    console.log(req.body['fatMonounsaturated']);
    console.log(req.body['fatPolyunsaturated']);
    console.log(req.body['fatSaturated']);
    console.log(req.body['fatTotal']);
    console.log(req.body['fatTrans']);
    console.log(req.body['iron']);
    console.log(req.body['potassium']);
    console.log(req.body['protein']);
    console.log(req.body['sodium']);
    console.log(req.body['sugar']);
    console.log(req.body['vitamin_c']);
});

// неверный url запроса
router.get('/*', (request, response) => {
    let body = "";
    request.on('data', (data) => {
        body += data;
    }).on('end', () => {
        response.end("INVALID_REQUEST");
    });
});

router.post('/*', (request, response) => {
    let body = "";
    request.on('data', (data) => {
        body += data;
    }).on('end', () => {
        response.end("INVALID_REQUEST");
    });
});

module.exports = router;
