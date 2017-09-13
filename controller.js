const baseAcademiaURL = 'https://academia.srmuniv.ac.in/liveViewHeader.do'
const request = require('request')
const parserLogic = require('./parserLogic')


var getAttendanceInfo = function (req, res) {
  var clientAuthToken = req.query.clientAuthToken;
  if(!clientAuthToken) {
    res.json({ success : false, message: 'Academia token missing' })
    return
  }

  var formDetails = {
    'sharedBy': 'srm_university',
    'appLinkName': 'academia-academic-services',
    'viewLinkName': 'My_Attendance',
    'urlParams': '{}',
    'isPageLoad': 'true'
  }
  var cookie = request.cookie('clientauthtoken='+clientAuthToken)
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Origin': 'https://academia.srmuniv.ac.in',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; Nexus 6P Build/NPG05F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36',
    'Cookie': cookie
  };
  var options = {
    url: baseAcademiaURL,
    method: 'POST',
    form: formDetails,
    headers: headers
  };
  request(options, (err, httpResponse, body) => {
    parserLogic.parseAttendance(body, function(result) {
      res.json(result)
    })
  })
}

var getCourseInfo = function (req, res) {
  var clientAuthToken = req.query.clientAuthToken;
  console.log(clientAuthToken);
  if(!clientAuthToken) {
    res.json({ success : false, message: 'Academia token missing' });
    return;
  }

  var formDetails = {
    'sharedBy': 'srm_university',
    'appLinkName': 'academia-academic-services',
    'viewLinkName': 'My_Time_Table_2017_18_ODD',
    'urlParams': '{}',
    'isPageLoad': 'true'
  }
  var cookie = request.cookie('clientauthtoken='+clientAuthToken)
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Origin': 'https://academia.srmuniv.ac.in',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; Nexus 6P Build/NPG05F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36',
    'Cookie': cookie
  };
  var options = {
    url: baseAcademiaURL,
    method: 'POST',
    form: formDetails,
    headers: headers
  };
  request(options, (err, httpResponse, body) => {
    parserLogic.parseAttendance(body, function(result) {
      res.json(result)
    })
  })
}

var getCourseInfo = function (req, res) {
  var clientAuthToken = req.query.clientAuthToken;
  console.log(clientAuthToken);
  if(!clientAuthToken) {
    res.json({ success : false, message: 'Academia token missing' });
    return;
  }

  var formDetails = {
    'sharedBy': 'srm_university',
    'appLinkName': 'academia-academic-services',
    'viewLinkName': 'My_Time_Table_2017_18_ODD',
    'urlParams': '{}',
    'isPageLoad': 'true'
  }
  var cookie = request.cookie('clientauthtoken='+clientAuthToken)
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Origin': 'https://academia.srmuniv.ac.in',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 7.1.2; Nexus 6P Build/NPG05F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36',
    'Cookie': cookie
  };
  var options = {
    url: baseAcademiaURL,
    method: 'POST',
    form: formDetails,
    headers: headers
  };
  request(options, (err, httpResponse, body) => {
    parserLogic.parseAttendance(body, function(result) {
      res.json(result)
    })
  })
}

module.exports.getAttendanceInfo = getAttendanceInfo
module.exports.getCourseInfo = getCourseInfo
