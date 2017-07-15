#!/usr/bin/env bash

if [ "$1" == "-b" ]; then
    docker build -t mrtn/startdjango .
fi

SRC_VOLUME="<your source directory>"

docker run -d -p 8000:8000 --name test_temy -v $SRC_VOLUME:/src mrtn/startdjango
