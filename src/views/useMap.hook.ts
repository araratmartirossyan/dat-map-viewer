import { Loader } from '@googlemaps/js-api-loader'

export const useMap = async (center: DAT.Coords, id: string) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

  const googleMap = await new Loader({
    apiKey: API_KEY as string,
    version: 'weekly',
    libraries: ['places']
  }).load()

  const mapProp = {
    center: new google.maps.LatLng(center.lat, center.long),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  const el = document.getElementById(id)

  if (el) {
    const mapInstance = new google.maps.Map(el, mapProp)

    return {
      mapInstance,
      loaderInstance: googleMap
    }
  }

  throw 'ID IS NOT SET'
}

export const useDirection = async (
  origin: DAT.Coords,
  dest: DAT.Coords,
  map: google.maps.Map,
  loaderInstance: any
) => {
  const request = {
    origin: {
      lat: origin.lat,
      lng: origin.long
    },
    destination: {
      lat: dest.lat,
      // claimStore.currentClaim.location.lat,
      lng: dest.long
      // claimStore.currentClaim.location.long
    },
    travelMode: google.maps.TravelMode.DRIVING
  }

  const directionsDisplay = new google.maps.DirectionsRenderer({
    map
  })

  const direction = new loaderInstance.maps.DirectionsService()

  const response = await direction.route(request)
  if (response.status == google.maps.DirectionsStatus.OK) {
    directionsDisplay.setDirections(response)
  }

  const [predicted] = response.routes

  return {
    info: predicted.legs[0]
  }
}
