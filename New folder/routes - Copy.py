from flask import render_template, url_for, flash, request, Blueprint
from jam.timesheet.forms import TimesheetForm

timesheet = Blueprint('timesheet', __name__)


# forms for timesheet-enter clockin-out time for weekly total hours
@timesheet.route('/timesheet/create', methods=['POST', 'GET'])
def create_timesheet():
    pass

    form = TimesheetForm()

    D4ys = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun']

    if request.method == 'POST':
        pass
        # still need request.form for iteration through form data
        result = request.form
        We3klyTimesheetRes = TimesheetForm(obj=request.form)
        return render_template(
            "created_timesheet.html",
            Days=D4ys,
            WeeklyResult=result,
            WeeklyTimesheetRes=We3klyTimesheetRes,
            title='Timesheet Totals'
        )
    return render_template(
        'create_timesheet.html',
        Days=D4ys,
        form=form,
        title='Timesheet Form'
    )
