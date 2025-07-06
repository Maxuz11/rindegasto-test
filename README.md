### Prueba Tec en Nest

# realizado para ambiente local

## Requisitos

- se debe colocar el .env [IMPORTANTE] ya que si no se utiliza por lo menos la api de intercambio no funcionara
    PORT=3001
    URL_API_EXCHANGE="https://openexchangerates.org/api/"
    API_ID_EXCHANGE="YOUR_ID"

- npm
- node

# url de las peticiones
1.
-   [GET] http://localhost:{PORT}/getConvertedAmount?from=%&to=CLP&amount=1000
2.
-   a) [POST] http://localhost:{PORT}/postRindegastinoCumple -> [(JSON)] => {"name": "hola","birthday" : "11/10/1994"}
-   b) [GET] http://localhost:{PORT}/getDaysUntilMyBirthday?birthdate=03-03-1994
-   c) [GET] http://localhost:{PORT}/getRindegastinosBirthdays
3.
-   [GET] http://localhost:{PORT}/getTheNumber?first=192&second=3

## Prueba realizada por Max Jeldres