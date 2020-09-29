

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);
    const response = await fetch(`https://us1.locationiq.com/v1/search.php?key=${APIKEY}&format=json&q=${urlAddress}`);
    if (!response.ok) {
        throw new Error('failed to fetch coordinates');
    }
    const data = await response.json();
    return data;
}

export async function getAddressFromCoords(coords) {
    const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${APIKEY}&format=json&lat=${coords.lat}&lon=${coords.long}`);
    if (!response.ok) {
        throw new Error('failed to fetch coordinates');
    }
    const data = await response.json();
    return data;
}