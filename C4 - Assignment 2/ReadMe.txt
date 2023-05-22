
This is the same app I built for C2 course, its called Railman app which can be used for catering services for railways.
It as monolith application then, and now I am converting it into 3 micro services called Users, Restaurants, and Orders.
Users will serve user details about registerd users.
Restaurants will serve all the restuarants available and their menu items.
Orders will serve order details and Cart services.
For simplicity I am using Node.js to build the apps and NeDB for simple document based db.
All microservices uses REST APIs for communication purposes.

Below are the modules used for all the microservices in use. The corresponding microservices will processes these commands in Dockerfile.

Users
npm init
npm install express
npm install path
npm install nedb
port: 3000

Restaurants
npm init
npm install express
npm install path
npm install nedb
port: 3001

Orders
npm init
npm install express
npm install path
npm install nedb
port: 3002


Demo url:
Users git repo: https://github.com/ShivaFSE/FSE-Group9-Assignments/tree/main/C4%20-%20Assignment%202/Users
Restaurants git repo: https://github.com/ShivaFSE/FSE-Group9-Assignments/tree/main/C4%20-%20Assignment%202/Restaurants
Orders git repo: https://github.com/ShivaFSE/FSE-Group9-Assignments/tree/main/C4%20-%20Assignment%202/Orders


Docker commands used: 
cd Users
docker build . -t 2022cfse002_rail_man_c4_2_users
docker run -it 2022cfse002_rail_man_c4_2_users
 
cd Restaurants
docker build . -t 2022cfse002_rail_man_c4_2_restaurants
docker run -it 2022cfse002_rail_man_c4_2_restaurants

cd Orders
docker build . -t 2022cfse002_rail_man_c4_2_orders
docker run -it 2022cfse002_rail_man_c4_2_orders
