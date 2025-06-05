interface ApiResponse {
    ok: boolean;
    json: () => Promise<any>;
    status: number;
    text: () => Promise<string>;
    url: string;
    data?: {
        message?: string;
        [key: string]: any;
    };
}

export default ApiResponse;
