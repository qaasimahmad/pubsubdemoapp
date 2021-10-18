#!/bin/sh
node app/publishServer.js &
node app/subscriberServer.js