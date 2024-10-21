from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# Example function to determine if email content is malicious
def is_malicious(email_content):
    # Simulating an analysis, you can replace this with your actual logic
    malicious_keywords = ["phishing", "scam", "attack", "ransom","password", "credit card", "click here", "urgent", "suspicious", "account locked", 
        "verify now", "free", "lottery", "bank", "fraud", "limited time offer", "urgent response needed"
]
    for word in malicious_keywords:
        if word in email_content.lower():
            return True
    return False

@app.route('/analyze-email', methods=['POST'])
def analyze_email():
    data = request.get_json()
    email_content = data.get('emailContent')
