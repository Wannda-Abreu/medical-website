import React, { useEffect, useRef, useState, Suspense } from "react";

type Loader<T extends React.ComponentType<any>> = () => Promise<{ default: T }>;

type Props<T extends React.ComponentType<any>> = {
  loader: Loader<T>;
  fallback?: React.ReactNode;
  rootMargin?: string;
  once?: boolean;
  props?: React.ComponentProps<T>;
};

export default function LazySection<T extends React.ComponentType<any>>({
  loader,
  fallback = null,
  rootMargin = "300px",
  once = true,
  props,
}: Props<T>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          if (once) io.disconnect();
        }
      },
      { root: null, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once, visible]);

  useEffect(() => {
    if (!visible || Comp) return;
    loader().then((m) => setComp(() => m.default));
  }, [visible, Comp, loader]);

  return (
    <div ref={ref}>
      {Comp ? (
        <Suspense fallback={fallback}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Comp {...(props as any)} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

