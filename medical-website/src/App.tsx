import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const SobreNosotros = React.lazy(() => import("./pages/SobreNosotros"));
const LegalModal = React.lazy(() => import("./components/legal/LegalModal"));

function Shell() {
  const location = useLocation();
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace(/^#/, ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, location.hash]);

  const showLegal = hash.startsWith("/legal/");
  const legalType = showLegal ? hash.replace("/legal/", "").replace(/\/$/, "") : "";

  return (
    <>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {showLegal && (
        <LegalModal
          type={legalType}
          onClose={() => {
            try {
              window.location.hash = "site-footer";
            } catch {}
          }}
        />
      )}
    </>
  );
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Shell />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/sobre-nosotros", element: <SobreNosotros /> },
      ],
    },
  ]);

  return (
    <HelmetProvider>
      <Suspense fallback={<div className="p-6 text-center" role="status" aria-live="polite">Cargando…</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  );
}
