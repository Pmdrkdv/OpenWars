#!/bin/sh
set -eu

cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

mkdir -p build/classes
javac -encoding UTF-8 -d build/classes Main.java net/*.java Message/*.java
exec java -cp build/classes Main "$@"
