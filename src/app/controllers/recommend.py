import sys
from os import path
import csv
import requests

# Load EDA Pkgs
import pandas as pd
import neattext.functions as nfx

# Load ML/Rc Pkgs
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity, linear_kernel

courses = requests.get("http://localhost:3000/courses").json()
# now we will open a file for writing
data_file = open(path.abspath('src/data/data_file.csv'),
                 'w', newline='', encoding="utf-8")
# create the csv writer object
csv_writer = csv.writer(data_file)

# Counter variable used for writing
# headers to the CSV file
count = 0
for course in courses:
    if count == 0:
        # Writing headers of CSV file
        header = course.keys()
        csv_writer.writerow(header)
        count += 1

    # Writing data of CSV file
    csv_writer.writerow(course.values())

data_file.close()
# Load our dataset
df = pd.read_csv(
    path.abspath('src/data/data_file.csv'), encoding='utf-8')

# Clean Text:stopwords,special charac
df['clean_name'] = df['name'].apply(nfx.remove_stopwords)

# Clean Text:stopwords,special charac
df['clean_name'] = df['clean_name'].apply(
    nfx.remove_special_characters)

# Vectorize our Text
count_vect = CountVectorizer()
cv_mat = count_vect.fit_transform(df['clean_name'])

# Sparse
cv_mat

# Dense
cv_mat.todense()

df_cv_words = pd.DataFrame(
    cv_mat.todense(), columns=count_vect.get_feature_names_out())

# Cosine Similarity Matrix
cosine_sim_mat = cosine_similarity(cv_mat)

# Get Course ID/Index
course_indices = pd.Series(
    df.index, index=df['name']).drop_duplicates()

idx = course_indices[sys.argv[1]]

scores = list(enumerate(cosine_sim_mat[idx]))

# Sort our scores per cosine score
sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)

# Selected Courses Indices
selected_course_indices = [i[0] for i in sorted_scores[1:]]

# Selected Courses Scores
selected_course_scores = [i[1] for i in sorted_scores[1:]]

recommended_result = df.iloc[selected_course_indices]

rec_df = pd.DataFrame(recommended_result, columns=[
                      'name', 'image', 'slug']).head(10).to_json(orient='records')

print(rec_df)
