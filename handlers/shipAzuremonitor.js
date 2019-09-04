exports.process = function(config) {
  console.log('shipAzureSentinel');
  return new Promise(function(resolve, reject) {
    var https = require('https');
    var utf8 = require('utf8');
    var crypto = require('crypto');
    var nowdate = (Date.now()).toUTCString();
    var nowheader = str.concat("x-ms-date:",nowdate);


    let shared_key = "CwEYi8+YINUlMsP7zgWmi15qFYWq/q09EdSL8mp2lMmL/0DqRNvbE4GEE+FueBwu/X5TyN0aenmklnS4LopTvg=="
    let buff = new Buffer(shared_key, 'base64');


    let decoded_key = buff.toString('ascii');
    var hmac = crypto.createHmac ('sha256', decoded_key);


    var keyDatalength = config.http.keyData.length || 'data';
    var hashstring = str.concat("POST","\n", keyDatalength, "\n","application/json","\n",nowheader,"\n","/api/logs");
    var bytestohash = utf8.encode(hashstring);	  
    var hashedbytes = hmac.write(bytestohash);
    var encodedhash = btoa(hashedbytes);
    var signature = str.concat("SharedKey {", "d80e588d-c155-47d7-b423-e870a2a8d699", "}", "{", encodedhash, "}")
    var options = {
	    hostname: 'https://d80e588d-c155-47d7-b423-e870a2a8d699.ods.opinsights.azure.com/api/logs?api-version-=20116-04-01',
	    port: 443,
	    path: '
	    method: 'POST',
            headers = {
	            'content-type': 'application/json',
	            'Authorization': signature,
	            'Log-Type': 'CascadiaLogs',
	            'x-ms-date': nowdate
	    }
	        };

    let shared_key = CwEYi8+YINUlMsP7zgWmi15qFYWq/q09EdSL8mp2lMmL/0DqRNvbE4GEE+FueBwu/X5TyN0aenmklnS4LopTvg==
    let buff = new Buffer(shared_key, 'base64');


    let decoded_key = buff.toString('ascii');
	  

    var url = require('url');
    var options = url.parse(config.http.url);
    options.method = 'POST';
    var req = http.request(options, function(res) {
      console.log('Received HTTP response status code: ' + res.statusCode);
      resolve(config);
    });
    req.on('error', function(err) {
      reject('An error occurred when making an HTTP request: ' + err);
    });
    var keyData = config.http.keyData || 'data';
    req.write(config[keyData]);
    req.end();
  });
};
