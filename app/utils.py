
def prepMyCSV(csv_dict):
    """ PREP DATA FROM CSV-URL TO BEA-LIKE JSON FORMAT"""
    pass
    names = [
        d['name'] for d in csv_dict
    ]

    for d in csv_dict:
        del d['name']

    myList = []

    for (d, nm) in zip(csv_dict, names):
        pass
        for k, v in (d.items()):
            myList.append({
                'GeoName': nm,
                'TimePeriod': k,
                'DataValue': v,
            })
    
    # print(myList)
    return myList
