

export const MAX_ALLOWED_PAST = 2;
export const MAX_ALLOWED_FUTURE = 0;




export function env(key: string, relax = false) {
    if(process.env[key] === undefined && !relax) throw new Error(`Missing env ${key}`);
    return process.env[key]!;
}