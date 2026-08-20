import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_CONNECTED = 1;
const MONGODB_CONNECTING = 2;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  listenersAttached?: boolean;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

function clearCachedConnection() {
  cached.conn = null;
  cached.promise = null;
}

function clearCachedPromise() {
  cached.promise = null;
}

function isRetryableMongoError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "MongoNetworkError" ||
    error.name === "MongoServerSelectionError" ||
    error.name === "MongoPoolClearedError" ||
    /connection .* closed|ECONNRESET|topology was destroyed/i.test(error.message)
  );
}

function isConnectionReady(conn: typeof mongoose | null) {
  return conn?.connection.readyState === MONGODB_CONNECTED;
}

function isMongooseReady() {
  return mongoose.connection.readyState === MONGODB_CONNECTED;
}

function clearCacheIfNotConnecting() {
  if (mongoose.connection.readyState !== MONGODB_CONNECTING) {
    clearCachedConnection();
  }
}

function attachConnectionListeners(mongooseInstance: typeof mongoose) {
  if (cached.listenersAttached) {
    return;
  }

  mongooseInstance.connection.on("disconnected", clearCachedConnection);
  mongooseInstance.connection.on("error", clearCacheIfNotConnecting);
  cached.listenersAttached = true;
}

function scheduleInteractionIndexCleanup() {
  void import("@/customers/lib/customer-interaction-indexes")
    .then(({ dropLegacyCustomerInteractionTtlIndex }) => dropLegacyCustomerInteractionTtlIndex())
    .catch((error) => {
      console.warn("Failed to schedule CustomerInteraction index cleanup:", error);
    });
}

async function connectMongo() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable before attempting to connect to MongoDB"
    );
  }

  const opts = {
    bufferCommands: false,
    maxPoolSize: 10,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 10000,
  };

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        attachConnectionListeners(mongooseInstance);
        cached.conn = mongooseInstance;
        scheduleInteractionIndexCleanup();
        return mongooseInstance;
      })
      .catch((error) => {
        clearCachedConnection();
        throw error;
      });
  }

  const conn = await cached.promise;
  if (!isConnectionReady(conn)) {
    clearCachedConnection();
    throw new Error(`MongoDB connection is not ready. Current readyState: ${conn.connection.readyState}`);
  }

  cached.conn = conn;
  return conn;
}

async function dbConnect(retry = true) {
  if (isConnectionReady(cached.conn)) {
    return cached.conn;
  }

  if (isMongooseReady()) {
    cached.conn = mongoose;
    clearCachedPromise();
    attachConnectionListeners(mongoose);
    scheduleInteractionIndexCleanup();
    return cached.conn;
  }

  if (cached.conn && !isConnectionReady(cached.conn)) {
    clearCachedConnection();
  }

  try {
    return await connectMongo();
  } catch (error) {
    clearCachedConnection();

    if (retry) {
      return dbConnect(false);
    }

    throw error;
  }
}

export async function withMongoRetry<T>(operation: () => Promise<T>, retry = true): Promise<T> {
  try {
    await dbConnect();
    return await operation();
  } catch (error) {
    if (!retry || !isRetryableMongoError(error)) {
      throw error;
    }

    clearCachedConnection();
    await dbConnect(false);
    return withMongoRetry(operation, false);
  }
}

export default dbConnect;
