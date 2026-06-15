
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { toggleItem, setVariant, addExtra, removeExtra, resetDay } from './trackerSlice';
import { BASE_MEALS, TARGETS, type Meal } from '../../data/dietData';
import { ProgressBar } from '../../components/ProgressBar';
import { ChevronRight, ChevronDown, X, Plus } from 'lucide-react';

export const TrackerView = () => {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.tracker);
  const [openMeals, setOpenMeals] = useState<Record<string, boolean>>({});
  
  const [extra, setExtra] = useState({ name: '', kcal: '', pro: '', ch: '', fat: '' });

  const toggleMeal = (id: string) => {
    setOpenMeals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotals = () => {
    let kcal = 0, pro = 0, ch = 0, fat = 0;
    
    BASE_MEALS.forEach(meal => {
      const variantIdx = state.variants[meal.id];
      meal.items.forEach((item, i) => {
        if ((meal.id === 'almuerzo' || meal.id === 'cena') && i === 1 && variantIdx !== undefined && variantIdx !== null) return;
        
        if (state.checked[`${meal.id}_${i}`]) {
          kcal += item.kcal; pro += item.pro; ch += item.ch; fat += item.fat;
        }
      });
      
      if (variantIdx !== undefined && variantIdx !== null && meal.variants) {
        if (state.checked[`${meal.id}_v${variantIdx}`]) {
          const v = meal.variants[variantIdx];
          kcal += v.kcal; pro += v.pro; ch += v.ch; fat += v.fat;
        }
      }
    });

    state.extras.forEach(e => {
      kcal += e.kcal; pro += e.pro; ch += e.ch; fat += e.fat;
    });

    return { kcal, pro, ch, fat };
  };

  const totals = calculateTotals();

  const handleAddExtra = () => {
    if (!extra.name && !extra.kcal) return;
    dispatch(addExtra({
      name: extra.name || 'Extra',
      kcal: parseFloat(extra.kcal) || 0,
      pro: parseFloat(extra.pro) || 0,
      ch: parseFloat(extra.ch) || 0,
      fat: parseFloat(extra.fat) || 0,
    }));
    setExtra({ name: '', kcal: '', pro: '', ch: '', fat: '' });
  };

  const getMealKcal = (meal: Meal) => {
    let total = 0;
    const variantIdx = state.variants[meal.id];
    meal.items.forEach((item, i) => {
      if ((meal.id === 'almuerzo' || meal.id === 'cena') && i === 1 && variantIdx !== undefined && variantIdx !== null) return;
      total += item.kcal;
    });
    if (variantIdx !== undefined && variantIdx !== null && meal.variants) {
      total += meal.variants[variantIdx].kcal;
    }
    return total;
  };

  const getMealCheckedKcal = (meal: Meal) => {
    let total = 0;
    const variantIdx = state.variants[meal.id];
    meal.items.forEach((item, i) => {
      if ((meal.id === 'almuerzo' || meal.id === 'cena') && i === 1 && variantIdx !== undefined && variantIdx !== null) return;
      if (state.checked[`${meal.id}_${i}`]) total += item.kcal;
    });
    if (variantIdx !== undefined && variantIdx !== null && state.checked[`${meal.id}_v${variantIdx}`] && meal.variants) {
      total += meal.variants[variantIdx].kcal;
    }
    return total;
  };

  const fechaLabel = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div id="tracker" className="section active">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>
          {fechaLabel}
        </div>
        <button className="btn-reset" onClick={() => {
          if (confirm('¿Resetear todo el día?')) dispatch(resetDay());
        }}>Resetear día</button>
      </div>

      <div className="macro-grid">
        <ProgressBar label="Calorías" value={totals.kcal} target={TARGETS.kcal} color="#378ADD" />
        <ProgressBar label="Proteína" value={totals.pro} target={TARGETS.pro} unit="g" color="#1D9E75" />
        <ProgressBar label="Carbos" value={totals.ch} target={TARGETS.ch} unit="g" color="#BA7517" />
        <ProgressBar label="Grasas" value={totals.fat} target={TARGETS.fat} unit="g" color="#7C3AED" />
      </div>

      <div id="meals-container">
        {BASE_MEALS.map(meal => {
          const isOpen = openMeals[meal.id];
          const variantIdx = state.variants[meal.id];
          
          return (
            <div key={meal.id} className="meal-block">
              <div className="meal-header" onClick={() => toggleMeal(meal.id)}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginBottom: '2px' }}>{meal.time}</div>
                  <div className="meal-name">{meal.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge b-kcal">{getMealCheckedKcal(meal)} / {getMealKcal(meal)} kcal</span>
                  <span className="meal-toggle">
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </span>
                </div>
              </div>
              
              {isOpen && (
                <div className="meal-items">
                  {meal.items.map((item, i) => {
                    if ((meal.id === 'almuerzo' || meal.id === 'cena') && i === 1 && variantIdx !== undefined && variantIdx !== null) return null;
                    const key = `${meal.id}_${i}`;
                    const isChecked = !!state.checked[key];
                    return (
                      <div key={i} className="food-row">
                        <input 
                          type="checkbox" 
                          className="food-check" 
                          checked={isChecked} 
                          onChange={(e) => dispatch(toggleItem({ key, checked: e.target.checked }))} 
                        />
                        <span className={`food-name ${isChecked ? 'checked' : ''}`}>{item.name}</span>
                        <span className="food-qty">{item.qty}</span>
                        <span className="food-macros">{item.pro}p·{item.ch}c·{item.fat}f</span>
                      </div>
                    );
                  })}

                  {meal.variants && (
                    <div className="custom-section">
                      <div className="custom-title">Variante de carbohidrato</div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <button 
                          className="btn-add" 
                          style={{ opacity: variantIdx === null || variantIdx === undefined ? 1 : 0.5 }} 
                          onClick={() => dispatch(setVariant({ mealId: meal.id, variantIndex: null }))}
                        >Arroz</button>
                        {meal.variants.map((_v, vi) => (
                          <button 
                            key={vi}
                            className="btn-add" 
                            style={{ opacity: variantIdx === vi ? 1 : 0.5 }} 
                            onClick={() => dispatch(setVariant({ mealId: meal.id, variantIndex: vi }))}
                          >{vi === 0 ? 'Papa' : 'Batata'}</button>
                        ))}
                      </div>
                      {variantIdx !== null && variantIdx !== undefined && meal.variants[variantIdx] && (
                        <div className="food-row">
                          <input 
                            type="checkbox" 
                            className="food-check" 
                            style={{ accentColor: '#1D9E75' }}
                            checked={!!state.checked[`${meal.id}_v${variantIdx}`]} 
                            onChange={(e) => dispatch(toggleItem({ key: `${meal.id}_v${variantIdx}`, checked: e.target.checked }))} 
                          />
                          <span className={`food-name ${state.checked[`${meal.id}_v${variantIdx}`] ? 'checked' : ''}`}>
                            {meal.variants[variantIdx].name}
                          </span>
                          <span className="food-qty">{meal.variants[variantIdx].qty}</span>
                          <span className="food-macros">
                            {meal.variants[variantIdx].pro}p·{meal.variants[variantIdx].ch}c·{meal.variants[variantIdx].fat}f
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: '12px' }}>
        <div className="card-title">Agregar alimento extra</div>
        <div className="custom-form">
          <input 
            className="custom-input" 
            placeholder="Nombre" 
            style={{ flex: 2, minWidth: '110px' }}
            value={extra.name}
            onChange={e => setExtra({...extra, name: e.target.value})}
          />
          <input className="custom-input" placeholder="kcal" type="number" value={extra.kcal} onChange={e => setExtra({...extra, kcal: e.target.value})} />
          <input className="custom-input" placeholder="prot g" type="number" value={extra.pro} onChange={e => setExtra({...extra, pro: e.target.value})} />
          <input className="custom-input" placeholder="CH g" type="number" value={extra.ch} onChange={e => setExtra({...extra, ch: e.target.value})} />
          <input className="custom-input" placeholder="grasas g" type="number" value={extra.fat} onChange={e => setExtra({...extra, fat: e.target.value})} />
          <button className="btn-add" onClick={handleAddExtra}><Plus size={14} style={{ marginRight: '4px' }} /> Agregar</button>
        </div>
        <div id="extras-list">
          {state.extras.map((e, i) => (
            <div key={i} className="food-row">
              <span className="food-name">{e.name}</span>
              <span className="food-macros">{e.kcal}kcal·{e.pro}p·{e.ch}c·{e.fat}f</span>
              <button className="btn-remove" onClick={() => dispatch(removeExtra(i))}><X size={14} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
