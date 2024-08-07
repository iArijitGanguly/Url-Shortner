import mongoose, { ConnectOptions } from 'mongoose';

const db_uri = process.env.ATLAS_DB_URL as string;

let instance: DBConnection | null = null;

class DBConnection {
    private uri: string;
    private isConnected: boolean;
    // private static instance: DBConnection | null = null;

    constructor(db_uri: string) {
        if(instance) {
            throw new Error('Only one connection can exist');
        }
        this.uri = db_uri;
        this.isConnected = false;
        instance = this;
    }

    // public static getInstance(db_uri: string) {
    //     if(!this.instance) {
    //         this.instance = new DBConnection(db_uri);
    //     }
    //     else {
    //         throw new Error('Only one connection can exist');
    //     }

    //     return this.instance;
    // }

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

const db = Object.freeze(new DBConnection(db_uri));

export default db;