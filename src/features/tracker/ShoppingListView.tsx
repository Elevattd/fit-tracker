
import { ShoppingCart, Package, Info } from 'lucide-react';

export const ShoppingListView = () => {
  // Cálculos basados en 30 días
  const days = 30;

  // 1. Huevos: 8 por desayuno + 8 por merienda = 16 por día
  const totalEggs = 16 * days;
  const maples = Math.ceil(totalEggs / 30);

  // 2. Mermelada (400g): 40g (desayuno) + 40g (merienda) = 80g por día
  const totalJamGrams = 80 * days;
  const jamJars = Math.ceil(totalJamGrams / 400);

  // 3. Manteca de maní (380g): 15g por día (solo desayuno)
  const totalPeanutGrams = 15 * days;
  const peanutJars = Math.ceil(totalPeanutGrams / 380);

  // 4. Pollo (Raw): 200g cocido x 2 comidas = 400g cocido. Factor crudo 1.25x = 500g crudo/día
  const totalChickenKg = (0.5 * days).toFixed(1);

  // 5. Arroz (80g crudo x 2 comidas = 160g/día)
  const totalRiceKg = (0.16 * days).toFixed(1);

  // 6. Brócoli (150g x 2 comidas = 300g/día)
  const totalBroccoliKg = (0.3 * days).toFixed(1);

  // 7. Variantes (Papa/Batata): Basado en 1 intercambio (250g papa o 220g batata)
  const totalPotatoKg = (0.25 * days).toFixed(1); // Si se usara todos los días en una comida
  const totalSweetPotatoKg = (0.22 * days).toFixed(1);

  const items = [
    { name: 'Huevos', qty: `${maples} maples`, detail: `${totalEggs} unidades totales`, icon: Package },
    { name: 'Pechuga de Pollo', qty: `${totalChickenKg} kg`, detail: 'Peso en crudo (500g/día)', icon: Package },
    { name: 'Mermelada Diet (400g)', qty: `${jamJars} frascos`, detail: 'Mermelada Hemeth', icon: Package },
    { name: 'Manteca de Maní (380g)', qty: `${peanutJars} frascos`, detail: '15g diarios', icon: Package },
    { name: 'Arroz', qty: `${totalRiceKg} kg`, detail: 'Peso en crudo', icon: Package },
    { name: 'Brócoli', qty: `${totalBroccoliKg} kg`, detail: '300g diarios', icon: Package },
    { name: 'Papa', qty: `${totalPotatoKg} kg`, detail: 'Para intercambios (250g/comida)', icon: Package },
    { name: 'Batata', qty: `${totalSweetPotatoKg} kg`, detail: 'Para intercambios (220g/comida)', icon: Package },
  ];

  return (
    <div id="shopping" className="section active">
      <div className="card" style={{ background: 'var(--color-background-info)', border: 'none' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ShoppingCart className="color-text-info" />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Lista de Compra Mensual</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Basado en tu dieta actual para 30 días</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '12px', padding: '0' }}>
        {items.map((item, i) => (
          <div key={i} className="row" style={{ padding: '14px', borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--color-border-tertiary)' }}>
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

      <div className="warn-box" style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Info size={16} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '12px' }}>
            <strong>Nota:</strong> Los vegetales pueden variar según la temporada.
          </div>
        </div>
      </div>
    </div>
  );
};
