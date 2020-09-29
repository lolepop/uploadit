
export interface IGenericResponse
{
    success: boolean;
}

export interface IMessageResponse extends IGenericResponse
{
    message?: string;
}

export interface IAuthResponse extends IGenericResponse
{
    user?: string;
    token?: string;
}

export interface IDownloadResponse extends IGenericResponse
{
    download?: string;
}

// export class GenericResponse implements IGenericResponse
// {
//     constructor(public success: boolean)
//     {
//         this.success = success;
//     }
// }

// export class MessageResponse implements IMessageResponse
// {
//     constructor(public success: boolean, public message?: string)
//     {
//         this.success = success;
//         this.message = message;
//     }
    
// }

// export class AuthResponse implements IAuthResponse
// {
//     constructor(public success: boolean, public user?: string, public token?: string)
//     {
//         this.success = success;
//     }
    
// }

// export function factory<T extends IGenericResponse>(type: T, ...args): T
// {
//     return new type(...args);
// }
