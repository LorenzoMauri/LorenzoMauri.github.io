import dash
import pandas as pd 
import numpy as np 
import dash_html_components as html
import dash_core_components as dcc
from dash.dependencies import Input,Output
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime as dt



####################################
### app initialization #############
####################################

app = dash.Dash(__name__,assets_external_path='assets/')

colors = {
    'background': '#d8cdcd',   #bianco-grigio
    'text': '#c74b4b',
    'd':'ffffff'
}


######################################
########### import data ##############
######################################
path='C:\\Users\\loren\\Desktop\\Data-Science-Unimib\\II anno\\Industry Lab\\progetto_industry\\industry_task1\\data\\dataframe.csv'
df=pd.read_csv(path)
fig = px.line(df, x='Data_Ora', y='alpha', range_x=[0,0])
fig.update_layout(
    plot_bgcolor=colors['background'],
    paper_bgcolor=colors['background'],
    font_color=colors['text']
)
######################################
############# app layout #############
######################################

app.layout= html.Div(style={'backgroundColor':colors['background']},children=
    [html.H1('MONITORAGGIO LEAKAGE COEFFICIENT ALPHA'),

html.Label('Start date : '),
dcc.Textarea(id = 'start',
    placeholder='yyyy-mm-dd hh:mm:ss',value = '2020-01-01 12:00:00'),

html.Br(),

html.Label('End date : '),
dcc.Textarea(id = 'end',
    placeholder='yyyy-mm-dd hh:mm:ss',value = '2020-01-01 13:00:00'),


#grafico 

html.Div(style={'backgroundColor':colors['d']},id='prova'),

dcc.Graph(id = 'my_plot',figure =fig)
        
])



####################################
######## callbacks #################
####################################


@app.callback(
    [Output(component_id = 'my_plot',component_property='figure'),
    Output(component_id = 'prova',component_property='children')],
    [Input(component_id='start',component_property= 'value'),
     Input(component_id='end', component_property='value')]
    #  Input(component_id='hours', component_property='number'),
    #  Input(component_id='minutes', component_property='number'),
    #  Input(component_id='my-date-picker-range', component_property='number')]
    )

def update_graph(start, end):
    note = '(*) keep this data format'
    fig = px.line(df, x='Data_Ora', y='alpha', range_x=[start,end])
    fig.update_layout(xaxis_title="time",yaxis_title="Leakage Coefficient")
    fig.update_layout(plot_bgcolor=colors['background'],
    paper_bgcolor=colors['background'],
    font_color=colors['text'])
    fig.update_traces(line_color="red")
    return (fig,note)














####################################
######### running server ###########
####################################

if __name__ == '__main__':
    app.run_server(debug=True)#False,dev_tools_ui=False,dev_tools_props_check=False)


         