import { Veranstaltung, Modul } from '../datatypes/veranstaltung';

/**
 * Calculates the sum of LP that can be used from a list of Veranstaltung,
 * while honoring each modules maxEinbringLP, if it is present.
 * @param belegung - a list of Veranstaltung
 */
export const calculateEinbringbareLPSum = (belegung: Veranstaltung[], module: Modul[]) => {
    if (!module || module.length === 0) return 0;

    console.log(module);

    let modulCounters: Map<number, { lpCounter: number, maxLP: number }> = new Map<number, { lpCounter: number, maxLP: number }>();

    for (const m of module) {
        modulCounters.set(m.id, { lpCounter: 0, maxLP: m.maxEinbringLP })
    }

    console.log(modulCounters);
    for (const v of belegung) {
        let modulCtr = modulCounters.get(v.modul.id);
        console.log("Modul " + v.modul.id, modulCtr);
        modulCtr.lpCounter += v.lp;
    }

    console.log(modulCounters);

    let lpBelegt = 0;

    for (let modulCtr of modulCounters.values()) {
        if (modulCtr.maxLP) {
            lpBelegt += Math.min(modulCtr.maxLP, modulCtr.lpCounter);
        } else {
            lpBelegt += modulCtr.lpCounter;
        }
    }

    return lpBelegt;
};