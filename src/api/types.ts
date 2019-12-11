// 登陆
export class LoginParams {
    password: number | string | undefined;
}

export interface LoginPhoneParams extends LoginParams {
    phone: number | string;
    countrycode?: number | string;
}

export interface LoginEmailParams extends LoginParams {
    email: string;
}

// 分页
export class PaginationParams {
    limit?: number | undefined;
    offset?: number | undefined;
}

export interface SearchParams extends PaginationParams {
    keywords: string | undefined;
    type?: number | string | undefined;
}

export interface VideoCommentParams extends PaginationParams {
    id: string | number;
    before?: number;
}
