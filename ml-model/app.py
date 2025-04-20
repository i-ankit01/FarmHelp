from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
model = joblib.load('price_prediction_model.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict_crop_price():

    print('function called')
    data = request.get_json(force=True)
    print('Incoming data', data)

    year = int(data['year'])
    month_num = int(data['month'])
    crop_name = data['crop']

    crops = [
        'Coconut', 'Coffee', 'Cotton', 'Ginger(Dry)', 'Groundnut', 'Jowar(Sorghum)',
        'Maize', 'Millets', 'Rice', 'Sugar', 'Sugarcane', 'Sunflower',
        'Tea', 'Turmeric', 'Wheat'
    ]
     
    df = pd.read_csv('./crop_price_dataset.csv')
    df_filtered = df[(df['month'] == '2025-03-01') & (df['commodity_name'] == crop_name)]
    current_price = df_filtered['avg_modal_price'].values[0] 

    input_data = {
        'year': year,
        'month_num': month_num
    }

    for crop in crops:
        input_data[f'commodity_name_{crop}'] = 1 if crop == crop_name else 0

    input_df = pd.DataFrame([input_data])
    predicted_price = round(model.predict(input_df)[0], 2)
    return jsonify({
        'predicted_price': predicted_price,
        'current_price': current_price
    })


if __name__ == '__main__':
    app.run(debug=True)
