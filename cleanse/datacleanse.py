import pandas as pd
import numpy as np

def normalize_time(v):
    return (v - min_time)

def normalize_xaxis(v):
    return (v - min_xpos)

def normalize_zaxis(v):
    return (v - min_zpos)

df = pd.read_csv('match1.csv')

print(df.dtypes)

dfplayers = df[['bnetid', 'teamid']]

dfplayers = pd.DataFrame(dfplayers.groupby(['bnetid', 'teamid']).size()).reset_index()

dfplayers = dfplayers[['bnetid', 'teamid']]
dfplayers = dfplayers.sort_values(by=['teamid', 'bnetid'])
dfplayers['playerid'] = range(1, len(dfplayers) + 1)
dfplayers = dfplayers[['bnetid', 'playerid']]

min_time = df['time'].min()

df['time'] = df['time'].apply(normalize_time)

df = pd.merge(df, dfplayers, on='bnetid')

max_xpos = df['pos_x'].max()
min_xpos = df['pos_x'].min()
max_zpos = df['pos_z'].max()
min_zpos = df['pos_z'].min()


df['pos_x'] = df['pos_x'].apply(normalize_xaxis)
df['pos_z'] = df['pos_z'].apply(normalize_zaxis)

df.to_csv('cleaned.csv', index=False)

