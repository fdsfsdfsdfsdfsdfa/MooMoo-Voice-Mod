export class AudioManager {
    private audioContext: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private microphone: MediaStreamAudioSourceNode | null = null;
    private isMicActive = false;

    async startMicVisualizer(micBar: HTMLElement, valThresh: HTMLElement) {
        if (this.isMicActive) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.microphone.connect(this.analyser);
            this.isMicActive = true;
            this.updateVisualizer(micBar);
        } catch (err) {
            valThresh.innerText = "Mic access denied!";
        }
    }

    private updateVisualizer(micBar: HTMLElement) {
        if (!this.isMicActive || !this.analyser) return;
        requestAnimationFrame(() => this.updateVisualizer(micBar));
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        let average = sum / dataArray.length;
        let volumePercent = Math.min((average / 100) * 100, 100);
        micBar.style.width = volumePercent + '%';
    }

    async getDevices() {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            const devices = await navigator.mediaDevices.enumerateDevices();
            return {
                mics: devices.filter(d => d.kind === 'audioinput'),
                speakers: devices.filter(d => d.kind === 'audiooutput')
            };
        } catch (e) {
            return null;
        }
    }
}
