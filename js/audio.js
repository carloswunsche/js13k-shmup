//////////////////////////
// Audio Player
//////////////////////////

class AudioPlayer {
    constructor(){
        // Taken from global
        this.zzfx = zzfx;
        this.enable = true;
    }
    playSfx(flags){
        // First of all, if audioPlayer is disabled, don't play anything.
        if (!this.enable) return;

        // Die sound also disables the audioPlayer and has priority over other sounds (they will not play)
        if (flags.die) {
            this.enable = false;
            this.zzfx(...[,,843,.01,.13,.58,2,5,1,,,,,1.4,,.5,.49,.47,.12,.29]);
            return
        }

        // All other sounds go here
        if (flags.pShot) this.zzfx(...[.1,,1450,,.01,0,2,.37,-42,,-18,.19,,,-0.8,,,.63,.01,.81]);
        if (flags.xplos)   this.zzfx(...[.5,,894,,.05,.35,1,3.68,.7,.8,,,.04,1.3,,.6,,.1,.05]);
        if (flags.xplos_L) this.zzfx(...[.5,,894,,.05,.35,1,3.68,.7,.8,,,.04,1.3,,.6,,.1,.05]);
        if (flags.xplos_S) this.zzfx(...[.1,,79,.02,.05,.13,4,.16,.2,.8,,,,.1,,.1,,.5,,.27]);
        if (flags.eShot) this.zzfx(...[.05,,346,,,.01,,1.64,-4.1,,,,,.9,,,.04,.95,.08]);
    }
}