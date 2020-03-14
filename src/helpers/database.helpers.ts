/**
 * Konwertuje zagnieżdżone dane w formacie JSON do obiektów
 * 
 * @param {any[]} rows          Tablica z danymi, które zawierają zagnieżdżone dane w formacie JSON
 * @param {string[]} columns    Nazwy kolumn które należy przekonwertować z JSON na object (podane w tablicy)
 * @returns                     Zwraca tablicę danych w formie obiektów
 */
export const nestColumnsFrom = (rows: any[], columns: string[]): any[] => {
    return rows.map(row => {
        let nestedColumns = {};
        columns.forEach(col => {
            const tempCol = JSON.parse(row[col]) // row[col]: JSON 
            nestedColumns[col] = tempCol.id ? tempCol : null; // tempCol: Database table object with id
        });
        return {
            ...row,
            ...nestedColumns
        }
    });
}