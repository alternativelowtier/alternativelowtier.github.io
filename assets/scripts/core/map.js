const mapManager = {
currentMap: 'rooftop', 
drawBackground: function(ctx) {
switch(this.currentMap) {
case 'cursed_womb': 
    let pulse = Math.sin(gameEngine.frameCount * 0.05) * 10; let bgGrd = ctx.createRadialGradient(210, 120, 50, 210, 120, 250 + pulse);
    bgGrd.addColorStop(0, "#1f0505"); bgGrd.addColorStop(1, "#0a0000"); ctx.fillStyle = bgGrd; ctx.fillRect(0, 0, LOG_W, LOG_H); 
    for(let i = 0; i < 15; i++) { ctx.fillStyle = `rgba(255, 0, 50, ${Math.random() * 0.25})`; ctx.beginPath(); ctx.arc(Math.random() * LOG_W, Math.random() * LOG_H, Math.random() * 60 + 20, 0, Math.PI * 2); ctx.fill(); } 
    ctx.fillStyle = "#3d0f0f"; ctx.fillRect(0, GROUND_Y, LOG_W, 30); ctx.fillStyle = "#ff003c"; ctx.fillRect(0, GROUND_Y, LOG_W, 2); break;
case 'shibuya': 
    ctx.fillStyle = "#0a0815"; ctx.fillRect(0, 0, LOG_W, LOG_H); for(let i = 0; i < 50; i++) { ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.fillRect(Math.random() * LOG_W, Math.random() * GROUND_Y, 1, 1); } 
    const buildings =[ {x:20,h:100,w:50}, {x:80,h:140,w:60}, {x:150,h:90,w:40}, {x:210,h:160,w:70}, {x:300,h:110,w:60}, {x:370,h:130,w:50} ]; 
    buildings.forEach(b => { ctx.fillStyle = "#15132d"; ctx.fillRect(b.x, GROUND_Y - b.h, b.w, b.h); ctx.fillStyle = "#0c0a1a"; ctx.fillRect(b.x+b.w-10, GROUND_Y - b.h, 10, b.h); 
        for(let wy=GROUND_Y - b.h + 10; wy < GROUND_Y - 20; wy+=15) { for(let wx=b.x + 10; wx < b.x + b.w - 15; wx+=12) { if(Math.random() > 0.4) { ctx.fillStyle = Math.random() > 0.8 ? "#00ffff" : "#ffea00"; ctx.fillRect(wx, wy, 4, 6); } } } }); 
    ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, GROUND_Y, LOG_W, 30); ctx.fillStyle = "#555"; ctx.fillRect(0, GROUND_Y, LOG_W, 2); break;
case 'hidden_inventory':
    let sSky = ctx.createLinearGradient(0,0,0,240); 
    sSky.addColorStop(0, "#ffd97d"); sSky.addColorStop(0.5, "#ffbc42"); sSky.addColorStop(1, "#f2a65a"); ctx.fillStyle = sSky; ctx.fillRect(0, 0, LOG_W, LOG_H);
    ctx.globalCompositeOperation = 'lighter'; let sunR = ctx.createRadialGradient(210, 80, 20, 210, 80, 160);
    sunR.addColorStop(0,"rgba(255,255,200,0.8)"); sunR.addColorStop(0.3,"rgba(255,200,100,0.5)"); sunR.addColorStop(1,"rgba(0,0,0,0)"); ctx.fillStyle = sunR; ctx.beginPath(); ctx.arc(210, 80, 160, 0, Math.PI*2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#647545'; ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.quadraticCurveTo(80, 120, 200, 150); ctx.lineTo(0, 150); ctx.fill();
    ctx.fillStyle = '#7a8553'; ctx.beginPath(); ctx.moveTo(420, GROUND_Y); ctx.quadraticCurveTo(340, 120, 180, 160); ctx.lineTo(420, 160); ctx.fill();
    ctx.fillStyle = '#546b33'; ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(0, 140); ctx.quadraticCurveTo(200, 110, 420, 140); ctx.lineTo(420, GROUND_Y); ctx.fill();
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; ctx.fillRect(0, 150, LOG_W, LOG_H-150); 
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; let cAOffset = (gameEngine.frameCount * 0.1) % LOG_H; for(let p = 0; p < 20; p++) { ctx.fillRect((p*77) % LOG_W, (LOG_H - cAOffset + p*33) % LOG_H, 2, 2); }
    ctx.fillStyle = '#c5ae96'; ctx.fillRect(20, -50, 45, 300); ctx.fillRect(355, -50, 45, 300); ctx.fillStyle = '#ad9278'; ctx.fillRect(50, -50, 15, 300); ctx.fillRect(385, -50, 15, 300);
    ctx.beginPath(); ctx.arc(42, GROUND_Y-10, 30, 0, Math.PI, true); ctx.arc(377, GROUND_Y-10, 30, 0, Math.PI, true); ctx.fill();
    ctx.fillStyle = "#8a8a81"; ctx.fillRect(0, GROUND_Y - 5, LOG_W, 40); ctx.fillStyle = "#abaa9e"; ctx.fillRect(0, GROUND_Y - 5, LOG_W, 2);
    ctx.fillStyle = "rgba(40,40,30,0.4)"; for(let w = 15; w < 420; w+=40) { ctx.fillRect(w, GROUND_Y + 5, 8, 3); ctx.fillRect(w-5, GROUND_Y + 12, 14, 2); ctx.fillRect(w+20, GROUND_Y+20, 10, 2); }
    break;
case 'rooftop': default: 
    let rskyGrd = ctx.createLinearGradient(0,0,0,240); rskyGrd.addColorStop(0, "#2a7dff"); rskyGrd.addColorStop(1, "#8ac2ff"); ctx.fillStyle = rskyGrd; ctx.fillRect(0, 0, LOG_W, LOG_H); 
    let cloudOff = (gameEngine.frameCount * 0.15) % 500; ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath(); ctx.arc(420 - cloudOff, 40, 25, 0, Math.PI*2); ctx.arc(440 - cloudOff, 40, 35, 0, Math.PI*2); ctx.arc(460 - cloudOff, 45, 20, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(150 - cloudOff*0.6, 60, 20, 0, Math.PI*2); ctx.arc(170 - cloudOff*0.6, 55, 30, 0, Math.PI*2); ctx.arc(190 - cloudOff*0.6, 60, 20, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#6b96c2"; ctx.fillRect(50, GROUND_Y-40, 80, 40); ctx.fillRect(250, GROUND_Y-60, 60, 60); ctx.fillStyle = "#333"; ctx.fillRect(0, GROUND_Y, LOG_W, 30); ctx.fillStyle = "#555"; ctx.fillRect(0, GROUND_Y, LOG_W, 2); 
    ctx.strokeStyle = "#444"; ctx.lineWidth = 2; for(let f=10; f<420; f+=30) { ctx.beginPath(); ctx.moveTo(f, GROUND_Y); ctx.lineTo(f, GROUND_Y-15); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(0, GROUND_Y-10); ctx.lineTo(420, GROUND_Y-10); ctx.stroke(); break;
}
}
};
