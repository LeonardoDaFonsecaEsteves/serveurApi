#!/bin/bash
strErr=/logs/log-error; 
strInfo=/logs/log-info; 

tar -cvf ${strErr}.log ${strErr}-$(date +%F'-'%T).tar  
tar -cvf ${strInfo}.log ${strInfo}-$(date +%F'-'%T).tar 

nodemon ./server.js

