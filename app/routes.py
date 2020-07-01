import os
from flask import render_template, url_for, flash, redirect, request, abort, jsonify
from app import app, db
# import requests

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html', title='Home')
