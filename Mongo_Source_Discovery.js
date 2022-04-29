shardk=rs.isMaster().msg;
if(shardk=="isdbgrid"){
mdb=db.getSiblingDB("config");
a=mdb.shards.find({},{_id: 1,host: 1}).toArray();
print("\n");
print("**IMPORTANT**THIS CONTAINS ONLY WORKLOAD DETAILS.RUN DMA REPORT TO ASSESS UNSUPPORTED FEATURES**","\n\n");
print("***************SHARDED MONGO CLUSTER WITH",a.length,"SHARDS******************","\n")
space1='\xa0'.repeat(30);
print("SHARD_NAME",space1,"SHARD_REPLICA_DETAILS")
for(i=0;i<a.length;i++){
t1=a[i]._id;
t2=a[i].host;
val1=a[i]._id.length;
val2=40-val1;
space2='\xa0'.repeat(val2);
print(t1,space2,t2)
}
print("\n");
b=mdb.databases.find({},{_id: 1,primary: 1,partitioned: 1}).toArray();
space99='\xa0'.repeat(27);
space3='\xa0'.repeat(36);
print("DATABASE_NAME",space99,"PRIMARY_SHARD",space3,"SHARD_ENABLED")
for(i=0;i<b.length;i++){
t1=b[i]._id;
val3=b[i]._id.length;
val5=40-val3;
space4='\xa0'.repeat(val5);

t2=b[i].primary;
val4=b[i].primary.length;
val6=49-val4;
space5='\xa0'.repeat(val6);
t3=b[i].partitioned;
print(t1,space4,t2,space5,t3)
}
print("\n");
c=mdb.collections.find({},{_id: 1,key: 1,unique: 1}).toArray();
space6='\xa0'.repeat(31);
space7='\xa0'.repeat(40);
print("NAMESPACE",space6,"SHARD_KEY",space7,"IF_UNIQUE")
for(i=0;i<c.length;i++){
t1=c[i]._id;
t2=c[i].key;
t4=JSON.stringify(t2);
t3=c[i].unique;
val7=t1.length;
val8=t4.length;
val9=40-val7;
val10=49-val8;
space8='\xa0'.repeat(val9);
space9='\xa0'.repeat(val10);
print(t1,space8,t4,space9,t3)
}


print("\n","*****************OS-DETAILS*********************")

h1=db.hostInfo().system.numCores;
h2=db.hostInfo().system.memSizeMB;
print("Vcore=",h1," Memory=",h2,"MB")
h3=db.hostInfo().os.type;
h4=db.hostInfo().os.name;
h5=db.hostInfo().os.version;
print(h3);
print(h4);
print(h5,"\n");
print("****************WORKLOAD-DETAILS****************","\n")
l=db.version()
print("MongoDB VERSION: ",l,"\n\n")


db.adminCommand("listDatabases").databases.map(function(z) {
if(z.name!=="admin" && z.name!=="config" && z.name!=="local")
{
mdb=db.getSiblingDB(z.name);
t2=mdb.stats().dataSize;
t3=t2/(1024*1024*1024);
t3=t3.toFixed(5);
c1=mdb.getCollectionNames();
c2=c1.length;
v1=mdb.getCollectionInfos({"type": "view"});
v2=v1.length;
print(z.name," TotalSize:",t3,"GB"," Collections:",c2,"Views:",v2)

print("============================================================")
spacex1='\xa0'.repeat(25);
spacex2='\xa0'.repeat(2);
print("COLLECTION_NAME",spacex1,"SIZE_IN_MB",spacex2,"NO_OF_RECORDS",spacex2,"IS_CAPPED",spacex2,"NO_OF_INDEXES",spacex2,"INDEX_SIZEIN_MB",spacex2,"AVG_DOC_SIZEIN_KB",spacex2,"SHARD_ENABLED")

var colln=mdb.getCollectionNames().map(function(a) {
  try{
  b=mdb[a].stats().size;
  n=mdb[a].stats().count;
  u=mdb[a].stats().capped;
  v=mdb[a].stats().nindexes;
  w=mdb[a].stats().totalIndexSize;
  o=mdb[a].stats().avgObjSize;
  s=mdb[a].stats().sharded;
  }
  catch (e){
  s=0;
  b=0;
  n=0;
  u=0;
  v=0;
  w=0;
  o=0;
  print("Error in object - ",a,"Error Message",e)
  }
  
  return [a,b,n,u,v,w,o,s];
});
for (i=0;i<colln.length;i++){
  for (j=i+1;j<colln.length;j++){
      if(colln[i][1] < colln[j][1])
       {
       temp1=colln[i][0];
       temp2=colln[i][1];
       temp3=colln[i][2];
       temp4=colln[i][3];
       temp5=colln[i][4];
       temp6=colln[i][5];
       temp7=colln[i][6];
       temp8=colln[i][7];
       colln[i][0]= colln[j][0];
       colln[i][1]= colln[j][1];
       colln[i][2]= colln[j][2];
       colln[i][3]= colln[j][3];
       colln[i][4]= colln[j][4];
       colln[i][5]= colln[j][5];
       colln[i][6]= colln[j][6];
       colln[i][7]= colln[j][7];
       colln[j][0]= temp1;
       colln[j][1]= temp2;
       colln[j][2]= temp3;
       colln[j][3]= temp4;
       colln[j][4]= temp5;
       colln[j][5]= temp6;
       colln[j][6]= temp7;
       colln[j][7]= temp8;
       }
   }
c=colln[i][0];
d=(colln[i][1])/(1024*1024);
d=d.toFixed(4);
r=colln[i][2];
g1=colln[i][3];
g2=colln[i][4];
g3=(colln[i][5])/(1024*1024);
g3=g3.toFixed(4);
g4=(colln[i][6])/1024;
g4=g4.toFixed(4);
g5=colln[i][7];
valx1=colln[i][0].length;
valx2=d.toString().length;
valx3=50-(valx1+valx2); 
spacex3='\xa0'.repeat(valx3);
spacex4='\xa0'.repeat(2);
valx4=colln[i][2].toString().length;
valx5=5;
valx6=24-(valx4+valx5);
spacex5='\xa0'.repeat(valx6);
valx7=g2.toString().length;
valx8=g3.toString().length;
valx9=30-(valx7+valx8);
spacex6='\xa0'.repeat(valx9);
valx11=g4.toString().length;
valx12=19-valx11;
spacex7='\xa0'.repeat(valx12);
print(c,spacex3,d,spacex4,r,spacex5,g1,spacex4,g2,spacex6,g3,spacex7,g4,spacex4,g5);
}
colln=null;
print("\n")
}});
}
else{
print("***************CLUSTER-DETAILS******************","\n")
try{
k1=rs.isMaster().hosts;
k2=k1.length;
k3=rs.isMaster().setName;
}
catch (e){
k1=0;
k2=0;
k3=0;
}
if(k2>0){
print("REPLICASET WITH",k2,"MEMBERS =",k3)
for(f1=0;f1<k2;f1++){
k4=rs.status().members[f1].stateStr;
if(k4=="PRIMARY"){
print("PRIMARY =",rs.status().members[f1].name)
k5=f1;
}}
for(f1=0;f1<k2;f1++){
if(f1!==k5){
print("SECONDARY =",rs.status().members[f1].name)
}}
print("\n");
}
if(k2==0){
print("STANDALONE INSTANCE","\n")
}

print("*****************OS-DETAILS*********************")

h1=db.hostInfo().system.numCores;
h2=db.hostInfo().system.memSizeMB;
print("Vcore=",h1," Memory=",h2,"MB")
h3=db.hostInfo().os.type;
h4=db.hostInfo().os.name;
h5=db.hostInfo().os.version;
print(h3);
print(h4);
print(h5,"\n");
print("****************WORKLOAD-DETAILS****************","\n")
l=db.version()
print("MongoDB VERSION: ",l,"\n\n")

db.adminCommand("listDatabases").databases.map(function(z) {

if(z.name!=="admin" && z.name!=="config" && z.name!=="local")
{
mdb=db.getSiblingDB(z.name);
t2=mdb.stats().dataSize;
t3=t2/(1024*1024*1024);
t3=t3.toFixed(5);
t4=mdb.stats().collections;
t5=mdb.stats().views;
print(z.name," TotalSize:",t3,"GB"," Collections:",t4," Views:",t5)
print("============================================================")
space1='\xa0'.repeat(25);
space2='\xa0'.repeat(2);
print("COLLECTION_NAME",space1,"SIZE_IN_MB",space2,"NO_OF_RECORDS",space2,"IS_CAPPED",space2,"NO_OF_INDEXES",space2,"INDEX_SIZEIN_MB",space2,"AVG_DOC_SIZEIN_KB")

var colln=mdb.getCollectionNames().map(function(a) {
  try{
  b=mdb[a].stats().size;
  n=mdb[a].stats().count;
  u=mdb[a].stats().capped;
  v=mdb[a].stats().nindexes;
  w=mdb[a].stats().totalIndexSize;
  o=mdb[a].stats().avgObjSize;
  }
  catch (e){
  b=0;
  n=0;
  u=0;
  v=0;
  w=0;
  o=0;
  print("Error in object - ",a,"Error Message",e)
  }
  
  return [a,b,n,u,v,w,o];
});
for (i=0;i<colln.length;i++){
  for (j=i+1;j<colln.length;j++){
      if(colln[i][1] < colln[j][1])
       {
       temp1=colln[i][0];
       temp2=colln[i][1];
       temp3=colln[i][2];
       temp4=colln[i][3];
       temp5=colln[i][4];
       temp6=colln[i][5];
       temp7=colln[i][6];
       colln[i][0]= colln[j][0];
       colln[i][1]= colln[j][1];
       colln[i][2]= colln[j][2];
       colln[i][3]= colln[j][3];
       colln[i][4]= colln[j][4];
       colln[i][5]= colln[j][5];
       colln[i][6]= colln[j][6];
       colln[j][0]= temp1;
       colln[j][1]= temp2;
       colln[j][2]= temp3;
       colln[j][3]= temp4;
       colln[j][4]= temp5;
       colln[j][5]= temp6;
       colln[j][6]= temp7;
       }
   }
c=colln[i][0];
d=(colln[i][1])/(1024*1024);
d=d.toFixed(4);
r=colln[i][2];
g1=colln[i][3];
g2=colln[i][4];
g3=(colln[i][5])/(1024*1024);
g3=g3.toFixed(4);
g4=(colln[i][6])/1024;
g4=g4.toFixed(4);
val1=colln[i][0].length;
val2=d.toString().length;
val3=50-(val1+val2); 
space3='\xa0'.repeat(val3);
space4='\xa0'.repeat(2);
val4=colln[i][2].toString().length;
val5=5;
val6=24-(val4+val5);
space5='\xa0'.repeat(val6);
val7=g2.toString().length;
val8=g3.toString().length;
val9=30-(val7+val8);
space6='\xa0'.repeat(val9);
val11=g4.toString().length;
val12=19-val11;
space7='\xa0'.repeat(val12);
print(c,space3,d,space4,r,space5,g1,space4,g2,space6,g3,space7,g4);
}
colln=null;
print("\n")
}});
}