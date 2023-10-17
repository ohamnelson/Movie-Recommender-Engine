import pandas as pd
import numpy as np
from fastapi import FastAPI
import pickle
import os
from sentence_transformers import SentenceTransformer
import faiss

MovieDataSet = pd.read_csv("MovieFinal.csv")

if os.path.exists("Database/MovieNameIndex.pk1"):
    with open("Database/MovieNameIndex.pk1", "rb") as f:
        MovieIndex = pickle.load(f)

if os.path.exists("Database/VectorOverviewIndex.pk1"):
    with open("Database/VectorOverviewIndex.pk1", "rb") as f:
        OverviewIndex = pickle.load(f)

encoder = SentenceTransformer("all-mpnet-base-v2")

app = FastAPI()

def search(word):
    search_vec = encoder.encode(word)
    search_vec = search_vec.reshape((1,-1))

    MovieLookUpTable = faiss.IndexFlatL2(MovieIndex.shape[1])
    MovieLookUpTable.add(MovieIndex)
    distance, Location = MovieLookUpTable.search(search_vec, 1)

    Location = Location.reshape(-1,)
    MovieName = list(MovieDataSet.iloc[Location]["movie_title"])[0]

    return MovieName

def recommend(movie):
    MovieName = search(movie)

    search_vec = encoder.encode(MovieName)
    search_vec = search_vec.reshape((1,-1))

    SimilarLookUpTable = faiss.IndexFlatL2(OverviewIndex.shape[1])
    SimilarLookUpTable.add(OverviewIndex)
    distance, Location = SimilarLookUpTable.search(search_vec, 11)

    Location = Location.reshape(-1,)
    SimilarMovies = list(MovieDataSet.iloc[Location]["movie_title"])[1:]
    Posters = list(MovieDataSet.iloc[Location]["poster"])[1:]

    final = dict(zip(SimilarMovies, Posters))

    return final

@app.get("/movies/{movies}")
async def read_item(movies: str):
    recommendations = recommend(movies)
    RecommendedList = [{"title":i, "link":k} for i,k in recommendations.items()]
    

    return RecommendedList

if __name__ == '__main__':
    app.run(debug = True)