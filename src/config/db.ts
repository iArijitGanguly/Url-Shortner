import mongoose, { ConnectOptions } from 'mongoose';

const db_uri = process.env.ATLAS_DB_URL as string;

class DBConnection {
    private uri: string;
    private isConnected: boolean = false;
    private static instance: DBConnection | null = null;

    constructor(db_uri: string) {
        this.uri = db_uri;
        this.isConnected = false;
    }

    public static getInstance(db_uri: string) {
        if(!this.instance) {
            this.instance = new DBConnection(db_uri);
        }
        else {
            throw new Error('Only one connection can exist');
        }

        return this.instance;
    }

    async connect() {
        if(this.isConnected) {
            throw new Error('DB is already connected');
        }
        else {
            await mongoose.connect(this.uri);
            this.isConnected = true;
        }
    }

    async disconnect() {
        if(this.isConnected) {
            await mongoose.disconnect();
            this.isConnected = false;
        }
        else {
            throw new Error('Db is not connected');
        }
    }
}

const db = DBConnection.getInstance(db_uri);

export default db;