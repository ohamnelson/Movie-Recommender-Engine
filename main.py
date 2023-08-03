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
    test1 = sorted(found, key= lambda x:x[1], reverse=True)[:5]
    for i in range(len(test1)-1): 
        if(test1[i][0]) == len(data):
            del test1[i]
    test1[0][0]
    return test1[0][0]

def recommend(movie):
    data, similarity = create_similarity()
    i = search(movie)
    recommended = list(enumerate(similarity[i]))

    fin = sorted(recommended, key= lambda x:x[1], reverse=True)[:10]
    movie_list = [data["movie_title"][i[0]] for i in fin[1:]]
    return movie_list

@app.get("/movies/{movies}")
async def read_item(movies: str):
    test = recommend(movies)
    return test
   

if __name__ == '__main__':
    app.run(debug=True)
