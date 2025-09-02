'use client';

import Script from "next/script";

export default function StructuredData() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Next Neon Starter Kit",
            applicationCategory: "Starter kit",
            operatingSystem: "All",
            url: baseUrl,
            image: `${baseUrl}/logo.png`,
            author: {
                "@type": "Person",
                name: "Rudolph De Villa",
                url: "https://github.com/sh1baruuu",
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
                { "@type": "ListItem", position: 2, name: "Login", item: `${baseUrl}/login` },
                { "@type": "ListItem", position: 3, name: "Signup", item: `${baseUrl}/signup` },
            ],
        },
    ];

    return (
        <>
            {schemas.map((schema, i) => (
                <Script
                    key={i}
                    id={`json-ld-${i}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                >
                    {JSON.stringify(schema)}
                </Script>
            ))}
        </>
    );
}
