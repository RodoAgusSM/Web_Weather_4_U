export interface ApiResponse {
    ok: boolean;
    json: () => Promise<any>;
    status: number;
    text: () => Promise<string>;
    url: string;
    data?: {
        message?: string;
        [key: string]: any; // any other properties that might exist on 'data'
    };
}

export default ApiResponse;
