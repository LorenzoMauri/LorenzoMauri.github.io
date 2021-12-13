import pymysql
import pandas as pd 
import numpy as np 

class Aggregator():
    def __init__(self):
        self.tableName = 'rawdata'
        self._setConfiguration()
        self.openConnection()
        
    def _createSQL(self, cols):
        assert type(cols) == type(''), 'SELECT Assertion: check data types'
        print(cols)
        return f"SELECT `{cols}` FROM `{self.tableName}`"

    def _executeSQL(self):
        self.fields_list = ['service', 'location', 'products', 
                            'reviewName', 'text', 'score', 'date', 'url', 'client']

        cols = "`,`".join(self.fields_list)
        
        with self.connection.cursor() as cursor : 
            sql = self._createSQL(cols)
            cursor.execute(sql)
            data = cursor.fetchall()
            self.df = pd.DataFrame(data, columns=self.fields_list)

    def openConnection(self) :
        """
        :parameters: provide credentials using keywords -> `username` , `password` , `host`, `databaseName`
        :type: string
        """ 
        print('opening mysql connection')
        #assert self.configFile , "Assertion configFile : check it out"
        self.connection = pymysql.connect(host = self.host,
                                          password=self.password, 
                                          user=self.user, 
                                          database=self.databaseName)
        print('done')

    def closeConnection(self):
        self.connection.close()
    
    def _setConfiguration(self):
        #with open(self.configFilePath+f'/env/{self.env}/config.json' , "r") as f:
        #  self.configFile = json.load(f)
        self.user = 'tableau' #self.configFile['mySqlConnection']['username'],
        self.host = 'aws-elk-dev.ipratico.it' #self.configFile['mySqlConnection']['host']
        self.password = 'T@bl3au2021' #self.configFile['mySqlConnection']['password']
        self.databaseName = 'ABSA' #self.configFile['mySqlConnection']['dbName']

    def get(self):
        self._executeSQL()
        self.closeConnection()
        return self.df


        ### here you can apply transformations

