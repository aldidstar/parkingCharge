#Running

first, yarn install

second, make mongoose database with name testKeda

third, yarn start to running app

for test -> yarn test

#API

Create vehicle to generate price = {"type": "", "name": "","platNumber": "", "start": "", "end": ""} -> http://localhost:3000/api/transaction

Get List and Search vehicle -> http://localhost:3000/api/transaction/search

#Skenario testing

1. mendapatkan semua daftar transaction dengan pencarian type dan start parkir

2. menambahkan satu transaction parkir selama 1 jam 1 menit 2 detik mobil membayar 10000

3. menambahkan satu transaction parkir selama 1 jam 56 detik mobil membayar 5000

4. menambahkan satu transaction parkir selama 1 hari 6 jam mobil membayar 110.000
