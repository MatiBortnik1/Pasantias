document.addEventListener("DOMContentLoaded", () => {
    
    const empresas = [
        { n: 'Mercado Libre', d: 'mercadolibre.com.ar', link: 'https://mercadolibre.eightfold.ai/careers?domain=mercadolibre.com&hl=es&start=0&location=Argentina&pid=40958275&sort_by=match&filter_include_remote=1' },
        { n: 'Arcor', d: 'arcor.com', link: 'https://emqm.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/es/sites/grupoarcorgl/jobs/preview/44966/?keyword=pasante&location=Buenos+Aires%2C+Argentina&locationId=100000136275465&locationLevel=state&mode=location' },
        { n: 'Unilever', d: 'unilever.com.ar', link: 'https://grupociadetalentos.com/unicxs2026/' },
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
        { 
            n: 'PedidosYa', 
            d: 'pedidosya.com.ar',
            link: 'https://empleos.pedidosya.com/job/logistics-and-distribution-analyst-in-buenos-aires-argentina-jid-2019'
        },
        { 
            n: 'Peñaflor', 
            d: 'grupopenaflor.com.ar', 
            h: 'https://univins.ca/wp-content/uploads/2023/11/grupopenaflor_elesteco_group_logo.png',
            link: 'https://grupopenaflor.hiringroom.com/jobs/get_vacancy/69bd6552eed9d18797358159'
        },
        { 
            n: 'Toyota', 
            d: 'toyota.com.ar',
            link: 'https://toyota.wd503.myworkdayjobs.com/es/TLAC/details/Programa-de-Pasantas-TOYOTA-2025_10310306?timeType=8619927b7938100b6f4b8009861a0057',
            alertMsg: 'La pasantía comenzó en noviembre 2025 pero sigue figurando en la página'
        },
        // Inactivas
        { n: 'Disney', d: 'disney.com.ar', inactiva: true },
        { n: 'Holcim', d: 'holcim.com.ar', inactiva: true },
        { n: 'Arcos Dorados', d: 'arcosdorados.com', inactiva: true }
    ];

    const container = document.getElementById('grid');
    
    empresas.sort((a, b) => (a.inactiva === b.inactiva) ? 0 : a.inactiva ? 1 : -1);

    const tooltip = document.createElement('div');
    tooltip.style.cssText = "position:absolute; background:#ef4444; color:white; padding:8px 12px; border-radius:6px; font-size:12px; font-weight:bold; visibility:hidden; z-index:1000; pointer-events:none; white-space:nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transform: translate(-50%, -120%); transition: visibility 0.1s;";
    tooltip.innerText = "No hay postulaciones actualmente";
    document.body.appendChild(tooltip);

    empresas.forEach(emp => {
        const card = document.createElement('a');
        const targetLink = emp.link ? emp.link : `https://${emp.d}`;
        card.className = 'bubble';
        
        if (emp.inactiva) {
            card.style.filter = "grayscale(1)";
            card.style.opacity = "0.5";
            card.style.cursor = "not-allowed";
            card.href = "#";

            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
                tooltip.style.top = `${rect.top + window.scrollY}px`;
                tooltip.style.visibility = 'visible';
            });
            card.addEventListener('mouseleave', () => {
                tooltip.style.visibility = 'hidden';
            });
            card.onclick = (e) => e.preventDefault();
        } else {
            card.href = targetLink;
            card.target = "_blank";
        }

        if (emp.alertMsg && !emp.inactiva) {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarModal(emp.alertMsg, targetLink);
            });
        }
        
        const logoSrc = emp.h ? emp.h : `https://s2.googleusercontent.com/s2/favicons?domain=${emp.d}&sz=256`;
        card.innerHTML = `
            <img src="${logoSrc}" onerror="this.src='https://via.placeholder.com/85?text=${emp.n[0]}'">
            <span>${emp.n}</span>
        `;
        container.appendChild(card);
    });

    function mostrarModal(msg, link) {
        const overlay = document.createElement('div');
        overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:2000; backdrop-filter: blur(6px);";
        const modal = document.createElement('div');
        modal.style.cssText = "background:#1e293b; padding:35px; border-radius:20px; text-align:center; color:white; max-width:400px; border: 1px solid #334155;";
        modal.innerHTML = `<p style="margin-bottom:25px; line-height:1.6;">${msg}</p>`;
        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = "display:flex; gap:12px; justify-content:center;";
        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = "Cerrar";
        cancelBtn.style.cssText = "background:#334155; color:white; border:none; padding:12px 20px; border-radius:10px; cursor:pointer;";
        const redirectBtn = document.createElement('button');
        redirectBtn.disabled = true;
        redirectBtn.style.cssText = "background:#3b82f6; color:white; border:none; padding:12px 20px; border-radius:10px; cursor:pointer; opacity:0.4;";
        btnContainer.append(cancelBtn, redirectBtn);
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
        redirectBtn.onclick = () => { window.open(link, '_blank'); document.body.removeChild(overlay); };
    }
});