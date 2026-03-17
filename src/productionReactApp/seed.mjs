const baseUrl = 'http://localhost:5160/api';

async function run() {
    console.log("Starting seed script...");
    
    // Create 10 lines
    const lines = [];
    for(let i=1; i<=10; i++) {
        const res = await fetch(`${baseUrl}/ProductionLine`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lineName: `Automated Line ${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
                isActive: true
            })
        });
        const data = await res.json();
        lines.push(data);
    }
    console.log(`Created ${lines.length} Production Lines`);

    // Create 30 Equipment (3 per line)
    const equipments = [];
    let eqCounter = 1;
    for(const l of lines) {
        for(let j=1; j<=3; j++) {
            const res = await fetch(`${baseUrl}/Equipment`, {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                    lineId: l.id || l.ID || l.iD,
                    equipmentName: `Precision Eq ${Math.random().toString(36).substring(2, 7)}`,
                    isActive: Math.random() > 0.1
               })
            });
            const data = await res.json();
            equipments.push(data);
        }
    }
    console.log(`Created ${equipments.length} Equipments`);

    // Create 60 Parts (2 per equipment)
    const parts = [];
    let ptCounter = 1;
    for(const e of equipments) {
        for(let k=1; k<=2; k++) {
            const res = await fetch(`${baseUrl}/Part`, {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                    equipmentId: e.id || e.ID || e.iD,
                    partName: `Component 0x${Math.floor(Math.random() * 9000) + 1000}`,
                    isActive: Math.random() > 0.1
               })
            });
            const data = await res.json();
            parts.push(data);
        }
    }
    console.log(`Created ${parts.length} Parts`);
    console.log("Finished seeding exactly 100 relational records!");
}

run().catch(console.error);
