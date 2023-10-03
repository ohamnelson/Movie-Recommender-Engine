import pandas as pd
import numpy as np
from fastapi import FastAPI
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from google.cloud import storage
from io import StringIO
import os


# Specify your Google Cloud Storage bucket name and CSV file path
bucket_name = "final_movie"
file_path = "https://storage.cloud.google.com/final_movie/MovieFinal.csv"

# Initialize the Google Cloud Storage client
client = storage.Client("movie-recommendation-398607")

# Get the bucket
bucket = client.bucket(bucket_name)

# Get the blob (object) containing the CSV file
blob = bucket.blob("MovieFinal.csv")

# Download the CSV file as a string
csv_data = blob.download_as_string()
csv_string = csv_data.decode('utf-8')

app = FastAPI()

@app.get("/")
def index():
    return{"Hello World"}

@app.get("/test/{movi}")
def test_imdex(movi):
    testing = movi
    return{"Hello World":testing}

def create_similarity():
    #data = pd.read_csv("MovieFinal.csv")
    data = pd.read_csv(StringIO(csv_string))
    # creating a count matrix
    cv = TfidfVectorizer()
    count_matrix = cv.fit_transform(data["combine"])
    # creating a similarity score matrix
    similarity = cosine_similarity(count_matrix)
    return data,similarity

def search(word):
    data, similarity = create_similarity()
    data1 = list(data["movie_title"])
    data1.append(word)
    # creating a count matrix
    cv = TfidfVectorizer()
    count_matrix1 = cv.fit_transform(data1)
    # creating a similarity score matrix
    similarity1 = cosine_similarity(count_matrix1)

    found = list(enumerate(similarity1[-1]))
    ids = sorted(found, key= lambda x:x[1], reverse=True)[:5]
    for i in range(len(ids)-1): 
        if(ids[i][0]) == len(data):
            del ids[i]
    ids[0][0]
    return ids[0][0]

def recommend(movie):
    data, similarity = create_similarity()
    i = search(movie)
    recommended = list(enumerate(similarity[i]))
    sort_recommendations = sorted(recommended, key= lambda x:x[1], reverse=True)[:11]

    movie_list = {}
    for i in sort_recommendations[1:]:
        movie_list[data["movie_title"][i[0]]] = data["poster"][i[0]]

    return movie_list

@app.get("/movies/{movies}")
async def read_item(movies: str):
    recommendations = recommend(movies)
    return recommendations
   

if __name__ == '__main__':
    app.run(debug = True)
