import xlrd         
import pandas as pd  
import math
import numpy as np   
import operator as op


path = 'ma.xlsx'
df = pd.read_excel(path)
df_list = []
for i in df.index.values:
    df_line = df.loc[i, ['2010n','2011n','2012n','2013n','2014n','2015n',]].to_dict()#读列，并放在df_line中
    df_list.append(df_line)

for i in range(0,31):
    markov_marix = np.zeros([5, 5])
    new_list = []
    new_list.append(df_list[i]['2010n'])
    new_list.append(df_list[i]['2011n'])
    new_list.append(df_list[i]['2012n'])
    new_list.append(df_list[i]['2013n'])
    new_list.append(df_list[i]['2014n'])
    new_list.append(df_list[i]['2015n'])
    x = np.array(new_list).T

    count = {}
    count[1]=0
    count[5]=0
    count[2]=0
    count[3]=0
    count[4]=0
    for ii in x[0:5]:
        count[ii] = count.get(ii, 0) + 1

        
    count = sorted(count.items(), key=op.itemgetter(0), reverse=False)


    

    for j in range(5):

        for m in range(5):

            for n in range(5):

                if x[j] == count[m][0] and x[j + 1] == count[n][0]:

                    markov_marix[m][n] += 1

    for t in range(5):
        if count[t][1] !=0 :
            markov_marix[t, :] /= count[t][1]
    print(markov_marix)
   
    m = [0.3,0.35,0.18,0.12,0.05]
    for iii in range(50):
        res = np.dot(m,markov_marix)
        m = res
    #print(i)
    #print(res)
 
    
