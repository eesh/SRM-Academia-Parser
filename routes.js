var controller = require('./controller')

function init (app) {
  app.get('/courseInfo', controller.getCourseInfo)
  app.get('/attendanceInfo', controller.getAttendanceInfo)
}

module.exports = init
