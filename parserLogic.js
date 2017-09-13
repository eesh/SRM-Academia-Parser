const htmlparser = require("htmlparser");
const select = require('soupselect').select


function parseAttendance (htmlBody, callback) {
  var handler = new htmlparser.DefaultHandler(function(err, dom) {
      if (err) {
          console.log("Error: " + err);
          callback({error:err})
      } else {

          var tables = select(dom, 'table');
          var studentDetails = parseStudentTable(tables[2]);
          var attendanceDetails = parseAttendaceDetails(tables[3]);
          var marks = parseMarks(tables[4]);

          callback({ 'studentDetails' : studentDetails, 'attendanceDetails' : attendanceDetails, 'marks': marks });
      }
  });
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(htmlBody);
}


function parseStudentTable(studentTable) {
  var studentData = select(studentTable, 'td');
  var studentDetails = {};
  studentDetails.registrationNumber = studentData[1].children[0].children[0].raw;
  studentDetails.fullName = studentData[3].children[0].children[0].raw;
  studentDetails.program = studentData[5].children[0].children[0].raw;
  studentDetails.department = studentData[7].children[0].children[0].raw;
  studentDetails.semester = studentData[9].children[0].children[0].raw;
  studentDetails.batch = studentData[12].children[0].children[0].raw;
  return studentDetails;
}

function parseAttendaceDetails(attendanceTable) {
  var attendanceDetails = [];
  var attendanceData = select(attendanceTable, 'td');
  var base = 9;
  var maxSize = attendanceData.length;

  for(var idx = base; idx < maxSize; idx+=9) {
    var courseDetails = {};
    courseDetails.code = attendanceData[idx].children[0].raw;
    courseDetails.title = attendanceData[idx+1].children[0].raw;
    courseDetails.category = attendanceData[idx+2].children[0].raw;
    courseDetails.faculty = attendanceData[idx+3].children[0].raw;
    courseDetails.slot = attendanceData[idx+4].children[0].raw;
    courseDetails.room = attendanceData[idx+5].children[0].raw;
    courseDetails.conductedHours = attendanceData[idx+6].children[0].raw;
    courseDetails.absentHours = attendanceData[idx+7].children[0].raw;
    courseDetails.percentage = attendanceData[idx+8].children[0].raw;
    if(courseDetails.percentage[0] == 'f') {
      courseDetails.percentage = attendanceData[idx+8].children[0].children[0].children[0].raw;
    }
    attendanceDetails.push(courseDetails);
  }
  return attendanceDetails;
}

function parseMarks(marksTable) {
  var marksDetails = [];
  var marksData = select(marksTable, 'td');
  var base = 3;
  var maxSize = marksData.length;

  for (var idx = base; idx < maxSize; idx+=4) {
    var courseMarks = {};
    courseMarks.code = marksData[idx].children[0].raw;
    courseMarks.type = marksData[idx+1].children[0].raw;
    if(courseMarks.type[0] == 'P') {
      courseMarks.ct1 = '0.00';
    } else {
      var testData = select(marksData[idx+2].children[0], 'font');
      if(testData.length == 0 || testData == undefined) {
        courseMarks.ct1 = '0.00';
      } else {
        courseMarks.ct1 = testData[0].children[2].raw;
      }
    }
    marksDetails.push(courseMarks);
  }
  return marksDetails;
}

module.exports.parseAttendance = parseAttendance
