# mongo_workload_discovery
This script is intended for MongoDB to CosmosDB API for MongoDB Migrations.

This Javascript file can be used to Display the Database and Collection details in Mongo Instance. It also gives an assessment report of incompatibilities with CosmosDB.
It gives the collection in sorted format as per its size(descending).

Usage:
mongo "<CONNECTION_STRING>" --eval "var DATABASE_NAME='<DATABASE_NAME>'" Mongo_Source_Discovery.js>Source_Workload_details.txt

* For shard clusters provide mongos connection string.

