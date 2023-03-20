VARIABLE_DATABASE= DATABASE_NAME;
print("\n##################################################### MONGODB_SOURCE_WORKLOAD_&_ASSESSMENT_REPORT #####################################################\n\n");

shardk=rs.isMaster().msg;
if(shardk=="isdbgrid"){
mdb=db.getSiblingDB("config");
a=mdb.shards.find({},{_id: 1,host: 1}).toArray();
print("\n");

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
if(t1==VARIABLE_DATABASE)
{
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
}
print("\n");
c=mdb.collections.find({},{_id: 1,key: 1,unique: 1}).toArray();
space6='\xa0'.repeat(31);
space7='\xa0'.repeat(40);
print("NAMESPACE",space6,"SHARD_KEY",space7,"IF_UNIQUE")
for(i=0;i<c.length;i++){
t1=c[i]._id;
if(!t1.match("config.*") && !t1.match("admin.*")){
try{
if(t1.match(""+VARIABLE_DATABASE+".*")){
if(!c[i].dropped){
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
}}}
catch (e){
t2=null;
t4=null;
t3=null;
}

}
}


print("\n\n")

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


mdb=db.getSiblingDB(VARIABLE_DATABASE);
t2=mdb.stats().dataSize;
t3=t2/(1024*1024*1024);
t3=t3.toFixed(5);
c1=mdb.getCollectionNames();
c2=c1.length;
v1=mdb.getCollectionInfos({"type": "view"});
v2=v1.length;

print(VARIABLE_DATABASE," TotalSize:",t3,"GB"," Collections:",c2,"Views:",v2)

spacex1='\xa0'.repeat(50);
spacex2='\xa0'.repeat(2);

print("COLLECTION_NAME",spacex1,"SIZE_IN_MB",spacex2,"NO_OF_RECORDS",spacex2,"IS_CAPPED",spacex2,"INDEX",spacex2,"INDEX_SIZEIN_MB",spacex2,"AVG_DOC_SIZEIN_KB",spacex2,"SHARD_ENABLED")

var colln=mdb.getCollectionNames().map(function(a) {
try{
vcntr=mdb[a].stats().size;
}
catch (e){
vcntr=null;
}
if(vcntr!=null)
{
  try{
  b=mdb[a].stats().size;
  n=mdb[a].stats().count;
  u=mdb[a].stats().capped;
  if(u)
  {
   u=" true"
  }
  v=mdb[a].stats().nindexes;
  w=mdb[a].stats().totalIndexSize;
  avg=mdb[a].stats().avgObjSize;
  s=mdb[a].stats().sharded;
  }
  catch (e){
  s=0;
  b=0;
  n=0;
  u=0;
  v=0;
  w=0;
  avg=0;
  print("Error in object - ",a,"Error Message",e)
  }
}
if(vcntr==null)
{
  b=0;
  n=0;
  u=" VIEW";
  v=0;
  w=0;
  avg=0;
}

  return [a,b,n,u,v,w,avg,s];
});
for (i=0;i<colln.length;i++){
  for (j=i+1;j<colln.length;j++){
      if(colln[i][2] < colln[j][2])
       {
       temp1=colln[i][0];
       temp2=colln[i][1];
       temp3=colln[i][2];
       temp4=colln[i][3];
       temp5=colln[i][4];
       temp6=colln[i][5];
       temp7=colln[i][6];
       temp8=colln[i][7];
       temp9=colln[i][7];
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
valx3=75-(valx1+valx2);
spacex3='\xa0'.repeat(valx3);
spacex4='\xa0'.repeat(2);
valx4=colln[i][2].toString().length;
valx5=5;
valx6=24-(valx4+valx5);
spacex5='\xa0'.repeat(valx6);
valx7=g2.toString().length;
valx8=g3.toString().length;
valx9=22-(valx7+valx8);
spacex6='\xa0'.repeat(valx9);
valx11=g4.toString().length;
valx12=19-valx11;
spacex7='\xa0'.repeat(valx12);
print(c,spacex3,d,spacex4,r,spacex5,g1,spacex4,g2,spacex6,g3,spacex7,g4,spacex4,g5);
}
colln=null;
print("\n")
} else{

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
k5=rs.status().members[f1].name;
print(k5," ",k4)
}
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


mdb=db.getSiblingDB(VARIABLE_DATABASE);
t2=mdb.stats().dataSize;
t3=t2/(1024*1024*1024);
t3=t3.toFixed(5);
t4=mdb.stats().collections;
t5=mdb.stats().views;



print(VARIABLE_DATABASE," TotalSize:",t3,"GB"," Collections:",t4," Views:",t5)


space1='\xa0'.repeat(50);
space2='\xa0'.repeat(2);

print("COLLECTION_NAME",space1,"SIZE_IN_MB",space2,"NO_OF_RECORDS",space2,"IS_CAPPED",space2,"INDEX",space2,"INDEX_SIZEIN_MB",space2,"AVG_DOC_SIZEIN_KB")

var colln=mdb.getCollectionNames().map(function(a) {
try{
vcntr=mdb[a].stats().size;
}
catch (e){
vcntr=null;
}
if(vcntr!=null)
{
  try{
  b=mdb[a].stats().size;
  n=mdb[a].stats().count;
  u=mdb[a].stats().capped;
  if(u)
  {
   u=" true"
  }
  v=mdb[a].stats().nindexes;
  w=mdb[a].stats().totalIndexSize;
  avg=mdb[a].stats().avgObjSize;
  }
  catch (e){
  b=0;
  n=0;
  u=0;
  v=0;
  w=0;
  avg=0;
  print("Error in object - ",a,"Error Message",e)
  }
}
if(vcntr==null)
{
  b=0;
  n=0;
  u=" VIEW";
  v=0;
  w=0;
  avg=0;
}
  return [a,b,n,u,v,w,avg];
});
for (i=0;i<colln.length;i++){
  for (j=i+1;j<colln.length;j++){
      if(colln[i][2] < colln[j][2])
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
val3=75-(val1+val2);
space3='\xa0'.repeat(val3);
space4='\xa0'.repeat(2);
val4=colln[i][2].toString().length;
val5=5;
val6=24-(val4+val5);
space5='\xa0'.repeat(val6);
val7=g2.toString().length;
val8=g3.toString().length;
val9=22-(val7+val8);
space6='\xa0'.repeat(val9);
val11=g4.toString().length;
val12=19-val11;
space7='\xa0'.repeat(val12);
print(c,space3,d,space4,r,space5,g1,space4,g2,space6,g3,space7,g4);
}
colln=null;
print("\n")
}
print("\n\n****************************** ALL_INDEX_LIST ********************************\n");

mdb=db.getSiblingDB(VARIABLE_DATABASE);
print("\n### ",VARIABLE_DATABASE," ###\n");
mdb.getCollectionNames().map(function(a) {
try{
vcntr1=mdb[a].stats().size;
}
catch (e){
vcntr1=null;
}
if(vcntr1!=null)
{
it1=mdb[a].getIndexes().length;
itemp1="";
itemp1=a;
itemp2=itemp1.length;
itemp3=75-itemp2;
ispace1='\xa0'.repeat(itemp3);
ispace2='\xa0'.repeat(76);
for (i=0;i<it1;i++){
  try{
  ib=mdb[a].getIndexes()[i];
  ibb=JSON.stringify(ib);
  if(i==0){
  print(itemp1,ispace1,ibb)
  }
  if(i>0){
  print(ispace2,ibb)
  }
  }
  catch (e){
  ib=0;
}
}
}
});
print("\n<b>*************************ASSESSMENT RESULT of UNSUPPORTED OBJECTS**********************************</b>")
var superglobalun= "";
var superglobalnu= "";
gb=0;
const indexddl=[];
print("\n\n","###################",VARIABLE_DATABASE,"###################")
mdb=db.getSiblingDB(VARIABLE_DATABASE);
var globalun="";
var globalnu="";
cc1=mdb.getCollectionNames();
cc2=cc1.length;
vv1=mdb.getCollectionInfos({"type": "view"});
vv2=vv1.length;
CCspace='\xa0'.repeat(71);
CCspace2='\xa0'.repeat(100);
if (cc2>25)
{
 print("HIGH_NO_OF_COLLECTION_WARNING",CCspace,"Recommended Limit of 25 collections \n",CCspace2,"per database for shared throughput.\n",CCspace2,"Raise support case for increasing.\n",CCspace2,"However if planning for dedicated(collection level)\n",CCspace2,"throughput you can go up to 500 collections per database.\n")
}
if (vv2>0)
{
for (j=0;j<vv2;j++)
{
 vcount=vv1[j].name;
 vlen=100-(vcount.length);
 vspace='\xa0'.repeat(vlen);
 print(vcount,vspace,"NOT SUPPORTED: VIEWS are not supported in Cosmos DB.");
 udb=VARIABLE_DATABASE;
 ucn=vcount;
 uns=udb.concat(".",ucn);
 globalun=globalun.concat(" --nsExclude=\"",uns,"\"")
}
}
print("\n");
mdb.getCollectionNames().map(function(a) {
unscounter=0;
try{
tt2=mdb[a].stats().size;
}
catch (e){
tt2=null;
}
if(tt2!=null)
{
tt3=tt2/(1024*1024*1024);
tt3=tt3.toFixed(5);
capp=mdb[a].stats().capped;
ttemp1=mdb[a].stats().ns;
ttemp2=ttemp1.length;
ttemp3=100-ttemp2;
sspace1='\xa0'.repeat(ttemp3);
if(capp)
{
print(ttemp1,sspace1,"NOT SUPPORTED: \n",CCspace2,"CAPPED COLLECTION is not supported in Cosmos DB.\n")
unscounter=unscounter+1;
}
if(tt3>20)
{
 print(ttemp1,sspace1,"WARNING: The maximum size of a fixed (unsharded)\n",CCspace2,"collection in Cosmos DB API for MongoDB is 20 GB.\n",CCspace2,"This unsharded collection exceeds the limit.\n",CCspace2,"You would either need to limit the data size\n",CCspace2,"of the unsharded collection to < 20GB \n",CCspace2,"or use sharded collection.\n");
 unscounter=unscounter+1;
}
if (tt3>15 && tt3<20)
{
 print(ttemp1,sspace1,"WARNING: The maximum size of a fixed (unsharded)\n",CCspace2,"collection in Cosmos DB API for MongoDB is 20 GB.\n",CCspace2,"This unsharded collection approaching limit.\n",CCspace2,"You would either need to limit the data size\n",CCspace2,"of the unsharded collection to < 20GB \n",CCspace2,"or use sharded collection.\n");
 unscounter=unscounter+1;
}
t1=mdb[a].getIndexes().length;
temp1=mdb[a].stats().ns;
temp2=temp1.length;
temp3=100-temp2;
space1='\xa0'.repeat(temp3);
space2='\xa0'.repeat(100);
const ddli=[];
for (i=0;i<t1;i++){
  try{
  b=mdb[a].getIndexes()[i];

  c=Object.keys(b);
  d=b.key;
  h=Object.keys(d);
  rrr=h.length;
  k=h.toString();
  var s=Object.keys(d).map(function(key) {
  return d[key];
  });
  }
  catch (e){
  b=0;
  c=0;
  d=0;
  s=0;
  print("Error in object - ",a,"Error Message",e)
  }
if(k.includes(".") && rrr>1)
{
 print(temp1,space1,"WARNING: Compound Index in Nested Field \n",CCspace2,"-->",b.name,"<-- \n",CCspace2,"Not supported in Cosmos DB.\n");
 unscounter=unscounter+1;
}
if (s.includes("text"))
{
  print(temp1,space1,"NOT SUPPORTED: Text Index \n",CCspace2,"-->",b.name,"<-- \n",CCspace2,"Not supported in Cosmos DB.\n");
  unscounter=unscounter+1;
}
if (s.includes("2d"))
{
  print(temp1,space1,"NOT SUPPORTED: 2d Index \n",CCspace2,"-->",b.name,"<-- \n",CCspace2,"Not supported in Cosmos DB.\n");
  unscounter=unscounter+1;
}
if (s.includes("2dsphere"))
{
print(temp1,space1,"WARNING: 2dsphere Index with version greater than 1 \n",CCspace2,"is sparse by default and not supported in Cosmos DB. \n",CCspace2,"Please manually check 2dsphereIndexVersion of Index\n",CCspace2,"-->",b.name,"<--\n");
unscounter=unscounter+1;
}
if (c.includes("sparse"))
{
  print(temp1,space1,"WARNING: Sparse true option in Index \n",CCspace2,"-->",b.name,"<-- \n",CCspace2,"not supported in Cosmos DB.\n");
  unscounter=unscounter+1;
}
if (c.includes("unique") && !(k.includes(".")))
{
  print(temp1,space1,"WARNING: Unique option in Index \n",CCspace2,"-->",b.name,"<-- \n",CCspace2,"requires the collection to be empty in Cosmos DB.\n");
  unscounter=unscounter+1;
}
if (c.includes("unique") && k.includes("."))
{
  print(temp1,space1,"WARNING: Unique option in Nested field Index \n",CCspace2,"-->",b.name,"<-- \n",CCspace2,"not supported & need empty collection in Cosmos DB.\n");
  unscounter=unscounter+1;
}
if (c.includes("expireAfterSeconds"))
{
  print(temp1,space1,"WARNING: TTL Index \n",CCspace2,"-->",b.name,"<-- not supported. \n",CCspace2,"TTL Index is supported only for _ts field in Cosmos DB.\n");
  unscounter=unscounter+1;
}
}
if (unscounter>0)
{
 udb=VARIABLE_DATABASE;
 ucn=a;
 uns=udb.concat(".",ucn);
 globalun=globalun.concat(" --nsExclude=\"",uns,"\"")
 if (!capp)
 {
 gb=gb+1;
 vgb=gb-1;
 globalnu=globalnu.concat(" --nsInclude=\"",uns,"\"")
 mdb[a].getIndexes().forEach(function(index) {
 if ("_id_" !== index.name) {
 var indexKey = index.key
 delete index.v
 delete index.key
 index.background = true
 bulb1="db.getSiblingDB(\"";
 bulb2=JSON.stringify(indexKey);
 bulb3=JSON.stringify(index);
 indexddl[vgb]=bulb1.concat(VARIABLE_DATABASE,"\").",a,".createIndex(",bulb2,",",bulb3,")");
 }
 });
 }
}
}
});
superglobalun=superglobalun.concat(globalun);
superglobalnu=superglobalnu.concat(globalnu);


print("NON MIGRATED INDEX_DDL FOR MANUAL REBUILD (PLEASE OMIT/MODIFY UNSUPPORTED INDEX CHECKING ABOVE):");
print("************************************************************************************************")
for(k=0;k<indexddl.length;k++){
print(indexddl[k]);
}
print("\n");
print("UNSUPPORTED_COLLECTION_EXCLUDE=\n",superglobalun,"\n");
print("UNSUPPORTED_COLLECTION_INCLUDE=\n",superglobalnu);
print("\n\n ***IMPORTANT: ALL COLLECTIONS WITH UNSUPPORTED INDEXES ARE DATA ALONE MIGRATED & INDEXES SHOULD BE MANUALLY BUILD AT TARGET CHECKING THE INDEX LIST*** \n");
print("\n *********************************END****************************************")

