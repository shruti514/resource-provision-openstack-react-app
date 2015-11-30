- might need  ---> npm install -g babel babel-preset-react
- might need ---> npm install -g nodemon
- Steps
    - npm install
    - Open two terminals
    - In first terminal do --> gulp
    - In second terminal do -->  npm run watch
    - access application on http://localhost:3000/create

Database Creation: 
    - create a folder named "database" under main project dir (if dir already present, clear all the files in the dir)
    - run mongod to link the database to our project:
      root@ip-172-31-12-26:/home/ubuntu# mongod --smallfiles --dbpath /home/ubuntu/CrowdTester/database
    - run mongo client and use CMPE283 database: 
       ubuntu@ip-172-31-12-26:~$ mongo
       MongoDB shell version: 2.4.9
      > use CMPE283
        switched to db CMPE283


