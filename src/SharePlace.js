class PlaceFinder {
    constructor() {
        const form = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');

        form.addEventListener('submit', this.findAddressHandler);
        locateUserBtn.addEventListener('click', this.locateUserHandler);
    }
    findAddressHandler() {
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('location feature not supported by your browser. Please use supported browser');
            return;
        }
        else {
            navigator.geolocation.getCurrentPosition(
                location => {
                    const coordinates = {
                        lat: location.coords.latitude,
                        long: location.coords.longitude
                    }
                    console.log(coordinates);
                },
                error => {
                    alert('Unfortunately couldnot locate you. Please enter address manually');
                }
            )
        }
    }
}

new PlaceFinder()