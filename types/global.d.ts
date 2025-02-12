import User from '@types';
export {}

declare global{
    interface CustomJwtSessionClaims extends User{}; //i used customJwtSessionClaims name because in backend session Claims uses this types name only
}