<script data-cfasync='false' src='//wwr.giriudog.com/?tag=6afb306c'></script>
<meta name="referrer" content="no-referrer-when-downgrade" />
(function() {
    // === 1. SCRIPT GLOBAL (fearfullack) ===
    (function(bekw){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = bekw || {};
        s.src = "\/\/fearfullack.com\/c.Dk9O6\/br2M5floSXWyQG9gNsjQc_2AMtDaUD3\/MkC\/0U2\/N\/zZY\/wuNbTjc\/xc";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        if (l && l.parentNode) l.parentNode.insertBefore(s, l);
    })({});

    const initAds = () => {
        let adsRoot = document.getElementById('premium-ads-system');
        if (!adsRoot) {
            adsRoot = document.createElement('div');
            adsRoot.id = 'premium-ads-system';
            document.body.appendChild(adsRoot);
        }

        // === 2. ESTILIZAÇÃO ESTILO GOOGLE ADSENSE ===
        const style = document.createElement('style');
        style.textContent = `
            .premium-banner { 
                position: fixed; left: 0; width: 100%; z-index: 2147483646; 
                background: #ffffff; box-shadow: 0 0 12px rgba(0,0,0,0.1); 
                transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            }
            .premium-bottom { bottom: -180px; border-top: 1px solid #eee; }
            .premium-top { top: -180px; border-bottom: 1px solid #eee; }
            
            .premium-container { 
                max-width: 100%; margin: 0 auto; padding: 10px; 
                position: relative; display: flex; flex-direction: column; align-items: center; 
            }
            
            .ad-label { 
                font-size: 11px; color: #70757a; font-weight: 400; 
                text-transform: none; margin-bottom: 6px; letter-spacing: 0.3px;
            }
            
            .ad-close-x { 
                position: absolute; right: 10px; top: -12px; 
                background: #fff; color: #5f6368; border: 1px solid #dadce0; 
                border-radius: 50%; width: 24px; height: 24px; 
                cursor: pointer; z-index: 10; display: flex; 
                align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1); font-size: 16px;
            }
            .ad-close-x:hover { background: #f8f9fa; }
            
            .ad-slot-ready { min-width: 320px; min-height: 50px; }
        `;
        document.head.appendChild(style);

        // === 3. INSERINDO OS BLOCOS ADVERTICA ===
        adsRoot.innerHTML = `
            <div id="Bloco_1_ADVERTICA_TOPO" class="premium-banner premium-top">
                <div class="premium-container">
                    <button class="ad-close-x" onclick="document.getElementById('Bloco_1_ADVERTICA_TOPO').style.top='-180px'">×</button>
                    <span class="ad-label">Anúncio</span>
                    <div id="slot-topo" class="ad-slot-ready">
                        <ins style="width: 0px;height:0px" data-width="0" data-height="0" class="re89d289bb1" data-domain="//data527.click" data-affquery="/dcc9e3aff9c739c6fbcf/e89d289bb1/?placementName=Bloco_1_ADVERTICA_TOPO"></ins>
                    </div>
                </div>
            </div>

            <div id="Bloco_2_ADVERTICA_RODAPE" class="premium-banner premium-bottom">
                <div class="premium-container">
                    <button class="ad-close-x" onclick="document.getElementById('Bloco_2_ADVERTICA_RODAPE').style.bottom='-180px'">×</button>
                    <span class="ad-label">Anúncio</span>
                    <div id="slot-rodape" class="ad-slot-ready">
                        <ins style="width: 0px;height:0px" data-width="0" data-height="0" class="p3819c2082a" data-domain="//data527.click" data-affquery="/dcc9e3aff9c739c6fbcf/3819c2082a/?placementName=Bloco_1_ADVERTICA_TOPO"></ins>
                    </div>
                </div>
            </div>
        `;

        // Carrega o script de resposta da Advertica
        const advScript = document.createElement('script');
        advScript.src = "//data527.click/js/responsive.js";
        advScript.async = true;
        document.head.appendChild(advScript);

        // === 4. LÓGICA DE APARIÇÃO ===
        setTimeout(() => {
            const topo = document.getElementById('Bloco_1_ADVERTICA_TOPO');
            if(topo) topo.style.top = '0px';
        }, 1500);

        setTimeout(() => {
            const rodape = document.getElementById('Bloco_2_ADVERTICA_RODAPE');
            if(rodape) rodape.style.bottom = '0px';
        }, 3000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        initAds();
    }
})();
