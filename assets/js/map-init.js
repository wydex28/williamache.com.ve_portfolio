document.addEventListener('DOMContentLoaded', function() {

    // Aragua State Center (approx Maracay)
    const araguaCoords = [10.2469, -67.5958]; 
    
    const map = L.map('map-aragua', {
        center: araguaCoords,
        zoom: 11,
        zoomControl: false, // Hidden for custom look
        attributionControl: false
    });

    // Guardar en window para acceso global
    window.mapAragua = map;

    // Theme: CartoDB Voyager (más legible, con colores y contraste suave)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Custom Marker (Icono que resalte)
    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: #bd93f9; width: 12px; height: 12px; border-radius: 50%; border: 3px solid #f8f8f2; box-shadow: 0 0 15px #bd93f9;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });

    L.marker(araguaCoords, { icon: customIcon }).addTo(map);

    // Subtle Aragua Highlight (Circle or just the center)
    L.circle(araguaCoords, {
        color: '#bd93f9',
        fillColor: '#bd93f9',
        fillOpacity: 0.1,
        radius: 5000,
        weight: 1
    }).addTo(map);

    // Forzar actualización inicial
    setTimeout(() => { map.invalidateSize(); }, 500);
});
