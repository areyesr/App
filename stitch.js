import { 
    Stitch,
    RemoteMongoClient,
    AnonymousCredential
} from "mongodb-stitch-browser-sdk";

const client = Stitch.initializeDefaultAppClient('s00a-ongtc');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('s00a');

client.auth.loginWithCredential(new AnonymousCredential()).then(user => 
  db.collection('travian').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() => 
  db.collection('travian').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
    console.log("Found docs", docs)
    console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
    console.error(err)
});