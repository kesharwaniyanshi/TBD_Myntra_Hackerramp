from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_top_10_posts():
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST")
        )
        cursor = conn.cursor()
        cursor.execute("""
            SELECT post_id, likes, shares, comments, views
            FROM posts.post_data
            ORDER BY total_score DESC
            LIMIT 10;
        """)
        top_posts = cursor.fetchall()
        cursor.close()
        conn.close()
        posts = [{"post_id": post[0], "likes": post[1], "shares": post[2], "comments": post[3], "views": post[4]} for post in top_posts]
        return posts
    except Exception as e:
        print(f"Error: {e}")

@app.route('/top_posts', methods=['GET'])
def top_posts():
    posts = get_top_10_posts()
    return jsonify(posts)

def get_user_rewards(user_ids):
    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST")
        )
        cursor = conn.cursor()
        query = """
            SELECT id, SUM(likes) AS total_likes, SUM(shares) AS total_shares, SUM(comments) AS total_comments
            FROM users.user_data
            WHERE id = ANY(%s)
            GROUP BY id;
        """
        cursor.execute(query, (user_ids,))
        user_activities = cursor.fetchall()
        cursor.close()
        conn.close()

        rewards = []
        for activity in user_activities:
            user_id, total_likes, total_shares, total_comments = activity
            if total_likes >= 10 and total_shares >= 10 and total_comments >= 10:
                reward = "Congratulations! You have won the highest reward! You'll get early access to sales and free delivery for the next month."
            elif total_likes >= 5 and total_shares >= 5 and total_comments >= 5:
                reward = "Well done! You've performed well! Keep interacting for better offers. You'll receive free delivery for 15 days."
            elif total_likes >= 5 or total_shares >= 5 or total_comments >= 5:
                reward = "Good work! You'll be one of the first ones to know about our next sale, keep engaging in more posts."
            else:
                reward = "No rewards this time but don't be disheartened! Keep liking and commenting for some big rewards next time."
            rewards.append({"user_id": user_id, "reward": reward})
        return rewards
    except Exception as e:
        print(f"Error: {e}")
        return []

@app.route('/user_rewards', methods=['POST'])
def user_rewards():
    data = request.get_json()
    user_ids = data.get('user_ids', [])
    if user_ids:
        rewards = get_user_rewards(user_ids)
        return jsonify(rewards)
    else:
        return jsonify({"error": "User IDs not provided"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
