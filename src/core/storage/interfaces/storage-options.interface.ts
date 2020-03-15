export interface StorageOptions {
    engine: 'disk' | 's3',
    disk: {
        rootDir: string,
    },
    s3: {
        accessKeyId: string,
        secretAccessKey: string,
    }
}