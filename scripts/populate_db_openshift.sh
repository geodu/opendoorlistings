mongoimport --headerline --type csv \
--host $OPENSHIFT_MONGODB_DB_HOST \
--port $OPENSHIFT_MONGODB_DB_PORT \
-d $OPENSHIFT_APP_NAME \
-c listings \
--username $OPENSHIFT_MONGODB_DB_USERNAME \
--password $OPENSHIFT_MONGODB_DB_PASSWORD \
--file ~/app-root/repo/listing-details.csv
