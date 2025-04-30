const claveApi = '1b85ce73ca4a4186b3e225052252304'; // Reemplaza con tu clave real de WeatherAPI
const idioma = 'es';
const inputCiudad = document.getElementById('input-ciudad');

async function obtenerClima() {
  const ciudad = inputCiudad.value.trim();

  if (!ciudad) {
    // Si no se ingresó ciudad, ocultar resultados
    document.querySelector('.clima-info').style.display = 'none';
    return;
  }

  const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

  try {
    const respuesta = await fetch(apiClimaActual);
    const data = await respuesta.json();

    // Si la API devuelve error
    if (data.error) {
      document.querySelector('.clima-info').style.display = 'none';
      return;
    }

    mostrarClima(data);
  } catch (error) {
    console.error("Error al obtener datos del clima:", error);
    document.querySelector('.clima-info').style.display = 'none';
  }
}

function mostrarClima(data) {
  document.querySelector('.clima-icono').src = data.current.condition.icon;
  document.querySelector('.clima-texto').textContent = data.current.condition.text;
  document.querySelector('.temp').textContent = data.current.temp_c + '°C';
  document.querySelector('.ciudad').textContent = data.location.name;
  document.querySelector('.humedad').textContent = data.current.humidity + '%';
  document.querySelector('.viento').textContent = data.current.wind_kph + ' km/h';

  // Mostrar la sección de clima
  document.querySelector('.clima-info').style.display = 'block';
}
