import { credential, initializeApp, ServiceAccount, firestore } from 'firebase-admin';
import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

interface IFirebaseConfig {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
}

// IFirebaseService.ts
interface IFirebaseService {
    getDatabase(): FirebaseFirestore.Firestore;
    initialize(): void;
}

// FirebaseConfigFactory.ts
class FirebaseConfigFactory {
    static createConfig(): IFirebaseConfig {
        return {
            type: process.env.FIREBASE_TYPE!,
            project_id: process.env.FIREBASE_PROJECT_ID!,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
            private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL!,
            client_id: process.env.FIREBASE_CLIENT_ID!,
            auth_uri: process.env.FIREBASE_AUTH_URI!,
            token_uri: process.env.FIREBASE_TOKEN_URI!,
            auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL!,
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL!
        };
    }
}

dotenv.config();

class FirebaseService implements IFirebaseService {
    private readonly config: IFirebaseConfig;
    private database: FirebaseFirestore.Firestore;

    constructor(config: IFirebaseConfig) {
        this.config = config;
        this.initialize();
    }

    public initialize(): void {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: credential.cert(this.config as ServiceAccount)
            });
        }
        this.database = admin.firestore();
    }

    public getDatabase(): FirebaseFirestore.Firestore {
        return this.database;
    }
}

// Uso
export {FirebaseConfigFactory,IFirebaseConfig,  FirebaseService, IFirebaseService}