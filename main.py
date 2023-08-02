import pandas as pd
import numpy as np
from fastapi import FastAPI
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

def create_similarity():
    data = pd.read_csv("MovieFinal.csv")
    # creating a count matrix
    cv = TfidfVectorizer()
    count_matrix = cv.fit_transform(data["combine"])
    # creating a similarity score matrix
    similarity = cosine_similarity(count_matrix)
    return data,similarity

def recommend(movie):
    movie_name = movie.lower()
    data, similarity = create_similarity()
    title = [x.lower() for x in data["movie_title"]]
    i = title.index(movie_name)
    recommended = list(enumerate(similarity[i]))

    fin = sorted(recommended, key= lambda x:x[1], reverse=True)[:10]
    movie_list = [data["movie_title"][i[0]] for i in fin]
    return movie_list


@app.get("/movies/{movies}")
async def read_item(movies: str):
    test = recommend(movies)
    return test
   

if __name__ == '__main__':
    app.run(debug=True)
