#!/bin/sh

set -e
set -o pipefail

/usr/lib/jvm/java-1.8-openjdk/jre/bin/java -jar /knox/bin/gateway.jar

