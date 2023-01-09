# Square-Food
Backend Part of an online food ordering system

##Instructions
Follow instructions in order to run project:
### Step 1
Clone project and run the command "npm install" inside project's directory.

### Step 2
Make sure you have docker installed on your computer. If you are missing docker follow the instructions provided here: https://docs.docker.com/get-docker/

### Step 3
Run the command "docker run -d -p 27017:27017 --name mongoContainer mongo:latest" in order to download the MongoDB image and mount in to a docker container and start it eventually.

### Step 4
After the database is running, type the command "npm start" and go to localhost:8080 in order to see the application.

Now go ahead and add an order as a customer and view it as the restaurant owner. Please be free to provide any feedback.

Known issues:
- An empty order will redirect to home page
- Order completion sometimes needs a refresh
- Design needs rework
