import mongoose from 'mongoose';

const connections = {};

function makeNewConnection(uri, dbName) {
  if (connections[dbName]) {
    console.log(`MongoDB :: reusing existing connection for ${dbName} database`);
    return connections[dbName];
  }else{
    if(!connections.default){
      connections.default = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      connections.default.on("error", function (error) {
        console.log(
          `MongoDB :: connection ${this.name} ${JSON.stringify(error)}`
        );
        connections.default
          .close()
          .catch(() =>
            console.log(`MongoDB :: failed to close connection ${this.name}`)
          );
      });

      connections.default.on("connected", function () {
        console.log(`MongoDB :: connected to default connection`);
      });

      connections.default.on("disconnected", function () {
        console.log(`MongoDB :: disconnected from default connection`);
      });
    }
    connections[dbName] = connections.default.useDb(dbName, { useCache: true });
    console.log(`MongoDB :: using ${dbName} database on default connection`);
    return connections[dbName];
  }
}

const privacyPolicyConnection = makeNewConnection( process.env.MONGO_URI, 'privacyPolicy');
const suToolsConnection = makeNewConnection(process.env.MONGO_URI, "scaleupTools");

export { suToolsConnection, privacyPolicyConnection };
