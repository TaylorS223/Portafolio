export type Tarjeta = "Visa | MasterCard | AmericanExpress" ;

export interface IMetodo{
    id: string;
    tarjeta: Tarjeta;
    numero_tarjeta: string;
}