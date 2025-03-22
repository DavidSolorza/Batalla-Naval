function generarDisparoIA(tablero) {
    let x, y;
    do {
        x = Math.floor(Math.random() * 10); // Tablero 10x10
        y = Math.floor(Math.random() * 10);
    } while (tablero[x][y] !== 'agua'); // Evita disparar en la misma casilla

    return { x, y };
}
