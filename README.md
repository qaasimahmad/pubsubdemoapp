# Welcome

Welcome to __PubSubApp__ break down

*Technologies*

- Nodejs(version > 8.0)

- Mocha

- Chai

- ExpressJs(Web Server)

- DB(Elasticsearch)

- eslint

*File Structure*

- APP content in app directory

* app

    * config

        * config

    * controllers

    * libraries

    * routes(Defines all endpoints to Curl in this App)

    * Dockerfile

    * services

    - start-server.sh(Entry Script)

## To run the app manually

**Install all dependencies**

```
npm install
```

**Install ElasticSearch**
* Install directly on your machine(Mac os, Windows, Linux):
 - This approach will make the instance avaialble on `localhost:9200` by default.


**Start App**
- At the base of the project, run the command below
```
npm run start
```
- Two servers will start at once. (publisher and subscriber)
- Publisher runs on Port 2300
- Subsciber(s) runs on Port 2400


**Docker Approach**

- install docker on your machine. Mac users could install `Docker Desktop` for ease of use and management.

```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.0

docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.0

```
* Be sure that elasticsearch is running before starting the app to avoid unnecessary error meesages.
* No need to do `npm install` if you will be using the `docker-compose` to run the app.

# Starting the app via docker
```
docker-compose build : To build the current state of the app.
docker-compose run : To run the app.
```


## Run Test

```
npm run test
```

## .env file

* Add these to the .env file

```
export APP_BASE_URL=http://localhost
export SUBSCRIBER_PORT=2400
export PUBLISHER_PORT=2300
export ELASTIC_URL=http://localhost:9200

run source .env on your shell to make those variables available for use on your machine
```

## Things To Note
# Subscribers: These are just listeners that respond to messages sent to them by the publisher.
- In this codebase, In order for the subscriber to receive the request, Http request using `axios` is made to a subscriber by the publisher.
- Since it's a demo, I have limited the number of subscribers to `2` to be able to manage the http calls.
- There are `two subscriber urls` over which the publisher can Ping the subscribers.
- On receiving an http request, a log is displayed to indicate that it has indeed been notified.
- The subscribers have been define in this app as `routes` that can be called via `POST` method.

# Subscription : 
- This is also represented by a route.
- A subscription request is made via an http call to the `/subscribe/:topic` route with a topic as a path param.
- Worth mentioning is that a `topic` can be `subscribed to` *without* a `subscriberUrl`. Hence I have made `url` not required in the request and instead it's defaulted to `null`.
- In the end, this route creates a *relationship* between the `topic` and the `subscriberUrl`.

# Publish:
- Represented by a route
- A publish request is made via an http call to `/publish/:topic` route with toic as a path param.
- The publisher notifies the `subscriber endpoint` which `matches` the `topic`; 
- So if a record exists say topic = 'topic1', subscriberUrl = 'http://localhost:2400/alpha' (`alpha`) is a name of one of the subscriber's route(`/alpha`). A pblisher would only PING the exact subscribeUrl as indicated above(`http://localhost:2400/alpha`). 
- Also if a topic belongs to `more than one` *subscriberUrl* say subscriberUrl = `http://localhost:2400/beta` (`beta`) is a name of another subscriberUrl and `http://localhost:2400/alpha`, `two` requests are made to `each` of the subscribers to `Notify them`.
- If a topic to be published to does not have a subscriberUrl associated to it, a `successful response` is still returned.

# Tests:
- Check out the test directory.


# POSTMAN COLLECTION LINK
  + [checkout the postman collection here](https://www.getpostman.com/collections/4912bd30174f05425883)

===============================================================================================================
# Routes
Name        | EndPoint(s)                       
---------:  | :--------------------------------                    
publisher   | /publish/:topic (POST)             
subscriber  | /alpha  (POST), /beta (POST)
subscription| /subscribe/:topic (POST)


# subscription
resource: "http://localhost:2300/subscribe/topic4"

_Sample POST request to create New Client

~~~~
url: http://localhost:2400/beta
~~~~
*Required Fields*
url

_Sample Response
~~~~
{
    "error": false,
    "message": "subscription to topic topic4 successful",
    "data": {
        "url": "http://localhost:2400/beta",
        "topic": "topic4"
    }
}
~~~~

# publish
resource: "http://localhost:2300/publish/topic4"

_Sample POST request 

~~~~
message: "Hi publisher. gotcha"
~~~~

*Required Fields*
message

_Sample Response
~~~~
{
    "error": false,
    "message": "Successfully Published to subscriber http://localhost:2400/beta"
}
~~~~

`Please check the postman collection for the complete details`

**END**
