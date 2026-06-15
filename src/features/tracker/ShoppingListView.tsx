
import { ShoppingCart, Package, Info, Pill } from 'lucide-react';

export const ShoppingListView = () => {
  // Cálculo de días en el mes actual
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = now.toLocaleDateString('es-AR', { month: 'long' });

  // 1. Huevos: 16 por día
  const totalEggs = 16 * daysInMonth;
  const maples = Math.ceil(totalEggs / 30);

  // 2. Mermelada (400g): 80g por día
  const totalJamGrams = 80 * daysInMonth;
  const jamJars = Math.ceil(totalJamGrams / 400);

  // 3. Manteca de maní (380g): 15g por día
  const totalPeanutGrams = 15 * daysInMonth;
  const peanutJars = Math.ceil(totalPeanutGrams / 380);

  // 4. Pollo (Raw): 500g crudo/día
  const totalChickenKg = (0.5 * daysInMonth).toFixed(1);

  // 5. Arroz (160g crudo/día) - Comprado de a kilo
  const totalRiceGrams = 160 * daysInMonth;
  const riceBags = Math.ceil(totalRiceGrams / 1000);

  // 6. Brócoli (300g/día)
  const totalBroccoliKg = (0.3 * daysInMonth).toFixed(1);

  // 7. Papa/Batata
  const totalPotatoKg = (0.25 * daysInMonth).toFixed(1);
  const totalSweetPotatoKg = (0.22 * daysInMonth).toFixed(1);

  const foodItems = [
    { name: 'Huevos', qty: `${maples} maples`, detail: `${totalEggs} unidades para ${monthName}`, icon: Package },
    { name: 'Pechuga de Pollo', qty: `${totalChickenKg} kg`, detail: 'Peso en crudo (500g/día)', icon: Package },
    { name: 'Arroz', qty: `${riceBags} kg`, detail: `Bolsas de 1kg (${(totalRiceGrams/1000).toFixed(1)}kg exactos)`, icon: Package },
    { name: 'Mermelada Diet (400g)', qty: `${jamJars} frascos`, detail: 'Mermelada', icon: Package },
    { name: 'Manteca de Maní (380g)', qty: `${peanutJars} frascos`, detail: '15g diarios', icon: Package },
    { name: 'Brócoli', qty: `${totalBroccoliKg} kg`, detail: '300g diarios', icon: Package },
    { name: 'Papa', qty: `${totalPotatoKg} kg`, detail: '250g por comida (intercambio)', icon: Package },
    { name: 'Batata', qty: `${totalSweetPotatoKg} kg`, detail: '220g por comida (intercambio)', icon: Package },
  ];

  const supplementItems = [
    { name: 'Creatina', qty: `${(5 * daysInMonth)}g`, detail: '5g diarios', icon: Pill },
    { name: 'Pre-Workout', qty: `${daysInMonth} scoops`, detail: 'RAW Essential (13.3g c/u)', icon: Pill },
    { name: 'Multivitamínico', qty: `${daysInMonth} comp.`, detail: 'Gravitón Plus', icon: Pill },
    { name: 'Omega 3', qty: `${daysInMonth * 2} caps`, detail: '2 caps diarias (mínimo)', icon: Pill },
    { name: 'Vitamina C', qty: `${daysInMonth} comp.`, detail: '500mg diarios', icon: Pill },
    { name: 'Vitamina D3', qty: `${daysInMonth} comp.`, detail: '2000 UI diarias', icon: Pill },
    { name: 'Magnesio', qty: `${daysInMonth} dosis`, detail: '300-400mg noche', icon: Pill },
    { name: 'Ashwagandha', qty: `${daysInMonth} dosis`, detail: '300-600mg noche', icon: Pill },
  ];

  return (
    <div id="shopping" className="section active">
      <div className="card" style={{ background: 'var(--color-background-info)', border: 'none' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ShoppingCart className="color-text-info" />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', textTransform: 'capitalize' }}>Lista de Compra: {monthName}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Cálculo exacto para {daysInMonth} días</div>
          </div>
        </div>
      </div>

      <div className="custom-title" style={{ marginTop: '20px', marginLeft: '4px' }}>🍎 Comida</div>
      <div className="card" style={{ marginTop: '8px', padding: '0' }}>
        {foodItems.map((item, i) => (
          <div key={i} className="row" style={{ padding: '14px', borderBottom: i === foodItems.length - 1 ? 'none' : '1px solid var(--color-border-tertiary)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                background: 'var(--color-background-secondary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--color-text-secondary)'
              }}>
                <item.icon size={16} />
              </div>
              <div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{item.detail}</div>
              </div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: 'var(--color-text-info)' }}>
              {item.qty}
            </div>
          </div>
        ))}
      </div>

      <div className="custom-title" style={{ marginTop: '24px', marginLeft: '4px' }}>💊 Suplementos</div>
      <div className="card" style={{ marginTop: '8px', padding: '0' }}>
        {supplementItems.map((item, i) => (
          <div key={i} className="row" style={{ padding: '14px', borderBottom: i === supplementItems.length - 1 ? 'none' : '1px solid var(--color-border-tertiary)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                background: 'var(--color-background-info)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#7c3aed'
              }}>
                <item.icon size={16} />
              </div>
              <div>
                <div style={{ fontWeight: '500', fontSize: '14px' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>{item.detail}</div>
              </div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#7c3aed' }}>
              {item.qty}
            </div>
          </div>
        ))}
      </div>

      <div className="warn-box" style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Info size={16} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '12px' }}>
            <strong>Nota:</strong> Los cálculos se ajustan automáticamente según los días de <strong>{monthName}</strong>. El arroz se redondea a bolsas de 1kg.
          </div>
        </div>
      </div>
    </div>
  );
};
