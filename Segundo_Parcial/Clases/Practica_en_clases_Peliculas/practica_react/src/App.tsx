import './App.css'
import { useState } from 'react'
import type { Ipelicula } from './pelicula'
import Cartelera  from './cartelera'


const pelicula: Ipelicula[] = [
  {
    id: '1',
    nombre: 'El Padrino',
    descripcion: 'Un poderoso jefe de la mafia y su familia.',
    url: 'https://example.com/el-padrino.jpg'
  },
  {
    id: '2',
    nombre: 'El Señor de los Anillos',
    descripcion: 'Una épica aventura en la Tierra Media.',
    url: 'https://example.com/el-senor-de-los-anillos.jpg'
  },
  {
    id: '3',
    nombre: 'Inception',
    descripcion: 'Un ladrón que roba secretos a través de los sueños.',
    url: 'https://example.com/inception.jpg'
  }
]

function App(){
  return(
    <>
      <Cartelera listaPeliculas={pelicula}/>
    </>
  )
  
}

export default App

