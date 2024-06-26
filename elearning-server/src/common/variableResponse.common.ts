export enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
export enum MessageCode {
    INCORRECT = "INCORRECT",
    GET = "GET",
    UPDATED = "UPDATED",
    DELETED = "DELETED",
    OK = "OK",
    CREATED = "CREATED",
    NO_CONTENT = "NO CONTENT",
    BAD_REQUEST = "BAD REQUEST",
    UNAUTHORIZED = "INVALID AUTHORIZATION",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL SERVER ERROR",
    IS_EXIST = "HAS BEEN EXIST",
}