import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { PageLoader } from "@/components/site/PageLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HMTI - Himpunan Mahasiswa Teknik Informatika" },
      {
        name: "description",
        content:
          "Pusat informasi, komunitas, dan ekosistem IT kampus untuk mahasiswa Teknik Informatika.",
      },
      { name: "author", content: "HMTI" },
      { property: "og:title", content: "HMTI - Himpunan Mahasiswa Teknik Informatika" },
      {
        property: "og:description",
        content:
          "Pusat informasi, komunitas, dan ekosistem IT kampus untuk mahasiswa Teknik Informatika.",
      },
      { property: "og:site_name", content: "HMTI" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#1a1515" },
      { name: "twitter:title", content: "HMTI - Himpunan Mahasiswa Teknik Informatika" },
      {
        name: "twitter:description",
        content:
          "Pusat informasi, komunitas, dan ekosistem IT kampus untuk mahasiswa Teknik Informatika.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f2c4d91a-9989-497d-93a6-8be5c21e2eba",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f2c4d91a-9989-497d-93a6-8be5c21e2eba",
      },
      {
        name: "description",
        content:
          "Website resmi HMTI Universitas Bani Saleh untuk berita, agenda, anggota, dan dokumentasi organisasi.",
      },
      {
        property: "og:description",
        content:
          "Website resmi HMTI Universitas Bani Saleh untuk berita, agenda, anggota, dan dokumentasi organisasi.",
      },
      {
        name: "twitter:description",
        content:
          "Website resmi HMTI Universitas Bani Saleh untuk berita, agenda, anggota, dan dokumentasi organisasi.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84d62a63-434e-40c5-9000-17ed42559724/id-preview-cbb833ae--5282fc3d-1404-4927-91ea-fcf691d86233.lovable.app-1779702892097.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/84d62a63-434e-40c5-9000-17ed42559724/id-preview-cbb833ae--5282fc3d-1404-4927-91ea-fcf691d86233.lovable.app-1779702892097.png",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/hmti-logo.jpg" },
      { rel: "apple-touch-icon", href: "/hmti-logo.jpg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PageLoader />
      <Outlet />
    </QueryClientProvider>
  );
}
