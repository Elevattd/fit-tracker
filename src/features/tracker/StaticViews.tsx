
export const MenuView = () => (
  <div id="menu" className="section active">
    <div className="card">
      <div className="time-label">7:45 · DESAYUNO</div>
      <div className="card-title">Pan lactal + huevos <span className="badge b-kcal">~720 kcal</span></div>
      <div className="ingredient"><span className="ing-name">Pan lactal casero</span><span>80g</span></div>
      <div className="ingredient"><span className="ing-name">Mermelada diet Hemeth</span><span>40g</span></div>
      <div className="ingredient"><span className="ing-name">Manteca de maní</span><span>15g</span></div>
      <div className="ingredient"><span className="ing-name">Huevos enteros</span><span>4 unid</span></div>
      <div className="ingredient"><span className="ing-name">Claras</span><span>4 unid</span></div>
      <div className="divider"></div>
      <div className="row"><span className="rl">Proteína</span><span className="rv">~52g</span></div>
      <div className="row"><span className="rl">Carbos</span><span className="rv">~65g</span></div>
      <div className="row"><span className="rl">Grasas</span><span className="rv">~28g</span></div>
    </div>
    <div className="card">
      <div className="time-label">12:30 · ALMUERZO</div>
      <div className="card-title">Pollo + arroz + brócoli <span className="badge b-kcal">~490 kcal</span></div>
      <div className="ingredient"><span className="ing-name">Pechuga de pollo hervida</span><span>200g cocida</span></div>
      <div className="ingredient"><span className="ing-name">Arroz en crudo</span><span>80g</span></div>
      <div className="ingredient"><span className="ing-name">Brócoli</span><span>150g</span></div>
      <div className="divider"></div>
      <div className="row"><span className="rl">Proteína</span><span className="rv">~52g</span></div>
      <div className="row"><span className="rl">Carbos</span><span className="rv">~68g</span></div>
      <div className="row"><span className="rl">Grasas</span><span className="rv">~5g</span></div>
    </div>
    <div className="card">
      <div className="time-label">18:00 · MERIENDA</div>
      <div className="card-title">Pan lactal + huevos <span className="badge b-kcal">~660 kcal</span></div>
      <div className="ingredient"><span className="ing-name">Pan lactal casero</span><span>80g</span></div>
      <div className="ingredient"><span className="ing-name">Mermelada diet Hemeth</span><span>40g</span></div>
      <div className="ingredient"><span className="ing-name">Huevos enteros</span><span>4 unid</span></div>
      <div className="ingredient"><span className="ing-name">Claras</span><span>4 unid</span></div>
      <div className="tip" style={{ marginTop: '10px', marginBottom: 0 }}>⚡ Sin manteca de maní — pre-gym, digestión rápida.</div>
      <div className="divider"></div>
      <div className="row"><span className="rl">Proteína</span><span className="rv">~50g</span></div>
      <div className="row"><span className="rl">Carbos</span><span className="rv">~62g</span></div>
      <div className="row"><span className="rl">Grasas</span><span className="rv">~20g</span></div>
    </div>
    <div className="card">
      <div className="time-label">22:15 · CENA</div>
      <div className="card-title">Pollo + arroz + brócoli <span className="badge b-kcal">~490 kcal</span></div>
      <div className="ingredient"><span className="ing-name">Pechuga de pollo hervida</span><span>200g cocida</span></div>
      <div className="ingredient"><span className="ing-name">Arroz en crudo</span><span>80g</span></div>
      <div className="ingredient"><span className="ing-name">Brócoli</span><span>150g</span></div>
      <div className="divider"></div>
      <div className="row"><span className="rl">Proteína</span><span className="rv">~52g</span></div>
      <div className="row"><span className="rl">Carbos</span><span className="rv">~68g</span></div>
      <div className="row"><span className="rl">Grasas</span><span className="rv">~5g</span></div>
    </div>
  </div>
);

export const VariantsView = () => (
  <div id="variantes" className="section active">
    <div className="tip">Intercambios 1:1 — mismos macros aproximados, distinto alimento.</div>
    <div className="card">
      <div className="card-title">Arroz → Papa <span className="badge b-var">intercambio</span></div>
      <div className="ingredient"><span className="ing-name">En vez de 80g arroz crudo</span><span>250g papa hervida</span></div>
      <div className="row"><span className="rl">Mejor para</span><span className="rv">Post-gym (IG alto)</span></div>
    </div>
    <div className="card">
      <div className="card-title">Arroz → Batata <span className="badge b-var">intercambio</span></div>
      <div className="ingredient"><span className="ing-name">En vez de 80g arroz crudo</span><span>220g batata hervida</span></div>
      <div className="row"><span className="rl">Mejor para</span><span className="rv">Almuerzo (IG medio)</span></div>
    </div>
    <div className="card">
      <div className="card-title">Reglas</div>
      <div className="row"><span className="rl">Brócoli</span><span className="rv">Siempre fijo</span></div>
      <div className="row"><span className="rl">Cena post-gym</span><span className="rv">Papa preferida</span></div>
    </div>
  </div>
);

export const CheatView = () => (
  <div id="cheat" className="section active">
    <div className="warn-box">El cheat meal no es un día libre — es una cena + postre. El resto del día comés normal.</div>
    <div className="card">
      <div className="card-title">Reglas <span className="badge b-warn">1x semana</span></div>
      <div className="row"><span className="rl">Desayuno / Almuerzo / Merienda</span><span className="rv">Normal</span></div>
      <div className="row"><span className="rl">Cena + postre</span><span className="rv">Lo que tengas ganas</span></div>
      <div className="row"><span className="rl">Alcohol</span><span className="rv">1–2 copas máximo</span></div>
    </div>
    <div className="card">
      <div className="card-title">Por qué funciona</div>
      <div className="row"><span className="rl">Calorías extra</span><span className="rv">+600–900 esa noche</span></div>
      <div className="row"><span className="rl">Impacto semanal</span><span className="rv">~100 kcal/día → irrelevante</span></div>
      <div className="row"><span className="rl">Beneficio</span><span className="rv">Adherencia + sube leptina</span></div>
    </div>
    <div className="card">
      <div className="card-title">Evitar</div>
      <div className="row"><span className="rl">Alcohol en cantidad</span><span className="rv">Bloquea síntesis proteica 24–36hs</span></div>
      <div className="row"><span className="rl">Compensar al día siguiente</span><span className="rv">No — seguís normal</span></div>
    </div>
  </div>
);
