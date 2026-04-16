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
        { 
            n: 'Banco Macro', 
            d: 'macro.com.ar', 
            h: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Logo_Banco_Macro.svg/3840px-Logo_Banco_Macro.svg.png',
            link: 'https://career8.successfactors.com/portalcareer?career_ns=job_listing&company=bancomacro&navBarLevel=JOB_SEARCH&rcm_site_locale=es_ES&site=VjItekU2b1RxaW9LendsLzhXY0dPZ1cxUT09&career_job_req_id=4916&_s.crb=%252fdzZBkuNNniw6xP8BVI%252fIDYCRcZ4uL2DNDbN2xuxVmI%253d'
        },
        { n: 'PedidosYa', d: 'pedidosya.com.ar' },
        { n: 'Peñaflor', d: 'grupopenaflor.com.ar', h: 'https://univins.ca/wp-content/uploads/2023/11/grupopenaflor_elesteco_group_logo.png' },
        { n: 'Toyota', d: 'toyota.com.ar' },
        // Empresas inactivas (se mostrarán al final y en gris)
        { n: 'Disney', d: 'disney.com.ar', inactiva: true },
        { n: 'Holcim', d: 'holcim.com.ar', inactiva: true },
        { n: 'Arcos Dorados', d: 'arcosdorados.com', inactiva: true }
    ];

    const container = document.getElementById('grid');
    
    // Ordenar: las activas primero, las inactivas al final
    empresas.sort((a, b) => (a.inactiva === b.inactiva) ? 0 : a.inactiva ? 1 : -1);

    empresas.forEach(emp => {
        const card = document.createElement('a');
        const targetLink = emp.link ? emp.link : `https://${emp.d}`;
        
        card.className = 'bubble';
        
        if (emp.inactiva) {
            // Estilo para inactivas
            card.style.filter = "grayscale(1)";
            card.style.opacity = "0.6";
            card.style.cursor = "not-allowed";
            card.title = "No hay postulaciones actualmente";
            card.href = "#"; // No redirige
            card.onclick = (e) => e.preventDefault();
        } else {
            card.href = targetLink;
            card.target = "_blank";
        }

        // Mantener la lógica del cartel personalizado para Pepsi o similares
        if (emp.alertMsg && !emp.inactiva) {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const overlay = document.createElement('div');
                overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:1000; font-family:sans-serif; backdrop-filter: blur(6px);";
                const modal = document.createElement('div');
                modal.style.cssText = "background:#1e293b; padding:35px; border-radius:20px; text-align:center; color:white; max-width:400px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid #334155;";
                const text = document.createElement('p');
                text.innerText = emp.alertMsg;
                text.style.cssText = "font-size: 17px; margin-bottom: 25px; line-height: 1.6; color: #cbd5e1;";
                modal.appendChild(text);
                const btnContainer = document.createElement('div');
                btnContainer.style.cssText = "display: flex; gap: 12px; justify-content: center;";
                const redirectBtn = document.createElement('button');
                redirectBtn.style.cssText = "background:#3b82f6; color:white; border:none; padding:12px 24px; border-radius:10px; cursor:pointer; font-weight:bold; transition: 0.3s; opacity: 0.4;";
                redirectBtn.disabled = true;
                const cancelBtn = document.createElement('button');
                cancelBtn.style.cssText = "background:#334155; color:white; border:none; padding:12px 24px; border-radius:10px; cursor:pointer; font-weight:bold; transition: 0.3s;";
                cancelBtn.innerText = "Cerrar";
                btnContainer.appendChild(cancelBtn);
                btnContainer.appendChild(redirectBtn);
                modal.appendChild(btnContainer);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                let timeLeft = 3; 
                redirectBtn.innerText = `Ir a la página (${timeLeft}s)`;
                const timer = setInterval(() => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        redirectBtn.innerText = `Ir a la página (${timeLeft}s)`;
                    } else {
                        clearInterval(timer);
                        redirectBtn.innerText = "Ir a la página";
                        redirectBtn.disabled = false;
                        redirectBtn.style.opacity = "1";
                    }
                }, 1000);

                cancelBtn.onclick = () => { clearInterval(timer); document.body.removeChild(overlay); };
                redirectBtn.onclick = () => { clearInterval(timer); document.body.removeChild(overlay); window.open(targetLink, '_blank'); };
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