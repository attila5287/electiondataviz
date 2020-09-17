from contextlib import closing
import csv
import codecs
import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from app import app, db
import requests
from .models import (
    Description
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

# trick is to retrieve data with our api key from bea
# transmit data without the api keys for d3 charts

@app.route("/bea/api/<int:index_bea>")
def bea_api(index_bea):
    pass
    # urls stores in env. vars of heroku and local-test
    hidden_urls = [  # list of urls w/ API key
        'urlPersonalIncome',
        'urlPopulation',
    ]

    num_realtime = len(hidden_urls)
    condition = index_bea < num_realtime

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
      res = merged_results[index_m]
      url = res['url']

      with requests.get(url, stream=True) as r:
          lines = (line.decode('utf-8') for line in r.iter_lines())
          res['Data'] = [row for row in csv.DictReader(lines)]

      return jsonify(res)

@app.route('/api/desc', methods=['GET', 'POST'])
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
   print(merged_results )

   for merged in merged_results:
       pass
       print(merged)
       
   desc = [
       Description(**merged) for merged in merged_results
   ]
   
   db.session.add_all(desc)
   db.session.commit()
   

if __name__ == '__main__':
    app.run(debug=True)

