# Application to generate automatically prediction

This application uses the delivered model from the data science development and exposes it through an api, where an initial file of demanded prediction is given into a "inputs" folder and the results of applying the prediction process are placed into a "outputs" folder (both folder are inside the app folder of this project) 

To replicate this solution it is important to:

- Get intalled docker on the instance where the process will run
- Download this GitHub project on the instance
- execute "docker-compose up -d" from the power shell located into the folder project
- Go to http://localhost/

The http page will gide the user to get the predictions

By maintaining this containers working all the time, implies that always will be available the services that provide the predictions

The needed services for building this application are the following:

- Python version 3
- php 8.1 -Apache
- mysql 8.0

And all is building as:

html -> js -> python api -> mysql
           -> php api

--Author: William Uyasan