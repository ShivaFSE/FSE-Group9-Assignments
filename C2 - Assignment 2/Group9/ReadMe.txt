This project only has React UI components with out a backend, hence it takes help from json-server npm module to mock backend data. To start backend mocking run following command which will start the json server on port 8000. And then start the actual React app using "npm start".

To start the json-server locally
npx json-server --port 8000 --routes routes.json --watch db.json

To start the React app
npm start



EPIC 1 Assumptions:
1. /api/authentication/login POST API has been replaced by /api/authentication/registration GET API to consume json-server mock API. Once the backend is ready it will be replaced by the intended method.
2. Because the username is sent as attribute in GET API, they are case sensitive.
3. Because the password is sent as attribute in GET API, all the special charecters are not supported. 



EPIC 2, User Story 2.2 Assumptions:
1. Because we are using mock json server, the restaurant filtering shows the results only after complete exact location is entered in input field(including case).






