const ENABLE_VITALS = import.meta.env.DEV && import.meta.env.VITE_ENABLE_WEB_VITALS === '1';

if (ENABLE_VITALS) {
  (async () => {
    try {
      const { onCLS, onINP, onLCP } = await import(/* @vite-ignore */ 'web-vitals');
      onLCP(console.log);
      onCLS(console.log);
      onINP(console.log);
    } catch (err) {
      // web-vitals no disponible; continuar sin métricas en dev
      console.warn('[vitals] web-vitals no instalado:', (err as Error)?.message);
    }
  })();
}
