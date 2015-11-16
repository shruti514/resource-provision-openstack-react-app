- might need  ---> npm install -g babel babel-preset-react
- Steps
    - npm install
    - Open two terminals
    - In first terminal do --> gulp
    - In second terminal do -->  npm run watch
    - access application on http://localhost:3000/create

Database Creation:
    - create a folder named "database" under main project.
    - run mongod to link the database to our project: 
      F:\MongoDB\bin>mongod.exe --dbpath F:\GitCMPE283\CMPE-283-react-app\database\
    - run mongo client and use CMPE283 database:
      F:\MongoDB\bin>mongo
      MongoDB shell version: 3.0.7
      connecting to: test
      > use CMPE283
      switched to db CMPE283
