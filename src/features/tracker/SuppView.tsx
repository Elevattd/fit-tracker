
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { toggleSupp } from './trackerSlice';
import { SUPP_SCHEDULE } from '../../data/dietData';
import { ChevronRight, ChevronDown } from 'lucide-react';

export const SuppView = () => {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.tracker);
  const [openBlocks, setOpenBlocks] = useState<Record<number, boolean>>({});

  const toggleBlock = (idx: number) => {
    setOpenBlocks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const calculateCaffeine = () => {
    let total = 0;
    SUPP_SCHEDULE.forEach((block, bi) => {
      block.items.forEach((item, ii) => {
        if (state.suppChecked[`${bi}_${ii}`]) {
          total += item.caff;
        }
      });
    });
    return total;
  };

  const totalCaffeine = calculateCaffeine();
  const totalItems = SUPP_SCHEDULE.reduce((acc, block) => acc + block.items.length, 0);
  const takenItems = Object.values(state.suppChecked).filter(Boolean).length;

  return (
    <div id="supps" className="section active">
      <div className="caff-box">
        ☕ Cafeína del día: <strong>{totalCaffeine}mg</strong> / 300mg máximo
        <div className="macro-bar-wrap" style={{ marginTop: '6px' }}>
          <div 
            className="macro-bar" 
            style={{ 
              width: `${Math.min(100, (totalCaffeine / 300) * 100)}%`, 
              backgroundColor: totalCaffeine >= 270 ? '#dc2626' : totalCaffeine >= 210 ? '#BA7517' : '#1D9E75' 
            }} 
          />
        </div>
      </div>

      <div id="supps-container">
        {SUPP_SCHEDULE.map((block, bi) => {
          const isOpen = openBlocks[bi];
          const checkedCount = block.items.filter((_, ii) => state.suppChecked[`${bi}_${ii}`]).length;
          
          return (
            <div key={bi} className="supp-block">
              <div className="supp-header" onClick={() => toggleBlock(bi)}>
                <div>
                  <div className="supp-time">{block.time}</div>
                  <div className="supp-title">{block.title}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge b-supp">{checkedCount}/{block.items.length}</span>
                  <span className="meal-toggle">
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </span>
                </div>
              </div>
              {isOpen && (
                <div className="supp-body">
                  {block.items.map((item, ii) => {
                    const key = `${bi}_${ii}`;
                    const isChecked = !!state.suppChecked[key];
                    return (
                      <div key={ii} className="supp-row">
                        <input 
                          type="checkbox" 
                          className="supp-check" 
                          checked={isChecked} 
                          onChange={(e) => dispatch(toggleSupp({ key, checked: e.target.checked }))} 
                        />
                        <div style={{ flex: 1 }}>
                          <div className={`supp-name ${isChecked ? 'checked' : ''}`}>{item.name}</div>
                          <div className="supp-why">{item.why}</div>
                        </div>
                        <div className="supp-dose">{item.dose}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: '4px' }}>
        <div className="card-title">Resumen del stack</div>
        <div className="row">
          <span className="rl">Suplementos tomados</span>
          <span className="rv">{takenItems} / {totalItems}</span>
        </div>
        <div className="row">
          <span className="rl">Cafeína acumulada</span>
          <span className="rv">{totalCaffeine}mg</span>
        </div>
      </div>
    </div>
  );
};
