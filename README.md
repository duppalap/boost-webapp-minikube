# Develop and Build React App With NodeJS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:9000](http://localhost:9000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Deploy Amp4Boost React App to Node Server on EC2 instance

## Setup the EC2 instance

1. If you are on windows use GitBash to launch the EC2 instance.

```
cd <directory where .pem file is present>
ssh -i "react-amp.pem" ec2-user@ec2-35-87-112-7.us-west-2.compute.amazonaws.com
```

2. Clone the repository, on which your React code is present, and bring it on EC2 server

In order to clone the code from a private repository you need to add a ssh key to your Github account.

Follow the steps in this link:
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

3. To install git on the machine

```
sudo yum install git -y
```

4. Make sure NodeJS v16.4.0 is installed on the machine using Node Version Manager(nvm)

```
nvm install v16.14.0
```

5. Run this command to install the node modules necessary for running the application

```
npm ci
```

6. Run this command to build an optimized production version

```
npm run build
```

7. Install a process manger to run the node server as a background process

```
npm install -g pm2
```

8. Run the Node server

```
pm2 start server.js
```

### Run it On Docker

1. Create a Dockerfile

2. Run the following command to build a docker image with name "boost-webapp-img"

```
docker build -t duppalapati3/boost-webapp-img .
docker image ls
```

3. Now using the above image create a docker container

```
docker run --env-file ./.env -d -p 9000:3000 --name boost-webapp duppalapati3/boost-webapp-img
docker ps -all
```

---

**NOTE**

If you want to check the contents of the running docker conatiner use the following command

```
docker exec -it duppalapati3/boost-webapp sh
```

---

### Publishing the Docker Image

```
docker push duppalapati3/boost-webapp-img
```

### Create a Kubernetes Deployment object

```
kubectl apply -f deployment.yaml
```

### Create a Kubernetes Service object

```
kubectl apply -f service.yaml
```
