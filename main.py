import pandas as pd
import numpy as np
from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles # for css staic pictures
import pickle
import os
from sentence_transformers import SentenceTransformer
import faiss

app = FastAPI()

templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")



MovieDataSet = pd.read_csv("MovieFinal.csv")

if os.path.exists("Database/MovieNameIndex.pk1"):
    with open("Database/MovieNameIndex.pk1", "rb") as f:
        MovieIndex = pickle.load(f)

if os.path.exists("Database/VectorOverviewIndex.pk1"):
    with open("Database/VectorOverviewIndex.pk1", "rb") as f:
        OverviewIndex = pickle.load(f)

encoder = SentenceTransformer("all-mpnet-base-v2")



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
    distance, Location = SimilarLookUpTable.search(search_vec, 9)

    Location = Location.reshape(-1,)
    SimilarMovies = list(MovieDataSet.iloc[Location]["movie_title"])[1:]
    Posters = list(MovieDataSet.iloc[Location]["poster"])[1:]

    final = dict(zip(SimilarMovies, Posters))

    return final

def chunk_list(lst, chunk_size):
    return [lst[i:i + chunk_size] for i in range(0, len(lst), chunk_size)]

@app.get('/')
async def main(request: Request):
    return templates.TemplateResponse('home.html', {'request': request})

@app.post("/movies/")
async def movies(request:Request, movie_name: str = Form(...)):
    recommendations = recommend(movie_name)
    RecommendedList = [{"title":i, "link":k} for i,k in recommendations.items()]

    chunked_image_list = chunk_list(RecommendedList, 4)
    

    return templates.TemplateResponse('recommendation.html', {'request': request, "movies":chunked_image_list, "movie_name":movie_name.capitalize()})
  

if __name__ == '__main__':
    app.run(debug = True)