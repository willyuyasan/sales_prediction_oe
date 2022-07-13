from IV_Generates_predictions import generates_predictions

#Creating the API
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app) #Prevent of CORS error when you work from the same server

@cross_origin #Prevent of CORS error when you work from the same server
@app.route('/sales_prediction', methods=["GET",'POST'])

def results():
    output = request.get_json()

    print(output)

    if output['proceed']=='OK':
        #generates_predictions()
        return {'prediction_process':'Successfully'}
    else:
        return {'prediction_process':'No success'}

if __name__ == '__main__':
    app.run(host="0.0.0.0",port="5000",debug=True)

#python ./app/model_app/model_api.py
#http://localhost:5000/sales_prediction