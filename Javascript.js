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
        // Pepsico con mensaje de alerta
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
        const targetLink = emp.link ? emp.link : `https://${emp.d}`;
        card.href = targetLink;
        card.target = "_blank";
        card.className = 'bubble';
        
        // Lógica del nuevo cartel personalizado
        if (emp.alertMsg) {
            card.addEventListener('click', (e) => {
                e.preventDefault(); // Frena la apertura instantánea del link

                // Crear fondo oscuro (overlay)
                const overlay = document.createElement('div');
                overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:1000; font-family:sans-serif; backdrop-filter: blur(4px);";

                // Crear caja principal
                const modal = document.createElement('div');
                modal.style.cssText = "background:#1e293b; padding:30px; border-radius:15px; text-align:center; color:white; max-width:400px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);";

                // Agregar el texto de tu mensaje
                const text = document.createElement('p');
                text.innerText = emp.alertMsg;
                text.style.cssText = "font-size: 16px; margin-bottom: 25px; line-height: 1.5;";
                modal.appendChild(text);

                // Contenedor de los botones
                const btnContainer = document.createElement('div');
                btnContainer.style.cssText = "display: flex; gap: 15px; justify-content: center;";

                // Botón Redirigir (arranca deshabilitado)
                const redirectBtn = document.createElement('button');
                redirectBtn.style.cssText = "background:#3b82f6; color:white; border:none; padding:12px 20px; border-radius:8px; cursor:pointer; font-weight:bold; transition: 0.2s; opacity: 0.5;";
                redirectBtn.disabled = true;

                // Botón Cerrar/Cancelar
                const cancelBtn = document.createElement('button');
                cancelBtn.style.cssText = "background:#ef4444; color:white; border:none; padding:12px 20px; border-radius:8px; cursor:pointer; font-weight:bold; transition: 0.2s;";
                cancelBtn.innerText = "Cerrar";

                btnContainer.appendChild(cancelBtn);
                btnContainer.appendChild(redirectBtn);
                modal.appendChild(btnContainer);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                // Lógica de cuenta regresiva de 5 segundos
                let timeLeft = 5;
                redirectBtn.innerText = `Ir a la página (${timeLeft}s)`;

                const timer = setInterval(() => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        redirectBtn.innerText = `Ir a la página (${timeLeft}s)`;
                    } else {
                        clearInterval(timer); // Frena el reloj
                        redirectBtn.innerText = "Ir a la página";
                        redirectBtn.disabled = false;
                        redirectBtn.style.opacity = "1"; // Le devuelve el color normal
                    }
                }, 1000);

                // Qué pasa si tocás "Cerrar"
                cancelBtn.onclick = () => {
                    clearInterval(timer);
                    document.body.removeChild(overlay);
                };

                // Qué pasa si tocás "Ir a la página"
                redirectBtn.onclick = () => {
                    clearInterval(timer);
                    document.body.removeChild(overlay);
                    window.open(targetLink, '_blank');
                };
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