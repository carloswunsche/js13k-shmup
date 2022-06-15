//////////////////////////
// Audio Player
//////////////////////////

class AudioPlayer {
    constructor(){
        this.zzfx = zzfx;
    }
    playSfx(obj){
        for (const key in obj) {
            // Si un sonido es true y su metodo existe...
            if (this[key] && obj[key]) {
                // Reproducir
                this[key]();
                // Y mutar el flag a false
                obj[key] = false;
            }
        }
    }
    sfx_playerShot(){
        this.zzfx(...[.1,,1450,,.01,0,2,.37,-42,,-18,.19,,,-0.8,,,.63,.01,.81]);
    }
    sfx_explosion(){
        this.zzfx(...[.5,,914,.01,.12,.12,4,2.49,,.5,,,,.3,,.5,.18,.44,.14]);
    }
    sfx_enemyShot(){
        this.zzfx(...[.1,,346,,,.01,,1.64,-4.1,,,,,.9,,,.04,.95,.08]);
    }
    sfx_explosionPlayer(){
        this.zzfx(...[,,843,.01,.13,.58,2,5,1,,,,,1.4,,.5,.49,.47,.12,.29]);
    }
}