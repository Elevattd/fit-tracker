
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setRoutineMode, type RoutineMode } from './trackerSlice';
import { Coffee, Bike, Briefcase, Home, Moon, Dumbbell, Utensils, Zap, Calendar } from 'lucide-react';

export const RoutineView = () => {
  const dispatch = useDispatch();
  const savedMode = useSelector((state: RootState) => state.tracker.routineMode);

  // Lógica automática por día de la semana
  const getAutoMode = (): { mode: RoutineMode; isGym: boolean; isCheat: boolean; message: string; lolMessage: string } => {
    const day = new Date().getDay(); // 0: Dom, 1: Lun, ..., 6: Sab
    
    switch (day) {
      case 1: // Lunes
        return { 
          mode: 'home-office', isGym: true, isCheat: false, 
          message: 'Lunes de HO y Gym. Hoy no se juega LoL hasta tarde (mañana oficina).',
          lolMessage: '🚫 No LoL esta noche.'
        };
      case 2: // Martes
        return { 
          mode: 'oficina', isGym: true, isCheat: false, 
          message: 'Martes de Oficina y Gym. Hoy no se juega LoL hasta tarde (mañana oficina).',
          lolMessage: '🚫 No LoL esta noche.'
        };
      case 3: // Miércoles
        return { 
          mode: 'oficina', isGym: false, isCheat: true, 
          message: 'Miércoles de Oficina. Metemos REST y Cheat Meal 100%.',
          lolMessage: '🎮 Hoy se puede jugar algo.'
        };
      case 4: // Jueves
        return { 
          mode: 'home-office', isGym: true, isCheat: false, 
          message: 'Jueves de HO y Gym.',
          lolMessage: '🎮 Hoy se juega LoL.'
        };
      case 5: // Viernes
        return { 
          mode: 'home-office', isGym: true, isCheat: false, 
          message: 'Viernes de HO y Gym.',
          lolMessage: '🎮 Hoy se juega LoL.'
        };
      case 6: // Sábado
        return { 
          mode: 'descanso', isGym: true, isCheat: false, 
          message: 'Sábado: Desayuno tranqui y Gym seguro.',
          lolMessage: '🎮 Noche de LoL.'
        };
      case 0: // Domingo
        return { 
          mode: 'descanso', isGym: false, isCheat: false, 
          message: 'Domingo: Rest total para recuperar.',
          lolMessage: '🛌 Dormir bien.'
        };
      default:
        return { mode: 'home-office', isGym: true, isCheat: false, message: '', lolMessage: '' };
    }
  };

  const autoData = getAutoMode();
  const routineMode = savedMode === 'auto' ? autoData.mode : savedMode;

  const schedule: Record<RoutineMode, { time: string; activity: string; note?: string; icon: any }[]> = {
    'home-office': [
      { time: '09:00', activity: 'Despertar', icon: Moon },
      { time: '09:30', activity: 'Desayuno', note: 'Tranquilo, inicio HO', icon: Coffee },
      { time: '12:30', activity: 'Almuerzo', icon: Utensils },
      { time: '18:00', activity: 'Merienda', note: 'Pre-gym', icon: Zap },
      { time: '20:00', activity: 'Gimnasio', icon: Dumbbell },
      { time: '22:15', activity: 'Cena', icon: Utensils },
      { time: '00:00', activity: 'Dormir', icon: Moon },
    ],
    'oficina': [
      { time: '07:30', activity: 'Despertar', note: 'Más temprano', icon: Moon },
      { time: '07:45', activity: 'Cardio bici', note: 'En ayunas (45 min)', icon: Bike },
      { time: '08:30', activity: 'Desayuno', note: 'Post-cardio, antes de salir', icon: Coffee },
      { time: '08:45', activity: 'Salida a oficina', note: 'Llevar vianda', icon: Briefcase },
      { time: '12:30', activity: 'Almuerzo', note: 'Vianda en oficina', icon: Utensils },
      { time: '19:00', activity: 'Vuelta + Merienda', note: 'Merienda rápida', icon: Home },
      { time: '20:30', activity: 'Gimnasio', note: autoData.isGym ? 'Entreno hoy' : 'Hoy se descansa', icon: Dumbbell },
      { time: '22:45', activity: 'Cena', icon: Utensils },
      { time: '23:30', activity: 'Dormir', icon: Moon },
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
        <div className="card-title">
          Modo de Rutina 
          <span className="badge b-info" style={{ marginLeft: '8px' }}>
            {savedMode === 'auto' ? 'Automático' : 'Manual'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button 
            className={`btn-add ${savedMode === 'auto' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: savedMode === 'auto' ? 1 : 0.5, background: savedMode === 'auto' ? 'var(--color-background-info)' : '' }}
            onClick={() => dispatch(setRoutineMode('auto'))}
          >
            <Calendar size={14} style={{ marginRight: '4px' }} /> Auto
          </button>
          <button 
            className={`btn-add ${savedMode === 'home-office' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: savedMode === 'home-office' ? 1 : 0.5 }}
            onClick={() => dispatch(setRoutineMode('home-office'))}
          >
            🏠 HO
          </button>
          <button 
            className={`btn-add ${savedMode === 'oficina' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: savedMode === 'oficina' ? 1 : 0.5 }}
            onClick={() => dispatch(setRoutineMode('oficina'))}
          >
            🏢 Ofi
          </button>
          <button 
            className={`btn-add ${savedMode === 'descanso' ? '' : 'inactive'}`} 
            style={{ flex: 1, opacity: savedMode === 'descanso' ? 1 : 0.5 }}
            onClick={() => dispatch(setRoutineMode('descanso'))}
          >
            🛌 Res
          </button>
        </div>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--color-text-info)', background: 'var(--color-background-info)', marginBottom: '16px' }}>
        <div style={{ fontWeight: '500', color: 'var(--color-text-info)', fontSize: '13px' }}>Hoy: {autoData.message}</div>
        <div style={{ marginTop: '4px', fontWeight: 'bold', color: 'var(--color-text-danger)' }}>{autoData.lolMessage}</div>
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

      {autoData.isCheat && (
        <div className="warn-box" style={{ marginTop: '10px', border: '1px solid var(--color-text-warning)' }}>
          🍕 <strong>¡DÍA DE CHEAT MEAL!</strong> Disfrutá la cena y el postre.
        </div>
      )}
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
