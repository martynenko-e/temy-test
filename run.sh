#!/usr/bin/env bash

if [ "$1" == "-b" ]; then
    docker build -t mrtn/startdjango .
fi

SRC_VOLUME="/Users/yevhenmartynenko/_projects/mrtn_test_temy/backend_src"

docker run -d -p 8888:8000 --name test_temy -v $SRC_VOLUME:/src mrtn/startdjango
#docker exec -it blog_site main-admin startproject main