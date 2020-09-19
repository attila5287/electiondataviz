from flask_wtf import (
    FlaskForm
)
from wtforms import (
     IntegerField, SelectField
)

class TimesheetForm(FlaskForm):
    pass
    hh_beg_01 = IntegerField(default='09')
    mm_beg_01 = IntegerField(default='00')
    ap_beg_01 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_01 = IntegerField(default='09')
    mm_fin_01 = IntegerField(default='00')
    ap_fin_01 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_02 = IntegerField(default='09')
    mm_beg_02 = IntegerField(default='00')
    ap_beg_02 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_02 = IntegerField(default='09')
    mm_fin_02 = IntegerField(default='00')
    ap_fin_02 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_03 = IntegerField(default='09')
    mm_beg_03 = IntegerField(default='00')
    ap_beg_03 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_03 = IntegerField(default='09')
    mm_fin_03 = IntegerField(default='00')
    ap_fin_03 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_03 = IntegerField(default='09')
    mm_beg_03 = IntegerField(default='00')
    ap_beg_03 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_03 = IntegerField(default='09')
    mm_fin_03 = IntegerField(default='00')
    ap_fin_03 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_04 = IntegerField(default='09')
    mm_beg_04 = IntegerField(default='00')
    ap_beg_04 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_04 = IntegerField(default='09')
    mm_fin_04 = IntegerField(default='00')
    ap_fin_04 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_05 = IntegerField(default='09')
    mm_beg_05 = IntegerField(default='00')
    ap_beg_05 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_05 = IntegerField(default='09')
    mm_fin_05 = IntegerField(default='00')
    ap_fin_05 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_06 = IntegerField(default='09')
    mm_beg_06 = IntegerField(default='00')
    ap_beg_06 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_06 = IntegerField(default='09')
    mm_fin_06 = IntegerField(default='00')
    ap_fin_06 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    hh_beg_07 = IntegerField(default='09')
    mm_beg_07 = IntegerField(default='00')
    ap_beg_07 = SelectField(choices=[('0', 'a'), ('12', 'p')])
    hh_fin_07 = IntegerField(default='09')
    mm_fin_07 = IntegerField(default='00')
    ap_fin_07 = SelectField(choices=[('0', 'a'), ('12', 'p')])

    def __rpr__(self):
        pass
        print('test')

    def calc_daily_totals(self):
        pass
        HourBeginWork = [
            self.hh_beg_01.data,
            self.hh_beg_02.data,
            self.hh_beg_03.data,
            self.hh_beg_04.data,
            self.hh_beg_05.data,
            self.hh_beg_06.data,
            self.hh_beg_07.data
        ]
        MinuteBeginWork = [
            self.mm_beg_01.data,
            self.mm_beg_02.data,
            self.mm_beg_03.data,
            self.mm_beg_04.data,
            self.mm_beg_05.data,
            self.mm_beg_06.data,
            self.mm_beg_07.data
        ]
        AmPmBeginWork = [
            self.ap_beg_01.data,
            self.ap_beg_02.data,
            self.ap_beg_03.data,
            self.ap_beg_04.data,
            self.ap_beg_05.data,
            self.ap_beg_06.data,
            self.ap_beg_07.data
        ]
        HourFinishWork = [
            self.hh_fin_01.data,
            self.hh_fin_02.data,
            self.hh_fin_03.data,
            self.hh_fin_04.data,
            self.hh_fin_05.data,
            self.hh_fin_06.data,
            self.hh_fin_07.data
        ]
        MinuteFinishWork = [
            self.mm_fin_01.data,
            self.mm_fin_02.data,
            self.mm_fin_03.data,
            self.mm_fin_04.data,
            self.mm_fin_05.data,
            self.mm_fin_06.data,
            self.mm_fin_07.data
        ]
        AmPmFinishWork = [
            self.ap_fin_01.data,
            self.ap_fin_02.data,
            self.ap_fin_03.data,
            self.ap_fin_04.data,
            self.ap_fin_05.data,
            self.ap_fin_06.data,
            self.ap_fin_07.data
        ]
        total_hours = [
            ((((hh_out + int(ampm_out)) * 60) + mm_out) -
             (((hh_in + int(ampm_in)) * 60) + mm_in)) * 1 / 60
            for (hh_out, ampm_out, mm_out, hh_in, ampm_in, mm_in) in zip(
                HourFinishWork,
                AmPmFinishWork,
                MinuteFinishWork,
                HourBeginWork,
                AmPmBeginWork,
                MinuteBeginWork
            )
        ]
        return total_hours

    def calc_daily_total(self):
        pass
        _list = self.calc_daily_totals()
        _sum = sum(_list)
        return float(_sum)

