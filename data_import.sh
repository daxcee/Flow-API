#!/bin/sh

mongo flow --eval "db.dropDatabase()"

FILES=samples/*.json
REP=
for f in $FILES
do
  echo "Importing file $f..."
  COLLECTION=${f/samples\/$REP}
  COLLECTION=${COLLECTION/.json/$REP}
  mongoimport --db flow --collection $COLLECTION  --type json --file $f --jsonArray
  echo "Done $f"
done
