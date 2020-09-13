import csv
import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from app import app, db
import requests

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
  print('\n welcome back home, attila! \n')
  msg = '(BEA) U.S. Bureau of \nEconomic Analysis: ' + str(index_bea)

  # urls stores in env. vars of heroku and local-test
  listURL = [ #list of urls w/ API key
    'urlPersonalIncome',
    'urlPopulation',
    'urlCompEeByIndNAICS',
    'urlCompEeByIndSIC', 
  ]
  
  try: # urls to request data for d3 viz on screen
    pass
    url = os.environ.get(listURL[index_bea])
    
  except: #if index larger or err show the last table
    pass 
    url = os.environ.get(listURL[len(listURL)-1])
    
  # use the stored url->response obj of req's library
  response = requests.get(url)
  
  # Print status code 
  print(response.status_code)
  # don't publish other records |with api only data-instructions
  return jsonify(response.json()['BEAAPI']['Results'])
  

@app.route('/data')
def data():
  pass
  csvpath = url_for('static', filename="unemployment.csv")
  # csvpath = os.path.join('static/data/csv-int/unemployment.csv')
  
  # Method 2: Improved Reading using CSV module
  with open(csvpath, newline='') as csvfile:
    # CSV reader specifies delimiter and variable that holds
    csvreader = csv.reader(csvfile, delimiter=',')

    print(csvreader)

    #  Each row is read as a row
    for row in csvreader:
      pass
      print(row)

  return jsonify([{'k':'v'}])
