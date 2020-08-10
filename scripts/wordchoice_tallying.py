import csv
from collections import OrderedDict

list_of_csvs = ['word-choice-protesters', 'word-choice-protests']

# Read from the raw .csv files.
for sheet in list_of_csvs:
    reader = csv.DictReader(open('../data/' + sheet + '.csv'))
    result = {}
    for row in reader:
        key = row.pop('term')
        if key in result:
            # Add to the tally for this term.
            result[key] = result[key] + 1
        else:
            result[key] = 1
    # Sort terms from greatest to least use.
    sorted_result = OrderedDict(sorted(result.items(), key=lambda x: x[1], reverse=True))
    # Reformat the result dict.
    resultList = [["term", "uses"]]
    for key in sorted_result:
        resultList.append([key, result[key]])
    # Write to the new .csv file.
    outFile = open('../data/' + sheet + '-tally.csv', 'w')
    with outFile:
        writer = csv.writer(outFile)
        writer.writerows(resultList)