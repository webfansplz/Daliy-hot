#!/bin/bash
curPath=`cd $(dirname $0);pwd -P`
docker run --name todayHot -d -v $curPath:/workspace -p 8888:8888 today-hot