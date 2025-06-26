//Exportamos el archivo de User ya que de esta manera lo tendremos disponible para importarlo en otros archivos

export interface User {
  login: {
    uuid: string
  }
  name: {
    first: string
    last: string
  }
  email: string
}


