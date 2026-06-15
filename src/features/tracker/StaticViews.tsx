
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setRoutineMode, type RoutineMode } from './trackerSlice';
import { Coffee, Bike, Briefcase, Home, Moon, Dumbbell, Utensils, Zap } from 'lucide-react';

export const RoutineView = () => {
  const dispatch = useDispatch();
  const routineMode = useSelector((state: RootState) => state.tracker.routineMode);

  const schedule: Record<RoutineMode, { time: string; activity: string; note?: string; icon: any }[]> = {
    'home-office': [
      { time: '09:00', activity: 'Despertar', icon: Moon },
      { time: '09:30', activity: 'Desayuno', note: 'Tranquilo, inicio HO', icon: Coffee },
      { time: '12:30', activity: 'Almuerzo', icon: Utensils },
      { time: '18:00', activity: 'Merienda', note: 'Pre-gym', icon: Zap },
      { time: '20:00', activity: 'Gimnasio', icon: Dumbbell },
      { time: '22:15', activity: 'Cena', icon: Utensils },
      { time: '00:00', activity: 'Dormir', note: 'LoL permitido', icon: Moon },
    ],
    'oficina': [
      { time: '07:30', activity: 'Despertar', note: 'Más temprano', icon: Moon },
      { time: '07:45', activity: 'Cardio bici', note: 'En ayunas (45 min)', icon: Bike },
      { time: '08:30', activity: 'Desayuno', note: 'Post-cardio, antes de salir', icon: Coffee },
      { time: '08:45', activity: 'Salida a oficina', note: 'Llevar vianda', icon: Briefcase },
      { time: '12:30', activity: 'Almuerzo', note: 'Vianda en oficina', icon: Utensils },
      { time: '19:00', activity: 'Vuelta + Merienda', note: 'Merienda rápida', icon: Home },
      { time: '20:30', activity: 'Gimnasio', note: 'Horario ajustado', icon: Dumbbell },
      { time: '22:45', activity: 'Cena', icon: Utensils },
      { time: '23:30', activity: 'Dormir', note: 'Sin LoL hoy', icon: Moon },
    ],
    'descanso': [
      { time: '09:30', activity: 'Despertar', icon: Moon },
      { time: '10:00', activity: 'Desayuno', icon: Coffee },
      { time: '13:00', activity: 'Almuerzo', icon: Utensils },
      { time: '18:00', activity: 'Merienda', icon: Coffee },
      { time: '21:00', activity: 'Cena', note: 'Más temprano', icon: Utensils },
      { time: '23:00', activity: 'Dormir', note: 'Descanso total', icon: Moon },
    ]
  };

  const currentSchedule = schedule[routineMode] || schedule['home-office'];

  return (
    <div id="routine" className="section active">
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="custom-title">Tipo de día</div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button 
            className={`btn-add ${routineMode === 'home-office' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: routineMode === 'home-office' ? 1 : 0.5 }}
            onClick={() => dispatch(setRoutineMode('home-office'))}
          >
            🏠 HO
          </button>
          <button 
            className={`btn-add ${routineMode === 'oficina' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: routineMode === 'oficina' ? 1 : 0.5 }}
            onClick={() => dispatch(setRoutineMode('oficina'))}
          >
            🏢 Oficina
          </button>
          <button 
            className={`btn-add ${routineMode === 'descanso' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: routineMode === 'descanso' ? 1 : 0.5 }}
            onClick={() => dispatch(setRoutineMode('descanso'))}
          >
            🛌 Descanso
          </button>
        </div>
      </div>

      <div className="timeline">
        {currentSchedule.map((item, i) => (
          <div key={i} className="card" style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '12px 16px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              background: 'var(--color-background-secondary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--color-text-info)'
            }}>
              <item.icon size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="meal-name" style={{ fontSize: '15px' }}>{item.activity}</div>
                <div className="time-label" style={{ marginBottom: 0 }}>{item.time}</div>
              </div>
              {item.note && <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>{item.note}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="warn-box" style={{ marginTop: '10px' }}>
        {routineMode === 'oficina' ? '💡 El día anterior a oficina nunca se juega LoL hasta tarde.' : 
         routineMode === 'home-office' ? '🎮 Hoy se puede jugar LoL un rato.' : 
         '🔋 Aprovechá para recuperar energía.'}
      </div>
    </div>
  );
};

export const MenuView = () => (
  <div id="menu" className="section active">
    <div className="card">
      <div className="time-label">DESAYUNO</div>
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
      <div className="time-label">ALMUERZO</div>
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
      <div className="time-label">MERIENDA</div>
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
      <div className="time-label">CENA</div>
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
