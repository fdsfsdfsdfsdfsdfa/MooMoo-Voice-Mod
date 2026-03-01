export const injectStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        #vc-overlay, #vc-overlay * { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important; user-select: none; }
        #vc-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); display: none; justify-content: center; align-items: center; z-index: 99999; }
        .vc-window { background: #1e1e24; border: 2px solid #111; border-radius: 6px; padding: 15px; width: 400px; box-shadow: 0 10px 30px rgba(0,0,0,0.9); color: #ececec; display: flex; flex-direction: column; gap: 10px; }
        .vc-title { text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 5px; color: #fff; text-shadow: 1px 1px 0 #000; }
        .vc-row { display: flex; gap: 8px; width: 100%; }
        .vc-btn { background: #3a3a42; border: 2px solid #1a1a1f; color: #ddd; padding: 8px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold; transition: 0.1s; text-shadow: 1px 1px 0px #000; flex: 1; text-align: center; }
        .vc-btn:hover { background: #4f4f5a; border-color: #2a2a30; }
        .vc-btn:active { background: #2a2a30; border-color: #0a0a0c; transform: translateY(1px); }
        .vc-icon-btn { background: #2a2a30; border: 2px solid #111; color: #aaa; width: 36px; height: 36px; border-radius: 4px; display: flex; justify-content: center; align-items: center; cursor: pointer; }
        .vc-icon-btn:hover { background: #3a3a40; color: #fff; }
        .vc-icon-btn.active { background: #2E7D32; color: #fff; border-color: #1b5e20; }
        .vc-icon-btn.danger { background: #d32f2f; color: #fff; border-color: #b71c1c; }
        .vc-bottom-bar { display: flex; justify-content: space-between; margin-top: 5px; padding-top: 10px; border-top: 2px solid #2a2a30; }
        .vc-icon-group { display: flex; gap: 4px; }
        .vc-slider-container { position: relative; background: #1a1a1f; border: 2px solid #000; border-radius: 4px; height: 30px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .vc-slider-text { position: absolute; z-index: 2; pointer-events: none; font-size: 12px; font-weight: bold; text-shadow: 1px 1px 1px #000; }
        input[type=range].vc-slider { -webkit-appearance: none; width: 100%; background: transparent; position: absolute; z-index: 3; margin: 0; height: 100%; cursor: pointer; }
        input[type=range].vc-slider:focus { outline: none; }
        input[type=range].vc-slider::-webkit-slider-thumb { -webkit-appearance: none; height: 30px; width: 10px; background: #999; border: 1px solid #000; border-radius: 1px; box-shadow: inset 0 0 3px rgba(0,0,0,0.5); }
        .slider-bg-normal { position: absolute; top: 0; left: 0; height: 100%; width: 50%; background: #555; z-index: 1; border-right: 2px solid #111; }
        .mic-volume-bar { position: absolute; top: 0; left: 0; height: 100%; width: 0%; background: linear-gradient(90deg, #00C853 0%, #64DD17 50%, #FFD600 80%, #DD2C00 100%); z-index: 1; transition: width 0.05s linear; }
        .vc-list { background: #111; border: 2px solid #000; border-radius: 4px; height: 200px; overflow-y: auto; display: flex; flex-direction: column; }
        .vc-list-item { display: flex; align-items: center; padding: 6px 10px; border-bottom: 2px solid #1e1e24; gap: 10px; background: #2a2a30; cursor: pointer; font-size: 13px; font-weight: bold; }
        .vc-list-item:hover { background: #3a3a42; }
        .vc-list-item.selected { background: #334; border-left: 3px solid #4CAF50; padding-left: 7px; }
        .vc-list-item:last-child { border-bottom: none; }
        .user-icon { width: 28px; height: 28px; background: #1a1a1f; border: 1px solid #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; }
        .device-icon { width: 24px; height: 24px; color: #aaa; display: flex; align-items: center; justify-content: center; }
        .check-icon { margin-left: auto; display: none; }
        .vc-list-item.selected .check-icon { display: block; }
        .vc-list::-webkit-scrollbar { width: 8px; }
        .vc-list::-webkit-scrollbar-track { background: #111; }
        .vc-list::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
    `;
    document.head.appendChild(style);
};
