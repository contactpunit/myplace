import { Modal } from './UI/Modal'
import { Maps } from './UI/Maps'
import { getCoordsFromAddress, getAddressFromCoords } from './Utils/Location'

class PlaceFinder {
    constructor() {
        const form = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        form.addEventListener('submit', this.findAddressHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlacehandler);
        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    }

    sharePlacehandler() {
        const sharedLinkInputEl = document.getElementById('share-link');
        if (!navigator.clipboard) {
            sharedLinkInputEl.select();
            return;
        }
        navigator.clipboard.writeText(sharedLinkInputEl.value)
            .then(() => {
                alert('copies into clipboard');
            })
            .catch( err => {
                console.log(err)
            })
    }

    async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invalid adress entered. please try again');
            return;
        }
        const modal = new Modal('loading-modal-content', 'loading location. Please wait...');
        modal.show();
        try {
            const result = await getCoordsFromAddress(address)
            // console.log(result)
            if (result) {
                const coordinates = {
                    lat: result[0].lat,
                    long: result[0].lon
                }
                this.selectPlace(coordinates, address);
            }
        }
        catch (err) {
            alert(err.message)
        }
        modal.hide();
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('location feature not supported by your browser. Please use supported browser');
            return;
        }
        const modal = new Modal('loading-modal-content', 'loading location. Please wait...');
        modal.show();
        navigator.geolocation.getCurrentPosition(
            async location => {
                const coordinates = {
                    lat: location.coords.latitude,
                    long: location.coords.longitude
                }
                const address = await getAddressFromCoords(coordinates);
                modal.hide();
                this.selectPlace(coordinates, address);
            },
            error => {
                modal.hide();
                alert('Unfortunately couldnot locate you. Please enter address manually');
            }
        )

    }

    selectPlace(coordinates, address) {
        this.map = new Maps(coordinates);
        this.shareBtn.disabled = false;
        const sharedLinkInputEl = document.getElementById('share-link');
        sharedLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(address.display_name)}&lat=${coordinates.lat}&lng=${coordinates.long}`
    }

}

new PlaceFinder()