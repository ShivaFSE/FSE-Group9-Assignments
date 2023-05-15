
Docker link: https://hub.docker.com/search?q=2022cfse002_rail_man_c4_1
Git Hub link: https://github.com/ShivaFSE/FSE-Group9-Assignments/tree/main/C4%20-%20Assignment%201


Steps:
1. Install Docker app on macOS from https://docs.docker.com/desktop/install/mac-install/

2. Create a folder 2022cfse002_rail_man_c4_1

3. Create a node project using npm init

4. Copy hello world code into app.js file

5. Run "node app.js" command to check if it starts the server, now the app is ready.

6. We need to create the docker image for this app

7. Create Dockerfile and add the YAML needed for the image

8. Run the below command to create the docker image
docker build . -t 2022cfse002_rail_man_c4_1

9. Now go to the Docker Hub website and login

10. Create a Repository called 2022cfse002_rail_man_c4_1

11. From Terminal on macOS, login into docker using below command
docker login 2022cfse002_rail_man_c4_1 -u <username> -p <password>

12. Optionally you can tag your image with follwing command
docker tag 2022cfse002_rail_man_c4_1 kshivaking/2022cfse002_rail_man_c4_1:v1.0

13. The tag is created already in Docker Hub from above command, and can be found at https://hub.docker.com/search?q=2022cfse002_rail_man_c4_1

14. Now we can push the Docker image to Docker Hub using below command
docker push kshivaking/2022cfse002_rail_man_c4_1:v1.0

15. Now this Docker image can be downloaded into your machine using below command
docker pull kshivaking/2022cfse002_rail_man_c4_1:v1.0

16. Now the mac shows this Docker Image when the below command is run
docker image ls

