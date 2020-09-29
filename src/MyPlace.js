import { Maps } from './UI/Maps'

class LoadedPlace {
    constructor(coordinates, address) {
        new Maps(coordinates);
        const headerTitle = document.querySelector('header h1');
        headerTitle.textContent = address;
    }
}

const url = new URL(location.href);
const params = url.searchParams;
const coords = {
    lat: +params.get('lat'),
    long: +params.get('lng')
}
const address = params.get('address');
new LoadedPlace(coords, address);