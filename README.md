## Documentation

Forecast API finds the best possible time for converting money from one currency to another. 
This project contains of 2 packages: forecast-api and forecast-fe. 

## Development

To run both projets you have to execute these separately. 

## Forecast API

In project root run the following commands.

Go to sub project

`cd forecast-api`

Copy env file

`cp .env-example .env`

Install packages

`yarn install`

Run application

`yarn start`

Forecast API is now available in `http://localhost:3000` (be sure that port 3000 is available in your local machine)

Run linter

`yarn lint`

Run tests

`yarn test`

## Forecast FE

In project root run the following commands.

Go to sub project

`cd forecast-fe`

Copy env file

`cp .env-example .env`

Install packages

`yarn install`

Run application

`yarn serve`

Forecast FE is now available in `http://localhost:8080` (be sure that port 8080 is available in your local machine)

## Task suggestion

Add confidence value to your forecast for every day/week. Basically if user wants forecast for 2 weeks based on the last 2 weeks then its possible to 
calculate confidence value the time before 2 weeks. 

For example, if I want a forecast for entire May. I get it based on March. 
I calculate the forecast for March(based on the February) and compare it to real currency rates in March. 
Let the developer decide how this confidence value is calculated.
