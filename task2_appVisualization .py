import dash
import pandas as pd 
import numpy as np 
import dash_html_components as html
import dash_core_components as dcc
####################################
### app initialization #############
####################################

app = dash.Dash(__name__)

####################################
### title & dropdown menu ##########
####################################

app.layout= html.Div([html.H1("TASK 2 : VERIFICA DEI LIMITI DI PORTATA PER TIPOLOGIA DI POMPA",style =  {'text-align':'center'}),

dcc.Dropdown(id = 'pump types',
    options=[
        {'label': 'STD Pump', 'value': 'STD'},
        {'label': 'DAI Pump', 'value': 'DAI'}
    ],
    placeholder = 'select a pump type'
)  

])
####################################
######### running server ###########
####################################
if __name__ == '__main__':
         app.run_server(debug=True)