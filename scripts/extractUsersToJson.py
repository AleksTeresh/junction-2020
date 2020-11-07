import csv, json

for i in range(1, 14):
  data = []
  with open('../data/transactions.csv') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=';')
    for idx, row in enumerate(spamreader):
      if idx == 0 or len(row) < 14:
        continue
      if int(row[5]) == i:
        data.append({
          "category": row[0],
          "timestamp": row[1],
          "arvopvm": row[2],
          "kirjauspvm": row[3],
          "maksupvm": row[4],
          "accountNumber": int(row[5]),
          "amount": float(row[6]),
          "saldo": float(row[7]),
          "vientiselitekd": int(row[8]),
          "taplajikd": int(row[9]),
          "bicSaaja": row[10],
          "viite": int(row[11]),
          "ibanSaaja": int(row[12]),
          "counterpartyAccountId": int(row[13]),
        })

  with open("../data/dude%s.json" % i, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
