import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from app import app, db
# import requests


@app.route("/dashboard")
def dashboard():
    return render_template('dashboard.html', title='dashBoard')

@app.route("/")
@app.route("/candidates")
def candidates():
    return render_template('candidates.html', title='Candidates')

@app.route("/table")
def table():
    return render_template('table.html', title='Table')

@app.route("/home")
def home():
    return render_template('home.html', title='Home')

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/interactive-axis")
def interactive_axis():
    return render_template('interactive-axis.html', title='Interactive Axis')

@app.route("/leaflet/bubble")
def leaflet_bubble():
    return render_template('world-bubble.html', title='Bubble World Map')

@app.route("/leaflet/choropleth")
def leaflet_choropleth():
    return render_template('states.html', title='Choropleth US States')

@app.route("/leaflet/europe")
def leaflet_choropleth_europe():
    return render_template('europe.html', title='Choropleth Europe')


@app.route("/leaflet/asia")
def leaflet_choropleth_asia():
    return render_template('asia.html', title='Choropleth Asia')


@app.route("/test")
def test():
    return render_template('test.html', title='Test')


@app.route("/map")
def map_states():
    pass
    return render_template('map.html', title='Colored Map')


# squares for dynamic field
@app.route('/fetch/but', methods=['GET', 'POST'])
def jsonify_maptoken():
    ''' RETURNS JSONIFIED DATA FOR SQUARES-HOME SELECT ELEMENT'''
    pass
    mapAccessToken = os.environ.get('MAP_ACCESS_TOKEN')
    # print(' --- mapAccessToken ---')
    # print(mapAccessToken)
    return jsonify({'doNotTell': mapAccessToken})

