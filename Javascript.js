document.addEventListener("DOMContentLoaded", () => {
    
    const empresas = [
        { 
            n: 'Mercado Libre', 
            d: 'mercadolibre.com.ar',
            link: 'https://mercadolibre.eightfold.ai/careers?domain=mercadolibre.com&hl=es&start=0&location=Argentina&pid=40958275&sort_by=match&filter_include_remote=1'
        },
        { 
            n: 'Arcor', 
            d: 'arcor.com',
            link: 'https://emqm.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/es/sites/grupoarcorgl/jobs/preview/44966/?keyword=pasante&location=Buenos+Aires%2C+Argentina&locationId=100000136275465&locationLevel=state&mode=location'
        },
        { 
            n: 'Unilever', 
            d: 'unilever.com.ar',
            link: 'https://grupociadetalentos.com/unicxs2026/'
        },
        // Pepsico con el link y el mensaje de alerta
        { 
            n: 'Pepsico', 
            d: 'pepsico.com',
            link: 'https://firstgenpepsico.com/argentina',
            alertMsg: 'A esta pasantía ya me postulé en Febrero pero al día de hoy no sé si seguirá vigente o si ya finalizó.'
        },
        { 
            n: 'Tenaris', 
            d: 'tenaris.com', 
            h: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Tenaris_Logo.svg/1280px-Tenaris_Logo.svg.png',
            link: 'https://careers.techint.com/job/AR-Buenos-Aires-Programa-de-Pr%C3%A1cticas-Educativas-Ordinarias-y-Programa-de-J%C3%B3venes-Profesionales/1382647200/'
        },
        { n: 'Banco Macro', d: 'macro.com.ar', h: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Logo_Banco_Macro.svg/3840px-Logo_Banco_Macro.svg.png' },
        { n: 'Disney', d: 'disney.com.ar' },
        { n: 'Holcim', d: 'holcim.com.ar' },
        { n: 'Arcos Dorados', d: 'arcosdorados.com' },
        { n: 'PedidosYa', d: 'pedidosya.com.ar' },
        { n: 'Peñaflor', d: 'grupopenaflor.com.ar', h: 'https://univins.ca/wp-content/uploads/2023/11/grupopenaflor_elesteco_group_logo.png' },
        { n: 'Toyota', d: 'toyota.com.ar' }
    ];

    const container = document.getElementById('grid');
    
    empresas.forEach(emp => {
        const card = document.createElement('a');
        card.href = emp.link ? emp.link : `https://${emp.d}`;
        card.target = "_blank";
        card.className = 'bubble';
        
        // Lógica para mostrar el cartel si la empresa tiene un alertMsg
        if (emp.alertMsg) {
            card.addEventListener('click', (e) => {
                const proceed = confirm(emp.alertMsg + "\n\n¿Querés ir a la página de todas formas?");
                // Si el usuario hace clic en "Cancelar", evitamos que se abra el enlace
                if (!proceed) {
                    e.preventDefault(); 
                }
            });
        }
        
        const logoSrc = emp.h ? emp.h : `https://s2.googleusercontent.com/s2/favicons?domain=${emp.d}&sz=256`;
        
        card.innerHTML = `
            <img src="${logoSrc}" 
                 onerror="this.src='https://via.placeholder.com/85?text=${emp.n.split(' ')[0]}&bg=1e293b&textColor=ffffff'">
            <span>${emp.n}</span>
        `;
        
        container.appendChild(card);
    });
});