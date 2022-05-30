import mongoose, { Connection } from "mongoose";

class MongoStorage {
  private static _url: string;
  public static _client: Connection | undefined;

  private static async connect() {
    await mongoose.connect(this._url);
    this._client = mongoose.connection;
  }

  public static async init(connectionString: string) {
    if (!this._client) {
      this._url = connectionString;
      await this.connect();
    }
  }
}

export default MongoStorage;
