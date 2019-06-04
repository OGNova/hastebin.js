interface ClientOptions {
    dev?: boolean;
    url?: string;
}

declare class Hastebin {
    post(code: string): Promise<string>;
    get(key: string): Promise<object>;
}

// Type definitions for hastebin.js
// Definitions by Charalampos Fanoulis <charalampos.fanoulis@gmail.com>