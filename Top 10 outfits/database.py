import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_top_10_posts():
    try:
        # Connect to your postgres DB
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST")
        )
        
        # Open a cursor to perform database operations
        cursor = conn.cursor()
        
        # Execute the query
        cursor.execute("""
            SELECT post_id, likes, shares, comments, views, total_score
            FROM posts.post_data
            ORDER BY total_score DESC
            LIMIT 10;
        """)
        
        # Fetch all results
        top_posts = cursor.fetchall()
        
        # Print the results
        for post in top_posts:
            print(post)
        
        # Close communication with the database
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

def calculate_rewards():
    try:
        # Connect to your postgres DB
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST")
        )
        
        # Open a cursor to perform database operations
        cursor = conn.cursor()
        
        # Execute the query to get user activities
        cursor.execute("""
            SELECT id, SUM(likes) AS total_likes, SUM(shares) AS total_shares, SUM(comments) AS total_comments
            FROM users.user_data
            GROUP BY id;
        """)
        
        # Fetch all results
        user_activities = cursor.fetchall()
        
        # Calculate rewards for each user
        for activity in user_activities:
            user_id, total_likes, total_shares, total_comments = activity
            if total_likes >= 10 and total_shares >= 10 and total_comments >= 10:
                reward = 1
            elif total_likes >= 5 and total_shares >= 5 and total_comments >= 5:
                reward = 2
            elif total_likes >= 5 or total_shares >= 5 or total_comments >= 5:
                reward = 3
            else:
                reward = "No rewards received"
            
            print(f"User ID: {user_id}, Reward: {reward}")
        
        # Close communication with the database
        cursor.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_top_10_posts()
    calculate_rewards()

