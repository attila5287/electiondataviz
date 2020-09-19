import csv
import codecs
import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from app import app, db
import requests
from .models import (
    Description
)
from .utils import (
    prepMyCSV
)

@app.route("/")
@app.route("/interactive")
def historical():
    return render_template('interactive.html')


@app.route("/timeseries")
def timeseries():
    return render_template('timeseries.html')


@app.route("/candidates")
def candidates():
    return render_template('candidates.html')


@app.route("/map")
def map_states():
    pass
    return render_template('map.html')


@app.route("/test")
def test():
    return render_template('test.html')

# trick:  to retrieve data with our api key from bea
# transmit data without the api keys for d3 charts
@app.route("/bea/api/<int:index_bea>")
def bea_api(index_bea):
    """ /api/desc/upload -> make sure records are avlb."""
    pass
    # urls stores in env. vars of heroku and local-test
    hidden_urls = [  # list of urls w/ API key
        'urlPersonalIncome',
        'urlPopulation',
    ]
    merged_urls = [  # same attr's with BEA api
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/unemployment.csv',
            'Notes'	: 'Bureau Of Labor and Statistics',
            'PublicTable': "BLS:Unemployment Rate",  # table name(s)
            'Statistic': "Prct. Unemployment Rate",  # parameter
            'UnitOfMeasure':	"percentage",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/const-permits.csv',
            'Notes': "Number of Const. Permits Issued",  # parameter
            'PublicTable': "Construction Permits",  # table name(s)
            'Statistic': "Number of Permits",  # parameter
            'UnitOfMeasure':	"count",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/income-wagesalary.csv',
            'Notes': "SAINC30 Wage-Salary Income",  # table name(s)
            'PublicTable': "Wage-Salary Income",  # table name(s)
            'Statistic': "Income, Wage-Salary",  # parameter
            'UnitOfMeasure':	"dollars",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/numjobs-nonfarmpro.csv',
            'Notes'	: "Number of jobs for non-farm propriety",
            'PublicTable': "Num. of Non-Farm Jobs",  # table name(s)
            'Statistic': "Number of Jobs",  # parameter
            'UnitOfMeasure':	"percentage",
        },
    ]

    num_realtime = len(hidden_urls) # real time fetch data
    condition = index_bea < num_realtime #  merged due to years distcont'y

    if condition:
        pass
        url = os.environ.get(hidden_urls[index_bea])
        pass
        # use the stored url->response obj of req's library
        response = requests.get(url)
        # print(response.status_code)

        # don't publish other records |with api only data-instructions
        return jsonify(response.json()['BEAAPI']['Results'])

    else:  # these needed to be merged due to non-continuous data
        pass
        index_m = index_bea - num_realtime  # merged data index
        try:
            pass
            dict_api = merged_urls[index_m] # info params bound w/o Data
        except :
            pass
            # info params bound w/o Data
            dict_api = merged_urls[len(merged_urls)-1]
        
        csv_url = dict_api['url']  # stored as attr - csv raw data

        with requests.get(csv_url, stream=True) as r:
            pass
            lines = (line.decode('utf-8') for line in r.iter_lines())
            csv_dict = [row for row in csv.DictReader(lines)]
            
            dataJSON = prepMyCSV(csv_dict) #read csv publish json

        return jsonify({
            'Notes': [{'NoteText': dict_api['Notes']}],
            'PublicTable': dict_api['PublicTable'],
            'PublicTable': dict_api['Statistic'],
            'UnitOfMeasure': dict_api['UnitOfMeasure'],
            'Data': dataJSON,
            'csv':  csv_url,
            'index': index_bea,
        }
        )


@app.route('/api/desc/upload', methods=['GET', 'POST'])
def api_desc():
    pass
    print('py-comeBack->h0m3')
    merged_results = [  # same attr's with BEA api
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/unemployment.csv',
            'Notes'	: 'Bureau Of Labor and Statistics',
            'PublicTable': "BLS:Unemployment Rate",  # table name(s)
            'Statistic': "Prct. Unemployment Rate",  # parameter
            'UnitOfMeasure':	"percentage",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/const-permits.csv',
            'Notes': "Number of Const. Permits Issued",  # parameter
            'PublicTable': "Construction Permits",  # table name(s)
            'Statistic': "Number of Permits",  # parameter
            'UnitOfMeasure':	"count",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/income-wagesalary.csv',
            'Notes': "SAINC30 Wage-Salary Income",  # table name(s)
            'PublicTable': "Wage-Salary Income",  # table name(s)
            'Statistic': "Income, Wage-Salary",  # parameter
            'UnitOfMeasure':	"dollars",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/numjobs-nonfarmpro.csv',
            'Notes'	: "Number of jobs for non-farm propriety",
            'PublicTable': "Num. of Non-Farm Jobs",  # table name(s)
            'Statistic': "Number of Jobs",  # parameter
            'UnitOfMeasure':	"percentage",
        },
    ]

    print(merged_results)

    for merged in merged_results:
        pass
        print(merged)

    desc = [
        Description(**merged) for merged in merged_results
    ]

    db.session.add_all(desc)
    db.session.commit()

    return jsonify({'status': 'success'})


@app.route('/bea/api/menu')
def api_menu():
    """ /interactive   """
    pass
    menu = [  # same attr's with BEA api
        {
            'url': 'https://apps.bea.gov/api/data/?&UserID=MY-HIDDEN-KEY-36-LETTER-TOTAL-LENGTH&method=GetData&datasetname=Regional&TableName=SAINC1&GeoFIPS=STATE&LineCode=3&Year=1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019&ResultFormat=JSON',
            'Notes'	: 'Per capita personal income is total personal income divided by total midyear population.', 
            'PublicTable': "SAINC1 Per Capita Personal Income",  # table name(s)
            'Statistic': "per capita income",  # parameter
            'UnitOfMeasure':	"dollars",
        },
        {
            'url': 'https://apps.bea.gov/api/data/?&UserID=UserID=MY-HIDDEN-KEY-36-LETTER-TOTAL-LENGTH&method=GetData&datasetname=Regional&TableName=SAINC1&GeoFIPS=STATE&LineCode=2&Year=1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019&ResultFormat=JSON',
            'Notes'	: 'Census Bureau midyear population estimate. Estimates for 2010-2019 reflect Census Bureau midyear state population estimates available as of December 2019.',
            'PublicTable': "SAINC1 Total Population",  # table name(s)
            'Statistic': "number of persons",  # parameter
            'UnitOfMeasure':	"count",
        },
        {
            'url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/unemployment.csv',
            'Notes'	: 'Bureau Of Labor and Statistics',
            'PublicTable': "BLS:Unemployment Rate",  # table name(s)
            'Statistic': "Prct. Unemployment Rate",  # parameter
            'UnitOfMeasure':	"percentage",
        },
        {
            'csv_url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/const-permits.csv',
            'Notes': "Number of Const. Permits Issued",  # parameter
            'PublicTable': "Construction Permits",  # table name(s)
            'Statistic': "Number of Permits",  # parameter
            'UnitOfMeasure':	"count",
        },
        {
            'csv_url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/income-wagesalary.csv',
            'Notes': "SAINC30 Wage-Salary Income",  # table name(s)
            'PublicTable': "Wage-Salary Income",  # table name(s)
            'Statistic': "Income, Wage-Salary",  # parameter
            'UnitOfMeasure':	"dollars",
        },
        {
            'csv_url': 'https://gist.githubusercontent.com/attila5287/0c460b8fc707a0ec16973a7b363db562/raw/f148922c210c0d440db293712476dccc1dd4a05f/numjobs-nonfarmpro.csv',
            'Notes'	: "Number of jobs for non-farm propriety",
            'PublicTable': "Num. of Non-Farm Jobs",  # table name(s)
            'Statistic': "Number of Jobs",  # parameter
            'UnitOfMeasure':	"count",
        },

    ]
    return jsonify(menu)


if __name__ == '__main__':
    app.run(debug=True)
