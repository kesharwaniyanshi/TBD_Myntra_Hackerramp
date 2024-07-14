import joblib
import pandas as pd

# Load the pre-trained model
model = joblib.load('recommendations_model.pkl')

def get_recommendations(user_id):
    # Ensure the user_id is an integer
    user_id = int(user_id, 16)  # Convert from hex string to int
    
    # Assuming `model` is a DataFrame with customer_id and predictions
    recommendations = model[model['customer_id'] == user_id]['prediction']
    if recommendations.empty:
        return []  # Return an empty list if no recommendations are found
    return recommendations.iloc[0].split()
