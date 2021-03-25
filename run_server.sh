#!/bin/bash

Err=./logs/log-error; 
Info=./logs/log-info; 

tar -cvf ${Err}-$(date +%F'-'%T).tar ${Err}.log 
tar -cvf ${Info}-$(date +%F'-'%T).tar ${Info}.log 

nodemon ./server.js

