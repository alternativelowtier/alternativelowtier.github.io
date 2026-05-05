function updateHUD() { 
    for (let player of gameEngine.roster) { 
        let id = player.playerId + 1; 
        let hpEl = document.getElementById(`hud-hp-p${id}`);
        if(hpEl) hpEl.style.width = Math.max(0, (player.health / player.maxHealth) * 100) + '%'; 
        
        let guardBar = document.getElementById(`hud-guard-p${id}`); 
        if(guardBar) {
            guardBar.style.width = player.guardHp + '%'; 
            guardBar.style.background = player.isGuardBroken ? '#555' : '#ffcc00'; 
        }
        
        let parryEl = document.getElementById(`hud-parry-p${id}`);
        if(parryEl) parryEl.style.width = player.parryMeter + '%'; 
        
        let spEl = document.getElementById(`hud-sp-p${id}`);
        if(spEl) spEl.style.width = player.spMeter + '%'; 

        let domainContainer = document.getElementById(`hud-sukuna-domain-container-p${id}`);
        let domainFill = document.getElementById(`hud-sukuna-domain-p${id}`);
        let yutaContainer = document.getElementById(`hud-yuta-copy-container-p${id}`);
        let yutaText = document.getElementById(`hud-yuta-copy-text-p${id}`);
        let ultBar = document.getElementById(`hud-ult-p${id}`);

        if (player.charName === 'Yuji' && player.isTransformed) {
            if(domainContainer) domainContainer.style.display = 'block';
            if(domainFill) domainFill.style.width = player.sukunaDomainBar + '%';
            if(yutaContainer) yutaContainer.style.display = 'none';
            if(ultBar) { ultBar.style.width = '100%'; ultBar.style.background = '#444'; }
        } else if (player.charName === 'Yuta') {
            if(domainContainer) domainContainer.style.display = 'none';
            if(yutaContainer) yutaContainer.style.display = 'block';
            if(yutaText) yutaText.innerText = "COPY: " + player.copiedTechniqueName.toUpperCase();
            
            let copyPct = player.isUltimateActive() ? 100 : ((player.copyCharges || 0) * 50);
            let copyFill = document.getElementById(`hud-yuta-copy-p${id}`);
            if(copyFill) {
                copyFill.style.width = copyPct + '%';
                copyFill.style.opacity = copyPct > 0 ? '1' : '0.3';
            }

            if(ultBar) { ultBar.style.width = player.ultMeter + '%'; ultBar.style.background = '#a200ff'; }
        } else {
            if(domainContainer) domainContainer.style.display = 'none';
            if(yutaContainer) yutaContainer.style.display = 'none';
            if(ultBar) { ultBar.style.width = player.ultMeter + '%'; ultBar.style.background = '#a200ff'; }
        }
    } 
}

function showCinematicMessage(text, color, duration, size = 40) { gameEngine.cinematicText = { text, color, duration, life: duration, size }; }

function drawCinematicIntros(ctx, t) {
    let p1 = gameEngine.roster[0]; let p2 = gameEngine.roster[1];
    
    if (t > 180) { 
        let prog = 1 - (t - 180)/180; 
        ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'; ctx.fillRect(0, 0, LOG_W, LOG_H); ctx.save();
        if (p1.charName === 'Gojo') {
            let sunGrad = ctx.createLinearGradient(0,0,LOG_W,LOG_H); sunGrad.addColorStop(0, "#ffe87a"); sunGrad.addColorStop(0.5, "#cc9a00"); sunGrad.addColorStop(1, "#331100");
            ctx.globalAlpha = 0.5 + (0.5 * Math.sin(prog * Math.PI)); ctx.fillStyle = sunGrad; ctx.fillRect(0,0,LOG_W,LOG_H);
            ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); let rayL = LOG_W * 1.5; ctx.translate(150, 100); ctx.rotate(prog * 0.1);
            for(let a=0; a<Math.PI*2; a+=0.3){ ctx.fillStyle = "rgba(255, 250, 150, 0.2)"; ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*rayL, Math.sin(a)*rayL); ctx.lineTo(Math.cos(a+0.1)*rayL, Math.sin(a+0.1)*rayL); } ctx.fill(); ctx.restore();
            
            ctx.save(); ctx.translate(150, 120 + Math.sin(prog*4)*10); ctx.scale(3.5, 3.5); 
            let oX = p1.x, oY = p1.y, oldS = p1.currentState, oF = p1.facingDir;
            p1.facingDir = 1; p1.currentState='idle'; p1.x=0; p1.y=0; 
            p1.draw(ctx); 
            p1.x = oX; p1.y = oY; p1.currentState = oldS; p1.facingDir = oF;
            ctx.restore();
            
            if (prog > 0.3) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(320, 80, 80, 50, Math.PI/12, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "8px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("THROUGHOUT", 320, 70); ctx.fillText("HEAVEN & EARTH,", 320, 90); }
            if (prog > 0.6) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(120, 180, 60, 40, -Math.PI/12, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "7px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("I ALONE AM", 120, 175); ctx.fillText("THE HONORED ONE", 120, 190); }
        } 
        else if (p1.charName === 'Yuji') {
            ctx.fillStyle = '#0a0005'; ctx.fillRect(0,0,LOG_W,LOG_H); if(Math.random()<0.1) { ctx.fillStyle="rgba(255,255,255,0.2)"; ctx.fillRect(0,0,LOG_W,LOG_H); }
            ctx.save(); ctx.translate(150, 160 + (prog*10)); ctx.scale(4,4); 
            let oX = p1.x, oY = p1.y, oldS = p1.currentState, oF = p1.facingDir;
            p1.facingDir = 1; p1.currentState='ability_i'; p1.x=0; p1.y=0; 
            p1.draw(ctx); 
            p1.x = oX; p1.y = oY; p1.currentState = oldS; p1.facingDir = oF;
            ctx.restore();
            if (prog > 0.4) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(300, 100, 70, 50, 0, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "10px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("LET'S EXORCISE", 300, 95); ctx.fillText("THEM!", 300, 115); }
        }
        else {
            ctx.fillStyle = '#100515'; ctx.fillRect(0,0,LOG_W,LOG_H); for(let i=0; i<15; i++) { ctx.fillStyle="rgba(200, 100, 200, 0.2)"; ctx.fillRect((prog*1000 + i*50)%LOG_W, i*20, 40, 2); }
            ctx.save(); ctx.translate(150 + prog*20, 120); ctx.scale(3.5,3.5); 
            let oX = p1.x, oY = p1.y, oldS = p1.currentState, oF = p1.facingDir;
            p1.facingDir = 1; p1.currentState='idle'; p1.x=0; p1.y=0; 
            p1.draw(ctx); 
            p1.x = oX; p1.y = oY; p1.currentState = oldS; p1.facingDir = oF;
            ctx.restore();
            if (prog > 0.4) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(300, 100, 80, 50, 0, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "8px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("COME,", 300, 95); ctx.fillText("RIKA!", 300, 110); }
        } ctx.restore();
    }
    else if (t > 0) {
        let prog = 1 - t/180;
        ctx.fillStyle = 'rgba(10, 10, 10, 0.9)'; ctx.fillRect(0, 0, LOG_W, LOG_H); ctx.save();
        if (p2.charName === 'Gojo') {
            let sunGrad = ctx.createLinearGradient(0,0,LOG_W,LOG_H); sunGrad.addColorStop(0, "#ffe87a"); sunGrad.addColorStop(0.5, "#cc9a00"); sunGrad.addColorStop(1, "#331100"); ctx.globalAlpha = 0.5 + (0.5 * Math.sin(prog * Math.PI)); ctx.fillStyle = sunGrad; ctx.fillRect(0,0,LOG_W,LOG_H);
            ctx.globalCompositeOperation = 'lighter'; ctx.beginPath(); let rayL = LOG_W * 1.5; ctx.translate(270, 100); ctx.rotate(prog * 0.1);
            for(let a=0; a<Math.PI*2; a+=0.3){ ctx.fillStyle = "rgba(255, 250, 150, 0.2)"; ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*rayL, Math.sin(a)*rayL); ctx.lineTo(Math.cos(a+0.1)*rayL, Math.sin(a+0.1)*rayL); } ctx.fill(); ctx.restore();
            
            ctx.save(); ctx.translate(270, 120 + Math.sin(prog*4)*10); ctx.scale(3.5, 3.5); 
            let oX = p2.x, oY = p2.y, oldS = p2.currentState, oF = p2.facingDir;
            p2.facingDir = -1; p2.currentState='idle'; p2.x=0; p2.y=0; 
            p2.draw(ctx); 
            p2.x = oX; p2.y = oY; p2.currentState = oldS; p2.facingDir = oF;
            ctx.restore();
            
            if (prog > 0.3) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(100, 80, 80, 50, Math.PI/12, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "8px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("THROUGHOUT", 100, 70); ctx.fillText("HEAVEN & EARTH,", 100, 90); }
            if (prog > 0.6) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(300, 180, 60, 40, -Math.PI/12, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "7px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("I ALONE AM", 300, 175); ctx.fillText("THE HONORED ONE", 300, 190); }
        }
        else if (p2.charName === 'Yuji') {
            ctx.fillStyle = '#0a0005'; ctx.fillRect(0,0,LOG_W,LOG_H); if(Math.random()<0.1) { ctx.fillStyle="rgba(255,255,255,0.2)"; ctx.fillRect(0,0,LOG_W,LOG_H); }
            ctx.save(); ctx.translate(270, 160 + (prog*10)); ctx.scale(4,4); 
            let oX = p2.x, oY = p2.y, oldS = p2.currentState, oF = p2.facingDir;
            p2.facingDir = -1; p2.currentState='ability_i'; p2.x=0; p2.y=0; 
            p2.draw(ctx); 
            p2.x = oX; p2.y = oY; p2.currentState = oldS; p2.facingDir = oF;
            ctx.restore();
            if (prog > 0.4) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(120, 100, 70, 50, 0, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "10px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("LET'S EXORCISE", 120, 95); ctx.fillText("THEM!", 120, 115); }
        }
        else {
            ctx.fillStyle = '#100515'; ctx.fillRect(0,0,LOG_W,LOG_H); for(let i=0; i<15; i++) { ctx.fillStyle="rgba(200, 100, 200, 0.2)"; ctx.fillRect((-prog*1000 + i*50 + 2000)%LOG_W, i*20, 40, 2); }
            ctx.save(); ctx.translate(270 - prog*20, 120); ctx.scale(3.5,3.5); 
            let oX = p2.x, oY = p2.y, oldS = p2.currentState, oF = p2.facingDir;
            p2.facingDir = -1; p2.currentState='idle'; p2.x=0; p2.y=0; 
            p2.draw(ctx); 
            p2.x = oX; p2.y = oY; p2.currentState = oldS; p2.facingDir = oF;
            ctx.restore();
            if (prog > 0.4) { ctx.fillStyle = "#000"; ctx.beginPath(); ctx.ellipse(120, 100, 80, 50, 0, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "8px 'Press Start 2P'"; ctx.textAlign="center"; ctx.fillText("COME,", 120, 95); ctx.fillText("RIKA!", 120, 110); }
        } ctx.restore();
    }
}

function gameLoop() {
if (!gameEngine.isRunning) return; gameEngine.frameCount++; 
ctx.setTransform(UI_UPSCALE, 0, 0, UI_UPSCALE, 0, 0); ctx.clearRect(0, 0, LOG_W, LOG_H);
const hud = document.getElementById('combat-hud');

if (gameEngine.vsScreenTimer > 0) {
    if (hud && hud.style.display !== 'none') hud.style.display = 'none'; gameEngine.vsScreenTimer--; 
    ctx.fillStyle = '#0b0510'; ctx.fillRect(0, 0, LOG_W/2, LOG_H); ctx.fillStyle = '#1a0505'; ctx.fillRect(LOG_W/2, 0, LOG_W/2, LOG_H); ctx.fillStyle = '#fff'; ctx.fillRect(LOG_W/2 - 2, 0, 4, LOG_H);
    
    let p1 = gameEngine.roster[0]; let p2 = gameEngine.roster[1];
    
    if(p1) {
        ctx.save(); ctx.translate(LOG_W/4, LOG_H/2 + 50); ctx.scale(2.5, 2.5); 
        let oX = p1.x, oY = p1.y, oS = p1.currentState, oF = p1.facingDir; 
        p1.x = 0; p1.y = 0; p1.currentState = 'idle'; p1.facingDir = 1;
        p1.draw(ctx); 
        p1.x = oX; p1.y = oY; p1.currentState = oS; p1.facingDir = oF;
        ctx.restore();
    }
    
    if(p2) {
        ctx.save(); ctx.translate(LOG_W*0.75, LOG_H/2 + 50); ctx.scale(2.5, 2.5); 
        let oX2 = p2.x, oY2 = p2.y, oS2 = p2.currentState, oF2 = p2.facingDir; 
        p2.x = 0; p2.y = 0; p2.currentState = 'idle'; p2.facingDir = -1;
        p2.draw(ctx); 
        p2.x = oX2; p2.y = oY2; p2.currentState = oS2; p2.facingDir = oF2;
        ctx.restore();
    }
    
    ctx.fillStyle = '#fff'; ctx.font = "30px 'Press Start 2P'"; ctx.textAlign = 'center'; ctx.strokeStyle = '#ff003c'; ctx.lineWidth = 6;
    let pt = Math.sin(gameEngine.vsScreenTimer * 0.1) * 2; ctx.strokeText("VS", LOG_W/2, LOG_H/2 - 20 + pt); ctx.fillText("VS", LOG_W/2, LOG_H/2 - 20 + pt);
    ctx.font = "12px 'Press Start 2P'"; ctx.fillStyle = '#00d4ff'; if(p1) ctx.fillText(p1.charName.toUpperCase(), LOG_W/4, LOG_H/2 - 70); ctx.fillStyle = '#ff3333'; if(p2) ctx.fillText(p2.charName.toUpperCase(), LOG_W*0.75, LOG_H/2 - 70);
    requestAnimationFrame(gameLoop); return;
} else if (gameEngine.introTimer > 0) {
    if (hud && hud.style.display !== 'none') hud.style.display = 'none'; if(typeof mapManager !== 'undefined') mapManager.drawBackground(ctx); drawCinematicIntros(ctx, gameEngine.introTimer); gameEngine.introTimer--; requestAnimationFrame(gameLoop); return;
}

if (hud && hud.style.display !== 'block') hud.style.display = 'block';

if (gameEngine.hitStopFrames > 0) gameEngine.hitStopFrames--;
let shakeX = 0, shakeY = 0; if (gameEngine.cameraShake > 0) { shakeX = (Math.random() - 0.5) * gameEngine.cameraShake; shakeY = (Math.random() - 0.5) * gameEngine.cameraShake; gameEngine.cameraShake *= 0.8; if (gameEngine.cameraShake < 1) gameEngine.cameraShake = 0; } ctx.translate(shakeX, shakeY);

if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.isActive) {
    let shatterTime = domainExpansionSystem.getShatterTime();
    if (domainExpansionSystem.timer < shatterTime) {
        if (domainExpansionSystem.domainType === 'void' && domainExpansionSystem.timer >= 390) { drawDomainBackground(ctx, 'void', domainExpansionSystem.timer); }
        else if (domainExpansionSystem.domainType === 'shrine' && domainExpansionSystem.timer >= 160) { drawDomainBackground(ctx, 'shrine', domainExpansionSystem.timer); }
        else if (domainExpansionSystem.domainType === 'yuta' && domainExpansionSystem.timer >= 160) { drawDomainBackground(ctx, 'yuta', domainExpansionSystem.timer); }
        else { if(typeof mapManager !== 'undefined') mapManager.drawBackground(ctx); }
    } else { if(typeof mapManager !== 'undefined') mapManager.drawBackground(ctx); }
} else { if(typeof mapManager !== 'undefined') mapManager.drawBackground(ctx); }

if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.isActive && domainExpansionSystem.domainType === 'void') {
    let timer = domainExpansionSystem.timer;
    if (timer < 180) { ctx.fillStyle = `rgba(255, 255, 255, ${timer/180})`; ctx.fillRect(0,0,LOG_W,LOG_H); } else if (timer < 210) { ctx.fillStyle="#fff"; ctx.fillRect(0,0,LOG_W,LOG_H); } 
    else if (timer < 390) {
        ctx.fillStyle = "#0a001a"; ctx.fillRect(0,0,LOG_W,LOG_H); ctx.fillStyle = "#fff"; for(let i=0; i<30; i++) ctx.fillRect(Math.random()*LOG_W, Math.random()*LOG_H, 1, 1);
        if(!domainExpansionSystem.galaxyLines) { domainExpansionSystem.galaxyLines =[ {y: 50, c: '#ff0000', w: 600}, {y: 100, c: '#0044ff', w: 600}, {y: 150, c: '#ff0000', w: 600}, {y: 200, c: '#0044ff', w: 600} ]; }
        domainExpansionSystem.galaxyLines.forEach(l => { if(Math.random() < 0.05) l.c = l.c === '#ff0000' ? '#0044ff' : '#ff0000'; ctx.fillStyle = l.c; ctx.fillRect(-50 + (Math.random()*10), l.y + (Math.random()*5-2.5), l.w, 3); });
        
        if (timer > 340) {
            let alpha = (timer - 340) / 50;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillRect(0, 0, LOG_W, LOG_H);
        }
    }
} else if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.isActive && (domainExpansionSystem.domainType === 'shrine' || domainExpansionSystem.domainType === 'yuta')) {
    let timer = domainExpansionSystem.timer;
    if (timer < 30) { ctx.fillStyle = `rgba(0,0,0,${timer/30})`; ctx.fillRect(0,0,LOG_W,LOG_H); }
    else if (timer < 100) { ctx.fillStyle = '#000'; ctx.fillRect(0,0,LOG_W,LOG_H); } 
    else if (timer < 160) { 
        drawDomainBackground(ctx, domainExpansionSystem.domainType, timer); 
        let alpha = 1 - ((timer - 100) / 60); 
        if (alpha > 0) { ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; ctx.fillRect(0, 0, LOG_W, LOG_H); } 
    }
}

if (typeof domainClashSystem !== 'undefined' && domainClashSystem.isActive) { domainClashSystem.update(); domainClashSystem.draw(ctx); } else {

if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.isActive) {
    domainExpansionSystem.timer++;
    
    if (domainExpansionSystem.timer === 2) {
        showCinematicMessage("DOMAIN EXPANSION", "#fff", 50, 24);
    }
    if (domainExpansionSystem.timer === 55) {
        let name = domainExpansionSystem.domainType === 'void' ? "UNLIMITED VOID" : (domainExpansionSystem.domainType === 'yuta' ? "TRUE & MUTUAL LOVE" : "MALEVOLENT SHRINE");
        let col = domainExpansionSystem.domainType === 'void' ? "#00c3ff" : (domainExpansionSystem.domainType === 'yuta' ? '#ff40a1' : "#ff003c");
        showCinematicMessage(name, col, 80, 26);
    }
    if (domainExpansionSystem.domainType === 'void' && domainExpansionSystem.timer === 390) {
        gameEngine.screenFlash = { color: '#fff', duration: 40, life: 40 };
    }
}

let isDomainCinematic = false;
if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.isActive) { 
    let shatterPoint = domainExpansionSystem.getShatterTime() - 120;
    if (domainExpansionSystem.timer < shatterPoint) isDomainCinematic = true; 
}

if (isDomainCinematic) {
    gameEngine.roster.forEach(fighter => {
        if (fighter.playerId !== domainExpansionSystem.casterPlayerId && fighter.currentState !== 'dead') {
            let ctrl = fighter.playerId === 0 ? keybinds.p1 : keybinds.p2; let willClash = false;
            if (fighter.ultMeter >= 100 && (fighter.charName==='Gojo' || fighter.charName==='Yuta' || (fighter.isTransformed && !fighter.hasUsedDomain))) {
                if (!fighter.isCpu && (inputs.keys[ctrl.p] || inputs.keys[ctrl.o])) willClash = true; else if (fighter.isCpu && Math.random() < 0.05) willClash = true;
            } if (willClash) { if(typeof triggerUltimate !== 'undefined') triggerUltimate(fighter); }
        }
    });
}

if (gameEngine.hitStopFrames === 0 && gameEngine.roundStartTimer <= 0) {
    gameEngine.roster.forEach(fighter => fighter.update());
    for (let i = gameEngine.projectiles.length - 1; i >= 0; i--) { gameEngine.projectiles[i].update(); if (!gameEngine.projectiles[i].active) gameEngine.projectiles.splice(i, 1); }
    for (let i = gameEngine.particles.length - 1; i >= 0; i--) { gameEngine.particles[i].update(); if (gameEngine.particles[i].life <= 0) gameEngine.particles.splice(i, 1); }
}
if (typeof bfMinigame !== 'undefined' && bfMinigame.isActive) { bfMinigame.update(); }

if (typeof hollowPurpleSystem !== 'undefined' && hollowPurpleSystem.isActive) {
    hollowPurpleSystem.timer++; const orbs = gameEngine.projectiles.filter(p => p.type === 'hp_blue_orb' || p.type === 'hp_red_orb');
    if (hollowPurpleSystem.step === 1 && orbs.length === 2) {
        let owner = hollowPurpleSystem.owner; let targetX = owner.x + (40 * owner.facingDir); let targetY = owner.y - 20;
        let reached = 0;
        orbs.forEach(orb => { 
            let dx = targetX - orb.x; let dy = targetY - orb.y; 
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 5) { reached++; orb.x = targetX; orb.y = targetY; } 
            else { orb.x += (dx / dist) * 1.5; orb.y += (dy / dist) * 1.5; }
        }); 
        if (reached === 2 || hollowPurpleSystem.timer > 120) { hollowPurpleSystem.step = 2; hollowPurpleSystem.timer = 0; orbs.forEach(o => o.active = false); gameEngine.cameraShake = 15; if(typeof soundManager !== 'undefined') soundManager.play('hitHeavy'); }
    }
    if (hollowPurpleSystem.step === 2) { if (hollowPurpleSystem.timer === 60){ gameEngine.screenFlash = { color: '#fff', duration: 15, life: 15 }; gameEngine.cameraShake = 30; gameEngine.hitStopFrames = 10; showCinematicMessage("HOLLOW PURPLE", "#a200ff", 120, 24); spawnHitSparks(hollowPurpleSystem.owner.x + (25 * hollowPurpleSystem.owner.facingDir), hollowPurpleSystem.owner.y - 15, '#a200ff', true); hollowPurpleSystem.step = 3; } }
    if (hollowPurpleSystem.step === 3 && hollowPurpleSystem.timer > 60) { let owner = hollowPurpleSystem.owner; gameEngine.projectiles.push(new CombatProjectile('hollow_purple_blast', owner.x + (20*owner.facingDir), owner.y-10, owner.facingDir, owner)); hollowPurpleSystem.isActive = false; owner.setState('ability_hp_fire'); }
}

gameEngine.projectiles.forEach(p => p.draw(ctx)); 

if (typeof hollowPurpleSystem !== 'undefined' && hollowPurpleSystem.isActive && (hollowPurpleSystem.step === 1 || hollowPurpleSystem.step === 2)) {
    let owner = hollowPurpleSystem.owner; let cx = owner.x + (40 * owner.facingDir); let cy = owner.y - 20; let progress = 0;
    if (hollowPurpleSystem.step === 1) { 
        const orbs = gameEngine.projectiles.filter(p => p.type === 'hp_blue_orb' || p.type === 'hp_red_orb'); 
        if (orbs.length === 2) { 
            let dist = Math.abs(orbs[0].x - orbs[1].x); 
            if (dist < 100) progress = 1 - (dist / 100); 
        } 
    } 
    else if (hollowPurpleSystem.step === 2) { progress = 1 + (hollowPurpleSystem.timer / 60); }

    if (progress > 0) {
        let scaleR = 40 * progress;
        drawHollowPurple(ctx, cx, cy, scaleR, gameEngine.frameCount);
    }
}

if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.floatingMathSymbols && domainExpansionSystem.floatingMathSymbols.length > 0) {
    ctx.save();
    for (let i = domainExpansionSystem.floatingMathSymbols.length - 1; i >= 0; i--) {
        let sym = domainExpansionSystem.floatingMathSymbols[i];
        sym.life++; sym.y -= 0.6;
        ctx.globalAlpha = Math.max(0, 1 - (sym.life / 60));
        ctx.fillStyle = '#fff'; ctx.font = "10px 'Press Start 2P'"; ctx.fillText(sym.text, sym.x, sym.y);
        if (sym.life >= 60) domainExpansionSystem.floatingMathSymbols.splice(i, 1);
    }
    ctx.restore();
}

gameEngine.roster.forEach(fighter => fighter.draw(ctx)); gameEngine.particles.forEach(p => p.draw(ctx));

if (typeof domainExpansionSystem !== 'undefined' && domainExpansionSystem.isActive) {
    let timer = domainExpansionSystem.timer; 
    let shatterTime = domainExpansionSystem.getShatterTime();
    let fadeStart = shatterTime - 120;
    let endTime = domainExpansionSystem.getEndTime();

    if (timer >= fadeStart && timer < shatterTime) {
        let alpha = (timer - fadeStart) / (shatterTime - fadeStart);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(0, 0, LOG_W, LOG_H);
    } 
    else if (timer === shatterTime) {
        domainExpansionSystem.shards =[]; 
        if(typeof soundManager !== 'undefined') soundManager.play('hitHeavy'); 
        gameEngine.cameraShake = 25; 
        for(let i=0; i<150; i++) { 
            let pts =[];
            let pointsCount = 3 + Math.floor(Math.random() * 2);
            for(let p=0; p<pointsCount; p++) {
                let ang = (p/pointsCount) * Math.PI * 2 + Math.random()*0.5;
                let r = 4 + Math.random()*15;
                pts.push({x: Math.cos(ang)*r, y: Math.sin(ang)*r});
            }
            domainExpansionSystem.shards.push({ 
                x: Math.random() * LOG_W, 
                y: Math.random() * LOG_H, 
                vx: (Math.random() - 0.5) * 16, 
                vy: (Math.random() - 0.5) * 12 - 2, 
                rot: Math.random() * Math.PI, 
                vrot: (Math.random() - 0.5) * 0.3, 
                pts: pts
            }); 
        } 
    } 
    else if (timer > shatterTime && timer < endTime) {
        ctx.save();
        for (let i = 0; i < domainExpansionSystem.shards.length; i++) {
            let s = domainExpansionSystem.shards[i];
            s.x += s.vx; s.y += s.vy; s.vy += GRAVITY * 0.3; s.rot += s.vrot;
            ctx.translate(s.x, s.y); ctx.rotate(s.rot);
            
            if (domainExpansionSystem.domainType === 'void') { ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'; ctx.strokeStyle = '#000000'; }
            else if(domainExpansionSystem.domainType === 'yuta') { ctx.fillStyle = '#ff40a1'; ctx.strokeStyle = '#fff'; }
            else { ctx.fillStyle = '#000000'; ctx.strokeStyle = '#000000'; }
            ctx.lineWidth = 1.5;
            
            ctx.beginPath();
            ctx.moveTo(s.pts[0].x, s.pts[0].y);
            for(let p=1; p<s.pts.length; p++) ctx.lineTo(s.pts[p].x, s.pts[p].y);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            ctx.rotate(-s.rot); ctx.translate(-s.x, -s.y);
        }
        ctx.restore();
    }

    if (timer >= endTime) {
        domainExpansionSystem.isActive = false; 
        if(typeof soundManager !== 'undefined') soundManager.stopLoop(); 
        domainExpansionSystem.galaxyLines = null; 
        domainExpansionSystem.splats = null; 
        domainExpansionSystem.voidStreaks = null; 
        domainExpansionSystem.floatingMathSymbols =[];
    }
}
}

if (typeof bfMinigame !== 'undefined' && bfMinigame.isActive) {
    bfMinigame.draw(ctx);
}

gameEngine.roster.forEach(fighter => {
if (fighter.comboHits > 1) { ctx.save(); let shake = fighter.comboHits > 5 ? (Math.random() - 0.5) * 4 : 0; let comboScale = 1.0; if (fighter.comboJustIncremented && fighter.comboTimer > 80) { comboScale = 1.0 + Math.sin((90 - fighter.comboTimer) / 10 * Math.PI) * 0.3; } else { fighter.comboJustIncremented = false; } let comboAlpha = fighter.comboTimer < 25 ? (fighter.comboTimer / 25) : 1.0; ctx.globalAlpha = comboAlpha; ctx.fillStyle = fighter.comboHits > 5 ? '#ff003c' : (fighter.comboHits > 3 ? '#ffaa00' : '#ffffff'); ctx.font = `${(10 + Math.min(fighter.comboHits, 10)) * comboScale}px 'Press Start 2P'`; let drawX = fighter.playerId === 0 ? 10 : 410; ctx.textAlign = fighter.playerId === 0 ? "left" : "right"; ctx.lineWidth = 3; ctx.strokeStyle = "#000"; ctx.strokeText(fighter.comboHits + " HITS", drawX + shake, 80 + shake); ctx.fillText(fighter.comboHits + " HITS", drawX + shake, 80 + shake); ctx.fillStyle = "rgba(255,255,255,0.5)"; let barW = (fighter.comboTimer / 90) * 40; ctx.fillRect(fighter.playerId === 0 ? drawX : drawX - barW, 90, barW, 4); ctx.restore(); } });

if (gameEngine.screenFlash) { ctx.fillStyle = gameEngine.screenFlash.color; ctx.globalAlpha = 0.8 * (gameEngine.screenFlash.life / gameEngine.screenFlash.duration); ctx.fillRect(0, 0, LOG_W, LOG_H); ctx.globalAlpha = 1.0; gameEngine.screenFlash.life--; if (gameEngine.screenFlash.life <= 0) gameEngine.screenFlash = null; }
if (gameEngine.impactFrame > 0) { ctx.fillStyle = gameEngine.impactFrame === 2 ? '#fff' : '#000'; ctx.fillRect(0, 0, LOG_W, LOG_H); gameEngine.impactFrame--; }

if (gameEngine.cinematicText) { const ct = gameEngine.cinematicText; const progress = 1 - (ct.life / ct.duration); let scale = 1.0; let alpha = 1.0; if (progress < 0.15) { scale = 1 + (1 - (progress / 0.15)) * 0.5; alpha = progress / 0.15; } else if (progress > 0.8) { alpha = (1 - progress) / 0.2; } ctx.save(); ctx.globalAlpha = alpha; ctx.textAlign = "center"; ctx.fillStyle = ct.color; ctx.font = `${ct.size * scale}px 'Press Start 2P'`; ctx.strokeStyle = '#000'; ctx.lineWidth = 8; ctx.strokeText(ct.text, LOG_W / 2, LOG_H / 2); ctx.fillText(ct.text, LOG_W / 2, LOG_H / 2); ctx.restore(); ct.life--; if (ct.life <= 0) gameEngine.cinematicText = null; }
if (gameEngine.roundStartTimer > 0 && gameEngine.roundStartTimer <= 60) { gameEngine.roundStartTimer--; let count = Math.ceil(gameEngine.roundStartTimer / 60); let text = "FIGHT!"; if (gameEngine.roundStartTimer === 59) { showCinematicMessage(text, '#ffcc00', 55, 50); if(typeof soundManager !== 'undefined') soundManager.play('hitHeavy'); } }

for (const key in inputs.keys) { if (inputs.keys[key]) inputs.holdDuration[key]++; } 
if(typeof updateHUD !== 'undefined') updateHUD(); 
requestAnimationFrame(gameLoop);
}

function triggerMatchEnd(winner) { if (gameEngine.matchOver) return; gameEngine.matchOver = true; if(typeof soundManager !== 'undefined') soundManager.stopLoop(); let winnerName = (winner.playerId === 0) ? "PLAYER 1" : (typeof gameMode !== 'undefined' && gameMode === 'local' ? "PLAYER 2" : "CPU"); document.getElementById('match-over-text').innerText = `${winnerName} WINS!`; setTimeout(() => { gameEngine.isRunning = false; if(typeof menuSystem !== 'undefined') menuSystem.switchScreen('menu-match-over'); }, 3000); }

function rematch() { if(typeof lastMap !== 'undefined') startGameplayLoop(lastMap); }

function startGameplayLoop(mapName) {
if(typeof lastMap !== 'undefined') lastMap = mapName; 
if(typeof mapManager !== 'undefined') mapManager.currentMap = mapName; 
if(typeof menuSystem !== 'undefined') menuSystem.switchScreen('start_gameplay');

gameEngine.roster = []; gameEngine.projectiles = []; gameEngine.particles =[]; 
if(typeof soundManager !== 'undefined') soundManager.stopLoop();

let playerCharacter = typeof lastPlayerChar !== 'undefined' ? lastPlayerChar : 'Yuji'; 
let cpuCharacter = typeof lastCpuChar !== 'undefined' ? lastCpuChar : 'Gojo'; 

if(typeof gameMode !== 'undefined' && (gameMode === 'versus' || gameMode === 'training')) { 
    const cpuCharacters =['Gojo', 'Yuji', 'Yuta'].filter(c => c !== playerCharacter); 
    cpuCharacter = cpuCharacters[Math.floor(Math.random() * cpuCharacters.length)]; 
}

let p1 = new Fighter(playerCharacter, 80, 0); p1.facingDir = 1; p1.y = GROUND_Y - 30; p1.velY = 0; gameEngine.roster.push(p1);

let p2 = new Fighter(cpuCharacter, 340, 1); p2.facingDir = -1; p2.y = GROUND_Y - 30; p2.velY = 0; 
if (typeof gameMode !== 'undefined' && (gameMode === 'local' || gameMode === 'training')) p2.isCpu = false; 
gameEngine.roster.push(p2); 

let hud1 = document.getElementById('hud-name-p1');
let hud2 = document.getElementById('hud-name-p2');
if(hud1) hud1.innerText = playerCharacter.toUpperCase(); 
if(hud2) hud2.innerText = (typeof gameMode !== 'undefined' && gameMode === 'local') ? "PLAYER 2" : ((typeof gameMode !== 'undefined' && gameMode === 'training') ? "TRAINING DUMMY" : cpuCharacter.toUpperCase());

gameEngine.frameCount = 0; gameEngine.cameraShake = 0; gameEngine.hitStopFrames = 0; gameEngine.impactFrame = 0; gameEngine.screenFlash = null; gameEngine.cinematicText = null;
gameEngine.vsScreenTimer = 180; gameEngine.introTimer = 360; gameEngine.roundStartTimer = 60;

if(typeof domainExpansionSystem !== 'undefined') {
    domainExpansionSystem.isActive = false; domainExpansionSystem.splats = null; domainExpansionSystem.voidStreaks = null;
}
if(typeof hollowPurpleSystem !== 'undefined') hollowPurpleSystem.isActive = false; 
if(typeof domainClashSystem !== 'undefined') domainClashSystem.isActive = false; 
if(typeof bfMinigame !== 'undefined') bfMinigame.isActive = false; 

gameEngine.matchOver = false; gameEngine.isRunning = true; gameLoop();
}

function startGameEngine(m) { startGameplayLoop(m); }
