from flask import Flask, request, render_template, send_from_directory, url_for
import joblib
import os

app = Flask(__name__)

# Load the recommendation model
recommendations_model = joblib.load('recommendations_model.pkl')

# Define the image folder
IMAGE_FOLDER = "D:\\images"
app.config['IMAGE_FOLDER'] = IMAGE_FOLDER

def get_image_path(article_id):
    # Extract the first three digits for folder naming
    first_three_digits = str(article_id).zfill(10)[:3]
    image_filename = f"{article_id}.jpg"
    image_path = os.path.join(first_three_digits, image_filename)
    return image_path.replace("\\", "/")  # Replace backslashes with forward slashes

def get_recommendations(user_id):
    # Assuming `recommendations_model` is a DataFrame with customer_id and predictions
    recommendations = recommendations_model[recommendations_model['customer_id'] == user_id]['prediction']
    if recommendations.empty:
        return []  # Return an empty list if no recommendations are found
    return recommendations.iloc[0].split()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    user_id_str = request.form['user_id'].strip()
    try:
        user_id = int(user_id_str)  # Convert input from string to integer
    except ValueError:
        return render_template('result.html', recommendations=[], message="Invalid User ID. Please try again.")

    # Get recommendations for the user_id
    user_recommendations = get_recommendations(user_id)
    print(f"User ID: {user_id}")
    print(f"User Recommendations: {user_recommendations}")

    if not user_recommendations:
        return render_template('result.html', recommendations=[], message="No recommendations found.")

    # Get the paths for the first 10 recommended images along with their article IDs
    image_paths = [(get_image_path(article_id.strip()), article_id.strip()) for article_id in user_recommendations[:10]]
    print(f"Image Paths: {image_paths}")

    # Use url_for to generate the URLs for the images
    image_urls = [(url_for('serve_image', image_path=image_path), article_id) for image_path, article_id in image_paths]

    return render_template('result.html', recommendations=image_urls, message="")

@app.route('/<path:image_path>')
def serve_image(image_path):
    # Construct the full path to the image file
    full_image_path = os.path.join(app.config['IMAGE_FOLDER'], image_path.replace("/", os.sep))
    return send_from_directory(os.path.dirname(full_image_path), os.path.basename(full_image_path))

if __name__ == '__main__':
    app.run(debug=True)
