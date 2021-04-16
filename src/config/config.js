
var cloudBaseUrl;
if (process.env.NODE_ENV == 'development') {
    cloudBaseUrl = 'http://192.168.123.90:3000'
} else {
    cloudBaseUrl = 'http://192.168.123.90:8008'
}
var url = ''+cloudBaseUrl+'/cloud-config.js'
document.write('<scr'+'ipt type="text/javascript"  src="'+cloudBaseUrl+'/cloud-config.js"></sc'+'ript>');


