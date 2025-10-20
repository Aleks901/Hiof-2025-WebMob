

export type ResultData<T> = {
    data: T;
    success: true;
};

export type ResultError = {
    error: {
        message: string;
        code?: number;
    };
    success: false;
};

export type Result<T> = ResultData<T> | ResultError;