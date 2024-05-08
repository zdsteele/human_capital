import json
import os
from flask import Flask, render_template, jsonify, session, redirect, request, url_for
from flask_session import Session
import pandas as pd


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('dashboard.html')


@app.route('/data')
def index():
    # Load the data from the tab-separated file into a DataFrame
    df = pd.read_csv('HR DATA.txt', delimiter='\t')

   # Convert the DataFrame to a JSON array
    json_data = json.loads(df.to_json(orient='records'))

    # Return the JSON data
    return json_data

if __name__ == '__main__':
    app.run(debug=True)