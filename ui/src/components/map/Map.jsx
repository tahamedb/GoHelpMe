import { MapContainer,  TileLayer } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

function Map({items}){
    const position = [31.6295, -7.9811]
  return (
  <MapContainer center={items.length === 1 ? [items[0].latitude, items[0].longitude] : position} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   {items.map(item=>(
    <Pin item={item} key={item.id}></Pin>
   ))}
  </MapContainer>
)
  
}

export default Map