interface ClientOptions {
    dev?: boolean;
    url?: string;
}

declare class Hastebin {
    post(code: string): Promise<string>;
    get(key: string): Promise<object>;
}