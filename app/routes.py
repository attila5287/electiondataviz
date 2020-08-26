import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from app import app, db
# import requests

@app.route("/")
@app.route("/historical")
def historical():
    return render_template('historical.html')
  
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
