import { injectStyles } from './styles';
import { generateUI } from './ui';
import { AudioManager } from './audio';
import { icons } from './icons';

(function () {
    injectStyles();
    const container = generateUI();
    const audio = new AudioManager();
    const overlay = document.getElementById('vc-overlay') as HTMLElement;
    const micBar = document.getElementById('mic-volume-bar') as HTMLElement;
    const valThresh = document.getElementById('val-thresh') as HTMLElement;
    const btnBindPtt = document.getElementById('btn-bind-ptt') as HTMLElement;

    let isMenuOpen = false;
    let isBindingPtt = false;

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function (this: HTMLElement) {
            document.querySelectorAll('.vc-window').forEach(w => (w as HTMLElement).style.display = 'none');
            const target = document.getElementById(this.dataset.target!) as HTMLElement;
            target.style.display = 'flex';
            if (this.dataset.target === 'vc-menu-settings') audio.startMicVisualizer(micBar, valThresh);
        });
    });

    btnBindPtt.addEventListener('click', function () {
        isBindingPtt = true;
        this.innerText = 'Press any key...';
        this.style.background = '#4CAF50';
    });

    const populateDevices = async () => {
        const devices = await audio.getDevices();
        if (!devices) {
            ['list-mics', 'list-speakers'].forEach(id => {
                document.getElementById(id)!.innerHTML = `<div class="vc-list-item" style="color:red;">Need Permission</div>`;
            });
            return;
        }
        renderList('list-mics', devices.mics, icons.mic);
        renderList('list-speakers', devices.speakers, icons.speaker);
    };

    const renderList = (id: string, arr: MediaDeviceInfo[], icon: string) => {
        const el = document.getElementById(id) as HTMLElement;
        el.innerHTML = '';
        if (arr.length === 0) {
            el.innerHTML = `<div class="vc-list-item">No devices found</div>`;
            return;
        }
        arr.forEach((d, i) => {
            const item = document.createElement('div');
            item.className = 'vc-list-item';
            if (i === 0) item.classList.add('selected');
            item.innerHTML = `
                <div class="device-icon">${icon}</div>
                <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 280px;">${d.label || `Device ${i + 1}`}</span>
                <div class="check-icon">${icons.check}</div>
            `;
            item.onclick = () => {
                el.querySelectorAll('.vc-list-item').forEach(x => x.classList.remove('selected'));
                item.classList.add('selected');
            };
            el.appendChild(item);
        });
    };

    document.querySelectorAll('.load-devices').forEach(btn => btn.addEventListener('click', populateDevices));

    const setupSlider = (id: string, bgId: string, textId: string, pre: string, suf: string, max: number) => {
        const s = document.getElementById(id) as HTMLInputElement;
        const b = document.getElementById(bgId) as HTMLElement;
        const t = document.getElementById(textId) as HTMLElement;
        s.addEventListener('input', function () {
            const v = parseInt(this.value);
            t.innerText = `${pre}${v}${suf}`;
            if (b) b.style.width = (v / max * 100) + '%';
        });
        s.dispatchEvent(new Event('input'));
    };

    setupSlider('slider-vol', 'bg-vol', 'val-vol', 'Voice chat volume: ', '%', 200);
    setupSlider('slider-amp', 'bg-amp', 'val-amp', 'Microphone amplification: ', '%', 200);

    (document.getElementById('slider-thresh') as HTMLInputElement).addEventListener('input', function (this: HTMLInputElement) {
        valThresh.innerText = `Voice activation threshold: ${this.value} dB`;
    });

    document.querySelectorAll('.text-toggle').forEach(btn => {
        btn.addEventListener('click', function (this: HTMLElement) {
            const t = this.innerText;
            if (t.includes('Enabled')) this.innerText = t.replace('Enabled', 'Disabled');
            else if (t.includes('Disabled')) this.innerText = t.replace('Disabled', 'Enabled');
            else if (t.includes('Voice')) this.innerText = t.replace('Voice', 'Push to Talk');
            else if (t.includes('Push to Talk')) this.innerText = t.replace('Push to Talk', 'Voice');
        });
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function (this: HTMLElement) { this.classList.toggle('active'); });
    });

    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement).tagName)) return;
        if (isBindingPtt) {
            e.preventDefault();
            let k = e.code.replace('Key', '').replace('Digit', '');
            if (e.code === 'Space') k = 'SPACE';
            btnBindPtt.innerText = `Push To Talk Key: [ ${k} ]`;
            btnBindPtt.style.background = '';
            isBindingPtt = false;
            return;
        }
        if (e.code === 'KeyV') {
            isMenuOpen = !isMenuOpen;
            overlay.style.display = isMenuOpen ? 'flex' : 'none';
            if (isMenuOpen) {
                document.querySelectorAll('.vc-window').forEach(w => (w as HTMLElement).style.display = 'none');
                (document.getElementById('vc-menu-main') as HTMLElement).style.display = 'flex';
            }
        }
    });
})();
