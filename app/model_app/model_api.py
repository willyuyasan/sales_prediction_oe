from IV_Generates_predictions import generates_predictions, db_use

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
        file_name = generates_predictions()
        db_use()
        #file_name = 'dataset_predict_20220718200114.csv'
        return {'prediction_process':'Successfully', 'file_name': file_name}
    else:
        return {'prediction_process':'No success'}

if __name__ == '__main__':
    app.run(host="pythonapi",port="5000",debug=True)

#python ./app/model_app/model_api.py
#http://localhost:5000/sales_prediction