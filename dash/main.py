import pandas as pd 
import numpy as np
import plotly.express as px
import dash
import dash_core_components as dcc 
import dash_html_components as html 
from dash.dependencies import Input, Output
from MySQL_getData import Aggregator



# UTILS 
def aggregate(df): 
    ASPECTS_LIST = ['service','location', 'products']
    return df.groupby(['date'])[ASPECTS_LIST].agg(
                                                            [('diff', lambda x: ((x==1).sum())-( (x==0).sum()))
                                                             
                                                            ]
                                                        ).fillna(0.0)

def getData():
    aggregatorObject = Aggregator()
    return aggregatorObject.get()

def filterData(clientDropdown):
    return df[df.client==clientDropdown]

def formatDates(df):
    df['date'] = pd.to_datetime(df.date)
    max_date = df.date.max()
    min_date = df.date.min()
    idx = pd.DataFrame({
        
                        'date': pd.date_range(min_date, max_date)
                        
                        })
    df = idx.merge(right = df, how='left', on = 'date').fillna(0.0)
    return df 

def getAggregation(df):
    dff = aggregate(df)
    dff = dff.reset_index()
    dff = formatDates(dff)
    dff=dff.groupby(pd.Grouper(key='date', axis=0, 
                        freq='MS', sort=True)).agg('mean')
    dff.columns = ['_'.join(col) for col in dff.columns]
    return dff

df = getData()
dff = getAggregation(df)
app = dash.Dash(__name__)


clients_list = df.client.drop_duplicates().to_list()

app.layout = html.Div([

    html.H1("Web Application for Aspect-Based Sentiment Analysis", 
    style = {'text-align':'center'}),

    html.H4("Select an aspect :"),

    dcc.Dropdown(
        id="ticker",
        options=[{"label": x, "value": x} 
                for x in dff.columns],
        value=dff.columns[1],
        clearable=False,
    ),


    html.Br(), 
    html.H4("Select a client :"),
    dcc.Dropdown(
        id="clientDropdown",
        options=[{"label": x, "value": x} 
                for x in clients_list],
        value=clients_list[1],
        clearable=False,
    ),

    dcc.Graph(id="time-series-chart"),

])



@app.callback(
    Output("time-series-chart", "figure"), 
    [Input("ticker", "value"),
    Input("clientDropdown", "value")])


def display_time_series(ticker,clientDropdown):
    dff = filterData(clientDropdown)
    dff = getAggregation(dff)
    fig = px.line(dff, x=dff.index, y=ticker)
    return fig
    
    


# nel callback indico dove i risultati della funzione `update_graph` devono essere inseriti
# NB:bisogna rispettare l'ordine nel return della funzione


if __name__ == '__main__' : 
    app.run_server(debug=False)