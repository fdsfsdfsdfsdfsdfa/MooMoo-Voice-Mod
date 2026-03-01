import { icons } from './icons';

export const generateUI = () => {
    const uiHTML = `
        <div id="vc-overlay">
            <div id="vc-menu-main" class="vc-window">
                <div class="vc-title">Voice Chat</div>
                <div class="vc-row">
                    <button class="vc-btn nav-btn" data-target="vc-menu-settings">Settings</button>
                    <button class="vc-btn nav-btn" data-target="vc-menu-group">Group</button>
                </div>
                <div class="vc-bottom-bar">
                    <div class="vc-icon-group">
                        <div class="vc-icon-btn toggle-btn" title="Mute Microphone">${icons.mic}</div>
                        <div class="vc-icon-btn toggle-btn" title="Deafen">${icons.speaker}</div>
                    </div>
                    <div class="vc-icon-group">
                        <div class="vc-icon-btn nav-btn" data-target="vc-menu-controls" title="Controls">${icons.settings}</div>
                    </div>
                </div>
            </div>

            <div id="vc-menu-settings" class="vc-window" style="display: none;">
                <div class="vc-title">Voice Chat Settings</div>
                <div class="vc-slider-container">
                    <div class="slider-bg-normal" id="bg-vol"></div>
                    <div class="vc-slider-text" id="val-vol">Voice chat volume: 100%</div>
                    <input type="range" class="vc-slider" id="slider-vol" min="0" max="200" value="100">
                </div>
                <div class="vc-slider-container">
                    <div class="slider-bg-normal" id="bg-amp" style="width: 0%;"></div>
                    <div class="vc-slider-text" id="val-amp">Microphone amplification: 0%</div>
                    <input type="range" class="vc-slider" id="slider-amp" min="0" max="200" value="0">
                </div>
                <button class="vc-btn text-toggle">Noise suppression: Enabled</button>
                <button class="vc-btn text-toggle">Activation type: Voice</button>
                <div class="vc-slider-container" style="border-color: #000;">
                    <div class="mic-volume-bar" id="mic-volume-bar"></div>
                    <div class="vc-slider-text" id="val-thresh">Voice activation threshold: -50 dB</div>
                    <input type="range" class="vc-slider" id="slider-thresh" min="-100" max="0" value="-50">
                </div>
                <button class="vc-btn text-toggle">Disable microphone testing</button>
                <button class="vc-btn">3D audio: Normal</button>
                <div class="vc-row">
                    <button class="vc-btn nav-btn load-devices" data-target="vc-menu-mic">Select microphone</button>
                    <button class="vc-btn nav-btn load-devices" data-target="vc-menu-speaker">Select speaker</button>
                </div>
                <div class="vc-bottom-bar">
                    <button class="vc-btn nav-btn" data-target="vc-menu-main" style="flex: 0 0 auto; padding: 5px 20px;">Back</button>
                </div>
            </div>

            <div id="vc-menu-controls" class="vc-window" style="display: none;">
                <div class="vc-title">Controls & Mute</div>
                <button class="vc-btn" id="btn-bind-ptt">Push To Talk Key: [ NONE ]</button>
                <button class="vc-btn text-toggle">Mute Other Players: Disabled</button>
                <div class="vc-bottom-bar">
                    <button class="vc-btn nav-btn" data-target="vc-menu-main" style="flex: 0 0 auto; padding: 5px 20px;">Back</button>
                </div>
            </div>

            <div id="vc-menu-group" class="vc-window" style="display: none;">
                <div class="vc-title">My Group</div>
                <div class="vc-list">
                </div>
                <div class="vc-bottom-bar">
                    <div class="vc-icon-group">
                        <div class="vc-icon-btn toggle-btn">${icons.mic}</div>
                        <div class="vc-icon-btn toggle-btn">${icons.speaker}</div>
                        <div class="vc-icon-btn">${icons.group}</div>
                    </div>
                    <div class="vc-icon-group">
                        <div class="vc-icon-btn danger nav-btn" data-target="vc-menu-main">${icons.exit}</div>
                    </div>
                </div>
            </div>

            <div id="vc-menu-mic" class="vc-window" style="display: none;">
                <div class="vc-title">Select Microphone</div>
                <div class="vc-list" id="list-mics">
                    <div class="vc-list-item" style="justify-content:center; color:#888;">Loading devices...</div>
                </div>
                <div class="vc-bottom-bar">
                    <button class="vc-btn nav-btn" data-target="vc-menu-settings" style="flex: 0 0 auto; padding: 5px 20px;">Back</button>
                </div>
            </div>

            <div id="vc-menu-speaker" class="vc-window" style="display: none;">
                <div class="vc-title">Select Speaker</div>
                <div class="vc-list" id="list-speakers">
                    <div class="vc-list-item" style="justify-content:center; color:#888;">Loading devices...</div>
                </div>
                <div class="vc-bottom-bar">
                    <button class="vc-btn nav-btn" data-target="vc-menu-settings" style="flex: 0 0 auto; padding: 5px 20px;">Back</button>
                </div>
            </div>
        </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = uiHTML;
    document.body.appendChild(container);
    return container;
};
