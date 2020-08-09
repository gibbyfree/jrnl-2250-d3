import csv
from datetime import datetime
from collections import OrderedDict

# Read from the raw .csv file.
reader = csv.DictReader(open('../data/wordcount-and-headlines.csv'))
result = {}
for row in reader:
    key = row.pop('date')
    dtKey= datetime.strptime(key, "%m/%d/%Y").strftime("%m/%d/%Y")
    if dtKey in result:
        result[dtKey] += int(row.pop('word count'))
    else:
        result[dtKey] = int(row.pop('word count'))
# Sort dates chronologically.
ordered_result = OrderedDict(sorted(result.items(), key=lambda x:datetime.strptime(x[0], '%m/%d/%Y')))

# Make the result dict into something more csv.writer friendly.
resultList = [["date", "wordcount"]]
for key in ordered_result:
    resultList.append([key, result[key]])

# Write to the new .csv file.
outFile = open('../data/wordcount-by-date.csv', 'w')
with outFile:
    writer = csv.writer(outFile)
    writer.writerows(resultList)